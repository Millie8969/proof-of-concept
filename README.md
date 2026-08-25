Ontwerp en maak een data driven online concept voor een opdrachtgever

De instructies voor deze opdracht staan in: [docs/INSTRUCTIONS.md](https://github.com/fdnd-task/proof-of-concept/blob/main/docs/INSTRUCTIONS.md)

# Titel
<!-- Geef je project een titel en schrijf in één zin wat het is -->

## Inhoudsopgave

  * [Beschrijving](#beschrijving)
  * [Gebruik](#gebruik)
  * [Kenmerken](#kenmerken)
  * [Installatie](#installatie)
  * [Bronnen](#bronnen)
  * [Licentie](#licentie)

## Beschrijving
<!-- Bij Beschrijving staat kort beschreven wat voor project het is en wat je hebt gemaakt -->
<!-- Voeg een mooie poster visual toe 📸 -->
<!-- Voeg een link toe naar Github Pages 🌐-->
De link naar de site vind je hier: proof-of-concept-ri0t.onrender.com/

Het Tweakers Community Dashboard is een dashboard waar een 'community manager' op kan kijken om te zien wat trending is op het forum Gathering of Tweakers.

## Gebruik
<!-- Bij Gebruik staat de user story, hoe het werkt en wat je er mee kan. -->
Allereerst kom op je op de login-pagina terecht.
<img width="796" height="725" alt="image" src="https://github.com/user-attachments/assets/63b8708f-ee71-4c86-b288-551503db1a0f" />

Om 'in te loggen' op de site moet je bij zowel de naam als het wachtwoord "admin" invoeren. Daarna wordt je doorverwezen naar het dashboard. Hier zie je een tabel met de top 10 recentst besproken topics, met het meest recente topic bovenaan. Daarnaast is iedere topictitel klikbaar, die verwijst je door naar de laatste reactie binnen dat topic op het forum. 
<img width="1403" height="942" alt="image" src="https://github.com/user-attachments/assets/83781809-39e8-4ea9-a8e9-8465227ef179" />

Daarnaast heb je ook nog de gebruikers-pagina. Hier vind je de top 100 gebruikers, gesorteerd op basis van hoe vaak ze een reactie achter hebben gelaten op het forum. 
<img width="1404" height="941" alt="image" src="https://github.com/user-attachments/assets/f1942c68-fccd-4712-91f0-f333d43b054f" />

## Kenmerken
<!-- Bij Kenmerken staat welke technieken zijn gebruikt en hoe. Wat is de HTML structuur? Wat zijn de belangrijkste dingen in CSS? Wat is er met JS gedaan en hoe? Misschien heb je iets met NodeJS gedaan, of heb je een framwork of library gebruikt? -->
Inspringing en ruimte tussen landmarks en elementen:
https://github.com/Millie8969/proof-of-concept/blob/a5829b5a58f9c7fafade648a383ce62ccef9b6e1/views/gebruikers.liquid#L4-L19

Media queries:
https://github.com/Millie8969/proof-of-concept/blob/a5829b5a58f9c7fafade648a383ce62ccef9b6e1/public/styles/styles.css#L39-L44

https://github.com/Millie8969/proof-of-concept/blob/a5829b5a58f9c7fafade648a383ce62ccef9b6e1/public/styles/styles.css#L221-L227

### Responsiveness
De tekst en de tabel schalen allebei mee met verschillende schermgroottes:

* Mobile
<img width="341" height="934" alt="image" src="https://github.com/user-attachments/assets/0b8d9742-89bc-4612-b77b-fce4decdaf7d" />

* Tablet
 <img width="528" height="940" alt="image" src="https://github.com/user-attachments/assets/1a024430-f940-4f0b-9c88-eeab1d866fcf" />

* Desktop
<img width="1382" height="936" alt="image" src="https://github.com/user-attachments/assets/a12bb017-b192-406e-a345-ab5ddc26fa88" />

## Installatie
<!-- Bij Instalatie staat hoe een andere developer aan jouw repo kan werken -->
Niet nodig. Je kan de site gebruiken door te klikken op de link in de Readme of in de repo.

## Bronnen
[Cookie Jar](https://www.npmjs.com/package/cookiejar)
[fetch-cookie](https://www.npmjs.com/package/fetch-cookie?activeTab=readme)

## Licentie

This project is licensed under the terms of the [MIT license](./LICENSE).
