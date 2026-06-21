// Zorgt ervoor dat alle topics worden voorzien van een title (native browser tooltip)
document.querySelectorAll('.topicLink').forEach(el => {
  el.title = el.textContent;
});

// View Transition tussen 'Community Dashboard' en 'gebruikers'
if (document.startViewTransition) {
      document.addEventListener('click', (e) => {
        e.preventDefault();
        const link = e.target.closest('a[href]');
        if (!link) return;

        const url = new URL(link.href);
        if (url.origin !== location.origin || url.hash) return;

        document.startViewTransition(() => {
        window.location.href = link.href;
      });
    });
  }