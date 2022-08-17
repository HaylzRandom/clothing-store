import { useContext } from 'react';

import './cartDropdown.scss';

// Contexts
import { CartContext } from '../../contexts/cart';

// Components
import Button from '../button/Button';
import CartItem from '../cartItem/CartItem';

const CartDropdown = () => {
	const { cartItems } = useContext(CartContext);
	return (
		<div className='cart-dropdown-container'>
			<div className='cart-items'>
				{cartItems.map((item) => (
					<CartItem key={item.id} cartItem={item} />
				))}
			</div>
			<Button>GO TO CHECKOUT</Button>
		</div>
	);
};

export default CartDropdown;
