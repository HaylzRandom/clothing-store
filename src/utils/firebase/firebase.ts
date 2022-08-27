// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
	getFirestore,
	doc,
	getDoc,
	setDoc,
	collection,
	writeBatch,
	query,
	getDocs,
	connectFirestoreEmulator,
	QueryDocumentSnapshot,
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
	NextOrObserver,
	User,
} from 'firebase/auth';

import { Category } from '../../store/categories/categoryTypes';

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

export type ObjectToAdd = {
	title: string;
};

// Add objects to firebase
export const addCollectionAndDocuments = async <T extends ObjectToAdd>(
	collectionKey: string,
	objectsToAdd: T[]
): Promise<void> => {
	const collectionRef = collection(db, collectionKey);
	const batch = writeBatch(db);

	objectsToAdd.forEach((object) => {
		const docRef = doc(collectionRef, object.title.toLowerCase());
		batch.set(docRef, object);
	});

	await batch.commit();
	console.log('Complete');
};

// Fetch products from firebase
export const getCategoriesAndDocuments = async (): Promise<Category[]> => {
	const collectionRef = collection(db, 'categories');

	const q = query(collectionRef);

	const querySnapshot = await getDocs(q);
	return querySnapshot.docs.map((docSnaphot) => docSnaphot.data() as Category);
};

export type AdditionalInformation = {
	displayName?: string;
};

export type UserData = {
	createdAt: Date;
	displayName: string;
	email: string;
};

// Add user to firestore db
export const createUserDocumentFromAuth = async (
	userAuth: User,
	additionalInformation = {} as AdditionalInformation
): Promise<void | QueryDocumentSnapshot<UserData>> => {
	if (!userAuth) return;

	const userDocRef = doc(db, 'users', userAuth.uid);

	const userSnapshot = await getDoc(userDocRef);

	// If user data does not exist
	// Create / set document with the data from userAuth in collection
	if (!userSnapshot.exists()) {
		console.log(userAuth);
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
			console.log('Error creating user', error);
		}
	}

	// If user data exists
	return userSnapshot as QueryDocumentSnapshot<UserData>;
};

// Create user with e-mail and password
export const createAuthUserWithEmailAndPassword = async (
	email: string,
	password: string
) => {
	if (!email || !password) return;

	return await createUserWithEmailAndPassword(auth, email, password);
};

// Sign in user with email and password
export const signInAuthUserWithEmailAndPassword = async (
	email: string,
	password: string
) => {
	if (!email || !password) return;

	return await signInWithEmailAndPassword(auth, email, password);
};

// Sign out of account
export const signOutUser = async () => await signOut(auth);

// Listens for changes in state
export const onAuthStateChangedListener = (callback: NextOrObserver<User>) =>
	onAuthStateChanged(auth, callback);

export const getCurrentUser = (): Promise<User | null> => {
	return new Promise((resolve, reject) => {
		const unsubscribe = onAuthStateChanged(
			auth,
			(userAuth) => {
				unsubscribe();
				resolve(userAuth);
			},
			reject
		);
	});
};

// Testing purposes
if (process.env.NODE_ENV !== 'production') {
	connectFirestoreEmulator(db, 'localhost', 8080);
	connectAuthEmulator(auth, 'http://localhost:9099');
}
