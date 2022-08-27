// Styles
import { AuthenticationContainer } from './authentication.styles';

// Component
import SignUpForm from '../../components/signUpForm/SignUpForm';
import SignInForm from '../../components/signInForm/SignInForm';

const Authentication = () => {
	return (
		<AuthenticationContainer>
			<SignInForm />
			<SignUpForm />
		</AuthenticationContainer>
	);
};

export default Authentication;
