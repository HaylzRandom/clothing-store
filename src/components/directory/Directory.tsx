import { Key } from 'react';

// Styles
import { DirectoryContainer } from './directory.styles';

// Components
import DirectoryItem from '../directoryItem/DirectoryItem';

export type DirectoryCategory = {
	id: Key;
	title: string;
	imageUrl: string;
	route: string;
};

const categories = [
	{
		id: 1,
		title: 'Hats',
		imageUrl: 'https://i.ibb.co/cvpntL1/hats.png',
		route: 'shop/hats',
	},
	{
		id: 2,
		title: 'Jackets',
		imageUrl: 'https://i.ibb.co/px2tCc3/jackets.png',
		route: 'shop/jackets',
	},
	{
		id: 3,
		title: 'Trainers',
		imageUrl: 'https://i.ibb.co/0jqHpnp/sneakers.png',
		route: 'shop/trainers',
	},
	{
		id: 4,
		title: 'Womens',
		imageUrl: 'https://i.ibb.co/GCCdy8t/womens.png',
		route: 'shop/womens',
	},
	{
		id: 5,
		title: 'Mens',
		imageUrl: 'https://i.ibb.co/R70vBrQ/men.png',
		route: 'shop/mens',
	},
];

const Directory = () => {
	return (
		<DirectoryContainer>
			{categories.map((category) => (
				<DirectoryItem key={category.id} category={category} />
			))}
		</DirectoryContainer>
	);
};

export default Directory;
