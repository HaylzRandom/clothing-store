import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

// Styles
import { SignInContainer, ButtonsContainer } from './signInForm.styles';

// Components
import FormInput from '../formInput/FormInput';
import Button, { BUTTON_TYPE_CLASSES } from '../button/Button';

import {
	googleSignInStart,
	emailSignInStart,
} from '../../store/user/userAction';
import { onEmailSignInStart } from '../../store/user/userSaga';

const defaultFormFields = {
	email: '',
	password: '',
};

const SignInForm = () => {
	const dispatch = useDispatch();
	const [formFields, setFormFields] = useState(defaultFormFields);
	const { email, password } = formFields;

	const resetFields = () => {
		setFormFields(defaultFormFields);
	};

	// Sign in with Google
	const signInWithGoogle = async () => {
		dispatch(googleSignInStart());
	};

	const handleChange = (e) => {
		const { name, value } = e.target;

		setFormFields({
			...formFields,
			[name]: value,
		});
	};

	// Sign in with email and password
	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			dispatch(emailSignInStart(email, password));

			resetFields();
		} catch (error) {
			switch (error.code) {
				case 'auth/wrong-password':
					toast.error('Incorrect password');
					break;
				case 'auth/user-not-found':
					toast.error('No user associated with email');
				default:
					console.log(error);
			}
		}
	};

	return (
		<SignInContainer>
			<h2>Already have an account?</h2>
			<span>Sign in with your email and password</span>
			<form onSubmit={handleSubmit}>
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
					required
				/>

				<ButtonsContainer>
					<Button type='submit'>Sign In</Button>
					<Button
						type='button'
						buttonType={BUTTON_TYPE_CLASSES.google}
						onClick={signInWithGoogle}
					>
						Sign in with Google
					</Button>
				</ButtonsContainer>
			</form>
		</SignInContainer>
	);
};

export default SignInForm;
