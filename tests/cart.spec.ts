import { test, expect } from '../fixtures/testFixtures';

test('User can view the added product in the cart', async ({
    page,
    loginPage,
    productsPage,
    cartPage
}) => {
    await loginPage.navigate();

    await loginPage.login(
        process.env.SAUCE_USERNAME!,
        process.env.SAUCE_PASSWORD!
    );

    await productsPage.addProductToCart('Sauce Labs Backpack');

    await productsPage.openCart();

    await expect(cartPage.cartItems).toHaveCount(1);

    await expect(
        page.locator('.inventory_item_name')
    ).toHaveText('Sauce Labs Backpack');
});

test('Cart becomes empty after removing the product', async ({
    page,
    loginPage,
    productsPage,
    cartPage
}) => {
    await loginPage.navigate();

    await loginPage.login(
        process.env.SAUCE_USERNAME!,
        process.env.SAUCE_PASSWORD!
    );

    await productsPage.addProductToCart('Sauce Labs Backpack');

    await productsPage.openCart();

    await expect(cartPage.cartItems).toHaveCount(1);

    // Remove the product
    await page.locator('[data-test="remove-sauce-labs-backpack"]').click();

    // Cart should be empty
    await expect(cartPage.cartItems).toHaveCount(0);
});

test('User can remove one product while keeping another product in the cart', async ({
    page,
    loginPage,
    productsPage,
    cartPage
}) => {
    await loginPage.navigate();

    await loginPage.login(
        process.env.SAUCE_USERNAME!,
        process.env.SAUCE_PASSWORD!
    );

    // Add two products
    await productsPage.addProductToCart('Sauce Labs Backpack');
    await productsPage.addProductToCart('Sauce Labs Bike Light');

    await productsPage.openCart();

    // Verify both products are in the cart
    await expect(cartPage.cartItems).toHaveCount(2);

    // Remove the Backpack
    await page.locator('[data-test="remove-sauce-labs-backpack"]').click();

    // Only Bike Light should remain
    await expect(cartPage.cartItems).toHaveCount(1);

    await expect(
        page.locator('.inventory_item_name')
    ).toHaveText('Sauce Labs Bike Light');
});

test('User can continue shopping from the cart', async ({
    page,
    loginPage,
    productsPage,
    cartPage
}) => {
    await loginPage.navigate();

    await loginPage.login(
        process.env.SAUCE_USERNAME!,
        process.env.SAUCE_PASSWORD!
    );

    await productsPage.addProductToCart('Sauce Labs Backpack');

    await productsPage.openCart();

    await expect(cartPage.cartItems).toHaveCount(1);

    await cartPage.continueShopping();

    await expect(page).toHaveURL(/inventory/);

    await expect(productsPage.pageTitle).toHaveText('Products');

    // Verify the product is still in the cart
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
});

test('Cart is empty when user has not added any products', async ({
    page,
    loginPage,
    productsPage,
    cartPage
}) => {
    await loginPage.navigate();

    await loginPage.login(
        process.env.SAUCE_USERNAME!,
        process.env.SAUCE_PASSWORD!
    );

    await productsPage.openCart();

    await expect(cartPage.cartItems).toHaveCount(0);

    await expect(page.locator('.shopping_cart_badge')).not.toBeVisible();
});