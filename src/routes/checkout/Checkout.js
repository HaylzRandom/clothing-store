import { useSelector } from 'react-redux';

// Styles
import {
	CheckoutContainer,
	CheckoutHeader,
	HeaderBlock,
	Total,
} from './checkout.styles.js';

// Redux
import {
	selectCartItems,
	selectCartTotal,
} from '../../store/cart/cartSelector';

// Components
import CheckoutItem from '../../components/checkoutItem/CheckoutItem';
import PaymentForm from '../../components/paymentForm/PaymentForm';

const Checkout = () => {
	const cartItems = useSelector(selectCartItems);
	const cartTotal = useSelector(selectCartTotal);

	return (
		<CheckoutContainer>
			<CheckoutHeader>
				<HeaderBlock>
					<span>Product</span>
				</HeaderBlock>
				<HeaderBlock>
					<span>Description</span>
				</HeaderBlock>
				<HeaderBlock>
					<span>Quantity</span>
				</HeaderBlock>
				<HeaderBlock>
					<span>Price</span>
				</HeaderBlock>
				<HeaderBlock>
					<span>Remove</span>
				</HeaderBlock>
			</CheckoutHeader>

			{cartItems.map((cartItem) => (
				<CheckoutItem key={cartItem.id} cartItem={cartItem} />
			))}
			<Total>Total: £{cartTotal}</Total>
			<PaymentForm />
		</CheckoutContainer>
	);
};

export default Checkout;
