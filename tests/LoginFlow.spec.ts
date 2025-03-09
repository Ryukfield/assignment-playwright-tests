import { expect, test } from "@playwright/test";

import {
    ERROR_MESSAGE_SELECTOR,
    FOOTER_SELECTOR,
    HEADER_SELECTOR,
    INVENTORY_CONTAINER_SELECTOR,
    INVENTORY_ITEM_SELECTOR,
    INVENTORY_LIST_SELECTOR,
    SOCIAL_LINK_SELECTORS,
    SOCIAL_LIST_SELECTOR,
    URL_PATH,
    USERS,
} from "../helpers/consts";
import { performLogin } from "../helpers/tasks";

test.describe("SauceDemo Login Flow", () => {
    test("Non-existing user should not be able to log in", async ({ page }) => {
        await page.goto("/");

        await performLogin(page, USERS.NON_EXISTENT);

        const errorMessage = page.locator(ERROR_MESSAGE_SELECTOR);
        await expect(errorMessage).toBeVisible();
        await expect(errorMessage).toContainText("Username and password do not match any user in this service");

        await expect(page).toHaveScreenshot("non_existing_user_full_page.png", { fullPage: true });
    });

    test("Locked user should not be able to log in", async ({ page }) => {
        await page.goto("/");

        await performLogin(page, USERS.LOCKED);

        const errorMessage = page.locator(ERROR_MESSAGE_SELECTOR);
        await expect(errorMessage).toBeVisible();
        await expect(errorMessage).toContainText("Sorry, this user has been locked out.");

        await expect(page).toHaveScreenshot("locked_user_full_page.png", { fullPage: true });
    });

    test("Standard user should be able to log in and see inventory page", async ({ page }) => {
        await page.goto("/");

        await performLogin(page, USERS.STANDARD);

        await expect(page).toHaveURL(URL_PATH.INVENTORY);
        await page.waitForLoadState("networkidle");

        const header = page.locator(HEADER_SELECTOR);
        await expect(header).toBeVisible();
        await expect(header).toHaveScreenshot("standard_user_login_header.png");

        const footer = page.locator(FOOTER_SELECTOR);
        await expect(footer).toBeVisible();
        await expect(footer).toHaveScreenshot("standard_user_login_footer.png");

        const footerList = footer.locator(SOCIAL_LIST_SELECTOR);
        await expect(footerList).toBeVisible();
        for (const className of Object.values(SOCIAL_LINK_SELECTORS)) {
            const listItem = footerList.locator(`li.${className}`);
            await expect(listItem).toBeVisible();
        }

        await expect(page.locator(INVENTORY_CONTAINER_SELECTOR)).toBeVisible();
        await expect(page.locator(INVENTORY_LIST_SELECTOR)).toBeVisible();

        const inventoryItemsCount = await page.locator(INVENTORY_ITEM_SELECTOR).count();
        expect(inventoryItemsCount).toBeGreaterThan(0);

        await expect(page).toHaveScreenshot("standard_user_login_full_page_masked.png", {
            fullPage: true,
            mask: [page.locator(INVENTORY_ITEM_SELECTOR)],
        });
    });
});
