import assert from 'node:assert/strict';
import test from 'node:test';
import { readFile } from 'node:fs/promises';
import { excludedProjectNames, projects } from '../src/data/projects.js';

const externalUrls = (project) => [project.github, project.live].filter(Boolean);

test('keeps the canonical 7 / 5 / 5 project inventory', () => {
  assert.equal(projects.length, 17);
  assert.equal(projects.filter(({ tier }) => tier === 'featured').length, 7);
  assert.equal(projects.filter(({ tier }) => tier === 'selected').length, 5);
  assert.equal(projects.filter(({ tier }) => tier === 'lab').length, 5);
  assert.deepEqual(projects.slice(0, 7).map(({ title }) => title), ['CodeScope MCP Preflight', 'CareVision', 'SentinelIQ', 'TopoLite-KD', 'AdaptIQ / ForecastAI', 'VITAL-LINK', 'Evershine Academy LMS']);
});

test('has unique slugs and required render fields', () => {
  assert.equal(new Set(projects.map(({ slug }) => slug)).size, projects.length);
  projects.forEach((project) => {
    ['slug', 'title', 'tier', 'category', 'status', 'hook', 'problem', 'solution', 'image', 'sourceAccess'].forEach((field) => assert.ok(project[field], `${project.slug} needs ${field}`));
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

test('excludes collection-only repositories and retains one canonical forecast card', () => {
  assert.equal(projects.some(({ title }) => excludedProjectNames.includes(title)), false);
  assert.equal(projects.filter(({ canonicalWalmart }) => canonicalWalmart).length, 1);
  assert.equal(projects.find(({ canonicalWalmart }) => canonicalWalmart).slug, 'adaptiq');
});

test('omits prohibited metric and healthcare overclaims from public project copy', () => {
  const publicCopy = projects.map(({ title, hook, problem, solution }) => `${title} ${hook} ${problem} ${solution}`).join(' ').toLowerCase();
  ['98.77% accuracy', 'rmse', 'r²', 'diagnosis', 'treatment', 'clinically validated', 'clinical deployment'].forEach((claim) => assert.equal(publicCopy.includes(claim), false, `Prohibited claim found: ${claim}`));
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
  assert.match(renderer, /LABS &amp; TOOLS — FOCUSED TECHNICAL EXERCISES/);
  assert.match(renderer, /function imageAlt\(project\)/);
  assert.doesNotMatch(linkChecker, /publicProjects/);
});

test('renders every project technology in an accessible left-to-right marquee', async () => {
  const renderer = await readFile(new URL('../scripts/render-static.mjs', import.meta.url), 'utf8');
  const sections = await readFile(new URL('../src/styles/sections.css', import.meta.url), 'utf8');
  const motion = await readFile(new URL('../src/styles/motion.css', import.meta.url), 'utf8');
  assert.match(renderer, /new Set\(projects\.flatMap\(\(\{ stack \}\) => stack\)\)/);
  assert.match(renderer, /aria-label="Technology stack and tools"/);
  assert.match(sections, /@keyframes tech-marquee-right[\s\S]*translate3d\(-50%,0,0\)[\s\S]*translate3d\(0,0,0\)/);
  assert.match(motion, /\.tech-marquee__track \{ width:auto; animation:none; transform:none; \}/);
});
