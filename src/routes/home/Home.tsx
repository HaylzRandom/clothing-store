import { Outlet } from 'react-router-dom';

// Components
import Directory from '../../components/directory/Directory';

const Home = () => {
	return (
		<>
			<Directory />
			<Outlet />
		</>
	);
};

export default Home;
