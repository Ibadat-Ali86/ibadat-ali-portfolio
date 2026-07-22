import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('renders the full accessible project inventory and safe private-client action', async ({ page }) => {
  const errors = [];
  page.on('console', (message) => { if (message.type() === 'error') errors.push(message.text()); });
  await page.goto('/');
  await expect(page.locator('[data-project-card]')).toHaveCount(17);
  await expect(page.locator('.project-card--evershine [data-link-type="live"]')).toHaveText(/visit live website/i);
  await expect(page.locator('.project-card--evershine [data-link-type="source"]')).toHaveCount(0);
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
  await page.setViewportSize({ width: 375, height: 740 });
  const menu = page.getByRole('button', { name: 'Toggle navigation' });
  await menu.click();
  await expect(menu).toHaveAttribute('aria-expanded', 'true');
  await page.keyboard.press('Escape');
  await expect(menu).toHaveAttribute('aria-expanded', 'false');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.reload();
  await expect(page.locator('[data-project-card]').first()).toBeVisible();
});

test('has no critical automated accessibility violations', async ({ page }) => {
  await page.goto('/');
  const report = await new AxeBuilder({ page }).disableRules(['color-contrast']).analyze();
  expect(report.violations).toEqual([]);
});
