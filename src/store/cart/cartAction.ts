import { CategoryItem } from '../categories/categoryTypes';
import { CART_ACTION_TYPES, CartItem } from './cartTypes';

import {
	createAction,
	withMatcher,
	Action,
	ActionWithPayload,
} from '../../utils/reducer/reducer';
import CartItem from '../../components/cartItem/CartItem';

// Add item to cart, if exists increment quantity by 1
const addCartItem = (
	cartItems: CartItem[],
	productToAdd: CategoryItem
): CartItem[] => {
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
const removeCartItem = (
	cartItems: CartItem[],
	cartItemToRemove: CartItem
): CartItem[] => {
	// Find cart item to remove
	const existingCartItem = cartItems.find(
		(cartItem) => cartItem.id === cartItemToRemove.id
	);

	// Check if quantity is equal to 1, if it is remove that item from cart
	if (existingCartItem && existingCartItem.quantity === 1) {
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
const clearCartItem = (
	cartItems: CartItem[],
	cartItemToClear: CartItem
): CartItem[] =>
	cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);

export type SetIsCartOpen = ActionWithPayload<
	CART_ACTION_TYPES.SET_IS_CART_OPEN,
	boolean
>;

export type SetCartItems = ActionWithPayload<
	CART_ACTION_TYPES.SET_CART_ITEMS,
	CartItem[]
>;

export const setIsCartOpen = withMatcher((boolean: boolean): SetIsCartOpen => {
	return createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean);
});

export const setCartItems = withMatcher(
	(cartItems: CartItem[]): SetCartItems => {
		return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartItems);
	}
);

export const addItemToCart = (
	cartItems: CartItem[],
	productToAdd: CategoryItem
) => {
	const newCartItems = addCartItem(cartItems, productToAdd);
	return setCartItems(newCartItems);
};

export const removeItemFromCart = (
	cartItems: CartItem[],
	cartItemToRemove: CartItem
) => {
	const newCartItems = removeCartItem(cartItems, cartItemToRemove);
	return setCartItems(newCartItems);
};

export const clearItemFromCart = (
	cartItems: CartItem[],
	cartItemToClear: CartItem
) => {
	const newCartItems = clearCartItem(cartItems, cartItemToClear);
	return setCartItems(newCartItems);
};
