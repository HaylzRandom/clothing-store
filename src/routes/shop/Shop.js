import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';

// Routes
import CategoriesPreview from '../categoriesPreview/CategoriesPreview';
import Category from '../category/Category';

import SHOP_DATA from '../../shopdata';

// Firebase Utils
import { addCollectionAndDocuments } from '../../utils/firebase/firebase';

import { fetchCategoriesStart } from '../../store/categories/categoryAction';

const Shop = () => {
	const dispatch = useDispatch();

	// Use while in development - Adds products to firebase
	/* useEffect(() => {
		addCollectionAndDocuments('categories', SHOP_DATA);
	}); */

	// Fetch items from firebase
	useEffect(() => {
		dispatch(fetchCategoriesStart());
	}, []);

	return (
		<Routes>
			<Route index element={<CategoriesPreview />} />
			<Route path=':category' element={<Category />} />
		</Routes>
	);
};

export default Shop;
