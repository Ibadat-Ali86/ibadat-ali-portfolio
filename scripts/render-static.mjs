import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { excludedProjectNames, projects } from '../src/data/projects.js';

const root = resolve(import.meta.dirname, '..');
const templatePath = resolve(root, 'index.template.html');
const indexPath = resolve(root, 'index.html');
const escapeHtml = (value) => String(value).replace(/[&<>'"]/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[character]);

function assertProjectInventory() {
  const counts = projects.reduce((result, project) => ({ ...result, [project.tier]: (result[project.tier] ?? 0) + 1 }), {});
  if (projects.length !== 17 || counts.featured !== 7 || counts.selected !== 5 || counts.lab !== 5) throw new Error('Project inventory must remain 7 featured, 5 selected, and 5 labs.');
  if (new Set(projects.map(({ slug }) => slug)).size !== projects.length) throw new Error('Project slugs must be unique.');
  const privateClient = projects.find(({ slug }) => slug === 'evershine');
  if (!privateClient || privateClient.github !== null || privateClient.showSourceLink !== false || privateClient.sourceAccess !== 'private') throw new Error('Private client guard failed.');
  if (projects.some(({ title }) => excludedProjectNames.includes(title))) throw new Error('An excluded collection cannot render as a project.');
  if (projects.filter(({ canonicalWalmart }) => canonicalWalmart).length !== 1 || !projects.find(({ slug }) => slug === 'adaptiq').canonicalWalmart) throw new Error('Only AdaptIQ may be the Walmart forecasting card.');
}

function externalLink(href, label, type) {
  return `<a class="text-link" data-link-type="${type}" href="${escapeHtml(href)}" target="_blank" rel="noopener noreferrer">${escapeHtml(label)} <span aria-hidden="true">↗</span></a>`;
}

function projectCard(project, index) {
  const isPrivate = project.slug === 'evershine';
  const actions = [project.live && externalLink(project.live, isPrivate ? 'VISIT LIVE WEBSITE' : 'VISIT LIVE', 'live'), project.showSourceLink && project.github && externalLink(project.github, 'VIEW SOURCE', 'source')].filter(Boolean).join('');
  const details = project.tier === 'featured' ? `<div class="project-details"><p><strong>Constraint:</strong> ${escapeHtml(project.problem)}</p><p><strong>System:</strong> ${escapeHtml(project.solution)}</p><p class="safeguard"><strong>Scope note:</strong> ${escapeHtml(project.editorialSafeguard)}</p></div>` : '';
  return `<article class="project-card project-card--${escapeHtml(project.tier)} project-card--${escapeHtml(project.slug)}" data-project-card data-category="${escapeHtml(project.category)}" data-tier="${escapeHtml(project.tier)}">
    <figure class="media-frame"><img src="${escapeHtml(project.image)}" alt="" width="1600" height="1000" loading="lazy" decoding="async"><figcaption class="media-fallback" aria-hidden="true">${escapeHtml(project.category)}</figcaption></figure>
    <div class="project-card__body"><div class="project-meta"><span>${String(index + 1).padStart(2, '0')}</span><span class="status-label">${isPrivate ? 'PRIVATE CLIENT PROJECT' : escapeHtml(project.status)}</span></div><h3>${escapeHtml(project.title)}</h3><p class="project-hook">${escapeHtml(project.hook)}</p>${details}<ul class="tag-list">${project.stack.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul><div class="project-actions">${actions}</div></div>
  </article>`;
}

function renderFeatured() {
  return projects.filter(({ tier }) => tier === 'featured').map((project, index) => projectCard(project, index)).join('\n');
}

function renderAtlas() {
  const selected = projects.filter(({ tier }) => tier === 'selected');
  const labs = projects.filter(({ tier }) => tier === 'lab');
  return `<div class="atlas-group"><h2 class="atlas-group__title">Selected case studies</h2><div class="project-grid project-grid--selected">${selected.map((project, index) => projectCard(project, index + 7)).join('\n')}</div></div><div class="atlas-group"><h2 class="atlas-group__title">Labs &amp; compact tools</h2><div class="project-grid project-grid--lab">${labs.map((project, index) => projectCard(project, index + 12)).join('\n')}</div></div>`;
}

function renderFilters() {
  const categories = [...new Set(projects.filter(({ tier }) => tier !== 'featured').map(({ category }) => category))];
  return `<div class="filter-bar"><button class="filter-button is-selected" type="button" aria-pressed="true" data-filter="all">All work</button>${categories.map((category) => `<button class="filter-button" type="button" aria-pressed="false" data-filter="${escapeHtml(category)}">${escapeHtml(category)}</button>`).join('')}</div>`;
}

assertProjectInventory();
const template = await readFile(templatePath, 'utf8');
const replacements = new Map([
  ['<!-- PROJECT_FILTERS -->', renderFilters()],
  ['<!-- FEATURED_PROJECTS -->', renderFeatured()],
  ['<!-- ATLAS_PROJECTS -->', renderAtlas()]
]);
const output = [...replacements].reduce((html, [marker, value]) => html.replace(marker, value), template);
if (output.includes('<!-- PROJECT_')) throw new Error('Static project markers are missing or unresolved.');
await writeFile(indexPath, output);
