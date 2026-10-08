import { test, expect } from '@playwright/test';

test('keeps a new item after a reload', async ({ page }) => {
test('renames a tierlist and keeps the name after reload', async ({ page }) => {
  await page.goto('/');

  await page.getByRole('button', { name: 'Neue Tierliste' }).click();
  const tierlistDialog = page.getByRole('dialog', { name: 'Neue Tierliste' });
  await tierlistDialog.getByPlaceholder('Name der Tierliste eingeben...').fill('Sommerfilme');
  await tierlistDialog.getByPlaceholder('Name der Tierliste eingeben...').fill('Lieblingsdesserts');
  await tierlistDialog.getByRole('button', { name: 'Erstellen' }).click();

  await expect(page.getByRole('heading', { name: 'Lieblingsdesserts' })).toBeVisible();
  await page.getByRole('button', { name: 'Neues Item hinzufügen' }).click();
  await expect(page.getByRole('heading', { name: 'Sommerfilme' })).toBeVisible();
  await page.getByRole('button', { name: 'Namen bearbeiten' }).click();

  const itemDialog = page.getByRole('dialog', { name: 'Neues Item' });
  await itemDialog.getByPlaceholder('Name des Items eingeben...').fill('Kuchen');
  await itemDialog.getByRole('button', { name: 'Erstellen' }).click();
  await expect(page.getByText('Kuchen', { exact: true })).toBeVisible();
  const titleInput = page.getByPlaceholder('Tierlist Name');
  await titleInput.fill('Unsere Favoriten');
  await titleInput.press('Enter');
  await expect(page.getByRole('heading', { name: 'Unsere Favoriten' })).toBeVisible();

  await page.reload();
  await expect(page.getByRole('heading', { name: 'Unsere Favoriten' })).toBeVisible();
  await expect(page.getByText('Kuchen', { exact: true })).toBeVisible();
});
