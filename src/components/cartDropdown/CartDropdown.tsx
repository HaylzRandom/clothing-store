import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Styles
import {
	CartDropdownContainer,
	EmptyMessage,
	CartItems,
} from './cartDropdown.styles';

// Redux
import { selectCartItems } from '../../store/cart/cartSelector';

// Components
import Button from '../button/Button';
import CartItem from '../cartItem/CartItem';

const CartDropdown = () => {
	const cartItems = useSelector(selectCartItems);

	const navigate = useNavigate();

	const goToCheckoutHandler = useCallback(() => {
		navigate('/checkout');
	}, []);

	return (
		<CartDropdownContainer>
			<CartItems>
				{cartItems.length ? (
					cartItems.map((item) => <CartItem key={item.id} cartItem={item} />)
				) : (
					<EmptyMessage>Your cart is empty</EmptyMessage>
				)}
			</CartItems>
			<Button onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>
		</CartDropdownContainer>
	);
};

export default CartDropdown;
