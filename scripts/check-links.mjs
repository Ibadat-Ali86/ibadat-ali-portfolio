import { projects } from '../src/data/projects.js';

const uniqueUrls = [...new Set([
  ...projects.flatMap(({ github, live }) => [github, live]),
  'https://www.linkedin.com/in/mirzaibadatali',
  'https://www.tiktok.com/@deepfx6',
  'https://www.instagram.com/expla_inableai',
  'https://www.kaggle.com/ibadatali',
  'https://github.com/Ibadat-Ali86'
].filter(Boolean))];

const results = await Promise.all(uniqueUrls.map(async (url) => {
  try {
    const response = await fetch(url, { method: 'HEAD', redirect: 'follow', signal: AbortSignal.timeout(15000) });
    return { url, status: response.status, ok: response.ok || response.status === 405 };
  } catch (error) {
    return { url, status: 'network error', ok: false, error: error.message };
  }
}));

results.forEach(({ url, status, error }) => console.log(`${status}\t${url}${error ? `\t${error}` : ''}`));
const failures = results.filter(({ ok }) => !ok);
if (failures.length) process.exitCode = 1;
