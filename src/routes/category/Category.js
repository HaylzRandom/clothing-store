import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Styles
import { Title, CategoryContainer } from './category.styles.js';

// Redux
import {
	selectCategoriesMap,
	selectCategoriesIsLoading,
} from '../../store/categories/categorySelector.js';

// Components
import ProductCard from '../../components/productCard/ProductCard';
import Spinner from '../../components/spinner/Spinner.js';

const Category = () => {
	const { category } = useParams();

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
