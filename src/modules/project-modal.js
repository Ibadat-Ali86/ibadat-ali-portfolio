import { catalogStackUsage, projectPlan, projectStackUsage, projects } from '../data/projects.js';
import { stackBrandFor } from '../data/stack-icons.js';

const modal = document.querySelector('[data-project-modal]');
const openers = document.querySelectorAll('[data-project-open]');

const setText = (selector, value) => {
  const element = modal.querySelector(selector);
  if (element) element.textContent = value;
};

function createAction(href, label) {
  const link = document.createElement('a');
  link.className = 'button button--outline';
  link.href = href;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.textContent = label;
  return link;
}

function createTechChip(label, count, className = '') {
  const listItem = document.createElement('li');
  listItem.className = `tech-chip ${className}`.trim();
  const icon = stackBrandFor(label);
  if (icon) {
    const mark = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    mark.classList.add('tech-chip__icon');
    mark.setAttribute('viewBox', '0 0 24 24');
    mark.setAttribute('aria-hidden', 'true');
    mark.style.setProperty('--stack-brand', `#${icon.hex}`);
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', icon.path);
    mark.append(path);
    listItem.append(mark);
  } else {
    const fallback = document.createElement('span');
    fallback.className = 'tech-chip__fallback';
    fallback.setAttribute('aria-hidden', 'true');
    fallback.textContent = '◆';
    listItem.append(fallback);
  }
  const labelElement = document.createElement('span');
  labelElement.textContent = label;
  listItem.append(labelElement);
  if (count > 1) {
    const usage = document.createElement('span');
    usage.className = 'tech-chip__usage';
    usage.textContent = `${count} projects`;
    listItem.append(usage);
  }
  return listItem;
}

function renderArchitecture(architecture) {
  const target = modal.querySelector('[data-modal-architecture]');
  target.replaceChildren(...architecture.map((step, index) => {
    const article = document.createElement('article');
    article.className = 'project-modal__architecture-step';
    const header = document.createElement('div');
    header.className = 'project-modal__architecture-heading';
    const number = document.createElement('span');
    number.className = 'project-modal__architecture-index';
    number.textContent = String(index + 1).padStart(2, '0');
    const title = document.createElement('h4');
    title.textContent = step.label;
    header.append(number, title);
    const detail = document.createElement('p');
    detail.textContent = step.detail;
    const tools = document.createElement('ul');
    tools.className = 'project-modal__architecture-tools';
    tools.setAttribute('aria-label', `${step.label} technologies`);
    tools.append(...step.tools.map((tool) => createTechChip(tool, 0, 'tech-chip--mini')));
    article.append(header, detail, tools);
    return article;
  }));
}

function renderDelivery(delivery) {
  const target = modal.querySelector('[data-modal-delivery]');
  target.replaceChildren(...delivery.map((item) => {
    const listItem = document.createElement('li');
    listItem.textContent = item;
    return listItem;
  }));
}

function renderUsageList(selector, entries, emptyText) {
  const target = modal.querySelector(selector);
  if (!entries.length) {
    const item = document.createElement('li');
    item.className = 'project-modal__usage-empty';
    item.textContent = emptyText;
    target.replaceChildren(item);
    return;
  }
  target.replaceChildren(...entries.map(([label, count]) => {
    const item = document.createElement('li');
    const name = document.createElement('strong');
    name.textContent = label;
    const frequency = document.createElement('span');
    frequency.textContent = `${count} ${count === 1 ? 'project' : 'projects'}`;
    item.append(name, frequency);
    return item;
  }));
}

