import { createSelector } from 'reselect';

import { UserState } from './userReducer';

export const selectUserReducer = (state): UserState => {
	return state.user;
};

export const selectCurrentUser = createSelector(selectUserReducer, (user) => {
	return user.currentUser;
});
