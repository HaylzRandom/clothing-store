import { Outlet, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Assets
import { ReactComponent as CrownLogo } from '../../assets/crown.svg';

// Components
import CartIcon from '../../components/cartIcon/CartIcon';
import CartDropdown from '../../components/cartDropdown/CartDropdown';

// Firebase Utils
import { signOutUser } from '../../utils/firebase/firebase';

// Redux
import { selectCurrentUser } from '../../store/user/userSelector';
import { selectIsCartOpen } from '../../store/cart/cartSelector';

// Styles
import {
	NavigationContainer,
	LogoContainer,
	NavLinks,
	NavLink,
} from './navigation.styles';

const Navigation = () => {
	const currentUser = useSelector(selectCurrentUser);
	const isCartOpen = useSelector(selectIsCartOpen);

	const signOutHandler = async () => {
		await signOutUser();
	};

	return (
		<>
			<NavigationContainer>
				<LogoContainer to='/'>
					<div>
						<CrownLogo />
					</div>
				</LogoContainer>

				<NavLinks>
					<NavLink to='/shop'>SHOP</NavLink>
					{currentUser ? (
						<NavLink as='span' onClick={signOutHandler}>
							SIGN OUT
						</NavLink>
					) : (
						<NavLink to='/auth'>SIGN IN</NavLink>
					)}
					<CartIcon />
				</NavLinks>

				{isCartOpen && <CartDropdown />}
			</NavigationContainer>
			<Outlet />
		</>
	);
};

export default Navigation;
