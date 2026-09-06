# Playwright SauceDemo Automation Framework

End-to-end test automation framework built with **Playwright**,
**TypeScript**, and the **Page Object Model (POM)** for the SauceDemo
e-commerce application.

The project covers the main customer journey from login and product
selection through cart management and checkout, including both positive
and negative scenarios.

## 🚀 Tech Stack

-   **Playwright** --- End-to-end web automation
-   **TypeScript** --- Programming language
-   **Node.js / npm** --- Runtime and package management
-   **Page Object Model (POM)** --- Maintainable test architecture
-   **Playwright Fixtures** --- Reusable page objects and test setup
-   **dotenv** --- Environment variable management
-   **JSON Test Data** --- Externalized test data
-   **Git & GitHub** --- Version control and collaboration
-   **GitHub Actions** --- CI/CD automation
-   **Playwright HTML Reporter** --- Test reporting

## 📁 Project Structure

``` text
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
│   └── checkout-negative.spec.ts
│
├── .env
├── .gitignore
├── package.json
├── playwright.config.ts
└── README.md
```

## 🧪 Test Coverage

The framework currently contains **25 test cases** covering:

### Login

-   Successful login
-   Session persistence after page refresh
-   Invalid username
-   Invalid password
-   Locked-out user
-   Empty credentials

### Products

-   Display products after login
-   Add a single product to cart
-   Add multiple products to cart
-   Remove a product from the products page
-   Sort products by price: low to high
-   Sort products by price: high to low
-   Verify product name and price

### Cart

-   View added product
-   Remove a product and verify an empty cart
-   Remove one product while keeping another
-   Continue shopping from the cart
-   Verify an empty cart when no products were added

### Checkout

-   Complete a purchase successfully
-   Complete a purchase with multiple products
-   Verify checkout overview data
-   Verify subtotal + tax = total

### Negative Checkout

-   Checkout without first name
-   Checkout without last name
-   Checkout without postal code

## 🏗️ Framework Architecture

The project follows the **Page Object Model** design pattern.

``` text
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

-   Locators
-   User actions
-   Reusable methods
-   Page-specific behavior

Examples:

``` typescript
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

``` typescript
loginPage
productsPage
cartPage
checkoutPage
```

Tests can therefore start with:

``` typescript
test('User can login successfully', async ({ loginPage }) => {
    await loginPage.navigate();
    // ...
});
```

This reduces duplicated setup code and improves maintainability.

## 🔐 Test Data & Credentials

Sensitive credentials are stored outside the test source code.

Environment variables:

``` text
SAUCE_USERNAME
SAUCE_PASSWORD
```

Customer test data is stored in:

``` text
test-data/users.json
```

The `.env` file is excluded from Git using `.gitignore` and should
**never be committed** to the repository.

Example:

``` env
SAUCE_USERNAME=your_username
SAUCE_PASSWORD=your_password
```

## ▶️ Running the Tests

Install dependencies:

``` bash
npm install
```

Install Playwright browsers:

``` bash
npx playwright install
```

Run all tests:

``` bash
npx playwright test
```

Run a specific test file:

``` bash
npx playwright test tests/login.spec.ts
```

Run tests in headed mode:

``` bash
npx playwright test --headed
```

Run a specific browser project:

``` bash
npx playwright test --project=chromium
```

## 📊 Test Report

Playwright HTML reporting is enabled in the configuration.

After running the tests:

``` bash
npx playwright show-report
```

The report provides:

-   Passed / failed tests
-   Execution duration
-   Browser information
-   Test steps
-   Traces when available

## 🌐 Browser Coverage

The framework is configured for:

-   Chromium
-   Firefox
-   WebKit

The local test suite has been executed successfully across all three
browser projects.

## 🔄 CI/CD

GitHub Actions is configured to execute the Playwright test suite
automatically when changes are pushed to the `main` branch or when a
pull request targets `main`.

The CI workflow:

1.  Checks out the repository
2.  Sets up Node.js
3.  Installs npm dependencies
4.  Installs Playwright browsers
5.  Runs the test suite
6.  Uploads the Playwright HTML report as an artifact

Credentials are supplied through **GitHub Actions Secrets** rather than
being stored in the repository.

## 🎯 QA Automation Skills Demonstrated

This project demonstrates practical experience with:

-   End-to-end test automation
-   Playwright
-   TypeScript
-   Page Object Model
-   Custom Playwright fixtures
-   Positive and negative test scenarios
-   Assertions and validations
-   Test data management
-   Environment variables and secret handling
-   Multi-browser testing
-   HTML test reporting
-   Git / GitHub
-   CI/CD with GitHub Actions
-   Business logic validation
-   Reusable automation components

## 🔮 Future Improvements

Potential improvements for future iterations:

-   Add API testing
-   Add accessibility testing
-   Add visual regression testing
-   Improve test data generation
-   Add parallel execution strategy for CI
-   Add retry and artifact optimization
-   Add additional browser/device configurations
-   Integrate test results with a test management system

## 📌 Application Under Test

**SauceDemo** is used as the application under test for this automation
framework.

The tests focus on realistic e-commerce workflows such as
authentication, product selection, cart operations, and checkout.

## 👨‍💻 Project Purpose

This project was created as a QA Automation portfolio project to
demonstrate the ability to design, implement, organize, and execute a
maintainable Playwright automation framework rather than relying only on
recorded/code-generated tests.
