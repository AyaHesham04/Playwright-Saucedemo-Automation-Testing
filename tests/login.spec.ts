import { test, expect } from '../fixtures/testFixtures';

test('User can login successfully', async ({ page, loginPage }) => {
    await loginPage.navigate();

    await loginPage.login(
        process.env.SAUCE_USERNAME!,
        process.env.SAUCE_PASSWORD!
    );

    await expect(page).toHaveURL(/inventory/);
});

test('User remains logged in after refreshing the page', async ({
    page,
    loginPage
}) => {
    await loginPage.navigate();

    await loginPage.login(
        process.env.SAUCE_USERNAME!,
        process.env.SAUCE_PASSWORD!
    );

    await expect(page).toHaveURL(/inventory/);

    await page.reload();

    await expect(page).toHaveURL(/inventory/);
    await expect(page.locator('.title')).toHaveText('Products');
});