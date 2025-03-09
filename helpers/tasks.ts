import type { Page } from "@playwright/test";
import type { CustomerDetails, UserDetails } from "../types";

/**
 * Logs in a user on the given Playwright page instance.
 * @param {Page} page - The Playwright page instance where the login action will be performed.
 * @param {UserDetails} user - An object containing the username and password of the user attempting to log in.
 * @returns {Promise<void>} - Resolves when the login button is pressed.
 */
export async function performLogin(page: Page, user: UserDetails): Promise<void> {
    await page.fill("#user-name", user.username);
    await page.fill("#password", user.password);
    await page.click("#login-button");
}

/**
 * Fills customer details in the checkout form.
 * @param {Page} page - The Playwright page instance.
 * @param {CustomerDetails} customer - The customer details object containing first name, last name, and postal code.
 * @returns {Promise<void>} - Resolves when the fields are filled.
 */
export async function fillCustomerDetails(page: Page, customer: CustomerDetails): Promise<void> {
    await page.fill("#first-name", customer.firstName);
    await page.fill("#last-name", customer.lastName);
    await page.fill("#postal-code", customer.postalCode);
}
