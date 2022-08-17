import { createContext, useState, useEffect } from 'react';

import SHOP_DATA from '../shopdata';

// Firebase Utils
import {
	addCollectionAndDocuments,
	getCategoriesAndDocuments,
} from '../utils/firebase/firebase';

// Actual value you want to access
export const CategoriesContext = createContext({
	categoriesMap: [],
});

export const CategoriesProvider = ({ children }) => {
	const [categoriesMap, setcategoriesMap] = useState({});

	// Use while in development - Adds products to firebase
	/* useEffect(() => {
		addCollectionAndDocuments('categories', SHOP_DATA);
	}); */

	// Fetch items from firebase
	useEffect(() => {
		const getCategoriesMap = async () => {
			const categoryMap = await getCategoriesAndDocuments();
			console.log(categoryMap);
			setcategoriesMap(categoryMap);
		};
		getCategoriesMap();
	}, []);

	const value = { categoriesMap };
	return (
		<CategoriesContext.Provider value={value}>
			{children}
		</CategoriesContext.Provider>
	);
};
