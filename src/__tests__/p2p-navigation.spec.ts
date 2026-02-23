import { test, expect } from '@playwright/test'

test('p2p: can navigate between labs', async ({ page }) => {
  await page.goto('/')

  await expect(page.getByRole('heading', { level: 1 })).toContainText('Next Jam')

  await page.getByRole('link', { name: 'Lab 2' }).click()
  await expect(page).toHaveURL(/\/lab-2$/)
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Lab 2')

  await page.getByRole('link', { name: 'Lab 3' }).click()
  await expect(page).toHaveURL(/\/lab-3$/)
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Lab 3')
})