import { Routes, Route } from 'react-router-dom';

// Components

// Routes
import Home from './routes/home/Home';
import Navigation from './routes/navigation/Navigation';

const App = () => {
	return (
		<Routes>
			<Route path='/' element={<Navigation />}>
				<Route index element={<Home />} />
			</Route>
		</Routes>
	);
};

export default App;
