export function initProjectFilter() {
  const buttons = [...document.querySelectorAll('[data-filter]')];
  const cards = [...document.querySelectorAll('[data-atlas-projects] [data-project-card]')];
  if (!buttons.length || !cards.length) return;
  buttons.forEach((button) => button.addEventListener('click', () => {
    const selected = button.dataset.filter;
    buttons.forEach((item) => {
      const isSelected = item === button;
      item.classList.toggle('is-selected', isSelected);
      item.setAttribute('aria-pressed', String(isSelected));
    });
    cards.forEach((card) => {
      const show = selected === 'all' || card.dataset.category === selected;
      card.hidden = !show;
    });
  }));
}
