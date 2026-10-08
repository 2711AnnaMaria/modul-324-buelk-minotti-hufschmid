import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/editor');
});

test('adds a named tier using the plus button', async ({ page }) => {
  await page.getByRole('button', { name: 'Neuen Rang hinzufügen' }).click();
  const dialog = page.getByRole('dialog', { name: 'Neuer Rang' });
  const nameInput = dialog.getByRole('textbox', { name: 'Name des Rangs' });
  const createButton = dialog.getByRole('button', { name: 'Erstellen' });

  await expect(nameInput).toBeFocused();
  await expect(createButton).toBeDisabled();
  await nameInput.fill('   ');
  await expect(createButton).toBeDisabled();

  await nameInput.fill('  Extras  ');
  await createButton.click();

  await expect(dialog).not.toBeVisible();
  await expect(page.locator('.tier-row')).toHaveCount(7);
  await expect(page.locator('.tier-label').last()).toHaveText('Extras');
});

test('cancels tier creation and clears the name when reopening', async ({ page }) => {
  const addButton = page.getByRole('button', { name: 'Neuen Rang hinzufügen' });
  await addButton.click();
  const dialog = page.getByRole('dialog', { name: 'Neuer Rang' });
  await dialog.getByRole('textbox', { name: 'Name des Rangs' }).fill('Extras');
  await dialog.getByRole('button', { name: 'Abbrechen' }).click();

  await expect(dialog).not.toBeVisible();
  await expect(page.locator('.tier-row')).toHaveCount(6);

  await addButton.click();
  await expect(dialog.getByRole('textbox', { name: 'Name des Rangs' })).toHaveValue('');
});
