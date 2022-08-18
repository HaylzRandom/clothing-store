// Styles
import { FormInputLabel, Input, Group } from './formInput.styles.js';

const FormInput = ({ label, htmlFor, ...otherProps }) => {
	return (
		<Group>
			<Input {...otherProps} />
			{label && (
				<FormInputLabel shrink={otherProps.value.length} htmlFor={htmlFor}>
					{label}
				</FormInputLabel>
			)}
		</Group>
	);
};

export default FormInput;
