import { test, expect } from '../fixtures/testFixtures';
import {
    runAccessibilityScan,
    logAccessibilityViolations
} from '../utils/accessibility';

test('Login page accessibility scan', async ({ page }) => {
    await page.goto('/');

    const results = await runAccessibilityScan(page);

    logAccessibilityViolations(results.violations);

    expect(results.violations).toEqual([]);
});


test('Products page accessibility scan', async ({
    loginPage,
    productsPage
}) => {
    await loginPage.navigate();

    await loginPage.login(
        process.env.SAUCE_USERNAME!,
        process.env.SAUCE_PASSWORD!
    );

    await expect(productsPage.pageTitle).toHaveText('Products');

    const results = await runAccessibilityScan(productsPage.page);

    logAccessibilityViolations(results.violations);

    expect(results.violations).toEqual([]);
});

test('Cart page accessibility scan', async ({
    loginPage,
    productsPage,
    cartPage
}) => {
    await loginPage.navigate();

    await loginPage.login(
        process.env.SAUCE_USERNAME!,
        process.env.SAUCE_PASSWORD!
    );

    await expect(productsPage.pageTitle).toHaveText('Products');

    await productsPage.addProductToCart('Sauce Labs Backpack');

    await productsPage.openCart();

    const results = await runAccessibilityScan(cartPage.page);

    logAccessibilityViolations(results.violations);

    expect(results.violations).toEqual([]);
});

test('Checkout page accessibility scan', async ({
    loginPage,
    productsPage,
    cartPage,
    checkoutPage
}) => {
    await loginPage.navigate();

    await loginPage.login(
        process.env.SAUCE_USERNAME!,
        process.env.SAUCE_PASSWORD!
    );

    await expect(productsPage.pageTitle).toHaveText('Products');

    await productsPage.addProductToCart('Sauce Labs Backpack');

    await productsPage.openCart();

    await cartPage.clickCheckout();

    await checkoutPage.enterCustomerInformation(
        'Aya',
        'Hesham',
        '12345'
    );

    await checkoutPage.continueToOverview();

    const results = await runAccessibilityScan(checkoutPage.page);

    logAccessibilityViolations(results.violations);

    expect(results.violations).toEqual([]);
});