// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
	getFirestore,
	doc,
	getDoc,
	setDoc,
	connectFirestoreEmulator,
} from 'firebase/firestore';
import {
	connectAuthEmulator,
	getAuth,
	signInWithRedirect,
	signInWithPopup,
	signInWithEmailAndPassword,
	GoogleAuthProvider,
	createUserWithEmailAndPassword,
	signOut,
	onAuthStateChanged,
} from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyCfUkRmlCFCOhMNl2ctL6Owv4j-I9d12eE',
	authDomain: 'clothing-store-ffcd6.firebaseapp.com',
	projectId: 'clothing-store-ffcd6',
	storageBucket: 'clothing-store-ffcd6.appspot.com',
	messagingSenderId: '278507830040',
	appId: '1:278507830040:web:7ecff846698fda168a3c6d',
};

// Initialize Firebase
initializeApp(firebaseConfig);

// Sign In with Google Auth provider
const provider = new GoogleAuthProvider();

provider.setCustomParameters({
	prompt: 'select_account',
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const signInWithGoogleRedirect = () =>
	signInWithRedirect(auth, provider);

// Firestore
export const db = getFirestore();

// Add user to firestore db
export const createUserDocumentFromAuth = async (
	userAuth,
	additionalInformation = {}
) => {
	if (!userAuth) return;

	const userDocRef = doc(db, 'users', userAuth.uid);

	const userSnapshot = await getDoc(userDocRef);
	/* 	console.log(userSnapshot);
	console.log(userSnapshot.exists()); */

	// If user data does not exist
	// Create / set document with the data from userAuth in collection
	if (!userSnapshot.exists()) {
		const { displayName, email } = userAuth;
		const createdAt = new Date();

		try {
			await setDoc(userDocRef, {
				displayName,
				email,
				createdAt,
				...additionalInformation,
			});
		} catch (error) {
			console.log('Error creating user', error.message);
		}
	}

	// If user data exists
	return userDocRef;
};

// Create user with e-mail and password
export const createAuthUserWithEmailAndPassword = async (email, password) => {
	if (!email || !password) return;

	return await createUserWithEmailAndPassword(auth, email, password);
};

// Sign in user with email and password
export const signInAuthUserWithEmailAndPassword = async (email, password) => {
	if (!email || !password) return;

	return await signInWithEmailAndPassword(auth, email, password);
};

// Sign out of account
export const signOutUser = async () => await signOut(auth);

// Listens for changes in state
export const onAuthStateChangedListener = (callback) =>
	onAuthStateChanged(auth, callback);

// Testing purposes
if (process.env.NODE_ENV !== 'production') {
	connectFirestoreEmulator(db, 'localhost', 8080);
	connectAuthEmulator(auth, 'http://localhost:9099');
}
