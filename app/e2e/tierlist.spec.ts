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

test('keeps a new item after a reload', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Neue Tierliste' }).click();
  const tierlistDialog = page.getByRole('dialog', { name: 'Neue Tierliste' });
  await tierlistDialog.getByPlaceholder('Name der Tierliste eingeben...').fill('Lieblingsdesserts');
  await tierlistDialog.getByRole('button', { name: 'Erstellen' }).click();

  await expect(page.getByRole('heading', { name: 'Lieblingsdesserts' })).toBeVisible();
  await page.getByRole('button', { name: 'Neues Item hinzufügen' }).click();
  const itemDialog = page.getByRole('dialog', { name: 'Neues Item' });
  const nameInput = itemDialog.getByPlaceholder('Name des Items eingeben...');
  await expect(nameInput).toBeFocused();
  await expect(itemDialog.getByRole('button', { name: 'Erstellen' })).toBeDisabled();
  await nameInput.fill('Kuchen');
  await itemDialog.getByRole('button', { name: 'Erstellen' }).click();
  await expect(page.getByText('Kuchen', { exact: true })).toBeVisible();

  await page.reload();
  await expect(page.getByText('Kuchen', { exact: true })).toBeVisible();
});

test('creates an image item and keeps the image after reload', async ({ page }) => {
  await page.goto('/editor');
  await page.getByRole('button', { name: 'Neues Item hinzufügen' }).click();
  const dialog = page.getByRole('dialog', { name: 'Neues Item' });
  await dialog.getByPlaceholder('Name des Items eingeben...').fill('Bild');
  await dialog.locator('input[type=file]').setInputFiles({
    name: 'pixel.png',
    mimeType: 'image/png',
    buffer: Buffer.from(
      'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+jRZkAAAAASUVORK5CYII=',
      'base64',
    ),
  });
  await expect(dialog.getByText('pixel.png', { exact: true })).toBeVisible();
  await dialog.getByRole('button', { name: 'Erstellen' }).click();
  const tile = page.locator('.item-tile');
  await expect(tile).toHaveCSS('background-image', /data:image\/png;base64/);
  await page.reload();
  await expect(tile).toHaveCSS('background-image', /data:image\/png;base64/);
  await expect(page.getByText('Bild', { exact: true })).toBeVisible();
});

test('cancels item creation with Escape and clears the form', async ({ page }) => {
  await page.goto('/editor');
  const addButton = page.getByRole('button', { name: 'Neues Item hinzufügen' });
  await addButton.click();
  const dialog = page.getByRole('dialog', { name: 'Neues Item' });
  const input = dialog.getByPlaceholder('Name des Items eingeben...');
  await input.fill('Verwerfen');
  await input.press('Escape');
  await expect(dialog).not.toBeVisible();
  await expect(page.locator('.item-tile')).toHaveCount(0);
  await addButton.click();
  await expect(input).toHaveValue('');
});
