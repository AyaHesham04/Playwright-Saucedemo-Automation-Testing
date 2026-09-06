import { test, expect } from '../fixtures/testFixtures';

test('User can add a product to the cart', async ({
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

    await expect(productsPage.pageTitle).toHaveText('Products');

    await productsPage.addProductToCart('Sauce Labs Backpack');

    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

    await productsPage.openCart();

    expect(await cartPage.getCartItemCount()).toBe(1);

    await cartPage.clickCheckout();

    await expect(page).toHaveURL(/checkout-step-one/);
});

test('User can add multiple products to the cart', async ({
    page,
    loginPage,
    productsPage,
}) => {
    await loginPage.navigate();

    await loginPage.login(
        process.env.SAUCE_USERNAME!,
        process.env.SAUCE_PASSWORD!
    );

    await productsPage.addProductToCart('Sauce Labs Backpack');
    await productsPage.addProductToCart('Sauce Labs Bike Light');

    await expect(page.locator('.shopping_cart_badge')).toHaveText('2');
});

test('User can remove a product from the cart', async ({
    page,
    loginPage,
    productsPage
}) => {
    await loginPage.navigate();

    await loginPage.login(
        process.env.SAUCE_USERNAME!,
        process.env.SAUCE_PASSWORD!
    );

    await productsPage.addProductToCart('Sauce Labs Backpack');

    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

    await productsPage.removeProductFromCart('Sauce Labs Backpack');

    await expect(page.locator('.shopping_cart_badge')).not.toBeVisible();
});

test('User can sort products by price from low to high', async ({
    loginPage,
    productsPage
}) => {
    await loginPage.navigate();

    await loginPage.login(
        process.env.SAUCE_USERNAME!,
        process.env.SAUCE_PASSWORD!
    );

    await productsPage.sortProducts('lohi');

    const prices = await productsPage.getProductPrices();

    const numericPrices = prices.map(price =>
        parseFloat(price.replace('$', ''))
    );

    const sortedPrices = [...numericPrices]
        .sort((a, b) => a - b);

    expect(numericPrices).toEqual(sortedPrices);
});

test('Products page displays products after login', async ({
    loginPage,
    productsPage
}) => {
    await loginPage.navigate();

    await loginPage.login(
        process.env.SAUCE_USERNAME!,
        process.env.SAUCE_PASSWORD!
    );

    const productCount = await productsPage.page
        .locator('.inventory_item')
        .count();

    expect(productCount).toBeGreaterThan(0);
});

test('User can sort products by price from high to low', async ({
    loginPage,
    productsPage
}) => {
    await loginPage.navigate();

    await loginPage.login(
        process.env.SAUCE_USERNAME!,
        process.env.SAUCE_PASSWORD!
    );

    await productsPage.sortProducts('hilo');

    const prices = await productsPage.getProductPrices();

    const numericPrices = prices.map(price =>
        parseFloat(price.replace('$', ''))
    );

    const sortedPrices = [...numericPrices]
        .sort((a, b) => b - a);

    expect(numericPrices).toEqual(sortedPrices);
});

test('Product displays correct name and price', async ({
    loginPage,
    productsPage
}) => {
    await loginPage.navigate();

    await loginPage.login(
        process.env.SAUCE_USERNAME!,
        process.env.SAUCE_PASSWORD!
    );

    const product = productsPage.page
        .locator('.inventory_item')
        .filter({ hasText: 'Sauce Labs Backpack' });

    await expect(product.locator('.inventory_item_name'))
        .toHaveText('Sauce Labs Backpack');

    await expect(product.locator('.inventory_item_price'))
        .toHaveText('$29.99');
});