import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { publicProfile } from '../src/data/portfolio-profile.js';
import { excludedProjectNames, professionalProjectSlugs, projects, secondaryProjectGroups, secondaryProjectSlugs, showcaseProjectSlugs } from '../src/data/projects.js';

const root = resolve(import.meta.dirname, '..');
const templatePath = resolve(root, 'index.template.html');
const indexPath = resolve(root, 'index.html');
const escapeHtml = (value) => String(value).replace(/[&<>'"]/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[character]);

function assertProjectInventory() {
  const counts = projects.reduce((result, project) => ({ ...result, [project.tier]: (result[project.tier] ?? 0) + 1 }), {});
  if (projects.length !== 20 || counts.featured !== 8 || counts.selected !== 7 || counts.lab !== 5) throw new Error('Project inventory must remain 8 featured, 7 selected, and 5 labs.');
  if (new Set(projects.map(({ slug }) => slug)).size !== projects.length) throw new Error('Project slugs must be unique.');
  const privateClient = projects.find(({ slug }) => slug === 'evershine');
  if (!privateClient || privateClient.github !== null || privateClient.showSourceLink !== false || privateClient.sourceAccess !== 'private') throw new Error('Private client guard failed.');
  if (projects.some(({ title }) => excludedProjectNames.includes(title))) throw new Error('An excluded collection cannot render as a project.');
  if (projects.filter(({ canonicalWalmart }) => canonicalWalmart).length !== 1 || !projects.find(({ slug }) => slug === 'adaptiq').canonicalWalmart) throw new Error('Only AdaptIQ may be the Walmart forecasting card.');
  const primaryFeatureSlugs = projects.filter(({ primaryFeature }) => primaryFeature).map(({ slug }) => slug);
  const requiredPrimaryFeatures = ['payguard-ai', 'evershine', 'adaptiq', 'ai-lead-generation'];
  if (primaryFeatureSlugs.length !== requiredPrimaryFeatures.length || requiredPrimaryFeatures.some((slug) => !primaryFeatureSlugs.includes(slug))) throw new Error('Selected work must contain the three approved client projects.');
  const attachedClientProjects = ['payguard-ai', 'sentineliq', 'topolite', 'adaptiq', 'evershine', 'ai-lead-generation', 'ai-restaurant-chatbot', 'netflix'];
  if (attachedClientProjects.some((slug) => !projects.find((project) => project.slug === slug && project.clientProject))) throw new Error('Attached client projects must remain visibly labeled as client work.');
  if (showcaseProjectSlugs.length !== 7 || showcaseProjectSlugs.some((slug) => !projects.find((project) => project.slug === slug && project.showcase))) throw new Error('Public showcase must contain the seven approved case studies.');
  if (secondaryProjectSlugs.length !== 8 || new Set(secondaryProjectSlugs).size !== secondaryProjectSlugs.length || secondaryProjectSlugs.some((slug) => !projects.find((project) => project.slug === slug && project.tier !== 'lab'))) throw new Error('Additional work must contain eight non-lab projects.');
  if (new Set(professionalProjectSlugs).size !== professionalProjectSlugs.length || professionalProjectSlugs.some((slug) => !projects.some((project) => project.slug === slug))) throw new Error('Professional project slugs must be unique and resolvable.');
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
    'payguard-ai': 'WhatsApp payment verification and OCR workflow presentation',
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
  return `<article id="project-${escapeHtml(project.slug)}" class="project-card project-card--${escapeHtml(project.tier)} project-card--${escapeHtml(project.slug)}" data-project-card data-category="${escapeHtml(project.category)}" data-tier="${escapeHtml(project.tier)}">
    <figure class="media-frame"><div class="media-frame__inner" data-media-inner><img src="${escapeHtml(project.image)}" alt="${escapeHtml(imageAlt(project))}" width="1600" height="1000" loading="lazy" decoding="async"></div>${videoBadge}<figcaption class="media-fallback" aria-hidden="true">${escapeHtml(project.category)}</figcaption></figure>
    <div class="project-card__body"><div class="project-meta"><span>${String(index + 1).padStart(2, '0')}</span><span class="project-meta__badges"><span class="status-label">${isPrivateClient ? 'PRIVATE CLIENT PROJECT' : escapeHtml(project.status)}</span>${clientBadge}</span></div><h3 data-card-title>${escapeHtml(project.title)}</h3><p class="project-metric">${escapeHtml(project.metric)}</p><p class="project-result">RESULT — ${escapeHtml(project.result ?? 'Scope and delivery details are available in the case study.')}</p><p class="project-hook">${escapeHtml(project.hook)}</p><ul class="tag-list">${project.stack.slice(0, 4).map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul><div class="project-actions">${actions}</div></div>
  </article>`;
}

function renderFeatured() {
  const featured = showcaseProjectSlugs.map((slug) => projects.find((project) => project.slug === slug)).filter(Boolean);
  return `<div class="project-grid project-grid--featured" data-project-rail-section>${featured.map((project, index) => projectCard(project, index)).join('\n')}</div>`;
}

function renderSecondaryWork() {
  let index = showcaseProjectSlugs.length;
  return secondaryProjectGroups.map((group) => {
    const groupProjects = group.slugs.map((slug) => projects.find((project) => project.slug === slug)).filter(Boolean);
    const cards = groupProjects.map((project) => projectCard(project, index++)).join('\n');
    return `<div class="secondary-work__group" data-reveal><div class="secondary-work__group-heading"><h3>${escapeHtml(group.label)}</h3><p>${escapeHtml(group.description)}</p></div><div class="project-grid project-grid--secondary">${cards}</div></div>`;
  }).join('\n');
}

function projectCatalogCard(project, index) {
  const isPrivateClient = project.sourceAccess === 'private';
  const clientBadge = project.clientProject && !isPrivateClient ? '<span class="client-label">CLIENT PROJECT</span>' : '';
  return `<article class="catalog-card catalog-card--${escapeHtml(project.tier)}" data-project-catalog-card data-tier="${escapeHtml(project.tier)}" data-category="${escapeHtml(project.category)}" data-reveal>
    <figure class="catalog-card__media"><img src="${escapeHtml(project.image)}" alt="${escapeHtml(imageAlt(project))}" width="1600" height="1000" loading="lazy" decoding="async"></figure>
    <div class="catalog-card__body"><div class="catalog-card__meta"><span>${String(index + 1).padStart(2, '0')}</span><span class="project-meta__badges"><span class="status-label">${isPrivateClient ? 'PRIVATE CLIENT PROJECT' : escapeHtml(project.status)}</span>${clientBadge}</span></div><h3>${escapeHtml(project.title)}</h3><p class="catalog-card__category">${escapeHtml(project.category)}</p><p>${escapeHtml(project.metric)}</p><button class="text-link project-card__open" type="button" data-project-open="${escapeHtml(project.slug)}" aria-label="Open case study: ${escapeHtml(project.title)}">OPEN CASE STUDY <span aria-hidden="true">↗</span></button></div>
  </article>`;
}

function renderAtlas() {
  const labSlugs = projects.filter(({ tier }) => tier === 'lab').map(({ slug }) => slug);
  const orderedSlugs = [...showcaseProjectSlugs, ...secondaryProjectSlugs, ...labSlugs];
  const catalogRows = [
    { note: 'Priority client work and featured systems.' },
    { note: 'More featured work and selected builds.' },
    { note: 'Research, analytics, and selected products.' },
    { label: 'LABS & COMPACT TOOLS', note: 'Focused exercises and utilities retained for technical breadth.' }
  ];
  const groups = catalogRows.map((row, rowIndex) => {
    const start = rowIndex * 5;
    const slugs = orderedSlugs.slice(start, start + 5);
    const cards = slugs.map((slug) => projects.find((project) => project.slug === slug)).filter(Boolean).map((project, index) => projectCatalogCard(project, start + index)).join('\n');
    const end = start + slugs.length;
    const label = row.label ?? `PROJECTS ${String(start + 1).padStart(2, '0')}–${String(end).padStart(2, '0')}`;
    return `<section class="catalog-group" data-catalog-group><div class="catalog-group__heading"><p class="section-index">${escapeHtml(label)}</p><p>${escapeHtml(row.note)}</p></div><div class="project-catalog__grid">${cards}</div></section>`;
  }).join('\n');
  return `<div class="filter-bar" role="group" aria-label="Filter project catalog"><button class="filter-button is-selected" type="button" data-filter="all" aria-pressed="true">ALL PROJECTS</button><button class="filter-button" type="button" data-filter="featured" aria-pressed="false">FEATURED SYSTEMS</button><button class="filter-button" type="button" data-filter="selected" aria-pressed="false">SELECTED BUILDS</button><button class="filter-button" type="button" data-filter="lab" aria-pressed="false">LABS &amp; TOOLS</button></div><div class="project-catalog" data-project-catalog>${groups}</div>`;
}

function renderExperience() {
  return `<div class="experience-timeline">${publicProfile.experience.map((item, index) => `<article class="experience-card" data-reveal>
    <div class="experience-card__index">${String(index + 1).padStart(2, '0')}</div>
    <div class="experience-card__period">${escapeHtml(item.period)}</div>
    <div class="experience-card__content"><h3>${escapeHtml(item.role)}</h3><p class="experience-card__organization">${escapeHtml(item.organization)}</p><p>${escapeHtml(item.description)}</p></div>
    <p class="experience-card__duration">${escapeHtml(item.duration)}</p>
  </article>`).join('\n')}</div>`;
}

function renderCertifications() {
  return `<div class="certification-grid">${publicProfile.certifications.map((certificate) => `<article class="certification-card" data-reveal>
    <a class="certification-card__preview" href="${escapeHtml(certificate.pdf)}" target="_blank" rel="noopener noreferrer"><img src="${escapeHtml(certificate.image)}" alt="${escapeHtml(certificate.title)} certificate issued by ${escapeHtml(certificate.issuer)}" width="1200" height="928" loading="lazy" decoding="async"><span>Open certificate ↗</span></a>
    <div class="certification-card__body"><p class="section-index">${escapeHtml(certificate.issuer)} · ${escapeHtml(certificate.year)}</p><h4>${escapeHtml(certificate.title)}</h4><a class="text-link" href="${escapeHtml(certificate.pdf)}" target="_blank" rel="noopener noreferrer">View PDF ↗</a></div>
  </article>`).join('\n')}</div>`;
}

function renderSpecializations() {
  const proof = { 'data-analysis': 'vendor-analysis', 'data-science': 'adaptiq', 'ml-engineering': 'sentineliq', 'ai-products': 'ai-lead-generation' };
  return publicProfile.specializations.map((specialization) => `<article class="capability-card capability-card--${escapeHtml(specialization.slug)}" data-reveal>
    <p class="capability-kicker">${escapeHtml(specialization.index)}</p>
    <h3>${escapeHtml(specialization.title)}</h3>
    <p>${escapeHtml(specialization.description)}</p>
    <button class="text-link project-card__open" type="button" data-project-open="${proof[specialization.slug]}">Explore a related project ↗</button>
    <details><summary>Explore the technologies</summary><div class="stack-map__block">
      <p class="stack-map__label">SELECTED TOOLS &amp; METHODS</p>
      <dl class="stack-map">${specialization.groups.map((group) => `<div><dt>${escapeHtml(group.label)}</dt><dd><ul class="stack-tools">${group.tools.map((tool) => `<li>${escapeHtml(tool)}</li>`).join('')}</ul></dd></div>`).join('')}</dl>
    </div></details>
    <details>
      <summary>Additional tool familiarity</summary>
      <div class="stack-map__block stack-map__block--industry">
        <p class="stack-map__label">BROADER TOOLKIT</p>
        <p class="stack-map__note">These tools reflect broader familiarity; the case studies above show the project work and scope presented publicly.</p>
        <dl class="stack-map stack-map--industry">${specialization.industryGroups.map((group) => `<div><dt>${escapeHtml(group.label)}</dt><dd><ul class="stack-tools">${group.tools.map((tool) => `<li>${escapeHtml(tool)}</li>`).join('')}</ul></dd></div>`).join('')}</dl>
      </div>
    </details>
  </article>`).join('\n');
}

function renderTechMarquee() {
  const technologies = ['Demand forecasting', 'AI automation', 'Client-ready APIs', 'Predictive maintenance', 'RAG pipelines', 'Full-stack delivery'];
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
  ['<!-- FEATURED_PROJECTS -->', renderFeatured()],
  ['<!-- SECONDARY_PROJECTS -->', renderSecondaryWork()],
  ['<!-- EXPERIENCE_TIMELINE -->', renderExperience()],
  ['<!-- CERTIFICATIONS -->', renderCertifications()],
  ['<!-- SPECIALIZATION_STACKS -->', renderSpecializations()],
  ['<!-- ATLAS_PROJECTS -->', renderAtlas()]
]);
const output = [...replacements].reduce((html, [marker, value]) => html.replace(marker, value), template);
if (output.includes('<!-- PROJECT_')) throw new Error('Static project markers are missing or unresolved.');
await writeFile(indexPath, output);
