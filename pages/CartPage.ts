import { Page, Locator } from '@playwright/test';

export class CartPage {
    readonly page: Page;
    readonly checkoutButton: Locator;
    readonly cartItems: Locator;

    constructor(page: Page) {
        this.page = page;
        this.checkoutButton = page.locator('[data-test="checkout"]');
        this.cartItems = page.locator('.cart_item');
    }

    async clickCheckout() {
        await this.checkoutButton.click();
    }

    async getCartItemCount() {
        return await this.cartItems.count();
    }

    async continueShopping() {
        await this.page.locator('[data-test="continue-shopping"]').click();
    }
}