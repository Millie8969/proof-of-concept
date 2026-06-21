// Importeer het npm package Express (uit de door npm aangemaakte node_modules map)
// Deze package is geïnstalleerd via `npm install`, en staat als 'dependency' in package.json
import express from 'express'

// Importeer de Liquid package (ook als dependency via npm geïnstalleerd)
import { Liquid } from 'liquidjs';

// Importeer de feedsmith package
import { parseFeed } from 'feedsmith';

// Importeer de JSDOM package
import { JSDOM } from 'jsdom';

// Maak een nieuwe Express applicatie aan, waarin we de server configureren
const app = express();

// Maak werken met data uit formulieren iets prettiger
app.use(express.urlencoded({extended: true}));

// Gebruik de map 'public' voor statische bestanden (resources zoals CSS, JavaScript, afbeeldingen en fonts)
// Bestanden in deze map kunnen dus door de browser gebruikt worden
app.use(express.static('public'));

// Stel Liquid in als 'view engine'
const engine = new Liquid();
app.engine('liquid', engine.express());

// Stel de map met Liquid templates in
// Let op: de browser kan deze bestanden niet rechtstreeks laden (zoals voorheen met HTML bestanden)
app.set('views', './views');

const scrapeAndUpdateTweakers = async function() {
  const tweakersActiveTopicsResponse = await fetch('https://gathering.tweakers.net/rss/list_activetopics')
  const tweakersActiveTopicsResponseXML = await tweakersActiveTopicsResponse.text()
  const { feed: tweakersActiveTopicsFeed } = await parseFeed(tweakersActiveTopicsResponseXML)
  const tweakersLastPoster = tweakersActiveTopicsFeed.items[0].description.substring(13 + tweakersActiveTopicsFeed.items[0].description.indexOf('Last poster: '), tweakersActiveTopicsFeed.items[0].description.indexOf(' at '))
  const directusUserResponse = await fetch('https://fdnd-agency.directus.app/items/tweakers_users?' + new URLSearchParams({'filter[username]' : tweakersLastPoster}))
  const directusUserResponseJSON = await directusUserResponse.json()
  const tweakersLastPosterProfileResponse = await fetch('https://tweakers.net/gallery/' + tweakersLastPoster)
  const tweakersLastPosterProfileResponseHTML = await tweakersLastPosterProfileResponse.text()
  const { document: tweakersLastPosterProfileResponseDOM } = (new JSDOM(tweakersLastPosterProfileResponseHTML)).window
  const tweakersLastPosterProfileLink = tweakersLastPosterProfileResponseDOM.querySelector('a[href^="https://gathering.tweakers.net/forum/find/poster/"]')
  const tweakersLastPosterPostCount = tweakersLastPosterProfileLink.textContent.replace(/\./g, '')
  if (directusUserResponseJSON.data.length == 1) {
    await fetch('https://fdnd-agency.directus.app/items/tweakers_users', {
      method: 'PATCH',
      body: JSON.stringify({
        number_of_posts: tweakersLastPosterPostCount
      }),
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    })
  } else {
    const tweakersLastPosterProfileRegistered = tweakersLastPosterProfileResponseDOM.querySelector('.registered').textContent
    const tweakersLastPosterProfileRegisteredDateParts = tweakersLastPosterProfileRegistered.substring(18, tweakersLastPosterProfileRegistered.indexOf(', laatste')).split(' ')
    const months = {januari: '01', februari: '02', maart: '03', april: '04', mei: '05', juni: '06', juli: '07', augustus: '08', september: '09', oktober: 10, november: 11, december: 12}
    const tweakersLastPosterProfileRegisteredDate = tweakersLastPosterProfileRegisteredDateParts[2] + '-' + months[tweakersLastPosterProfileRegisteredDateParts[1]] + '-' + tweakersLastPosterProfileRegisteredDateParts[0].padStart(2, '0')
    await fetch('https://fdnd-agency.directus.app/items/tweakers_users', {
      method: 'POST',
      body: JSON.stringify({
        member_since: tweakersLastPosterProfileRegisteredDate,
        username: tweakersLastPoster,
        forum_id: tweakersLastPosterProfileLink.getAttribute('href').substring(13 + tweakersLastPosterProfileLink.getAttribute('href').indexOf('/find/poster/')),
        number_of_posts: tweakersLastPosterPostCount
      }),
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    })
  }
}

scrapeAndUpdateTweakers()

app.get('/', async function (request, response) {
  const tweakersRssResponse = await fetch('https://gathering.tweakers.net/rss/')
  const tweakersRssResponseXML = await tweakersRssResponse.text()
  const { feed: tweakersRssResponseFeed } = parseFeed(tweakersRssResponseXML)

  const tweakersActiveTopicsResponse = await fetch('https://gathering.tweakers.net/rss/list_activetopics')
  const tweakersActiveTopicsResponseXML = await tweakersActiveTopicsResponse.text()
  const { feed: tweakersActiveTopicsFeed } = await parseFeed(tweakersActiveTopicsResponseXML)

  const rssItems = []
  for (const item of tweakersRssResponseFeed.items) {
    rssItems.push({
      title: item.title,
      link: item.link,
      replies: Number(item.description.substring(9, item.description.indexOf('\n')))
    })
  }

  rssItems.sort(function(a, b) {
   if (a.replies < b.replies) {
    return 1;
   } else if (a.replies > b.replies) {
    return -1;
   }
   return 0;
  })

  function extractDateTime(text) {
  const match = text.match(/(\d{2})-(\d{2})-(\d{4}) (\d{2}):(\d{2})/);
  if (!match) return null;

  const [, day, month, year, hours, minutes] = match;
  return new Date(`${year}-${month}-${day}T${hours}:${minutes}:00`);
}

  const activeTopicsItems = []
  for (const item of tweakersActiveTopicsFeed.items) {
    activeTopicsItems.push({
      title: item.title,
      link: item.link,
      date: extractDateTime(item.description)
    })
  }

  activeTopicsItems.sort(function(a, b) {
   if (a.date < b.date) {
    return 1;
   } else if (a.date > b.date) {
    return -1;
   }
   return 0;
  })
  
  response.render('dashboard.liquid', {
    rss: rssItems,
    activeTopics: activeTopicsItems
  })
})

// GET-endpoint die alle gebruikersdata ophaalt
// Zie https://expressjs.com/en/5x/api.html#app.get.method over app.get()
app.get('/gebruikers', async function (request, response) {
  const directusUserResponse = await fetch('https://fdnd-agency.directus.app/items/tweakers_users?sort=-number_of_posts')
  const directusUserResponseJSON = await directusUserResponse.json()
  const data = directusUserResponseJSON.data
  
  // Zie https://expressjs.com/en/5x/api.html#res.render over response.render()
  response.render('gebruikers.liquid', { users: data })
})

// Stel het poortnummer in waar Express op moet gaan luisteren
// Lokaal is dit poort 8000; als deze applicatie ergens gehost wordt, waarschijnlijk poort 80
app.set('port', process.env.PORT || 8000)

// Start Express op, gebruik daarbij het zojuist ingestelde poortnummer op
app.listen(app.get('port'), function () {
  // Toon een bericht in de console
  console.log(`Daarna kun je via http://localhost:${app.get('port')}/ jouw interactieve website bekijken.\n\nThe Web is for Everyone. Maak mooie dingen 🙂`)
})