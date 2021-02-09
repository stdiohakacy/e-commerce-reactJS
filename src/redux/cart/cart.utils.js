export const addItemToCart = (cartItems, cartItemToAdd) => {
    const isExistCartItem = cartItems.find(cartItem => cartItem.id === cartItemToAdd.id)
    console.log(isExistCartItem)
    if (isExistCartItem) {
        return cartItems.map(cartItem =>
            cartItem.id === cartItemToAdd.id
                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem
        )
    }
    return [...cartItems, { ...cartItemToAdd, quantity: 1 }]
}

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
    const isExistCartItem = cartItems.find(cartItem => cartItem.id === cartItemToRemove.id)
    if (isExistCartItem.quantity === 1) {
        return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove)
    }

    return cartItems.map(cartItem => cartItem.id === cartItemToRemove.id
        ? { ...cartItem, quantity: cartItem.quantity - 1 }
        : cartItem)
}
