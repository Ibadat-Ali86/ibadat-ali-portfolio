import assert from 'node:assert/strict';
import test from 'node:test';
import { readFile } from 'node:fs/promises';
import { publicProfile } from '../src/data/portfolio-profile.js';
import { excludedProjectNames, professionalProjectSlugs, projects, secondaryProjectGroups, secondaryProjectSlugs, showcaseProjectSlugs } from '../src/data/projects.js';

const externalUrls = (project) => [project.github, project.live].filter(Boolean);

test('keeps the canonical 8 / 7 / 5 project inventory', () => {
  assert.equal(projects.length, 20);
  assert.equal(projects.filter(({ tier }) => tier === 'featured').length, 8);
  assert.equal(projects.filter(({ tier }) => tier === 'selected').length, 7);
  assert.equal(projects.filter(({ tier }) => tier === 'lab').length, 5);
  assert.deepEqual(projects.slice(0, 8).map(({ title }) => title), ['WhatsApp Transaction Verification AI Agent', 'CodeScope MCP Preflight', 'CareVision', 'SentinelIQ', 'TopoLite-KD', 'AdaptIQ / ForecastAI', 'VITAL-LINK', 'Evershine Academy LMS']);
  assert.deepEqual(projects.filter(({ primaryFeature }) => primaryFeature).map(({ slug }) => slug), ['payguard-ai', 'adaptiq', 'evershine', 'ai-lead-generation']);
  assert.deepEqual(projects.filter(({ workflow }) => workflow).map(({ slug }) => slug), ['ai-lead-generation', 'ai-restaurant-chatbot']);
});

test('keeps a focused public portfolio plus a complete professional secondary set', () => {
  assert.deepEqual(showcaseProjectSlugs, ['payguard-ai', 'evershine', 'adaptiq', 'sentineliq', 'carevision', 'ai-lead-generation', 'codescope']);
  assert.equal(secondaryProjectGroups.length, 2);
  assert.deepEqual(secondaryProjectSlugs, ['ai-restaurant-chatbot', 'resume-builder', 'learning-dashboard', 'covid-analytics', 'topolite', 'vital-link', 'pakistan-ecommerce', 'vendor-analysis']);
  assert.equal(professionalProjectSlugs.length, 15);
  assert.equal(projects.filter(({ slug, tier }) => professionalProjectSlugs.includes(slug) && tier === 'lab').length, 0);
});

test('keeps a complete, role-ready professional stack map without conflating proof and industry tools', () => {
  const specializations = publicProfile.specializations;
  assert.deepEqual(specializations.map(({ slug }) => slug), ['data-analysis', 'data-science', 'ml-engineering', 'ai-products']);
  specializations.forEach(({ title, description, groups, industryGroups }) => {
    assert.ok(title && description);
    assert.equal(groups.length, 4);
    groups.forEach(({ label, tools }) => {
      assert.ok(label);
      assert.ok(Array.isArray(tools) && tools.length >= 2);
    });
    assert.ok(industryGroups.length >= 4);
    industryGroups.forEach(({ label, tools }) => {
      assert.ok(label);
      assert.ok(Array.isArray(tools) && tools.length >= 3);
    });
  });
  assert.deepEqual(specializations[0].industryGroups[0].tools.slice(0, 4), ['Power BI', 'Tableau', 'Looker', 'Looker Studio']);
  assert.ok(specializations[3].industryGroups.flatMap(({ tools }) => tools).includes('Google Vertex AI'));
});

test('has unique slugs and required render fields', () => {
  assert.equal(new Set(projects.map(({ slug }) => slug)).size, projects.length);
  projects.forEach((project) => {
    ['slug', 'title', 'tier', 'category', 'status', 'hook', 'metric', 'problem', 'solution', 'image', 'sourceAccess'].forEach((field) => assert.ok(project[field], `${project.slug} needs ${field}`));
    assert.ok(Array.isArray(project.stack) && project.stack.length > 0, `${project.slug} needs a stack`);
  });
});

