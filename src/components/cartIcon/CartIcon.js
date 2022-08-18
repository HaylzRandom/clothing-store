import { useContext } from 'react';

// Context
import { CartContext } from '../../contexts/cart';

// Assets
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';

// Styles
import { CartIconContainer, ItemCount } from './cartIcon.styles.js';

const CartIcon = () => {
	const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext);

	const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen);

	return (
		<CartIconContainer onClick={toggleIsCartOpen}>
			<ShoppingIcon className='shopping-icon' />
			<ItemCount>{cartCount}</ItemCount>
		</CartIconContainer>
	);
};

export default CartIcon;
