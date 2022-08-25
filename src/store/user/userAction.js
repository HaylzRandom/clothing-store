import { USER_ACTIONS_TYPES } from './userTypes';

import { createAction } from '../../utils/reducer/reducer';

export const setCurrentUser = (user) => {
	return createAction(USER_ACTIONS_TYPES.SET_CURRENT_USER, user);
};
