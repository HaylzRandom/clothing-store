import { takeLatest, put, all, call } from 'redux-saga/effects';

import { USER_ACTIONS_TYPES } from './userTypes';

import {
	signInSuccess,
	signInFailed,
	googleSignInStart,
	emailSignInStart,
	signUpSuccess,
	signUpFailed,
	signOutSuccess,
	signOutFailed,
} from './userAction';

// Firebase Utils
import {
	getCurrentUser,
	createUserDocumentFromAuth,
	signInWithGooglePopup,
	signInAuthUserWithEmailAndPassword,
	createAuthUserWithEmailAndPassword,
	signOutUser,
} from '../../utils/firebase/firebase';

export function* getSnapshotFromUserAuth(userAuth, additionalInformation) {
	try {
		const userSnapshot = yield call(
			createUserDocumentFromAuth,
			userAuth,
			additionalInformation
		);

		yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
	} catch (error) {
		yield put(signInFailed(error));
	}
}

export function* signInWithGoogle() {
	try {
		const { user } = yield call(signInWithGooglePopup);
		yield call(getSnapshotFromUserAuth, user);
	} catch (error) {
		yield put(signInFailed(error));
	}
}

export function* signInWithEmailAndPassword({ payload: { email, password } }) {
	try {
		const { user } = yield call(
			signInAuthUserWithEmailAndPassword,
			email,
			password
		);
		yield call(getSnapshotFromUserAuth, user);
	} catch (error) {
		yield put(signInFailed(error));
	}
}

export function* isUserAuthenticated() {
	try {
		const userAuth = yield call(getCurrentUser);

		// If userAuth is null
		if (!userAuth) return;

		yield call(getSnapshotFromUserAuth, userAuth);
	} catch (error) {
		yield put(signInFailed(error));
	}
}

export function* signUp({ payload: { email, password, displayName } }) {
	try {
		const { user } = yield call(
			createAuthUserWithEmailAndPassword,
			email,
			password
		);
		yield put(signUpSuccess(user, { displayName }));
	} catch (error) {
		yield put(signUpFailed(error));
	}
}

export function* signOut() {
	try {
		yield call(signOutUser);
		yield put(signOutSuccess());
	} catch (error) {
		yield put(signOutFailed(error));
	}
}

export function* signInAfterSignUp({
	payload: { user, additionalInformation },
}) {
	yield call(getSnapshotFromUserAuth, user, additionalInformation);
}

export function* onGoogleSignInStart() {
	yield takeLatest(USER_ACTIONS_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* onEmailSignInStart() {
	yield takeLatest(
		USER_ACTIONS_TYPES.EMAIL_SIGN_IN_START,
		signInWithEmailAndPassword
	);
}

export function* onCheckUserSession() {
	yield takeLatest(USER_ACTIONS_TYPES.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* onSignUpStart() {
	yield takeLatest(USER_ACTIONS_TYPES.SIGN_UP_START, signUp);
}

export function* onSignUpSuccess() {
	yield takeLatest(USER_ACTIONS_TYPES.SIGN_UP_SUCCESS, signInAfterSignUp);
}

export function* onSignOutStart() {
	yield takeLatest(USER_ACTIONS_TYPES.SIGN_OUT_START, signOut);
}

export function* userSagas() {
	yield all([
		call(onCheckUserSession),
		call(onGoogleSignInStart),
		call(onEmailSignInStart),
		call(onSignUpStart),
		call(onSignUpSuccess),
		call(onSignOutStart),
	]);
}