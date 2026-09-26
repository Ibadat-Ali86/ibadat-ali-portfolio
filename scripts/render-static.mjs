import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { publicProfile } from '../src/data/portfolio-profile.js';
import { excludedProjectNames, professionalProjectSlugs, projects, secondaryProjectSlugs, showcaseProjectSlugs } from '../src/data/projects.js';
import { stackBrandFor } from '../src/data/stack-icons.js';

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
  const payguard = projects.find(({ slug }) => slug === 'payguard-ai');
  if (!payguard || payguard.github !== null || payguard.showSourceLink !== false || payguard.sourceAccess !== 'private' || payguard.evidence.links.some(({ href }) => href.includes('github.com'))) throw new Error('PayGuard private-client guard failed.');
  if (projects.some(({ title }) => excludedProjectNames.includes(title))) throw new Error('An excluded collection cannot render as a project.');
  if (projects.filter(({ canonicalWalmart }) => canonicalWalmart).length !== 1 || !projects.find(({ slug }) => slug === 'adaptiq').canonicalWalmart) throw new Error('Only AdaptIQ may be the Walmart forecasting card.');
  const primaryFeatureSlugs = projects.filter(({ primaryFeature }) => primaryFeature).map(({ slug }) => slug);
  const requiredPrimaryFeatures = ['payguard-ai', 'evershine', 'adaptiq', 'ai-lead-generation'];
  if (primaryFeatureSlugs.length !== requiredPrimaryFeatures.length || requiredPrimaryFeatures.some((slug) => !primaryFeatureSlugs.includes(slug))) throw new Error('Selected work must contain the three approved client projects.');
  const attachedClientProjects = ['payguard-ai', 'sentineliq', 'topolite', 'adaptiq', 'evershine', 'ai-lead-generation', 'ai-restaurant-chatbot', 'netflix'];
  if (attachedClientProjects.some((slug) => !projects.find((project) => project.slug === slug && project.clientProject))) throw new Error('Attached client projects must remain visibly labeled as client work.');
  if (showcaseProjectSlugs.length !== 7 || showcaseProjectSlugs.some((slug) => !projects.find((project) => project.slug === slug && project.showcase))) throw new Error('Public showcase must contain the seven approved case studies.');
  if (secondaryProjectSlugs.length !== 8 || new Set(secondaryProjectSlugs).size !== secondaryProjectSlugs.length || secondaryProjectSlugs.some((slug) => !projects.find((project) => project.slug === slug && project.tier !== 'lab'))) throw new Error('Additional work must contain eight non-lab projects.');
  if (professionalProjectSlugs.length !== 16 || professionalProjectSlugs.filter((slug) => projects.find((project) => project.slug === slug)?.tier === 'lab').join(',') !== 'netflix') throw new Error('The public catalog must contain the 15 priority projects and Netflix Data Analysis only.');
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

function renderTechChip(label) {
  const icon = stackBrandFor(label);
  const mark = icon
    ? `<svg class="tech-chip__icon" viewBox="0 0 24 24" aria-hidden="true" style="--stack-brand:#${icon.hex}"><path d="${icon.path}"/></svg>`
    : '<span class="tech-chip__fallback" aria-hidden="true">◆</span>';
  return `<li class="tech-chip">${mark}<span>${escapeHtml(label)}</span></li>`;
}

function projectCatalogCard(project, index) {
  const isPrivateClient = project.sourceAccess === 'private';
  const clientBadge = project.clientProject && !isPrivateClient ? '<span class="client-label">CLIENT PROJECT</span>' : '';
  const statusClass = project.status.includes('LIVE') ? 'status-label status-label--live' : 'status-label';
  const visibleStack = project.stack.slice(0, 3);
  const technologies = visibleStack.map(renderTechChip).join('');
  const remainingStack = project.stack.length - visibleStack.length;
  const stackSummary = remainingStack > 0 ? `<li class="catalog-card__stack-more">+${remainingStack} more in case study</li>` : '';
  return `<article class="catalog-card catalog-card--${escapeHtml(project.slug)}" data-project-catalog-card data-project-slug="${escapeHtml(project.slug)}" data-reveal>
    <figure class="catalog-card__media"><img src="${escapeHtml(project.image)}" alt="${escapeHtml(imageAlt(project))}" width="1600" height="1000" loading="lazy" decoding="async"></figure>
    <div class="catalog-card__body"><div class="catalog-card__meta"><span>${String(index + 1).padStart(2, '0')}</span><span class="project-meta__badges"><span class="${statusClass}">${isPrivateClient ? 'PRIVATE CLIENT' : escapeHtml(project.status)}</span>${clientBadge}</span></div><h3>${escapeHtml(project.title)}</h3><p>${escapeHtml(project.metric)}</p><ul class="catalog-card__technologies" aria-label="Preview of ${escapeHtml(project.stack.length)} technologies">${technologies}${stackSummary}</ul>${project.result ? `<p class="catalog-card__result">Result — ${escapeHtml(project.result)}</p>` : ''}<button class="button button--outline catalog-card__open" type="button" data-project-open="${escapeHtml(project.slug)}" aria-label="View project details: ${escapeHtml(project.title)}">View details</button></div>
  </article>`;
}

