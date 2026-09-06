import { Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

export async function runAccessibilityScan(page: Page) {
    return await new AxeBuilder({ page }).analyze();
}

export function logAccessibilityViolations(violations: any[]) {
    if (violations.length === 0) {
        console.log('\nNo accessibility violations found.');
        return;
    }

    console.log('\nAccessibility Violations:\n');

    for (const violation of violations) {
        console.log(`Rule: ${violation.id}`);
        console.log(`Impact: ${violation.impact}`);
        console.log(`Description: ${violation.help}`);
        console.log(`Affected elements: ${violation.nodes.length}`);
        console.log(`Help: ${violation.helpUrl}`);
        console.log('-----------------------------------');
    }
}