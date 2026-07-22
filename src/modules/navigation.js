export function initNavigation() {
  const menuButton = document.querySelector('[data-menu-button]');
  const menu = document.querySelector('[data-menu]');
  const navLinks = [...document.querySelectorAll('[data-menu] a')];
  if (!menuButton || !menu) return;

  const closeMenu = () => {
    menu.classList.remove('is-open');
    menuButton.setAttribute('aria-expanded', 'false');
  };
  menuButton.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
    menu.classList.toggle('is-open', !isOpen);
    menuButton.setAttribute('aria-expanded', String(!isOpen));
  });
  navLinks.forEach((link) => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
      closeMenu();
      menuButton.focus();
    }
  });

  const sections = navLinks.map((link) => document.querySelector(link.getAttribute('href'))).filter(Boolean);
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => link.removeAttribute('aria-current'));
      const active = navLinks.find((link) => link.getAttribute('href') === `#${entry.target.id}`);
      active?.setAttribute('aria-current', 'page');
    });
  }, { rootMargin: '-35% 0px -55% 0px', threshold: 0 });
  sections.forEach((section) => observer.observe(section));
}
