import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('renders the complete public project inventory and safe private-client action', async ({ page }) => {
  const errors = [];
  page.on('console', (message) => { if (message.type() === 'error') errors.push(message.text()); });
  await page.goto('/');
  await expect(page.locator('[data-project-card]')).toHaveCount(17);
  await expect(page.locator('[data-project-card][data-tier="lab"]')).toHaveCount(5);
  await expect(page.getByText('LABS & TOOLS — FOCUSED TECHNICAL EXERCISES')).toHaveCount(1);
  await expect(page.getByRole('link', { name: 'Project Atlas' })).toHaveCount(1);
  await expect(page.locator('.hero-visual--portrait img')).toHaveAttribute('src', '/assets/profile/ibadat-profile.webp');
  await expect(page.locator('.hero-visual--portrait img')).toHaveAttribute('alt', /Portrait of Ibadat Ali/);
  await expect(page.locator('[data-tech-marquee]')).toBeVisible();
  await expect(page.locator('.tech-marquee__group').first().locator('.tech-marquee__item')).toHaveCount(79);
  await expect(page.locator('[data-tech-marquee]')).toContainText('Technologies and tools used across this portfolio: Python, MCP, Tree-sitter');
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(await page.evaluate(() => document.documentElement.clientWidth));
  await expect(page.locator('#interview')).toHaveCount(0);
  await expect(page.locator('.project-card--evershine [data-link-type="live"]')).toHaveText(/visit live website/i);
  await expect(page.locator('.project-card--evershine [data-link-type="source"]')).toHaveCount(0);
  await expect(page.locator('.contact-method[href="mailto:ibadcodes@gmail.com"]')).toHaveCount(1);
  await expect(page.locator('.contact-method[href="https://wa.me/923220692321"]')).toHaveCount(0);
  await expect(page.locator('[data-project-card] img[alt]:not([alt=""])')).toHaveCount(17);
  const unsafeExternalLinks = await page.locator('a[target="_blank"]').evaluateAll((links) => links.filter((link) => !link.relList.contains('noopener') || !link.relList.contains('noreferrer')).map((link) => link.href));
  expect(unsafeExternalLinks).toEqual([]);
  expect(errors).toEqual([]);
});

test('supports skip navigation, filter states, mobile keyboard menu, and reduced motion', async ({ page }) => {
  await page.goto('/');
  await page.keyboard.press('Tab');
  await expect(page.locator('.skip-link')).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('main')).toBeFocused();
  const filter = page.getByRole('button', { name: 'Analytics & BI' });
  await filter.click();
  await expect(filter).toHaveAttribute('aria-pressed', 'true');
  await page.getByRole('button', { name: 'Full-Stack & Client Platforms' }).click();
  await expect(page.locator('.atlas-group--labs')).toBeHidden();
  await page.getByRole('button', { name: 'All work' }).click();
  await expect(page.locator('.atlas-group--labs')).toBeVisible();
  await page.setViewportSize({ width: 375, height: 740 });
  const menu = page.getByRole('button', { name: 'Toggle navigation' });
  await menu.click();
  await expect(menu).toHaveAttribute('aria-expanded', 'true');
  await page.keyboard.press('Escape');
  await expect(menu).toHaveAttribute('aria-expanded', 'false');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.reload();
  await expect(page.locator('[data-project-card]').first()).toBeVisible();
  await expect(page.locator('[data-scroll-progress]')).toBeHidden();
  await expect(page.locator('.tech-marquee__track')).toHaveCSS('animation-name', 'none');
});

test('has no critical automated accessibility violations', async ({ page }) => {
  await page.goto('/');
  const report = await new AxeBuilder({ page }).disableRules(['color-contrast']).analyze();
  expect(report.violations).toEqual([]);
});

test('provides a responsive, keyboard-safe portfolio assistant with grounded starter questions', async ({ page }) => {
  let requestBody;
  await page.route('**/api/chat', async (route) => {
    requestBody = route.request().postDataJSON();
    await new Promise((resolve) => setTimeout(resolve, 350));
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ success: true, data: { message: 'Ibadat builds end-to-end AI systems across data, models, APIs, interfaces, deployment, and monitoring.', model: 'meta/llama-3.1-8b-instruct' }, error: null })
    });
  });

  await page.goto('/');
  const launcher = page.getByRole('button', { name: /ask ia portfolio assistant/i });
  await expect(launcher).toBeVisible();
  await launcher.click();
  await expect(launcher).toHaveAttribute('aria-expanded', 'true');
  await expect(page.getByRole('heading', { name: 'ASK ABOUT IBADAT.' })).toBeVisible();
  await expect(page.locator('[data-assistant-suggestions] button')).toHaveCount(4);
  await expect(page.locator('[data-assistant-input]')).toBeFocused();

  await page.getByRole('button', { name: 'Why should a client work with Ibadat?' }).click();
  await expect(page.locator('.assistant-message--user')).toContainText('Why should a client work with Ibadat?');
  await expect(page.locator('[data-assistant-loading]')).toBeVisible();
  await expect(page.locator('.assistant-message--assistant').last()).toContainText('end-to-end AI systems');
  await expect(page.locator('[data-assistant-loading]')).toHaveCount(0);
  expect(requestBody.messages.at(-1)).toEqual({ role: 'user', content: 'Why should a client work with Ibadat?' });

  const report = await new AxeBuilder({ page }).disableRules(['color-contrast']).analyze();
  expect(report.violations).toEqual([]);
  await page.keyboard.press('Escape');
  await expect(launcher).toHaveAttribute('aria-expanded', 'false');
  await expect(launcher).toBeFocused();

  await page.setViewportSize({ width: 360, height: 720 });
  await launcher.click();
  const panelBox = await page.locator('[data-assistant-panel]').boundingBox();
  expect(panelBox.x).toBeGreaterThanOrEqual(0);
  expect(panelBox.x + panelBox.width).toBeLessThanOrEqual(360);
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(await page.evaluate(() => document.documentElement.clientWidth));
});
