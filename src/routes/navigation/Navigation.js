import { useContext } from 'react';
import { Outlet, Link } from 'react-router-dom';

// Assets
import { ReactComponent as CrownLogo } from '../../assets/crown.svg';

// Contexts
import { UserContext } from '../../contexts/user';
import { CartContext } from '../../contexts/cart';

// Components
import CartIcon from '../../components/cartIcon/CartIcon';
import CartDropdown from '../../components/cartDropdown/CartDropdown';

// Firebase Utils
import { signOutUser } from '../../utils/firebase/firebase';

// Styles
import {
	NavigationContainer,
	LogoContainer,
	NavLinks,
	NavLink,
} from './navigation.styles';

const Navigation = () => {
	const { currentUser } = useContext(UserContext);
	const { isCartOpen } = useContext(CartContext);

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
