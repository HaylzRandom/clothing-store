import { InputHTMLAttributes, FC } from 'react';

// Styles
import { FormInputLabel, Input, Group } from './formInput.styles';

type FormInputProps = {
	label: string;
	htmlFor: string;
	minLength?: number;
} & InputHTMLAttributes<HTMLInputElement>;

const FormInput: FC<FormInputProps> = ({ label, htmlFor, ...otherProps }) => {
	return (
		<Group>
			<Input {...otherProps} />
			{label && (
				<FormInputLabel
					shrink={Boolean(
						otherProps.value &&
							typeof otherProps.value === 'string' &&
							otherProps.value.length
					)}
					htmlFor={htmlFor}
				>
					{label}
				</FormInputLabel>
			)}
		</Group>
	);
};

export default FormInput;
