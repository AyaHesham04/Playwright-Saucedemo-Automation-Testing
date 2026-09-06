# Playwright SauceDemo Automation Framework

End-to-end test automation framework built with **Playwright**, **TypeScript**,
and the **Page Object Model (POM)** for the SauceDemo e-commerce application.

The project covers the main customer journey from login and product selection
through cart management and checkout, including positive, negative, and
accessibility test scenarios.

## 🚀 Tech Stack

- **Playwright** — End-to-end web automation
- **TypeScript** — Programming language
- **Node.js / npm** — Runtime and package management
- **Page Object Model (POM)** — Maintainable test architecture
- **Playwright Fixtures** — Reusable page objects and test setup
- **dotenv** — Environment variable management
- **JSON Test Data** — Externalized test data
- **@axe-core/playwright** — Automated accessibility testing
- **Git & GitHub** — Version control
- **GitHub Actions** — CI automation
- **Playwright HTML Reporter** — Test reporting

## 📁 Project Structure

```text
playwright-saucedemo-automation/
│
├── .github/
│   └── workflows/
│       └── playwright.yml
│
├── fixtures/
│   └── testFixtures.ts
│
├── pages/
│   ├── LoginPage.ts
│   ├── ProductsPage.ts
│   ├── CartPage.ts
│   └── CheckoutPage.ts
│
├── test-data/
│   └── users.json
│
├── tests/
│   ├── login.spec.ts
│   ├── login-negative.spec.ts
│   ├── products.spec.ts
│   ├── cart.spec.ts
│   ├── checkout.spec.ts
│   ├── checkout-negative.spec.ts
│   └── accessibility.spec.ts
│
├── utils/
│   └── accessibility.ts
│
├── docs/
│   └── accessibility-defects.md
│
├── .env
├── .gitignore
├── package.json
├── playwright.config.ts
└── README.md
```

## 🧪 Test Coverage

The project currently documents **38 test cases**:

- **34 functional test cases**
- **4 accessibility test cases**

### Login

- Successful login
- Session persistence after page refresh
- Invalid username
- Invalid password
- Locked-out user
- Empty credentials
- Empty username
- Empty password

### Products

- Display products after login
- Add a single product to cart
- Add multiple products to cart
- Remove a product from the products page
- Sort products by price: low to high
- Sort products by price: high to low
- Verify product name and price
- Product details page
- Return from product details

### Cart

- View added product
- Remove a product and verify an empty cart
- Remove one product while keeping another
- Continue shopping from the cart
- Verify an empty cart when no products were added
- Verify cart quantity matches selected products
- Verify product remains after navigation

### Checkout

- Complete a purchase successfully
- Complete a purchase with multiple products
- Verify checkout overview data
- Verify subtotal + tax = total
- Checkout without first name
- Checkout without last name
- Checkout without postal code
- Checkout with empty customer information
- Cancel checkout and return to cart
- Cancel from checkout overview

## ♿ Accessibility Testing

Accessibility testing was integrated into the Playwright framework using
**@axe-core/playwright**.

Automated accessibility scans were implemented for:

- Login Page
- Products Page
- Cart Page
- Checkout Page

The accessibility tests execute automated rules and fail when violations are
detected.

### Accessibility Defects Identified

The Login page currently reports the following accessibility violations:

| ID | Rule | Severity | Status |
|---|---|---|---|
| AD-001 | landmark-one-main | Moderate | Open |
| AD-002 | page-has-heading-one | Moderate | Open |
| AD-003 | region | Moderate | Open |

These findings are documented in:

```text
docs/accessibility-defects.md
```

The identified issues are treated as defects in the application under test,
rather than being modified in the automation project.

### Accessibility Approach

The tests:

1. Navigate to the target page.
2. Execute an automated accessibility scan.
3. Log detected violations.
4. Fail the test when accessibility violations are present.
5. Document confirmed findings as application defects.

## 🏗️ Framework Architecture

The project follows the **Page Object Model** design pattern.

```text
Test Case
    ↓
Fixture
    ↓
Page Object
    ↓
Locator / Action
    ↓
SauceDemo Application
```

### Page Objects

Each application page has its own class containing:

- Locators
- User actions
- Reusable methods
- Page-specific behavior

Example:

```typescript
await productsPage.addProductToCart('Sauce Labs Backpack');

await cartPage.clickCheckout();

await checkoutPage.enterCustomerInformation(
    firstName,
    lastName,
    postalCode
);
```

This keeps test cases focused on **business behavior** instead of
implementation details.

## 🔧 Test Fixtures

Custom Playwright fixtures provide reusable page objects:

```text
loginPage
productsPage
cartPage
checkoutPage
```

Tests can therefore start with:

```typescript
test('User can login successfully', async ({ loginPage }) => {
    await loginPage.navigate();

    // ...
});
```

This reduces duplicated setup code and improves maintainability.

## 🔐 Test Data & Credentials

Sensitive credentials are stored outside the test source code.

Environment variables:

```text
SAUCE_USERNAME
SAUCE_PASSWORD
```

Customer test data is stored in:

```text
test-data/users.json
```

The `.env` file is excluded from Git using `.gitignore` and should
**never be committed** to the repository.

Example:

```env
SAUCE_USERNAME=your_username
SAUCE_PASSWORD=your_password
```

## ▶️ Running the Tests

Install dependencies:

```bash
npm install
```

Install Playwright browsers:

```bash
npx playwright install
```

Run all tests:

```bash
npx playwright test
```

Run a specific test file:

```bash
npx playwright test tests/login.spec.ts
```

Run tests in headed mode:

```bash
npx playwright test --headed
```

Run a specific browser project:

```bash
npx playwright test --project=chromium
```

## 📊 Test Report

Playwright HTML reporting is enabled in the configuration.

After running the tests:

```bash
npx playwright show-report
```

The report provides:

- Passed / failed tests
- Execution duration
- Browser information
- Test steps
- Traces when available

## 🌐 Browser Coverage

The framework is configured for:

- Chromium
- Firefox
- WebKit

The functional test suite has been executed successfully across all three
browser projects locally.

## 🔄 CI/CD

GitHub Actions is configured to execute the Playwright test suite automatically
when changes are pushed to the `main` branch or when a pull request targets
`main`.

The CI workflow:

1. Checks out the repository
2. Sets up Node.js
3. Installs npm dependencies
4. Installs Playwright browsers
5. Runs the Playwright test suite
6. Uploads the Playwright HTML report as an artifact

Credentials are supplied through **GitHub Actions Secrets** rather than being
stored in the repository.

> Note: GitHub Actions is configured for the project, while CI execution is
> still being validated.

## 🎯 QA Automation Skills Demonstrated

This project demonstrates practical experience with:

- End-to-end test automation
- Playwright
- TypeScript
- Page Object Model
- Custom Playwright fixtures
- Positive and negative test scenarios
- Assertions and validations
- Test data management
- Environment variables and secret handling
- Multi-browser testing
- Accessibility testing
- Automated accessibility scanning with axe-core
- Defect identification and documentation
- HTML test reporting
- Git / GitHub
- CI automation with GitHub Actions
- Business logic validation
- Reusable automation components

## 📌 Application Under Test

**SauceDemo** is used as the application under test for this automation
framework.

The tests focus on realistic e-commerce workflows such as authentication,
product selection, cart operations, checkout, and accessibility validation.

## 👨‍💻 Project Purpose

This project was created as a QA Automation portfolio project to demonstrate
the ability to design, implement, organize, and execute a maintainable
Playwright automation framework rather than relying only on
recorded/code-generated tests.