test('uses valid external project URLs and exact Evershine live URL', () => {
  projects.forEach((project) => externalUrls(project).forEach((href) => assert.equal(new URL(href).protocol, 'https:')));
  const evershine = projects.find(({ slug }) => slug === 'evershine');
  assert.equal(evershine.github, null);
  assert.equal(evershine.sourceAccess, 'private');
  assert.equal(evershine.showSourceLink, false);
  assert.equal(evershine.live, 'https://evershineacadmey.com/');
});

test('keeps workflow proof grounded and source-free', () => {
  projects.filter(({ workflow }) => workflow).forEach((project) => {
    assert.equal(project.github, null);
    assert.equal(project.live, null);
    assert.equal(project.showSourceLink, false);
    assert.match(project.image, /^\/assets\/workflows\//);
    assert.match(project.editorialSafeguard, /no .*claims are made/i);
  });
});

test('keeps payment-agent evidence explicit and privacy-safe', () => {
  const payguard = projects.find(({ slug }) => slug === 'payguard-ai');
  assert.ok(payguard);
  assert.equal(payguard.github, 'https://github.com/Ibadat-Ali86/whatsapp-transaction-ai-agent');
  assert.match(payguard.image, /payguard-ai-thumbnail\.png$/);
  assert.match(payguard.evidence.summary, /100 Node\.js tests and 153 Python tests/);
  assert.ok(payguard.evidence.links.some(({ href }) => href.endsWith('docs/SECURITY.md')));
  assert.ok(payguard.evidence.links.some(({ href }) => href.endsWith('payguard-digitalocean-proof.png')));
  assert.doesNotMatch(JSON.stringify(payguard), /(?:sk_live|sk_test|api[_ -]?key|secret[_ -]?key|password\s*[:=]|token\s*[:=])/i);
});

test('excludes collection-only repositories and retains one canonical forecast card', () => {
  assert.equal(projects.some(({ title }) => excludedProjectNames.includes(title)), false);
  assert.equal(projects.filter(({ canonicalWalmart }) => canonicalWalmart).length, 1);
  assert.equal(projects.find(({ canonicalWalmart }) => canonicalWalmart).slug, 'adaptiq');
});

test('omits prohibited metric and healthcare overclaims from public project copy', () => {
  const publicCopy = projects.map(({ title, hook, problem, solution }) => `${title} ${hook} ${problem} ${solution}`).join(' ').toLowerCase();
  ['98.77% accuracy', 'r²', 'diagnosis', 'treatment', 'clinically validated', 'clinical deployment'].forEach((claim) => assert.equal(publicCopy.includes(claim), false, `Prohibited claim found: ${claim}`));
});

test('renderer uses explicit links and never derives a source URL from a slug', async () => {
  const renderer = await readFile(new URL('../scripts/render-static.mjs', import.meta.url), 'utf8');
  const module = await readFile(new URL('../src/modules/project-modal.js', import.meta.url), 'utf8');
  assert.match(module, /project\.github/);
  assert.doesNotMatch(renderer, /github\.com[^\n]*project\.slug/);
  assert.match(module, /project\.showSourceLink/);
});

test('renders one complete five-project-row catalog with descriptive media and detail controls', async () => {
  const renderer = await readFile(new URL('../scripts/render-static.mjs', import.meta.url), 'utf8');
  const template = await readFile(new URL('../index.template.html', import.meta.url), 'utf8');
  const linkChecker = await readFile(new URL('../scripts/check-links.mjs', import.meta.url), 'utf8');
  assert.match(renderer, /project-catalog/);
  assert.match(renderer, /projectCatalogCard/);
  assert.match(renderer, /showcaseProjectSlugs/);
  assert.match(renderer, /const start = rowIndex \* 5/);
  assert.match(renderer, /data-project-open=/);
  assert.match(renderer, /catalog-card__result/);
  assert.doesNotMatch(renderer, /function renderSecondaryWork\(\)/);
  assert.doesNotMatch(renderer, /project-grid--lab/);
  assert.doesNotMatch(renderer, /Scope note/);
  assert.match(renderer, /function imageAlt\(project\)/);
  assert.match(renderer, /function renderSpecializations\(\)/);
  assert.equal((template.match(/data-atlas-projects/g) ?? []).length, 1);
  assert.doesNotMatch(template, /FEATURED_PROJECTS|SECONDARY_PROJECTS|id="other-work"|id="research"/);
  assert.match(template, /Proof you can inspect\./);
  assert.match(template, /focused 30-minute conversation about the problem, constraints, and fit/);
  assert.match(template, /data-copy-email="ibadcodes@gmail\.com"/);
  assert.match(template, /data-copy-status role="status" aria-live="polite"/);
  assert.match(await readFile(new URL('../src/modules/contact-form.js', import.meta.url), 'utf8'), /Email address copied to the clipboard/);
  assert.doesNotMatch(template, /What Clients Say|cut our manual process from 4 hours/);
  assert.doesNotMatch(linkChecker, /publicProjects/);
});

test('applies the requested dark-and-amber brand system and readable theme metadata', async () => {
  const tokens = await readFile(new URL('../src/styles/tokens.css', import.meta.url), 'utf8');
  const template = await readFile(new URL('../index.template.html', import.meta.url), 'utf8');
  assert.match(tokens, /--color-base: #07080D/);
  assert.match(tokens, /--color-accent: #F5A623/);
  assert.match(tokens, /--color-success: #00C896/);
  assert.match(template, /name="theme-color" content="#07080D"/);
  assert.match(template, /family=Syne:wght@600;700;800/);
  assert.match(template, /family=DM\+Sans:wght@400;500;600/);
});

test('animates portfolio metrics only when visible and keeps static accessible values', async () => {
  const template = await readFile(new URL('../index.template.html', import.meta.url), 'utf8');
  const module = await readFile(new URL('../src/modules/metric-counters.js', import.meta.url), 'utf8');
  const main = await readFile(new URL('../src/main.js', import.meta.url), 'utf8');
  assert.equal((template.match(/data-count-up="\d+"/g) ?? []).length, 4);
  assert.equal((template.match(/class="sr-only">0[347] /g) ?? []).length, 3);
  assert.match(module, /prefersReducedMotion\(\)/);
  assert.match(module, /IntersectionObserver/);
  assert.match(module, /requestAnimationFrame/);
  assert.match(main, /initMetricCounters\(\)/);
});

test('renders the curated technology stack in an accessible left-to-right marquee', async () => {
  const renderer = await readFile(new URL('../scripts/render-static.mjs', import.meta.url), 'utf8');
  const template = await readFile(new URL('../index.template.html', import.meta.url), 'utf8');
  const components = await readFile(new URL('../src/styles/components.css', import.meta.url), 'utf8');
  const motion = await readFile(new URL('../src/styles/motion.css', import.meta.url), 'utf8');
  assert.match(template, /TECH_STACK_MARQUEE/);
  assert.match(renderer, /aria-label="Technology stack and tools"/);
  assert.match(renderer, /function renderTechMarquee\(\)/);
  assert.match(components, /\.tech-marquee__track \{ display: flex; width: max-content; animation: marquee 34s linear infinite;(?: will-change: transform;)? \}/);
  assert.match(motion, /@keyframes marquee/);
});

test('renders a reusable privacy-safe case-study modal entry point', async () => {
  const renderer = await readFile(new URL('../scripts/render-static.mjs', import.meta.url), 'utf8');
  const template = await readFile(new URL('../index.template.html', import.meta.url), 'utf8');
  const module = await readFile(new URL('../src/modules/project-modal.js', import.meta.url), 'utf8');
  assert.match(renderer, /data-project-open/);
  assert.match(template, /data-project-modal/);
  assert.match(template, />Problem</);
  assert.match(template, />Plan</);
  assert.match(template, />Solution</);
  assert.match(module, /private client project and its implementation details are confidential/);
  assert.match(module, /projectPlan\(project\)/);
});
