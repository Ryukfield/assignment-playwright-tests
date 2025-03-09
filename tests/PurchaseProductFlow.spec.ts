import { expect, test } from "@playwright/test";
import {
    BUTTON_SELECTORS,
    CHECKOUT_COMPLETE_CONTAINER_SELECTOR,
    CUSTOMER_DETAILS,
    HEADER_SELECTOR,
    INVENTORY_ITEM_NAME_SELECTOR,
    INVENTORY_ITEM_SELECTOR,
    SHOPPING_CART_ITEM_SELECTOR,
    SHOPPING_CART_SELECTOR,
    SORTING_OPTIONS,
    SORT_BUTTON_SELECTOR,
    URL_PATH,
    USERS,
} from "../helpers/consts";
import { fillCustomerDetails, performLogin } from "../helpers/tasks";

test.describe("Purchase Product Flow", () => {
    test("User should be able to purchase products successfully", async ({ page }) => {
        const addedCartItems: string[] = [];

        await page.goto("/");

        await performLogin(page, USERS.STANDARD);
        await expect(page).toHaveURL(URL_PATH.INVENTORY);
        await page.waitForLoadState("networkidle");

        await page.selectOption(SORT_BUTTON_SELECTOR, SORTING_OPTIONS.PRICE_LOW_TO_HIGH);
        await expect(page.locator(HEADER_SELECTOR)).toHaveScreenshot("chosen_sorting_lo_hi.png");

        const firstProductToBuy = page.locator(INVENTORY_ITEM_SELECTOR).last();
        addedCartItems.push((await firstProductToBuy.locator(INVENTORY_ITEM_NAME_SELECTOR).textContent()) ?? "");
        await firstProductToBuy.locator(BUTTON_SELECTORS.ADD_TO_CART).click();
        await expect(page.locator(HEADER_SELECTOR)).toHaveScreenshot("first_item_added_to_cart_header.png");

        await page.selectOption(SORT_BUTTON_SELECTOR, SORTING_OPTIONS.NAME_A_TO_Z);
        await expect(page.locator(HEADER_SELECTOR)).toHaveScreenshot("chosen_sorting_a_z.png");

        const secondProduct = page.locator(INVENTORY_ITEM_SELECTOR).nth(1);
        addedCartItems.push((await secondProduct.locator(INVENTORY_ITEM_NAME_SELECTOR).textContent()) ?? "");
        await secondProduct.locator(BUTTON_SELECTORS.ADD_TO_CART).click();
        await expect(page.locator(HEADER_SELECTOR)).toHaveScreenshot("second_item_added_to_cart_header.png");

        await page.click(SHOPPING_CART_SELECTOR);
        await expect(page).toHaveURL(URL_PATH.CART);
        await page.waitForLoadState("networkidle");

        const cartItems = page.locator(SHOPPING_CART_ITEM_SELECTOR);
        await expect(page).toHaveScreenshot("cart_full_page_masked.png", {
            fullPage: true,
            mask: [page.locator(SHOPPING_CART_ITEM_SELECTOR)],
        });
        const cartItemNames = await cartItems.locator(INVENTORY_ITEM_NAME_SELECTOR).allTextContents();
        expect(cartItemNames.length).toBe(addedCartItems.length);
        expect(cartItemNames).toEqual(addedCartItems);

        await page.click(BUTTON_SELECTORS.CHECKOUT);
        await expect(page).toHaveURL(URL_PATH.CHECKOUT_CUSTOMER_DETAILS);
        await page.waitForLoadState("networkidle");

        await fillCustomerDetails(page, CUSTOMER_DETAILS);
        await expect(page).toHaveScreenshot("checkout_full_page.png", { fullPage: true });

        await page.click(BUTTON_SELECTORS.CONTINUE);
        await expect(page).toHaveURL(URL_PATH.CHECKOUT_FINAL_OVERVIEW);
        await page.waitForLoadState("networkidle");

        const checkoutItems = page.locator(SHOPPING_CART_ITEM_SELECTOR);
        const checkoutItemNames = await checkoutItems.locator(INVENTORY_ITEM_NAME_SELECTOR).allTextContents();
        expect(checkoutItemNames.length).toBe(addedCartItems.length);
        expect(checkoutItemNames).toEqual(addedCartItems);

        await page.click(BUTTON_SELECTORS.FINISH);
        await expect(page).toHaveURL(URL_PATH.CHECKOUT_COMPLETE);
        await page.waitForLoadState("networkidle");

        const successScreen = page.locator(CHECKOUT_COMPLETE_CONTAINER_SELECTOR);
        await expect(successScreen).toBeVisible();
        await expect(page).toHaveScreenshot("checkout_complete_full_page.png", { fullPage: true });
    });
});
