import { useContext } from 'react';

// Contexts
import { CategoriesContext } from '../../contexts/categories';

// Components
import CategoryPreview from '../../components/categoryPreview/CategoryPreview';

const CategoriesPreview = () => {
	const { categoriesMap } = useContext(CategoriesContext);

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
