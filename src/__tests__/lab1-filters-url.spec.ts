import { test, expect } from '@playwright/test'

test('lab-1: typing in Search title updates query params', async ({ page }) => {
  await page.goto('/lab-1')

  const input = page.getByPlaceholder('Search title…')
  await input.fill('castle')

  // debounce is 300ms in the component; give it a beat
  await page.waitForTimeout(400)

  await expect(page).toHaveURL(/\/lab-1\?q=castle/i)
})