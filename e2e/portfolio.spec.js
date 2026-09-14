import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('renders the focused portfolio and professional project sections', async ({ page }) => {
  const errors = [];
  page.on('console', (message) => { if (message.type() === 'error') errors.push(message.text()); });

  await page.goto('/', { waitUntil: 'domcontentloaded' });
  await expect(page).toHaveTitle('Ibadat Ali — AI Automation & Workflow Engineer');
  await expect(page.getByRole('heading', { name: 'Business problems into working systems.' })).toBeVisible();
  await expect(page.getByText('I build AI-powered workflows that replace manual processes')).toBeVisible();
  await expect(page.locator('[data-project-card]')).toHaveCount(14);
  await expect(page.locator('.project-grid--featured [data-project-card]')).toHaveCount(6);
  await expect(page.locator('.project-grid--secondary [data-project-card]')).toHaveCount(8);
  const secondaryResults = await page.locator('.project-grid--secondary .project-result').allTextContents();
  expect(secondaryResults.every((result) => !result.includes('Scope and delivery details are available'))).toBe(true);
  await expect(page.locator('[data-project-card][data-tier="selected"]')).toHaveCount(7);
  await expect(page.locator('[data-project-card][data-tier="lab"]')).toHaveCount(0);
  await expect(page.getByRole('heading', { name: 'A few systems I’m proud to have built.' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'More systems worth exploring.' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'All professional work.' })).toBeVisible();
  await expect(page.locator('.case-study-index__item')).toHaveCount(14);
  await expect(page.locator('.project-card--ai-lead-generation h3')).toBeVisible();
  await expect(page.locator('.project-card--ai-restaurant-chatbot h3')).toBeVisible();
  await expect(page.locator('.project-card--evershine h3')).toBeVisible();
  await expect(page.locator('.project-card--evershine [data-link-type="live"]')).toHaveText(/visit live website/i);
  await expect(page.locator('.project-card--evershine [data-link-type="source"]')).toHaveCount(0);
  for (const slug of ['sentineliq', 'adaptiq', 'ai-lead-generation']) {
    await expect(page.locator(`.project-card--${slug} .client-label`)).toHaveText('CLIENT PROJECT');
  }
  await expect(page.locator('.social-link[href*="instagram.com"]')).toHaveCount(1);
  await expect(page.locator('.social-link[href*="tiktok.com"]')).toHaveCount(1);
  await expect(page.locator('#creator')).toHaveCount(0);
  await expect(page.locator('#experience .experience-card')).toHaveCount(3);
  await expect(page.locator('#experience .certification-card')).toHaveCount(2);
  await expect(page.locator('#experience .certification-card img')).toHaveCount(2);
  await expect(page.locator('a[href*="expla_inableai"]')).toHaveCount(2);
  await expect(page.locator('.contact-card a[href="https://wa.me/923220692321"]')).toHaveText(/WhatsApp.*\+92 322 0692321/i);
  await expect(page.locator('.project-card--ai-lead-generation [data-link-type="source"]')).toHaveCount(0);
  await expect(page.locator('.project-card--ai-restaurant-chatbot [data-link-type="source"]')).toHaveCount(0);
  await expect(page.locator('[data-copy-email="ibadcodes@gmail.com"]')).toHaveCount(1);
  await expect(page.locator('.metrics-strip')).toHaveCSS('display', 'grid');
  await expect(page.locator('.metrics-strip .metric')).toHaveCount(4);
  await expect(page.locator('.engagement-model ol')).toHaveCSS('display', 'grid');
  await expect(page.locator('.engagement-model li')).toHaveCount(3);
  await expect(page.locator('.contact-form__grid')).toHaveCSS('display', 'grid');
  await expect(page.locator('.contact-form__grid label')).toHaveCount(4);
  await expect(page.locator('a[href="/Ibadat_Ali_Resume.pdf"]')).toHaveCount(3);
  await expect(page.locator('[data-project-card] img[alt]:not([alt=""])')).toHaveCount(14);
  await expect(page.getByText('The five foundational classifier and exercise labs remain preserved in the source archive')).toBeVisible();
  await expect(page.locator('#interview')).toHaveCount(0);
  await expect(page.locator('[data-portfolio-assistant]')).toHaveCount(0);

  const unsafeExternalLinks = await page.locator('a[target="_blank"]').evaluateAll((links) => links
    .filter((link) => !link.relList.contains('noopener') || !link.relList.contains('noreferrer'))
    .map((link) => link.href));
  expect(unsafeExternalLinks).toEqual([]);
  expect(await page.evaluate(() => document.documentElement.scrollWidth))
    .toBe(await page.evaluate(() => document.documentElement.clientWidth));
  expect(errors).toEqual([]);
});

