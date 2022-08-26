import { USER_ACTIONS_TYPES } from './userTypes';

import { createAction } from '../../utils/reducer/reducer';

export const setCurrentUser = (user) => {
	return createAction(USER_ACTIONS_TYPES.SET_CURRENT_USER, user);
};

/*
CHECK_USER_SESSION: 'user/CHECK_USER_SESSION',
	GOOGLE_SIGN_IN_START: 'user/GOOGLE_SIGN_IN_START',
	EMAIL_SIGN_IN_START: 'user/EMAIL_SIGN_IN_START',
	SIGN_IN_SUCCESS: 'user/SIGN_IN_SUCCESS',
	SIGN_IN_FAILURE: 'user/SIGN_IN_FAILURE', */

export const checkUserSession = () => {
	return createAction(USER_ACTIONS_TYPES.CHECK_USER_SESSION);
};

export const googleSignInStart = () => {
	return createAction(USER_ACTIONS_TYPES.GOOGLE_SIGN_IN_START);
};

export const emailSignInStart = (email, password) => {
	return createAction(USER_ACTIONS_TYPES.EMAIL_SIGN_IN_START, {
		email,
		password,
	});
};

export const signInSuccess = (user) => {
	return createAction(USER_ACTIONS_TYPES.SIGN_IN_SUCCESS, user);
};

export const signInFailed = (error) => {
	return createAction(USER_ACTIONS_TYPES.SIGN_IN_FAILED, error);
};

export const signUpStart = (email, password, displayName) => {
	return createAction(USER_ACTIONS_TYPES.SIGN_UP_START, {
		email,
		password,
		displayName,
	});
};

export const signUpSuccess = (user, additionalInformation) => {
	return createAction(USER_ACTIONS_TYPES.SIGN_UP_SUCCESS, {
		user,
		additionalInformation,
	});
};

export const signUpFailed = (error) => {
	return createAction(USER_ACTIONS_TYPES.SIGN_UP_FAILED, error);
};

export const signOutStart = () => {
	return createAction(USER_ACTIONS_TYPES.SIGN_OUT_START);
};

export const signOutSuccess = () => {
	return createAction(USER_ACTIONS_TYPES.SIGN_OUT_SUCCESS);
};

export const signOutFailed = (error) => {
	return createAction(USER_ACTIONS_TYPES.SIGN_OUT_FAILED, error);
};
