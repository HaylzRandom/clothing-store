import { useEffect, lazy, Suspense } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Components
import Spinner from './components/spinner/Spinner';

// Redux Actions
import { checkUserSession } from './store/user/userAction';

// Routes
const Home = lazy(() => import('./routes/home/Home'));
const Navigation = lazy(() => import('./routes/navigation/Navigation'));
const Authentication = lazy(() =>
	import('./routes/authentication/Authentication')
);
const Shop = lazy(() => import('./routes/shop/Shop'));
const Checkout = lazy(() => import('./routes/checkout/Checkout'))

const App = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(checkUserSession());
		// eslint-disable-next-line
	}, []);

	return (
		<Suspense fallback={<Spinner />}>
			<Routes>
				<Route path='/' element={<Navigation />}>
					<Route index element={<Home />} />
					<Route path='shop/*' element={<Shop />} />
					<Route path='auth' element={<Authentication />} />
					<Route path='checkout' element={<Checkout />} />
				</Route>
			</Routes>
			<ToastContainer />
		</Suspense>
	);
};

export default App;
