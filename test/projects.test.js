import assert from 'node:assert/strict';
import test from 'node:test';
import { readFile } from 'node:fs/promises';
import { publicProfile } from '../src/data/portfolio-profile.js';
import { excludedProjectNames, projects } from '../src/data/projects.js';

const externalUrls = (project) => [project.github, project.live].filter(Boolean);

test('keeps the canonical 7 / 7 / 5 project inventory', () => {
  assert.equal(projects.length, 19);
  assert.equal(projects.filter(({ tier }) => tier === 'featured').length, 7);
  assert.equal(projects.filter(({ tier }) => tier === 'selected').length, 7);
  assert.equal(projects.filter(({ tier }) => tier === 'lab').length, 5);
  assert.deepEqual(projects.slice(0, 7).map(({ title }) => title), ['CodeScope MCP Preflight', 'CareVision', 'SentinelIQ', 'TopoLite-KD', 'AdaptIQ / ForecastAI', 'VITAL-LINK', 'Evershine Academy LMS']);
  assert.deepEqual(projects.filter(({ primaryFeature }) => primaryFeature).map(({ slug }) => slug), ['codescope', 'carevision', 'sentineliq', 'adaptiq', 'evershine']);
  assert.deepEqual(projects.filter(({ workflow }) => workflow).map(({ slug }) => slug), ['ai-lead-generation', 'ai-restaurant-chatbot']);
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
  assert.match(renderer, /project\.github/);
  assert.doesNotMatch(renderer, /github\.com[^\n]*project\.slug/);
  assert.match(renderer, /project\.showSourceLink/);
});

test('renders the complete atlas and descriptive project media text', async () => {
  const renderer = await readFile(new URL('../scripts/render-static.mjs', import.meta.url), 'utf8');
  const linkChecker = await readFile(new URL('../scripts/check-links.mjs', import.meta.url), 'utf8');
  assert.match(renderer, /project-grid--lab/);
  assert.match(renderer, /LABS &amp; EXERCISES — CLEARLY SEPARATED/);
  assert.doesNotMatch(renderer, /Scope note/);
  assert.match(renderer, /function imageAlt\(project\)/);
  assert.match(renderer, /function renderSpecializations\(\)/);
  assert.doesNotMatch(linkChecker, /publicProjects/);
});

test('renders the curated technology stack in an accessible left-to-right marquee', async () => {
  const renderer = await readFile(new URL('../scripts/render-static.mjs', import.meta.url), 'utf8');
  const template = await readFile(new URL('../index.template.html', import.meta.url), 'utf8');
  const components = await readFile(new URL('../src/styles/components.css', import.meta.url), 'utf8');
  const motion = await readFile(new URL('../src/styles/motion.css', import.meta.url), 'utf8');
  assert.match(template, /aria-label="Technology stack and tools"/);
  assert.match(template, /class="tech-marquee__track"/);
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
  assert.match(template, /THE PROBLEM/);
  assert.match(template, /THE PLAN/);
  assert.match(template, /HOW IT WAS SOLVED/);
  assert.match(module, /private client project and its implementation details are confidential/);
  assert.match(module, /projectPlan\(project\)/);
});
