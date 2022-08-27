import styled from 'styled-components';

import Button from '../button/Button';

export const PaymentFormContainer = styled.div`
	height: 300px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

export const FormContainer = styled.form`
	height: 100px;
	min-width: 500px;
`;

export const PaymentButton = styled(Button)`
	margin-left: auto;
	margin-top: 30px;
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
