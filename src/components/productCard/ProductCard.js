import { useDispatch, useSelector } from 'react-redux';

// Styles
import { ProductContainer, Footer, Name, Price } from './productCard.styles';

// Components
import Button, { BUTTON_TYPE_CLASSES } from '../button/Button';

// Redux
import { addItemToCart } from '../../store/cart/cartAction';
import { selectCartItems } from '../../store/cart/cartSelector';

const ProductCard = ({ product }) => {
	const dispatch = useDispatch();

	const { name, price, imageUrl } = product;

	const cartItems = useSelector(selectCartItems);

	const addProductToCart = () => dispatch(addItemToCart(cartItems, product));

	return (
		<ProductContainer>
			<img src={imageUrl} alt={`${name}`} />
			<Footer>
				<Name>{name}</Name>
				<Price>{price}</Price>
			</Footer>
			<Button
				buttonType={BUTTON_TYPE_CLASSES.inverted}
				onClick={addProductToCart}
			>
				Add to Cart
			</Button>
		</ProductContainer>
	);
};

export default ProductCard;
