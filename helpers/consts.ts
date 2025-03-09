import type { CustomerDetails, UserDetails } from "../types";

const USER_PWD = process.env.USER_PWD || "secret_sauce";

export const USERS: Record<string, UserDetails> = {
    NON_EXISTENT: {
        username: "non_existent_user",
        password: "wrong_password",
    },
    LOCKED: {
        username: "locked_out_user",
        password: USER_PWD,
    },
    STANDARD: {
        username: "standard_user",
        password: USER_PWD,
    },
};

export const URL_PATH = {
    INVENTORY: /inventory.html/,
    CART: /cart.html/,
    CHECKOUT_CUSTOMER_DETAILS: /checkout-step-one.html/,
    CHECKOUT_FINAL_OVERVIEW: /checkout-step-two.html/,
    CHECKOUT_COMPLETE: /checkout-complete.html/,
};

export const BUTTON_SELECTORS = {
    ADD_TO_CART: ".btn_primary",
    REMOVE_FROM_CART: ".btn_secondary",
    CHECKOUT: "#checkout",
    CONTINUE: "#continue",
    FINISH: "#finish",
};

export const ERROR_MESSAGE_SELECTOR = ".error-message-container";

export const HEADER_SELECTOR = ".header_container";
export const FOOTER_SELECTOR = ".footer";
export const SOCIAL_LIST_SELECTOR = "ul.social";
export const SOCIAL_LINK_SELECTORS = {
    twitter: "social_twitter",
    facebook: "social_facebook",
    linkedIn: "social_linkedin",
};

export const INVENTORY_CONTAINER_SELECTOR = ".inventory_container";
export const INVENTORY_LIST_SELECTOR = ".inventory_list";
export const INVENTORY_ITEM_SELECTOR = ".inventory_item";
export const INVENTORY_ITEM_NAME_SELECTOR = ".inventory_item_name";

export const SORT_BUTTON_SELECTOR = ".product_sort_container";
export const SORTING_OPTIONS = {
    NAME_A_TO_Z: "az",
    NAME_Z_TO_A: "za",
    PRICE_LOW_TO_HIGH: "lohi",
    PRICE_HIGH_TO_LOW: "hilo",
};

export const SHOPPING_CART_SELECTOR = ".shopping_cart_container";
export const SHOPPING_CART_ITEM_SELECTOR = ".cart_item";

export const CHECKOUT_COMPLETE_CONTAINER_SELECTOR = ".checkout_complete_container";

export const CUSTOMER_DETAILS: CustomerDetails = {
    firstName: "John",
    lastName: "Doe",
    postalCode: "12345",
};
