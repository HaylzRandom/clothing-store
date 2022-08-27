import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Styles
import { Title, CategoryContainer } from './category.styles';

// Redux
import {
	selectCategoriesMap,
	selectCategoriesIsLoading,
} from '../../store/categories/categorySelector';

// Components
import ProductCard from '../../components/productCard/ProductCard';
import Spinner from '../../components/spinner/Spinner';

type CategoryRouteParams = {
	category: string;
};

const Category = () => {
	const { category } = useParams<
		keyof CategoryRouteParams
	>() as CategoryRouteParams;

	const categoriesMap = useSelector(selectCategoriesMap);
	const isLoading = useSelector(selectCategoriesIsLoading);

	const [products, setProducts] = useState(categoriesMap[category]);

	useEffect(() => {
		setProducts(categoriesMap[category]);
	}, [category, categoriesMap]);

	return (
		<>
			<Title>{category.toUpperCase()}</Title>
			{isLoading ? (
				<Spinner />
			) : (
				<CategoryContainer>
					{products &&
						products.map((product) => (
							<ProductCard key={product.id} product={product} />
						))}
				</CategoryContainer>
			)}
		</>
	);
};

export default Category;
