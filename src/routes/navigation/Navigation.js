import { Outlet, Link } from 'react-router-dom';

// Assets
import { ReactComponent as CrownLogo } from '../../assets/crown.svg';

import './navigation.scss';

const Navigation = () => {
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
				</div>
			</div>
			<Outlet />
		</>
	);
};

export default Navigation;
