import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Styles
import {
	ProductCartContainer,
	Footer,
	Name,
	Price,
} from './productCard.styles';

// Components
import Button, { BUTTON_TYPE_CLASSES } from '../button/Button';

// Redux
import { addItemToCart } from '../../store/cart/cartAction';
import { selectCartItems } from '../../store/cart/cartSelector';
import { CategoryItem } from '../../store/categories/categoryTypes';

type ProductCardProps = {
	product: CategoryItem;
};

const ProductCard: FC<ProductCardProps> = ({ product }) => {
	const dispatch = useDispatch();

	const { name, price, imageUrl } = product;

	const cartItems = useSelector(selectCartItems);

	const addProductToCart = () => dispatch(addItemToCart(cartItems, product));

	return (
		<ProductCartContainer>
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
		</ProductCartContainer>
	);
};

export default ProductCard;
