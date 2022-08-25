import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

// Styles
import { SignUpContainer } from './signUpForm.styles.js';

// Firebase Utils
import {
	createAuthUserWithEmailAndPassword,
	createUserDocumentFromAuth,
} from '../../utils/firebase/firebase';

// Components
import FormInput from '../formInput/FormInput';
import Button from '../button/Button';

import { signUpStart } from '../../store/user/userAction.js';

const defaultFormFields = {
	displayName: '',
	email: '',
	password: '',
	confirmPassword: '',
};

const SignUpForm = () => {
	const [formFields, setFormFields] = useState(defaultFormFields);
	const { displayName, email, password, confirmPassword } = formFields;

	const dispatch = useDispatch();

	const resetFields = () => {
		setFormFields(defaultFormFields);
	};

	const handleChange = (e) => {
		const { name, value } = e.target;

		setFormFields({
			...formFields,
			[name]: value,
		});
	};

	// Sign up user with email and password
	const handleSubmit = async (e) => {
		e.preventDefault();

		if (password !== confirmPassword) {
			toast.error('Passwords do not match!');
			return;
		}

		try {
			dispatch(signUpStart(email, password, displayName));

			resetFields();
		} catch (error) {
			if (error.code === 'auth/email-already-in-use') {
				toast.error('E-mail in use, cannot create user');
			}
			toast.error(error);
		}
	};

	return (
		<SignUpContainer>
			<h2>Don't have an account?</h2>
			<span>Sign up with your email and password</span>
			<form onSubmit={handleSubmit}>
				<FormInput
					label='Display Name'
					htmlFor='displayName'
					type='text'
					name='displayName'
					onChange={handleChange}
					value={displayName}
					required
				/>

				<FormInput
					label='Email'
					htmlFor='email'
					type='email'
					name='email'
					onChange={handleChange}
					value={email}
					required
				/>

				<FormInput
					label='Password'
					htmlFor='password'
					type='password'
					name='password'
					onChange={handleChange}
					value={password}
					minLength='6'
					required
				/>

				<FormInput
					label='Confirm Password'
					htmlFor='confirmPassword'
					type='password'
					name='confirmPassword'
					onChange={handleChange}
					value={confirmPassword}
					minLength='6'
					required
				/>

				<Button type='submit'>Sign Up</Button>
			</form>
		</SignUpContainer>
	);
};

export default SignUpForm;
