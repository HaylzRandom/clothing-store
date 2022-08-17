import './directory.scss';

// Components
import DirectoryItem from '../directoryItem/DirectoryItem';

const Directory = ({ categories }) => {
	return (
		<div className='directory-container'>
			{categories.map((category) => (
				<DirectoryItem key={category.id} category={category} />
			))}
		</div>
	);
};

export default Directory;
