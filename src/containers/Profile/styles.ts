import { Card } from '@/components';
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

export const CardHeader = styled(Card.Header)`
	.content {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		flex-grow: 1;
		flex-direction: column;
		align-items: flex-start;

		&-title {
			margin-top: 0.5rem;
		}

		&-subtitle {
			font-size: 1rem;
			font-weight: normal;
			margin-bottom: 0.5rem;
		}
	}
`;
