import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Firebase Utils
import {
	onAuthStateChangedListener,
	createUserDocumentFromAuth,
} from './utils/firebase/firebase';

// Components

// Routes
import Home from './routes/home/Home';
import Navigation from './routes/navigation/Navigation';
import Authentication from './routes/authentication/Authentication';
import Shop from './routes/shop/Shop';
import Checkout from './routes/checkout/Checkout';

// Redux Actions
import { setCurrentUser } from './store/user/userAction';

const App = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		const unsubscribe = onAuthStateChangedListener((user) => {
			if (user) {
				createUserDocumentFromAuth(user);
			}
			dispatch(setCurrentUser(user));
		});

		return unsubscribe;
		// eslint-disable-next-line
	}, [dispatch]);

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
