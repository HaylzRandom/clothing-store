import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Firebase Utils
import {
	onAuthStateChangedListener,
	createUserDocumentFromAuth,
	getCurrentUser,
} from './utils/firebase/firebase';

// Components

// Routes
import Home from './routes/home/Home';
import Navigation from './routes/navigation/Navigation';
import Authentication from './routes/authentication/Authentication';
import Shop from './routes/shop/Shop';
import Checkout from './routes/checkout/Checkout';

// Redux Actions
import { checkUserSession } from './store/user/userAction';

const App = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(checkUserSession());
	}, []);

	return (
		<>
			<Routes>
				<Route path='/' element={<Navigation />}>
					<Route index element={<Home />} />
					<Route path='shop/*' element={<Shop />} />
					<Route path='auth' element={<Authentication />} />
					<Route path='checkout' element={<Checkout />} />
				</Route>
			</Routes>
			<ToastContainer />
		</>
	);
};

export default App;
