import { Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

// Assets
import { ReactComponent as CrownLogo } from '../../assets/crown.svg';

// Components
import CartIcon from '../../components/cartIcon/CartIcon';
import CartDropdown from '../../components/cartDropdown/CartDropdown';

// Redux
import { selectCurrentUser } from '../../store/user/userSelector';
import { selectIsCartOpen } from '../../store/cart/cartSelector';
import { signOutStart } from '../../store/user/userAction';

// Styles
import {
	NavigationContainer,
	LogoContainer,
	NavLinks,
	NavLink,
} from './navigation.styles';

const Navigation = () => {
	const dispatch = useDispatch();

	const currentUser = useSelector(selectCurrentUser);
	const isCartOpen = useSelector(selectIsCartOpen);

	const signOutUser = () => dispatch(signOutStart());

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
						<NavLink as='span' onClick={signOutUser}>
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
