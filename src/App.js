import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


// Components

// Routes
import Home from './routes/home/Home';
import Navigation from './routes/navigation/Navigation';
import Authentication from './routes/authentication/Authentication';

const Shop = () => {
	return <div>Shop Page</div>;
};

const App = () => {
	return (
		<>
			<Routes>
				<Route path='/' element={<Navigation />}>
					<Route index element={<Home />} />
					<Route path='shop' element={<Shop />} />
					<Route path='auth' element={<Authentication />} />
				</Route>
			</Routes>
			<ToastContainer />
		</>
	);
};

export default App;
