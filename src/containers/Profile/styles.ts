import styled from 'styled-components';

export const ProfileContainer = styled.div`
	max-width: 48.75rem;
	margin: 1.25rem auto;
	padding: 0 1.25rem;

	.action-button {
		padding: 0;
		width: 3rem;
		height: 3rem;
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--text);

		&:hover {
			background-color: var(--gray-200);
		}
	}
`;
