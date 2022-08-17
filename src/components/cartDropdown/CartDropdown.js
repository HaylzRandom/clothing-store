import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import './cartDropdown.scss';

// Contexts
import { CartContext } from '../../contexts/cart';

// Components
import Button from '../button/Button';
import CartItem from '../cartItem/CartItem';

const CartDropdown = () => {
	const { cartItems } = useContext(CartContext);

	const navigate = useNavigate();

	const goToCheckoutHandler = () => {
		navigate('/checkout');
	};

	return (
		<div className='cart-dropdown-container'>
			<div className='cart-items'>
				{cartItems.map((item) => (
					<CartItem key={item.id} cartItem={item} />
				))}
			</div>
			<Button onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>
		</div>
	);
};

export default CartDropdown;
