import { USER_ACTIONS_TYPES } from './userTypes';

import {
	createAction,
	withMatcher,
	Action,
	ActionWithPayload,
} from '../../utils/reducer/reducer';
import { AdditionalInformation, UserData } from '../../utils/firebase/firebase';

export type CheckUserSession = Action<USER_ACTIONS_TYPES.CHECK_USER_SESSION>;

export type SetCurrentUser = ActionWithPayload<
	USER_ACTIONS_TYPES.SET_CURRENT_USER,
	UserData
>;

export type GoogleSignInStart = Action<USER_ACTIONS_TYPES.GOOGLE_SIGN_IN_START>;

export type EmailSignInStart = ActionWithPayload<
	USER_ACTIONS_TYPES.EMAIL_SIGN_IN_START,
	{ email: string; password: string }
>;

export type SignInSuccess = ActionWithPayload<
	USER_ACTIONS_TYPES.SIGN_IN_SUCCESS,
	UserData
>;

export type SignInFailed = ActionWithPayload<
	USER_ACTIONS_TYPES.SIGN_IN_FAILED,
	Error
>;

export type SignUpStart = ActionWithPayload<
	USER_ACTIONS_TYPES.SIGN_UP_START,
	{ email: string; password: string; displayName: string }
>;

export type SignUpSuccess = ActionWithPayload<
	USER_ACTIONS_TYPES.SIGN_UP_SUCCESS,
	{ user: UserData; additionalInformation: AdditionalInformation }
>;

export type SignUpFailed = ActionWithPayload<
	USER_ACTIONS_TYPES.SIGN_UP_FAILED,
	Error
>;

export type SignOutStart = Action<USER_ACTIONS_TYPES.SIGN_OUT_START>;

export type SignOutSuccess = Action<USER_ACTIONS_TYPES.SIGN_OUT_SUCCESS>;

export type SignOutFailed = ActionWithPayload<
	USER_ACTIONS_TYPES.SIGN_OUT_FAILED,
	Error
>;

export const checkUserSession = withMatcher((): CheckUserSession => {
	return createAction(USER_ACTIONS_TYPES.CHECK_USER_SESSION);
});

export const setCurrentUser = withMatcher((user: UserData): SetCurrentUser => {
	return createAction(USER_ACTIONS_TYPES.SET_CURRENT_USER, user);
});

export const googleSignInStart = withMatcher((): GoogleSignInStart => {
	return createAction(USER_ACTIONS_TYPES.GOOGLE_SIGN_IN_START);
});

export const emailSignInStart = withMatcher(
	(email: string, password: string): EmailSignInStart => {
		return createAction(USER_ACTIONS_TYPES.EMAIL_SIGN_IN_START, {
			email,
			password,
		});
	}
);

export const signInSuccess = withMatcher((user: UserData): SignInSuccess => {
	return createAction(USER_ACTIONS_TYPES.SIGN_IN_SUCCESS, user);
});

export const signInFailed = withMatcher((error: Error): SignInFailed => {
	return createAction(USER_ACTIONS_TYPES.SIGN_IN_FAILED, error);
});

export const signUpStart = withMatcher(
	(email: string, password: string, displayName: string): SignUpStart => {
		return createAction(USER_ACTIONS_TYPES.SIGN_UP_START, {
			email,
			password,
			displayName,
		});
	}
);

export const signUpSuccess = withMatcher(
	(
		user: UserData,
		additionalInformation: AdditionalInformation
	): SignUpSuccess => {
		return createAction(USER_ACTIONS_TYPES.SIGN_UP_SUCCESS, {
			user,
			additionalInformation,
		});
	}
);

export const signUpFailed = withMatcher((error: Error): SignUpFailed => {
	return createAction(USER_ACTIONS_TYPES.SIGN_UP_FAILED, error);
});

export const signOutStart = withMatcher((): SignOutStart => {
	return createAction(USER_ACTIONS_TYPES.SIGN_OUT_START);
});

export const signOutSuccess = withMatcher((): SignOutSuccess => {
	return createAction(USER_ACTIONS_TYPES.SIGN_OUT_SUCCESS);
});

export const signOutFailed = withMatcher((error: Error): SignOutFailed => {
	return createAction(USER_ACTIONS_TYPES.SIGN_OUT_FAILED, error);
});
