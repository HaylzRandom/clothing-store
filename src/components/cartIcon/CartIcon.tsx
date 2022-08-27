import { useDispatch, useSelector } from 'react-redux';

// Redux
import {
	selectCartCount,
	selectIsCartOpen,
} from '../../store/cart/cartSelector';
import { setIsCartOpen } from '../../store/cart/cartAction';

// Assets
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';

// Styles
import { CartIconContainer, ItemCount } from './cartIcon.styles';

const CartIcon = () => {
	const dispatch = useDispatch();

	const cartCount = useSelector(selectCartCount);
	const isCartOpen = useSelector(selectIsCartOpen);

	const toggleIsCartOpen = () => dispatch(setIsCartOpen(!isCartOpen));

	return (
		<CartIconContainer onClick={toggleIsCartOpen}>
			<ShoppingIcon className='shopping-icon' />
			<ItemCount>{cartCount}</ItemCount>
		</CartIconContainer>
	);
};

export default CartIcon;
