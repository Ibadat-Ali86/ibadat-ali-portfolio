import { projectPlan, projects } from '../data/projects.js';

const modal = document.querySelector('[data-project-modal]');
const openers = document.querySelectorAll('[data-project-open]');

const setText = (selector, value) => {
  const element = modal.querySelector(selector);
  element.textContent = value;
};

function createAction(href, label) {
  const link = document.createElement('a');
  link.className = 'button button--outline';
  link.href = href;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.textContent = `${label} ↗`;
  return link;
}

function openProject(project, opener) {
  const image = modal.querySelector('[data-modal-image]');
  const stack = modal.querySelector('[data-modal-stack]');
  const actions = modal.querySelector('[data-modal-actions]');
  const note = modal.querySelector('[data-modal-note]');
  image.src = project.image;
  image.alt = `${project.title} — case study visual`;
  const privateClient = project.sourceAccess === 'private';
  setText('[data-modal-status]', privateClient ? 'PRIVATE CLIENT PROJECT' : project.clientProject ? `CLIENT PROJECT · ${project.status}` : project.status);
  setText('[data-modal-metric]', project.metric);
  setText('[data-modal-result]', `RESULT — ${project.result ?? 'Scope and delivery details are available in the case study.'}`);
  setText('[data-modal-title]', project.title);
  setText('[data-modal-hook]', project.hook);
  setText('[data-modal-problem]', project.problem ?? `The ${project.category.toLowerCase()} work needed an inspectable, focused path from input to useful output.`);
  setText('[data-modal-plan]', projectPlan(project));
  setText('[data-modal-solution]', project.solution ?? project.hook);
  stack.replaceChildren(...project.stack.map((item) => {
    const listItem = document.createElement('li');
    listItem.textContent = item;
    return listItem;
  }));
  actions.replaceChildren();
  if (project.live) actions.append(createAction(project.live, project.slug === 'evershine' ? 'VISIT LIVE WEBSITE' : 'VISIT LIVE'));
  if (project.showSourceLink && project.github) actions.append(createAction(project.github, 'VIEW SOURCE'));
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
