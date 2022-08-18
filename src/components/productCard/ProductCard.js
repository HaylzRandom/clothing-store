import { useContext } from 'react';

// Styles
import { ProductContainer, Footer, Name, Price } from './productCard.styles';

// Components
import Button, { BUTTON_TYPE_CLASSES } from '../button/Button';

// Contexts
import { CartContext } from '../../contexts/cart';

const ProductCard = ({ product }) => {
	const { name, price, imageUrl } = product;
	const { addItemToCart } = useContext(CartContext);

	const addProductToCart = () => addItemToCart(product);

	return (
		<ProductContainer>
			<img src={imageUrl} alt={`${name}`} />
			<Footer>
				<Name>{name}</Name>
				<Price>{price}</Price>
			</Footer>
			<Button
				buttonType={BUTTON_TYPE_CLASSES.inverted}
				onClick={addProductToCart}>
				Add to Cart
			</Button>
		</ProductContainer>
	);
};

export default ProductCard;
