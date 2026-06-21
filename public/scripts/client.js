// Zorgt ervoor dat alle topics worden voorzien van een title (native browser tooltip)
document.querySelectorAll('.topicLink').forEach(el => {
  el.title = el.textContent;
});