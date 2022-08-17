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

import './navigation.scss';

const Navigation = () => {
	const { currentUser } = useContext(UserContext);
	const { isCartOpen } = useContext(CartContext);

	const signOutHandler = async () => {
		await signOutUser();
	};

	return (
		<>
			<div className='navigation'>
				<Link className='logo-container' to='/'>
					<div>
						<CrownLogo />
					</div>
				</Link>

				<div className='nav-links-container'>
					<Link className='nav-link' to='/shop'>
						SHOP
					</Link>
					{currentUser ? (
						<span className='nav-link' onClick={signOutHandler}>
							SIGN OUT
						</span>
					) : (
						<Link className='nav-link' to='/auth'>
							SIGN IN
						</Link>
					)}
					<CartIcon />
				</div>

				{isCartOpen && <CartDropdown />}
			</div>
			<Outlet />
		</>
	);
};

export default Navigation;
