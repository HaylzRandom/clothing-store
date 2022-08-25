import { createContext, useReducer } from 'react';

import { createAction } from '../utils/reducer/reducer';

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

export const CartContext = createContext({
	isCartOpen: false,
	setIsCartOpen: () => {},
	cartItems: [],
	addItemToCart: () => {},
	removeItemFromCart: () => {},
	clearItemFromCart: () => {},
	cartCount: 0,
	cartTotal: 0,
});

const CART_ACTION_TYPES = {
	SET_CART_ITEMS: 'SET_CART_ITEMS',
	SET_IS_CART_OPEN: 'SET_IS_CART_OPEN',
};

const INITIAL_STATE = {
	isCartOpen: false,
	cartItems: [],
	cartCount: 0,
	cartTotal: 0,
};

const cartReducer = (state, action) => {
	const { type, payload } = action;

	switch (type) {
		case CART_ACTION_TYPES.SET_CART_ITEMS:
			return {
				...state,
				...payload,
			};
		case CART_ACTION_TYPES.SET_IS_CART_OPEN:
			return {
				...state,
				isCartOpen: payload,
			};
		default:
			throw new Error(`Unhandled type of ${type} in cartReducer`);
	}
};

export const CartProvider = ({ children }) => {
	const [{ cartItems, isCartOpen, cartCount, cartTotal }, dispatch] =
		useReducer(cartReducer, INITIAL_STATE);

	const updateCartItemsReducer = (newCartItems) => {
		const newCartTotal = newCartItems.reduce(
			(total, cartItem) => total + cartItem.quantity * cartItem.price,
			0
		);

		const newCartCount = newCartItems.reduce(
			(total, cartItem) => total + cartItem.quantity,
			0
		);

		dispatch(
			createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
				cartItems: newCartItems,
				cartTotal: newCartTotal,
				cartCount: newCartCount,
			})
		);
	};

	const addItemToCart = (productToAdd) => {
		const newCartItems = addCartItem(cartItems, productToAdd);
		updateCartItemsReducer(newCartItems);
	};

	const removeItemFromCart = (cartItemToRemove) => {
		const newCartItems = removeCartItem(cartItems, cartItemToRemove);
		updateCartItemsReducer(newCartItems);
	};

	const clearItemFromCart = (cartItemToClear) => {
		const newCartItems = clearCartItem(cartItems, cartItemToClear);
		updateCartItemsReducer(newCartItems);
	};

	const setIsCartOpen = (bool) => {
		dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool));
	};

	const value = {
		isCartOpen,
		setIsCartOpen,
		addItemToCart,
		removeItemFromCart,
		clearItemFromCart,
		cartItems,
		cartCount,
		cartTotal,
	};

	return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
