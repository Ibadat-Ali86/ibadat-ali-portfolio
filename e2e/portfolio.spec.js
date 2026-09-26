import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('presents a single priority-ordered catalog with only Netflix as a lab', async ({ page }) => {
  const errors = [];
  page.on('console', (message) => { if (message.type() === 'error') errors.push(message.text()); });
  await page.goto('/', { waitUntil: 'domcontentloaded' });

  await expect(page).toHaveTitle('Ibadat Ali — AI Automation & Workflow Engineer');
  await expect(page.getByRole('heading', { name: 'Business problems into working systems.' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'A clear view of the work.' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'My work is done when you no longer need me!' })).toBeVisible();
  const cards = page.locator('[data-project-catalog-card]');
  await expect(cards).toHaveCount(16);
  const order = await cards.evaluateAll((elements) => elements.map((element) => element.dataset.projectSlug));
  expect(order).toEqual([
    'payguard-ai', 'evershine', 'adaptiq', 'sentineliq', 'carevision', 'ai-lead-generation', 'codescope',
    'ai-restaurant-chatbot', 'resume-builder', 'learning-dashboard', 'covid-analytics', 'topolite',
    'vital-link', 'pakistan-ecommerce', 'vendor-analysis', 'netflix'
  ]);
  await expect(page.locator('.project-catalog__grid')).toHaveCount(1);
  const experienceCards = page.locator('[data-experience-card]');
  await expect(experienceCards).toHaveCount(3);
  await expect(experienceCards.nth(0)).toContainText('Independent Data Scientist / AI Consultant');
  await expect(experienceCards.nth(1)).toContainText('ML / AI Engineer');
  const certificateCards = page.locator('[data-certification-card]');
  await expect(certificateCards).toHaveCount(2);
  await expect(certificateCards.nth(0)).toContainText('AI Fluency: Framework & Foundations');
  await expect(certificateCards.nth(0).locator('.certification-card__body a[href$=".pdf"]')).toHaveAttribute('target', '_blank');
  await certificateCards.first().scrollIntoViewIfNeeded();
  const certificateImages = certificateCards.locator('.certification-card__preview img');
  await expect.poll(() => certificateImages.evaluateAll((images) => images.length === 2 && images.every((image) => image.complete && image.naturalWidth > 0))).toBe(true);
  const imageRatios = await certificateImages.evaluateAll((images) => images.map((image) => ({
    natural: image.naturalWidth / image.naturalHeight,
    rendered: image.getBoundingClientRect().width / image.getBoundingClientRect().height,
    objectFit: getComputedStyle(image).objectFit
  })));
  expect(imageRatios.every(({ natural, rendered, objectFit }) => Math.abs(natural - rendered) < 0.02 && objectFit === 'contain')).toBe(true);
  await expect(page.locator('.catalog-group, [data-catalog-group], [data-filter], .filter-bar')).toHaveCount(0);
  for (const hiddenLab of ['mnist', 'spam-classifier', 'employee-form', 'csv-cleaner']) {
    await expect(page.locator(`[data-project-slug="${hiddenLab}"]`)).toHaveCount(0);
  }
  await expect(page.locator('.catalog-card--netflix')).toContainText('Netflix Data Analysis');
  await expect(page.locator('.catalog-card--payguard-ai .status-label')).toHaveText('PRIVATE CLIENT');
  await expect(page.locator('.catalog-card--payguard-ai')).not.toContainText('github.com/whatsapp-transaction-ai-agent');
  await expect(page.locator('.catalog-card--payguard-ai .catalog-card__technologies svg')).toHaveCount(3);

  const avatar = page.locator('.brand__mark img');
  await expect(avatar).toHaveAttribute('src', '/assets/profile/ibadat-profile.webp');
  await expect.poll(() => avatar.evaluate((image) => image.complete && image.naturalWidth > 0)).toBe(true);
  await expect(page.locator('link[rel="icon"]')).toHaveAttribute('href', '/assets/profile/ibadat-profile.webp');
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', 'https://ibadat-ali-portfolio.vercel.app/assets/profile/ibadat-profile.webp');
  await expect(page.locator('meta[name="twitter:image"]')).toHaveAttribute('content', 'https://ibadat-ali-portfolio.vercel.app/assets/profile/ibadat-profile.webp');
  await expect(page.locator('.brand__mark')).toHaveCSS('border-radius', '50%');
  await expect(page.locator('.hero-glow')).toHaveCSS('filter', 'blur(8px)');
  await expect(page.locator('h1')).toHaveCSS('font-family', /Manrope/);

  const unsafeExternalLinks = await page.locator('a[target="_blank"]').evaluateAll((links) => links
    .filter((link) => !link.relList.contains('noopener') || !link.relList.contains('noreferrer'))
    .map((link) => link.href));
  expect(unsafeExternalLinks).toEqual([]);
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(await page.evaluate(() => document.documentElement.clientWidth));
  expect(errors).toEqual([]);
});

