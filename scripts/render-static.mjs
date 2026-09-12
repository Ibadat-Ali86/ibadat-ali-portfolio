import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { publicProfile } from '../src/data/portfolio-profile.js';
import { excludedProjectNames, projects } from '../src/data/projects.js';

const root = resolve(import.meta.dirname, '..');
const templatePath = resolve(root, 'index.template.html');
const indexPath = resolve(root, 'index.html');
const escapeHtml = (value) => String(value).replace(/[&<>'"]/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[character]);

function assertProjectInventory() {
  const counts = projects.reduce((result, project) => ({ ...result, [project.tier]: (result[project.tier] ?? 0) + 1 }), {});
  if (projects.length !== 19 || counts.featured !== 7 || counts.selected !== 7 || counts.lab !== 5) throw new Error('Project inventory must remain 7 featured, 7 selected, and 5 labs.');
  if (new Set(projects.map(({ slug }) => slug)).size !== projects.length) throw new Error('Project slugs must be unique.');
  const privateClient = projects.find(({ slug }) => slug === 'evershine');
  if (!privateClient || privateClient.github !== null || privateClient.showSourceLink !== false || privateClient.sourceAccess !== 'private') throw new Error('Private client guard failed.');
  if (projects.some(({ title }) => excludedProjectNames.includes(title))) throw new Error('An excluded collection cannot render as a project.');
  if (projects.filter(({ canonicalWalmart }) => canonicalWalmart).length !== 1 || !projects.find(({ slug }) => slug === 'adaptiq').canonicalWalmart) throw new Error('Only AdaptIQ may be the Walmart forecasting card.');
  const primaryFeatureSlugs = projects.filter(({ primaryFeature }) => primaryFeature).map(({ slug }) => slug);
  const requiredPrimaryFeatures = ['evershine', 'adaptiq', 'ai-lead-generation'];
  if (primaryFeatureSlugs.length !== requiredPrimaryFeatures.length || requiredPrimaryFeatures.some((slug) => !primaryFeatureSlugs.includes(slug))) throw new Error('Selected work must contain the three approved client projects.');
  const attachedClientProjects = ['sentineliq', 'topolite', 'adaptiq', 'evershine', 'ai-lead-generation', 'ai-restaurant-chatbot', 'netflix'];
  if (attachedClientProjects.some((slug) => !projects.find((project) => project.slug === slug && project.clientProject))) throw new Error('Attached client projects must remain visibly labeled as client work.');
}

function assertSpecializations() {
  const specializations = publicProfile.specializations;
  const expectedSlugs = ['data-analysis', 'data-science', 'ml-engineering', 'ai-products'];
  if (!Array.isArray(specializations) || specializations.length !== expectedSlugs.length) throw new Error('Professional stack map must contain four specializations.');
  if (expectedSlugs.some((slug) => !specializations.some((specialization) => specialization.slug === slug))) throw new Error('Professional stack map is missing a required specialization.');
  specializations.forEach(({ title, description, groups, industryGroups }) => {
    if (!title || !description || !Array.isArray(groups) || groups.length < 3 || groups.some(({ label, tools }) => !label || !Array.isArray(tools) || tools.length < 2)) throw new Error('Each professional stack map needs complete, readable proven-tool groups.');
    if (!Array.isArray(industryGroups) || industryGroups.length < 3 || industryGroups.some(({ label, tools }) => !label || !Array.isArray(tools) || tools.length < 3)) throw new Error('Each professional stack map needs complete, readable industry-tool groups.');
  });
}

function externalLink(href, label, type) {
  return `<a class="text-link" data-link-type="${type}" href="${escapeHtml(href)}" target="_blank" rel="noopener noreferrer">${escapeHtml(label)} <span aria-hidden="true">↗</span></a>`;
}

function projectOpenButton(project) {
  return `<button class="text-link project-card__open" type="button" data-project-open="${escapeHtml(project.slug)}" aria-label="Open case study: ${escapeHtml(project.title)}">OPEN CASE STUDY <span aria-hidden="true">↗</span></button>`;
}

function imageAlt(project) {
  const descriptions = {
    codescope: 'abstract local-first repository intelligence diagram',
    carevision: 'abstract multimodal clinical decision-support system diagram',
    sentineliq: 'abstract NASA turbofan remaining-useful-life forecasting system diagram',
    topolite: 'abstract topology-aware medical imaging research diagram',
    adaptiq: 'abstract retail forecasting and decision-support system diagram',
    'vital-link': 'abstract multimodal health prototype workflow diagram',
    evershine: 'abstract education platform and learning management system diagram',
    'ai-lead-generation': 'AI-powered lead generation n8n workflow diagram',
    'ai-restaurant-chatbot': 'AI-powered WhatsApp restaurant chatbot n8n workflow diagram',
    'resume-builder': 'abstract AI resume builder workflow diagram',
    'learning-dashboard': 'abstract personalized learning analytics dashboard diagram',
    'covid-analytics': 'abstract pandemic analytics and ETL platform diagram',
    'pakistan-ecommerce': 'abstract e-commerce price prediction workflow diagram',
    'vendor-analysis': 'abstract procurement and vendor performance analytics diagram',
    mnist: 'abstract handwritten digit classification pipeline diagram',
    'spam-classifier': 'abstract email and SMS text classification workflow diagram',
    netflix: 'abstract streaming catalog exploratory data analysis diagram',
    'employee-form': 'abstract reactive employee information form workflow diagram',
    'csv-cleaner': 'abstract tabular data cleaning utility workflow diagram'
  };
  return `${project.title} — ${descriptions[project.slug] ?? 'abstract technical systems illustration'}`;
}

function projectCard(project, index) {
  const isPrivateClient = project.slug === 'evershine';
  const clientBadge = project.clientProject && !isPrivateClient ? '<span class="client-label">CLIENT PROJECT</span>' : '';
  const actions = [projectOpenButton(project), project.live && externalLink(project.live, isPrivateClient ? 'VISIT LIVE WEBSITE' : 'VISIT LIVE', 'live'), project.showSourceLink && project.github && externalLink(project.github, 'VIEW SOURCE', 'source')].filter(Boolean).join('');
  const videoBadge = project.video ? '<span class="project-video-badge">PLAY</span>' : '';
  return `<article class="project-card project-card--${escapeHtml(project.tier)} project-card--${escapeHtml(project.slug)}" data-project-card data-category="${escapeHtml(project.category)}" data-tier="${escapeHtml(project.tier)}">
    <figure class="media-frame"><div class="media-frame__inner" data-media-inner><img src="${escapeHtml(project.image)}" alt="${escapeHtml(imageAlt(project))}" width="1600" height="1000" loading="lazy" decoding="async"></div>${videoBadge}<figcaption class="media-fallback" aria-hidden="true">${escapeHtml(project.category)}</figcaption></figure>
    <div class="project-card__body"><div class="project-meta"><span>${String(index + 1).padStart(2, '0')}</span><span class="project-meta__badges"><span class="status-label">${isPrivateClient ? 'PRIVATE CLIENT PROJECT' : escapeHtml(project.status)}</span>${clientBadge}</span></div><h3 data-card-title>${escapeHtml(project.title)}</h3><p class="project-metric">${escapeHtml(project.metric)}</p><p class="project-hook">${escapeHtml(project.hook)}</p><ul class="tag-list">${project.stack.slice(0, 4).map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul><div class="project-actions">${actions}</div></div>
  </article>`;
}

function renderFeatured() {
  const featuredOrder = ['evershine', 'adaptiq', 'ai-lead-generation'];
  const featured = featuredOrder.map((slug) => projects.find((project) => project.slug === slug)).filter(Boolean);
  return `<div class="project-grid project-grid--featured" data-project-rail-section>${featured.map((project, index) => projectCard(project, index)).join('\n')}</div>`;
}

function renderAtlas() {
  const selected = projects.filter((project) => !project.primaryFeature && project.tier !== 'lab');
  const labs = projects.filter(({ tier }) => tier === 'lab');
  return `<div class="atlas-group"><h2 class="atlas-group__title" data-split>MORE SYSTEMS &amp; CASE STUDIES</h2><div class="project-grid project-grid--selected">${selected.map((project, index) => projectCard(project, index + 3)).join('\n')}</div></div><div class="atlas-group atlas-group--labs"><h2 class="atlas-group__title" data-split>EXPERIMENTS &amp; ANALYSIS</h2><p class="atlas-group__note">Focused studies and smaller tools, with their scope clearly described.</p><div class="project-grid project-grid--lab">${labs.map((project, index) => projectCard(project, index + 3 + selected.length)).join('\n')}</div></div>`;
}

function renderFilters() {
  const categories = [...new Set(projects.filter((project) => !project.primaryFeature).map(({ category }) => category))];
  return `<div class="filter-bar"><button class="filter-button is-selected" type="button" aria-pressed="true" data-filter="all">All work</button>${categories.map((category) => `<button class="filter-button" type="button" aria-pressed="false" data-filter="${escapeHtml(category)}">${escapeHtml(category)}</button>`).join('')}</div>`;
}

function renderSpecializations() {
  const proof = { 'data-analysis': 'vendor-analysis', 'data-science': 'adaptiq', 'ml-engineering': 'sentineliq', 'ai-products': 'ai-lead-generation' };
  return publicProfile.specializations.map((specialization) => `<article class="capability-card capability-card--${escapeHtml(specialization.slug)}" data-reveal>
    <p class="capability-kicker">${escapeHtml(specialization.index)}</p>
    <h3>${escapeHtml(specialization.title)}</h3>
    <p>${escapeHtml(specialization.description)}</p>
    <button class="text-link project-card__open" type="button" data-project-open="${proof[specialization.slug]}">Explore a related project ↗</button>
    <details><summary>Explore the technologies</summary><div class="stack-map__block">
      <p class="stack-map__label">PORTFOLIO-PROVEN FOUNDATION</p>
      <dl class="stack-map">${specialization.groups.map((group) => `<div><dt>${escapeHtml(group.label)}</dt><dd><ul class="stack-tools">${group.tools.map((tool) => `<li>${escapeHtml(tool)}</li>`).join('')}</ul></dd></div>`).join('')}</dl>
    </div></details>
    <details>
      <summary>Show broader toolkit</summary>
      <div class="stack-map__block stack-map__block--industry">
        <p class="stack-map__label">INDUSTRY-STANDARD ROLE TOOLKIT</p>
        <p class="stack-map__note">Role-readiness map — not a claim of project use.</p>
        <dl class="stack-map stack-map--industry">${specialization.industryGroups.map((group) => `<div><dt>${escapeHtml(group.label)}</dt><dd><ul class="stack-tools">${group.tools.map((tool) => `<li>${escapeHtml(tool)}</li>`).join('')}</ul></dd></div>`).join('')}</dl>
      </div>
    </details>
  </article>`).join('\n');
}

function renderTechMarquee() {
  const technologies = ['Python', 'PyTorch', 'XGBoost', 'Scikit-learn', 'FastAPI', 'Next.js 15', 'n8n', 'MCP', 'Claude API', 'Gemini API', 'PostgreSQL', 'Docker'];
  const items = technologies.map((technology) => `<span class="tech-marquee__item">${escapeHtml(technology)}</span>`).join('');
  const accessibleList = technologies.map(escapeHtml).join(', ');
  return `<section class="tech-marquee" aria-label="Technology stack and tools" data-tech-marquee>
    <div class="tech-marquee__header"><span>CURATED AI / AUTOMATION / FULL-STACK</span><span>${technologies.length} HIGH-SIGNAL TOOLS</span></div>
    <div class="tech-marquee__viewport">
      <div class="tech-marquee__track">
        <div class="tech-marquee__group" aria-hidden="true">${items}</div>
        <div class="tech-marquee__group tech-marquee__group--clone" aria-hidden="true">${items}</div>
      </div>
    </div>
    <p class="sr-only">Technologies and tools used across this portfolio: ${accessibleList}.</p>
  </section>`;
}

assertProjectInventory();
assertSpecializations();
const template = await readFile(templatePath, 'utf8');
const replacements = new Map([
  ['<!-- TECH_STACK_MARQUEE -->', renderTechMarquee()],
  ['<!-- PROJECT_FILTERS -->', renderFilters()],
  ['<!-- FEATURED_PROJECTS -->', renderFeatured()],
  ['<!-- SPECIALIZATION_STACKS -->', renderSpecializations()],
  ['<!-- ATLAS_PROJECTS -->', renderAtlas()]
]);
const output = [...replacements].reduce((html, [marker, value]) => html.replace(marker, value), template);
if (output.includes('<!-- PROJECT_')) throw new Error('Static project markers are missing or unresolved.');
await writeFile(indexPath, output);