function openProject(project, opener) {
  const image = modal.querySelector('[data-modal-image]');
  const stack = modal.querySelector('[data-modal-stack]');
  const actions = modal.querySelector('[data-modal-actions]');
  const note = modal.querySelector('[data-modal-note]');
  const evidenceBlock = modal.querySelector('[data-modal-evidence-block]');
  const evidenceLinks = modal.querySelector('[data-modal-evidence-links]');
  const detail = project.caseStudy ?? {
    context: project.problem,
    architecture: [{ label: 'Delivery path', detail: project.solution ?? project.hook, tools: project.stack }],
    delivery: [project.result ?? 'Scope and delivery details are available in the case study.']
  };
  const usage = projectStackUsage(project);
  image.src = project.image;
  image.alt = `${project.title} — case study visual`;
  setText('[data-modal-media-caption]', `${project.category} · ${project.status}`);
  const privateClient = project.sourceAccess === 'private';
  setText('[data-modal-status]', privateClient ? 'PRIVATE CLIENT PROJECT' : project.clientProject ? `CLIENT PROJECT · ${project.status}` : project.status);
  setText('[data-modal-metric]', project.metric);
  setText('[data-modal-result]', `Result — ${project.result ?? 'Scope and delivery details are available in the case study.'}`);
  setText('[data-modal-title]', project.title);
  setText('[data-modal-hook]', project.hook);
  setText('[data-modal-problem]', project.problem ?? `The ${project.category.toLowerCase()} work needed an inspectable, focused path from input to useful output.`);
  setText('[data-modal-context]', detail.context);
  setText('[data-modal-plan]', projectPlan(project));
  setText('[data-modal-solution]', project.solution ?? project.hook);
  setText('[data-modal-stack-summary]', `${usage.length} technologies mapped across ${detail.architecture.length} architecture stages. Counts show how often a canonical tool appears across the public catalog.`);
  renderArchitecture(detail.architecture);
  renderDelivery(detail.delivery);
  stack.replaceChildren(...usage.map(({ label, count }) => createTechChip(label, count)));
  const portfolioUsage = catalogStackUsage();
  renderUsageList('[data-modal-portfolio-stack]', portfolioUsage.slice(0, 5), 'No repeated tools in the current catalog.');
  renderUsageList('[data-modal-distinctive-stack]', usage.filter(({ count }) => count === 1).map(({ label, count }) => [label, count]), 'This project uses only shared catalog foundations.');
  evidenceLinks.replaceChildren();
  if (project.evidence) {
    evidenceBlock.hidden = false;
    setText('[data-modal-evidence]', project.evidence.summary);
    project.evidence.links?.forEach(({ href, label }) => evidenceLinks.append(createAction(href, label)));
  } else {
    evidenceBlock.hidden = true;
    setText('[data-modal-evidence]', '');
  }
  actions.replaceChildren();
  if (project.live) actions.append(createAction(project.live, project.slug === 'evershine' ? 'Visit live website' : 'Visit live project'));
  if (project.showSourceLink && project.github) actions.append(createAction(project.github, 'View source'));
  if (privateClient) {
    note.textContent = 'Source code is not linked because this is a private client project and its implementation details are confidential.';
  } else if (!project.live && !project.github) {
    note.textContent = 'This entry is presented as workflow evidence; no public repository or live demo was supplied.';
  } else {
    note.textContent = project.editorialSafeguard ?? '';
  }
  modal.showModal();
  document.body.style.overflow = 'hidden';
  modal.querySelector('.project-modal__close').focus();
  openers.forEach((button) => delete button.dataset.modalReturn);
  if (opener) opener.dataset.modalReturn = 'true';
}

function closeProject() {
  if (!modal.open) return;
  modal.close();
  document.body.style.overflow = '';
  const previous = [...openers].find((opener) => opener.dataset.modalReturn === 'true');
  previous?.focus();
}

export function initProjectModal() {
  if (!modal) return;
  openers.forEach((opener) => opener.addEventListener('click', () => {
    const project = projects.find(({ slug }) => slug === opener.dataset.projectOpen);
    if (project) openProject(project, opener);
  }));
  modal.querySelectorAll('[data-modal-close]').forEach((element) => element.addEventListener('click', closeProject));
  modal.addEventListener('cancel', (event) => {
    event.preventDefault();
    closeProject();
  });
}
