import { CART_ACTION_TYPES } from './cartTypes';

import { createAction } from '../../utils/reducer/reducer';

// Add item to cart, if exists increment quantity by 1
const addCartItem = (cartItems, productToAdd) => {
	// Find if cartItems contains productToAdd
	const existingCartItem = cartItems.find(
		(cartItem) => cartItem.id === productToAdd.id
	);

	// If found, increment quantity
	if (existingCartItem) {
		return cartItems.map((cartItem) =>
			cartItem.id === productToAdd.id
				? { ...cartItem, quantity: cartItem.quantity + 1 }
				: cartItem
		);
	}

	// Return new array with modified cartItems / new cart item
	return [...cartItems, { ...productToAdd, quantity: 1 }];
};

// Decrease quantity of item from cart
const removeCartItem = (cartItems, cartItemToRemove) => {
	// Find cart item to remove
	const existingCartItem = cartItems.find(
		(cartItem) => cartItem.id === cartItemToRemove.id
	);

	// Check if quantity is equal to 1, if it is remove that item from cart
	if (existingCartItem.quantity === 1) {
		return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
	}

	// Return back cartItems with matching cart item with reduced quantity
	return cartItems.map((cartItem) =>
		cartItem.id === cartItemToRemove.id
			? { ...cartItem, quantity: cartItem.quantity - 1 }
			: cartItem
	);
};

// Delete item from cart
const clearCartItem = (cartItems, cartItemToClear) =>
	cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);

export const setIsCartOpen = (boolean) => {
	return createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean);
};

export const addItemToCart = (cartItems, productToAdd) => {
	const newCartItems = addCartItem(cartItems, productToAdd);
	return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
	const newCartItems = removeCartItem(cartItems, cartItemToRemove);
	return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const clearItemFromCart = (cartItems, cartItemToClear) => {
	const newCartItems = clearCartItem(cartItems, cartItemToClear);
	return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};
