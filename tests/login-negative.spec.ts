import { test, expect } from '../fixtures/testFixtures';
import users from '../test-data/users.json';

test('User cannot login with invalid credentials', async ({ loginPage }) => {
    await loginPage.navigate();

    await loginPage.login(
        users.invalidUser.username,
        users.invalidUser.password
    );

    await expect(loginPage.errorMessage)
        .toContainText(
            'Epic sadface: Username and password do not match any user in this service'
        );
});

test('User cannot login with invalid password', async ({ loginPage }) => {
    await loginPage.navigate();

    await loginPage.login(
        process.env.SAUCE_USERNAME!,
        'wrong_password'
    );

    await expect(loginPage.errorMessage)
        .toContainText(
            'Epic sadface: Username and password do not match any user in this service'
        );
});

test('Locked out user cannot login', async ({ loginPage }) => {
    await loginPage.navigate();

    await loginPage.login(
        'locked_out_user',
        process.env.SAUCE_PASSWORD!
    );

    await expect(loginPage.errorMessage)
        .toContainText(
            'Epic sadface: Sorry, this user has been locked out.'
        );
});

test('User cannot login with empty credentials', async ({ loginPage }) => {
    await loginPage.navigate();

    await loginPage.login('', '');

    await expect(loginPage.errorMessage)
        .toContainText(
            'Epic sadface: Username is required'
        );
});

