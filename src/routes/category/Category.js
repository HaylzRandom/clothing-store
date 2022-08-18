import { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

// Styles
import { Title, CategoryContainer } from './category.styles.js';

// Contexts
import { CategoriesContext } from '../../contexts/categories';

// Components
import ProductCard from '../../components/productCard/ProductCard';

const Category = () => {
	const { category } = useParams();
	const { categoriesMap } = useContext(CategoriesContext);

	const [products, setProducts] = useState(categoriesMap[category]);

	useEffect(() => {
		setProducts(categoriesMap[category]);
	}, [category, categoriesMap]);

	return (
		<>
			<Title>{category.toUpperCase()}</Title>
			<CategoryContainer>
				{products &&
					products.map((product) => (
						<ProductCard key={product.id} product={product} />
					))}
			</CategoryContainer>
		</>
	);
};

export default Category;
