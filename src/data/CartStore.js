import { Store } from "pullstate";

export const CartStore = new Store({
    
    total: 0,
    product_ids: []
});

export const addToCart = (categorySlug, productID) => {
    CartStore.update(s => {
        // Find an item with the category and id if it exists
        const itemInCart = s.product_ids.find((v) => v.productID === productID && v.categorySlug === categorySlug);

        // If an item already exists in the cart, add one more
        if (itemInCart !== undefined) {
            itemInCart.count += 1;
        } else {
            // Add it to cart with an amount of 1
            const item = {
                categorySlug,
                productID,
                count: 1
            };
            s.product_ids = [ ...s.product_ids, item ];
        }
    });
}

export const removeFromCart = productIndex => {
    CartStore.update(s => { 
        const items = s.product_ids[productIndex];

        // Decrease items count, or remove item if none left
        if (items.count > 1) {
            items.count -= 1;
        } else {
            s.product_ids.splice(productIndex, 1);
        }
    });
}