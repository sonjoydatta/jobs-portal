import styled from 'styled-components';

export const ProfileContainer = styled.div`
	max-width: 780px;
	margin: 20px auto;
	padding: 24px;
	background-color: var(--white);
	border-radius: ${({ theme }) => theme.border.radius};
	box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.15), 0 2px 3px rgba(0, 0, 0, 0.2);
`;

export const HeaderWrapper = styled.div`
	display: flex;
	flex-direction: column;
	position: relative;

	.header {
		&-title {
			font-size: 24px;
			font-weight: bold;
			margin-bottom: 0;
		}

		&-subtitle {
			font-size: 16px;
			font-weight: normal;
			margin-bottom: 8px;
		}

		&-edit__button {
			padding: 0;
			width: 48px;
			height: 48px;
			display: flex;
			align-items: center;
			justify-content: center;
			color: var(--text);
			position: absolute;
			top: 0;
			right: 0;

			&:hover {
				background-color: var(--gray-200);
			}
		}
	}
`;
