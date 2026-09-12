import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('renders the human-first portfolio and complete project inventory', async ({ page }) => {
  const errors = [];
  page.on('console', (message) => { if (message.type() === 'error') errors.push(message.text()); });

  await page.goto('/');
  await expect(page).toHaveTitle('Ibadat Ali — Data Scientist & AI Systems Builder');
  await expect(page.getByRole('heading', { name: 'Turning data into useful software.' })).toBeVisible();
  await expect(page.getByText('I build forecasting applications, AI automations, and business platforms')).toBeVisible();
  await expect(page.locator('[data-project-card]')).toHaveCount(19);
  await expect(page.locator('.project-grid--featured [data-project-card]')).toHaveCount(3);
  await expect(page.locator('[data-project-card][data-tier="selected"]')).toHaveCount(7);
  await expect(page.locator('[data-project-card][data-tier="lab"]')).toHaveCount(5);
  await expect(page.getByRole('heading', { name: 'See what I’ve built.' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'More to explore.' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'EXPERIMENTS & ANALYSIS' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'AI-Powered Lead Generation Workflow' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'AI-Powered WhatsApp Restaurant Chatbot' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Evershine Academy LMS' })).toBeVisible();
  await expect(page.locator('.project-card--evershine [data-link-type="live"]')).toHaveText(/visit live website/i);
  await expect(page.locator('.project-card--evershine [data-link-type="source"]')).toHaveCount(0);
  for (const slug of ['sentineliq', 'topolite', 'adaptiq', 'ai-lead-generation', 'ai-restaurant-chatbot', 'netflix']) {
    await expect(page.locator(`.project-card--${slug} .client-label`)).toHaveText('CLIENT PROJECT');
  }
  await expect(page.locator('.social-link[href*="instagram.com"]')).toHaveCount(1);
  await expect(page.locator('.social-link[href*="tiktok.com"]')).toHaveCount(1);
  await expect(page.locator('#creator h2')).toHaveText('Sharing what I learn and build.');
  await expect(page.locator('.project-card--ai-lead-generation [data-link-type="source"]')).toHaveCount(0);
  await expect(page.locator('.project-card--ai-restaurant-chatbot [data-link-type="source"]')).toHaveCount(0);
  await expect(page.locator('[data-copy-email="ibadcodes@gmail.com"]')).toHaveCount(1);
  await expect(page.locator('a[href="/Ibadat_Ali_Resume.pdf"]')).toHaveCount(3);
  await expect(page.locator('[data-project-card] img[alt]:not([alt=""])')).toHaveCount(19);
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

test('supports skip navigation, project filters, details, and mobile navigation', async ({ page }) => {
  await page.goto('/');

  await page.keyboard.press('Tab');
  await expect(page.locator('.skip-link')).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('main')).toBeFocused();

  const filter = page.locator('[data-filter="Analytics & BI"]');
  await filter.click();
  await expect(filter).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('[data-atlas-projects] [data-project-card]:not([hidden])')).toHaveCount(3);
  await page.locator('[data-filter="all"]').evaluate((button) => button.click());
  await expect(page.locator('[data-atlas-projects] [data-project-card]:not([hidden])')).toHaveCount(16);

  const toolkit = page.locator('details').first();
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
  await page.goto('/');

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

test('supports reduced motion and remains accessible', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await expect(page.locator('.tech-marquee__track')).toHaveCSS('animation-name', 'none');
  await expect(page.locator('[data-scroll-progress]')).toBeHidden();

  const report = await new AxeBuilder({ page }).analyze();
  expect(report.violations).toEqual([]);
});

test('keeps anchored lower sections visible on direct navigation', async ({ page }) => {
  await page.goto('/#contact');
  await expect(page.locator('#expertise')).toBeVisible();
  await expect(page.locator('#research')).toBeVisible();
  await expect(page.locator('#about')).toBeVisible();
  await expect(page.locator('#contact')).toBeVisible();
  await expect(page.locator('#expertise h2')).toBeVisible();
  await expect(page.locator('#research-title')).toBeVisible();
  await expect(page.locator('#about-title')).toBeVisible();
  await expect(page.locator('#contact-title')).toBeVisible();
});

test('keeps content and thumbnails readable across mobile and desktop widths', async ({ page }) => {
  await page.goto('/');
  for (const width of [375, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const selector of ['#top', '#featured', '#expertise', '#research', '#about', '#atlas', '#creator', '#contact']) {
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
  await page.goto('/');
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
  await page.goto('/');
  await expect(page.locator('[data-project-card]')).toHaveCount(19);
  for (const selector of ['#expertise h2', '#research h2', '#about h2', '#contact h2']) {
    await expect(page.locator(selector)).toBeVisible();
  }
  await context.close();
});
