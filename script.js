// Toggle da navegação "rail" em telas pequenas
const railToggle = document.getElementById('railToggle');
const rail = document.getElementById('rail');

if (railToggle && rail) {
  railToggle.addEventListener('click', () => {
    const isOpen = rail.classList.toggle('is-open');
    railToggle.setAttribute('aria-expanded', String(isOpen));
  });

  // Fecha o menu ao clicar em um link (útil no mobile)
  rail.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      rail.classList.remove('is-open');
      railToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// Destaca o item da navegação correspondente à seção visível
const sections = document.querySelectorAll('main section, .hero');
const railLinks = document.querySelectorAll('.rail__list a');

if (sections.length && railLinks.length && 'IntersectionObserver' in window) {
  const linkById = new Map(
    Array.from(railLinks).map((link) => [link.getAttribute('href').slice(1), link])
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const link = linkById.get(entry.target.id);
        if (!link) return;
        if (entry.isIntersecting) {
          railLinks.forEach((l) => l.classList.remove('is-active'));
          link.classList.add('is-active');
        }
      });
    },
    { rootMargin: '-40% 0px -50% 0px' }
  );

  sections.forEach((section) => observer.observe(section));
}
