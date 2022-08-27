import { createSelector } from 'reselect';

import { RootState } from '../store';

import { CategoriesState } from './categoryReducer';
import { CategoryMap } from './categoryTypes';

const selectCategoryReducer = (state: RootState): CategoriesState =>
	state.categories;

export const selectCategories = createSelector(
	[selectCategoryReducer],
	(categoriesSlice) => {
		return categoriesSlice.categories;
	}
);

export const selectCategoriesMap = createSelector(
	[selectCategories],
	(categories): CategoryMap => {
		return categories.reduce((acc, { title, items }) => {
			acc[title.toLowerCase()] = items;
			return acc;
		}, {} as CategoryMap);
	}
);

export const selectCategoriesIsLoading = createSelector(
	[selectCategoryReducer],
	(categoriesSlice) => {
		return categoriesSlice.isLoading;
	}
);
