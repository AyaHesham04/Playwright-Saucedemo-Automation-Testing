import { Page, Locator } from '@playwright/test';

export class CheckoutPage {
    readonly page: Page;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly postalCodeInput: Locator;
    readonly continueButton: Locator;
    readonly finishButton: Locator;
    readonly successMessage: Locator;
    readonly summarySubtotal: Locator;
    readonly summaryTax: Locator;
    readonly summaryTotal: Locator;
    readonly summaryItems: Locator;

    constructor(page: Page) {
        this.page = page;

        this.firstNameInput = page.locator('[data-test="firstName"]');
        this.lastNameInput = page.locator('[data-test="lastName"]');
        this.postalCodeInput = page.locator('[data-test="postalCode"]');
        this.continueButton = page.locator('[data-test="continue"]');
        this.finishButton = page.locator('[data-test="finish"]');
        this.successMessage = page.locator('.complete-header');

        this.summarySubtotal = page.locator('.summary_subtotal_label');
        this.summaryTax = page.locator('.summary_tax_label');
        this.summaryTotal = page.locator('.summary_total_label');
        this.summaryItems = page.locator('.cart_item');
    }

    async enterCustomerInformation(
        firstName: string,
        lastName: string,
        postalCode: string
    ) {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.postalCodeInput.fill(postalCode);
    }

    async continueToOverview() {
        await this.continueButton.click();
    }

    async finishOrder() {
        await this.finishButton.click();
    }

    async getSubtotal() {
        const text = await this.summarySubtotal.textContent();
        return parseFloat(text!.replace(/[^\d.]/g, ''));
    }

    async getTax() {
        const text = await this.summaryTax.textContent();
        return parseFloat(text!.replace(/[^\d.]/g, ''));
    }

    async getTotal() {
        const text = await this.summaryTotal.textContent();
        return parseFloat(text!.replace(/[^\d.]/g, ''));
    }
}