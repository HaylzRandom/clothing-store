import styled from 'styled-components';

export const SignUpContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 380px;

	h2 {
		margin: 10px 0;
	}

	@media screen and (max-width: 800px) {
		padding: 10px 30px;
		width: 100%;

		button {
			width: 100%;
		}
	}

	@media screen and (max-width: 400px) {
		padding: 10px 30px;
		width: 100%;
		text-align: center;
		align-items: center;

		button {
			width: 100%;
		}
	}
`;
