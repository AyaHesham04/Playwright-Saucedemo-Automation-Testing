import { test, expect } from '../fixtures/testFixtures';
import users from '../test-data/users.json';

test('Checkout cannot continue without first name', async ({
    page,
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

    await productsPage.addProductToCart('Sauce Labs Backpack');
    await productsPage.openCart();
    await cartPage.clickCheckout();

    await checkoutPage.enterCustomerInformation(
        '',
        users.customer.lastName,
        users.customer.postalCode
    );

    await checkoutPage.continueToOverview();

    await expect(page.locator('[data-test="error"]'))
        .toContainText('Error: First Name is required');
});

test('Checkout cannot continue without last name', async ({
    page,
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

    await productsPage.addProductToCart('Sauce Labs Backpack');
    await productsPage.openCart();
    await cartPage.clickCheckout();

    await checkoutPage.enterCustomerInformation(
        users.customer.firstName,
        '',
        users.customer.postalCode
    );

    await checkoutPage.continueToOverview();

    await expect(page.locator('[data-test="error"]'))
        .toContainText('Error: Last Name is required');
});

test('Checkout cannot continue without postal code', async ({
    page,
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

    await productsPage.addProductToCart('Sauce Labs Backpack');
    await productsPage.openCart();
    await cartPage.clickCheckout();

    await checkoutPage.enterCustomerInformation(
        users.customer.firstName,
        users.customer.lastName,
        ''
    );

    await checkoutPage.continueToOverview();

    await expect(page.locator('[data-test="error"]'))
        .toContainText('Error: Postal Code is required');
});