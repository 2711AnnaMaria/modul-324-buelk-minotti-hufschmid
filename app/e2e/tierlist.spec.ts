import { test, expect } from '@playwright/test';

test('renames a tierlist and keeps the name after reload', async ({ page }) => {
  await page.goto('/');

  await page.getByRole('button', { name: 'Neue Tierliste' }).click();
  const tierlistDialog = page.getByRole('dialog', { name: 'Neue Tierliste' });
  await tierlistDialog.getByPlaceholder('Name der Tierliste eingeben...').fill('Sommerfilme');
  await tierlistDialog.getByRole('button', { name: 'Erstellen' }).click();

  await expect(page.getByRole('heading', { name: 'Sommerfilme' })).toBeVisible();
  await page.getByRole('button', { name: 'Namen bearbeiten' }).click();

  const titleInput = page.getByPlaceholder('Tierlist Name');
  await titleInput.fill('Unsere Favoriten');
  await titleInput.press('Enter');
  await expect(page.getByRole('heading', { name: 'Unsere Favoriten' })).toBeVisible();

  await page.reload();
  await expect(page.getByRole('heading', { name: 'Unsere Favoriten' })).toBeVisible();
});
