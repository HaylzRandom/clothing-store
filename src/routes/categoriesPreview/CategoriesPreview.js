import { useSelector } from 'react-redux';

// Redux
import { selectCategoriesMap } from '../../store/categories/categorySelector';

// Components
import CategoryPreview from '../../components/categoryPreview/CategoryPreview';

const CategoriesPreview = () => {
	const categoriesMap = useSelector(selectCategoriesMap);

	return (
		<>
			{Object.keys(categoriesMap).map((title) => {
				const products = categoriesMap[title];
				return (
					<CategoryPreview key={title} title={title} products={products} />
				);
			})}
		</>
	);
};

export default CategoriesPreview;
