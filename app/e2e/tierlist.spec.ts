import { test, expect } from '@playwright/test';

test('keeps a new item after a reload', async ({ page }) => {
  await page.goto('/');

  await page.getByRole('button', { name: 'Neue Tierliste' }).click();
  const tierlistDialog = page.getByRole('dialog', { name: 'Neue Tierliste' });
  await tierlistDialog.getByPlaceholder('Name der Tierliste eingeben...').fill('Lieblingsdesserts');
  await tierlistDialog.getByRole('button', { name: 'Erstellen' }).click();

  await expect(page.getByRole('heading', { name: 'Lieblingsdesserts' })).toBeVisible();
  await page.getByRole('button', { name: 'Neues Item hinzufügen' }).click();

  const itemDialog = page.getByRole('dialog', { name: 'Neues Item' });
  await itemDialog.getByPlaceholder('Name des Items eingeben...').fill('Kuchen');
  await itemDialog.getByRole('button', { name: 'Erstellen' }).click();
  await expect(page.getByText('Kuchen', { exact: true })).toBeVisible();

  await page.reload();
  await expect(page.getByText('Kuchen', { exact: true })).toBeVisible();
});
