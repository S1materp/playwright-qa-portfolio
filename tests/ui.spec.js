const { test, expect } = require('@playwright/test');

test.describe('Parent Learning Demo — UI', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('TC-UI-01 successful login', async ({ page }) => {
    await page.locator('#email').fill('parent@example.com');
    await page.locator('#password').fill('secret1');
    await page.getByRole('button', { name: 'Войти' }).click();
    await expect(page.getByRole('status').first()).toHaveText('Вход выполнен');
  });

  test('TC-UI-02 invalid email', async ({ page }) => {
    await page.locator('#email').fill('wrong-email');
    await page.locator('#password').fill('secret1');
    await page.getByRole('button', { name: 'Войти' }).click();
    await expect(page.locator('#login-message')).toContainText('корректный email');
  });

  test('TC-UI-03 password boundary: five characters rejected', async ({ page }) => {
    await page.locator('#email').fill('parent@example.com');
    await page.locator('#password').fill('12345');
    await page.getByRole('button', { name: 'Войти' }).click();
    await expect(page.locator('#login-message')).toContainText('минимум 6');
  });

  test('TC-UI-04 courses rendered', async ({ page }) => {
    await page.getByRole('button', { name: 'Загрузить курсы' }).click();
    const items = page.locator('#course-list li');
    await expect(items).toHaveCount(2);
    await expect(items.first()).toContainText('Математика');
  });

  test('TC-UI-05 XPath locator', async ({ page }) => {
    await expect(page.locator('//button[@id="load-courses"]')).toBeVisible();
  });

  test('TC-UI-06 feedback flow', async ({ page }) => {
    await page.locator('#feedback').fill('Очень полезный курс');
    await page.locator('#send-feedback').click();
    await expect(page.locator('#feedback-message')).toHaveText('Спасибо за обратную связь');
  });

  test('TC-UI-07 password boundary: six characters accepted', async ({ page }) => {
    await page.locator('#email').fill('parent@example.com');
    await page.locator('#password').fill('123456');
    await page.getByRole('button', { name: 'Войти' }).click();
    await expect(page.locator('#login-message')).toHaveText('Вход выполнен');
  });

  test('TC-UI-08 blank feedback displays validation error', async ({ page }) => {
    await page.locator('#feedback').fill('  ');
    await page.locator('#send-feedback').click();
    await expect(page.locator('#feedback-message')).toHaveText('Message is too short');
  });

  test('TC-UI-09 feedback boundary: three characters accepted', async ({ page }) => {
    await page.locator('#feedback').fill('abc');
    await page.locator('#send-feedback').click();
    await expect(page.locator('#feedback-message')).toHaveText('Спасибо за обратную связь');
  });
});