test('supports skip navigation, service details, and mobile navigation', async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' });

  await page.keyboard.press('Tab');
  await expect(page.locator('.skip-link')).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('main')).toBeFocused();

  const toolkit = page.locator('#expertise details').first();
  await expect(toolkit).not.toHaveAttribute('open', '');
  await toolkit.locator('summary').click();
  await expect(toolkit).toHaveAttribute('open', '');

  await page.setViewportSize({ width: 375, height: 740 });
  const menu = page.getByRole('button', { name: 'Toggle navigation' });
  await menu.click();
  await expect(menu).toHaveAttribute('aria-expanded', 'true');
  await page.keyboard.press('Escape');
  await expect(menu).toHaveAttribute('aria-expanded', 'false');
});

test('opens consistent case studies and preserves private-client boundaries', async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' });

  await page.locator('.project-card--codescope [data-project-open]').click();
  const modal = page.locator('[data-project-modal]');
  await expect(modal).toBeVisible();
  await expect(modal.locator('[data-modal-title]')).toHaveText('CodeScope MCP Preflight');
  await expect(modal.locator('[data-modal-problem]')).not.toBeEmpty();
  await expect(modal.locator('[data-modal-plan]')).not.toBeEmpty();
  await expect(modal.locator('[data-modal-solution]')).not.toBeEmpty();
  await expect(modal.locator('[data-modal-stack] li')).toHaveCount(6);
  await modal.locator('.project-modal__close').click();
  await expect(modal).not.toBeVisible();

  await page.locator('.project-card--evershine [data-project-open]').click();
  await expect(modal.locator('[data-modal-note]')).toHaveText(/private client project/i);
  await expect(modal.locator('[data-modal-actions] a[href*="github.com"]')).toHaveCount(0);
  await modal.locator('.project-modal__close').click();
});

test('builds a structured mailto inquiry without pretending to submit to a server', async ({ page }) => {
  await page.goto('/#contact', { waitUntil: 'domcontentloaded' });
  const form = page.locator('[data-contact-form]');
  await form.evaluate((element) => { element.dataset.noNavigate = 'true'; });
  await form.locator('[name="name"]').fill('Test visitor');
  await form.locator('[name="email"]').fill('visitor@example.com');
  await form.locator('[name="engagementType"]').selectOption({ label: 'AI automation workflow (n8n, agents)' });
  await form.locator('[name="timeline"]').selectOption({ label: 'Within 1 month' });
  await form.locator('[name="description"]').fill('We need to replace a manual lead qualification process with a documented workflow.');
  await form.locator('[name="source"]').selectOption({ label: 'LinkedIn' });
  await form.locator('button[type="submit"]').click();
  await expect(form.locator('[data-contact-status]')).toHaveText(/Opening your email app/i);
});

test('supports reduced motion and remains accessible', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  await expect(page.locator('.tech-marquee__track')).toHaveCSS('animation-name', 'none');
  await expect(page.locator('[data-scroll-progress]')).toBeHidden();

  const report = await new AxeBuilder({ page }).analyze();
  expect(report.violations).toEqual([]);
});

test('keeps anchored lower sections visible on direct navigation', async ({ page }) => {
  await page.goto('/#contact', { waitUntil: 'domcontentloaded' });
  await expect(page.locator('#expertise')).toBeVisible();
  await expect(page.locator('#research')).toBeVisible();
  await expect(page.locator('#about')).toBeVisible();
  await expect(page.locator('#experience')).toBeVisible();
  await expect(page.locator('#contact')).toBeVisible();
  await expect(page.locator('#expertise h2')).toBeVisible();
  await expect(page.locator('#research-title')).toBeVisible();
  await expect(page.locator('#about-title')).toBeVisible();
  await expect(page.locator('#experience-title')).toBeVisible();
  await expect(page.locator('#contact-title')).toBeVisible();
});

test('keeps content and thumbnails readable across mobile and desktop widths', async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  for (const width of [375, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const selector of ['#top', '#featured', '#other-work', '#expertise', '#research', '#about', '#experience', '#atlas', '#contact']) {
      const section = page.locator(selector);
      await section.scrollIntoViewIfNeeded();
      await expect(section).toHaveCSS('opacity', '1');
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    }
    const heading = await page.locator('#featured-title').boundingBox();
    const subtitle = await page.locator('.featured .section-heading > p').boundingBox();
    expect(heading.y + heading.height <= subtitle.y || heading.x + heading.width <= subtitle.x).toBe(true);
  }
  for (const image of await page.locator('[data-project-card] img').all()) {
    await image.scrollIntoViewIfNeeded();
    await expect.poll(() => image.evaluate((element) => element.complete && element.naturalWidth > 0)).toBe(true);
  }
});

test('returns dialog focus to the specific capability or research link', async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  for (const opener of await page.locator('#expertise [data-project-open], #research [data-project-open]').all()) {
    await opener.click();
    await expect(page.locator('[data-project-modal]')).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(opener).toBeFocused();
    await expect(page.locator('body')).not.toHaveCSS('overflow', 'hidden');
  }
});

test('keeps the page content available without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  await expect(page.locator('[data-project-card]')).toHaveCount(14);
  for (const selector of ['#expertise h2', '#research h2', '#about h2', '#experience h2', '#atlas h2', '#contact h2']) {
    await expect(page.locator(selector)).toBeVisible();
  }
  await context.close();
});
