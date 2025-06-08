import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

// Page Objects
const searchPO = 'form[role="search"], form:has(input[type="search"]), form:has(input[name*="search"])';
// more should be added here ...

test('movies page with search and results', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle("MorphosesFrontendNikosmargaris");

  const h1 = page.locator('h1');
  await expect(h1).toBeVisible();
  await expect(h1).toHaveText('Movies');
  await expect(h1).toHaveCount(1);

  const searchForm = page.locator(searchPO);
  await expect(searchForm).toBeVisible();

  let h2 = page.locator('h2', { hasText: 'Search for a Movie' });
  expect(h2).toBeVisible();
  h2 = page.locator('h2', { hasText: 'Playing now' });
  expect(h2).toBeVisible();

  const articlesList = await page.locator('article').all();
  expect(articlesList.length).toBeGreaterThan(1);
});

test('should not have any automatically detectable WCAG A or AA violations', async ({ page }) => {
  await page.goto('/');

  const accessibilityScanResults = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
    .analyze();

  expect(accessibilityScanResults.violations).toEqual([]);
});
