import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Styles
import {
	CheckoutItemContainer,
	ImageContainer,
	BaseSpan,
	Quantity,
	Arrow,
	Value,
	RemoveButton,
} from './checkoutItem.styles';

// Redux
import { selectCartItems } from '../../store/cart/cartSelector';
import {
	clearItemFromCart,
	addItemToCart,
	removeItemFromCart,
} from '../../store/cart/cartAction';
import { CartItem } from '../../store/cart/cartTypes';

type CheckOutItemProps = {
	cartItem: CartItem;
};

const CheckoutItem: FC<CheckOutItemProps> = ({ cartItem }) => {
	const dispatch = useDispatch();

	const { name, imageUrl, price, quantity } = cartItem;

	const cartItems = useSelector(selectCartItems);

	const clearItemHandler = () =>
		dispatch(clearItemFromCart(cartItems, cartItem));
	const addItemHandler = () => dispatch(addItemToCart(cartItems, cartItem));
	const removeItemHandler = () =>
		dispatch(removeItemFromCart(cartItems, cartItem));

	return (
		<CheckoutItemContainer>
			<ImageContainer>
				<img src={imageUrl} alt={`${name}`} />
			</ImageContainer>
			<BaseSpan>{name}</BaseSpan>
			<Quantity>
				<Arrow onClick={removeItemHandler}>&#10094;</Arrow>
				<Value>{quantity}</Value>
				<Arrow onClick={addItemHandler}>&#10095;</Arrow>
			</Quantity>
			<BaseSpan>{price}</BaseSpan>
			<RemoveButton onClick={clearItemHandler}>&#10005;</RemoveButton>
		</CheckoutItemContainer>
	);
};

export default CheckoutItem;