function renderAtlas() {
  const cards = professionalProjectSlugs.map((slug) => projects.find((project) => project.slug === slug)).map((project, index) => projectCatalogCard(project, index)).join('\n');
  return `<div class="project-catalog" data-project-catalog><div class="project-catalog__grid">${cards}</div></div>`;
}

function renderExperience() {
  return `<div class="experience-catalog" data-experience-catalog>${publicProfile.experience.map((item, index) => `<article class="experience-card" data-experience-card data-reveal>
    <div class="experience-card__meta"><span class="experience-card__index">${String(index + 1).padStart(2, '0')}</span><span class="experience-card__duration">${escapeHtml(item.duration)}</span></div>
    <p class="experience-card__period">${escapeHtml(item.period)}</p>
    <div class="experience-card__content"><h3>${escapeHtml(item.role)}</h3><p class="experience-card__organization">${escapeHtml(item.organization)}</p><p>${escapeHtml(item.description)}</p></div>
  </article>`).join('\n')}</div>`;
}

function renderCertifications() {
  return `<div class="certification-grid" data-certification-catalog>${publicProfile.certifications.map((certificate, index) => `<article class="certification-card" data-certification-card data-reveal>
    <a class="certification-card__preview" href="${escapeHtml(certificate.pdf)}" target="_blank" rel="noopener noreferrer"><img src="${escapeHtml(certificate.image)}" alt="${escapeHtml(certificate.title)} certificate issued by ${escapeHtml(certificate.issuer)}" width="1430" height="1105" loading="lazy" decoding="async"><span>Open certificate</span></a>
    <div class="certification-card__body"><div class="certification-card__meta"><p class="section-index">${escapeHtml(certificate.issuer)} · ${escapeHtml(certificate.year)}</p><span>${String(index + 1).padStart(2, '0')}</span></div><h4>${escapeHtml(certificate.title)}</h4><a class="text-link" href="${escapeHtml(certificate.pdf)}" target="_blank" rel="noopener noreferrer">View certificate PDF</a></div>
  </article>`).join('\n')}</div>`;
}

function renderSpecializations() {
  const proof = { 'data-analysis': 'vendor-analysis', 'data-science': 'adaptiq', 'ml-engineering': 'sentineliq', 'ai-products': 'ai-lead-generation' };
  return publicProfile.specializations.map((specialization) => `<article class="capability-card capability-card--${escapeHtml(specialization.slug)}" data-reveal>
    <p class="capability-kicker">${escapeHtml(specialization.index)}</p>
    <h3>${escapeHtml(specialization.title)}</h3>
    <p>${escapeHtml(specialization.description)}</p>
    <button class="text-link project-card__open" type="button" data-project-open="${proof[specialization.slug]}">View related project</button>
    <details><summary>Technologies used</summary><div class="stack-map__block">
      <p class="stack-map__label">Tools and methods</p>
      <dl class="stack-map">${specialization.groups.map((group) => `<div><dt>${escapeHtml(group.label)}</dt><dd><ul class="stack-tools">${group.tools.map(renderTechChip).join('')}</ul></dd></div>`).join('')}</dl>
    </div></details>
  </article>`).join('\n');
}

function renderTechMarquee() {
  const technologies = ['Demand forecasting', 'AI automation', 'Client-ready APIs', 'Predictive maintenance', 'RAG pipelines', 'Full-stack delivery'];
  const items = technologies.map((technology) => `<span class="tech-marquee__item">${escapeHtml(technology)}</span>`).join('');
  const accessibleList = technologies.map(escapeHtml).join(', ');
  return `<section class="tech-marquee" aria-label="Technology stack and tools" data-tech-marquee>
    <div class="tech-marquee__header"><span>Selected areas of work</span><span>${technologies.length} practice areas</span></div>
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
  ['<!-- EXPERIENCE_TIMELINE -->', renderExperience()],
  ['<!-- CERTIFICATIONS -->', renderCertifications()],
  ['<!-- SPECIALIZATION_STACKS -->', renderSpecializations()],
  ['<!-- ATLAS_PROJECTS -->', renderAtlas()]
]);
const output = [...replacements].reduce((html, [marker, value]) => html.replace(marker, value), template);
if (output.includes('<!-- PROJECT_')) throw new Error('Static project markers are missing or unresolved.');
await writeFile(indexPath, output);
