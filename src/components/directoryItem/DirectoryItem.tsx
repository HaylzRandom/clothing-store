import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { DirectoryCategory } from '../directory/Directory';

// Styles
import {
	DirectoryItemContainer,
	BackgroundImage,
	Body,
} from './directoryItem.styles';

type DirectoryItemsProps = {
	category: DirectoryCategory;
};

const DirectoryItem: FC<DirectoryItemsProps> = ({ category }) => {
	const { imageUrl, title, route } = category;
	const navigate = useNavigate();

	const onNavigateHandler = () => navigate(route);

	return (
		<DirectoryItemContainer onClick={onNavigateHandler}>
			<BackgroundImage imageUrl={imageUrl} />
			<Body>
				<h2>{title}</h2>
				<p>Shop Now</p>
			</Body>
		</DirectoryItemContainer>
	);
};

export default DirectoryItem;
