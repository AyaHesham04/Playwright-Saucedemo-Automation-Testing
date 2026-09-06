import { test, expect } from '../fixtures/testFixtures';
import users from '../test-data/users.json';

test('User can complete a purchase successfully', async ({
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
        users.customer.postalCode
    );

    await checkoutPage.continueToOverview();

    await expect(page).toHaveURL(/checkout-step-two/);

    await checkoutPage.finishOrder();

    await expect(checkoutPage.successMessage)
        .toHaveText('Thank you for your order!');
});

test('User can complete a purchase with multiple products', async ({
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

    // Add multiple products
    await productsPage.addProductToCart('Sauce Labs Backpack');
    await productsPage.addProductToCart('Sauce Labs Bike Light');

    // Open cart
    await productsPage.openCart();

    // Verify both products are present
    await expect(cartPage.cartItems).toHaveCount(2);

    // Go to checkout
    await cartPage.clickCheckout();

    // Enter customer information
    await checkoutPage.enterCustomerInformation(
        users.customer.firstName,
        users.customer.lastName,
        users.customer.postalCode
    );

    await checkoutPage.continueToOverview();

    // Verify checkout overview
    await expect(page).toHaveURL(/checkout-step-two/);

    // Complete purchase
    await checkoutPage.finishOrder();

    await expect(checkoutPage.successMessage)
        .toHaveText('Thank you for your order!');
});

test('Checkout overview displays the selected product', async ({
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
        users.customer.postalCode
    );

    await checkoutPage.continueToOverview();

    const product = page.locator('.cart_item');

    await expect(product.locator('.inventory_item_name'))
        .toHaveText('Sauce Labs Backpack');

    await expect(product.locator('.inventory_item_price'))
        .toHaveText('$29.99');

    await expect(page.locator('.summary_subtotal_label'))
        .toContainText('$29.99');
});

test('Checkout calculates the total price correctly', async ({
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
        users.customer.postalCode
    );

    await checkoutPage.continueToOverview();

    const subtotal = await checkoutPage.getSubtotal();
    const tax = await checkoutPage.getTax();
    const total = await checkoutPage.getTotal();

    expect(total).toBeCloseTo(subtotal + tax, 2);
});