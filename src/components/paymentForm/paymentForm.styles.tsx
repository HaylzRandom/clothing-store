import styled from 'styled-components';
import Button from '../button/Button';

import { CardElement } from '@stripe/react-stripe-js';

export const PaymentFormContainer = styled.div`
	max-height: 300px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

export const FormContainer = styled.form`
	height: 100px;
	min-width: 500px;

	@media screen and (max-width: 400px) {
		min-width: 80%;
	}
`;

export const PaymentButton = styled(Button)`
	margin-left: auto;
	margin-top: 30px;
	width: 100%;
`;

export const TestingDetails = styled.div`
	font-size: 10px;
	p {
		font-weight: bold;
	}
	span {
		font-weight: lighter;
	}
`;