test('preserves accessible detail dialogs and marks the client agent private without source links', async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  const modal = page.locator('[data-project-modal]');
  const payguardCard = page.locator('.catalog-card--payguard-ai');
  const opener = payguardCard.locator('[data-project-open]');
  await opener.click();
  await expect(modal).toBeVisible();
  await expect(modal.locator('[data-modal-title]')).toHaveText('WhatsApp Transaction Verification AI Agent');
  await expect(modal.locator('[data-modal-status]')).toHaveText('PRIVATE CLIENT PROJECT');
  await expect(modal.locator('[data-modal-note]')).toContainText('private client project');
  await expect(modal.locator('[data-modal-stack] li')).toHaveCount(10);
  await expect(modal.locator('[data-modal-stack] li:has-text("n8n") svg')).toHaveCount(1);
  await expect(modal.locator('[data-modal-actions] a[href*="github.com"]')).toHaveCount(0);
  await expect(modal.locator('[data-modal-evidence-links] a[href*="github.com"]')).toHaveCount(0);
  await expect(modal.locator('[data-modal-evidence-links] a[href*="payguard-digitalocean-proof.png"]')).toHaveCount(1);
  await expect(modal.locator('[data-modal-problem]')).not.toBeEmpty();
  await expect(modal.locator('[data-modal-solution]')).not.toBeEmpty();
  await page.keyboard.press('Escape');
  await expect(modal).not.toBeVisible();
  await expect(opener).toBeFocused();
  await expect(page.locator('body')).not.toHaveCSS('overflow', 'hidden');

  await page.locator('.catalog-card--codescope [data-project-open]').click();
  await expect(modal.locator('[data-modal-title]')).toHaveText('CodeScope MCP Preflight');
  await expect(modal.locator('[data-modal-stack] li')).toHaveCount(6);
});

test('supports keyboard navigation, contact form behavior, and responsive catalog rows', async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  await page.keyboard.press('Tab');
  await expect(page.locator('.skip-link')).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('main')).toBeFocused();

  const toolkit = page.locator('#expertise details').first();
  await toolkit.locator('summary').click();
  await expect(toolkit).toHaveAttribute('open', '');
  const agentCard = page.locator('.capability-card--ai-products');
  await agentCard.locator('details summary').click();
  const langChain = agentCard.locator('.stack-tools li').filter({ hasText: 'LangChain' });
  await expect(langChain.locator('svg')).toHaveCount(1);
  const experienceCards = page.locator('[data-experience-card]');

  const form = page.locator('[data-contact-form]');
  await form.evaluate((element) => { element.dataset.noNavigate = 'true'; });
  await form.locator('[name="name"]').fill('Test visitor');
  await form.locator('[name="email"]').fill('visitor@example.com');
  await form.locator('[name="engagementType"]').selectOption({ label: 'AI automation workflow (n8n, agents)' });
  await form.locator('[name="timeline"]').selectOption({ label: 'Within 1 month' });
  await form.locator('[name="description"]').fill('We need to replace a manual lead qualification process with a documented workflow.');
  await form.locator('[name="source"]').selectOption({ label: 'LinkedIn' });
  await form.locator('button[type="submit"]').click();
  await expect(form.locator('[data-contact-status]')).toContainText('Opening your email app');

  for (const width of [375, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await expect(page.locator('[data-project-catalog-card]')).toHaveCount(16);
    if (width === 1440) {
      const firstFourRows = await page.locator('[data-project-catalog-card]').evaluateAll((cards) => cards.slice(0, 4).map((card) => Math.round(card.getBoundingClientRect().top)));
      expect(new Set(firstFourRows).size).toBe(1);
      expect(Math.round(await page.locator('[data-project-catalog-card]').nth(4).evaluate((card) => card.getBoundingClientRect().top))).toBeGreaterThan(firstFourRows[0]);
      const experienceRow = await experienceCards.evaluateAll((cards) => cards.map((card) => Math.round(card.getBoundingClientRect().top)));
      expect(new Set(experienceRow).size).toBe(1);
    }
  }
});

test('respects reduced motion and passes accessibility checks', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  await expect(page.locator('.tech-marquee__track')).toHaveCSS('animation-name', 'none');
  await expect(page.locator('[data-scroll-progress]')).toBeHidden();
  const report = await new AxeBuilder({ page }).analyze();
  expect(report.violations).toEqual([]);
});

test('keeps anchored sections visible and static content available without JavaScript', async ({ page, browser }) => {
  await page.goto('/#contact', { waitUntil: 'domcontentloaded' });
  for (const selector of ['#expertise', '#proof', '#about', '#experience', '#contact', '#signature']) await expect(page.locator(selector)).toBeVisible();

  const context = await browser.newContext({ javaScriptEnabled: false });
  const staticPage = await context.newPage();
  await staticPage.goto('/', { waitUntil: 'domcontentloaded' });
  await expect(staticPage.locator('[data-project-catalog-card]')).toHaveCount(16);
  for (const selector of ['#expertise h2', '#proof h2', '#about h2', '#experience h2', '#contact h2', '#signature h2']) await expect(staticPage.locator(selector)).toBeVisible();
  await context.close();
});
