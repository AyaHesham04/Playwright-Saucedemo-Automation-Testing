import { Page, Locator } from '@playwright/test';

export class ProductsPage {
    readonly page: Page;
    readonly pageTitle: Locator;
    readonly shoppingCart: Locator;
    readonly productItems: Locator;
    readonly productPrices: Locator;

    constructor(page: Page) {
        this.page = page;
        this.pageTitle = page.locator('.title');
        this.shoppingCart = page.locator('.shopping_cart_link');
        this.productItems = page.locator('.inventory_item');
        this.productPrices = page.locator('.inventory_item_price');
    }

    async addProductToCart(productName: string) {
        const product = this.productItems
            .filter({ hasText: productName });

        await product.locator('button').click();
    }

    async removeProductFromCart(productName: string) {
        const product = this.productItems
            .filter({ hasText: productName });

        await product.locator('button').click();
    }

    async openCart() {
        await this.shoppingCart.click();
    }

    async sortProducts(option: string) {
        await this.page
            .locator('[data-test="product-sort-container"]')
            .selectOption(option);
    }

    async getProductPrices() {
        return await this.productPrices.allTextContents();
    }
}