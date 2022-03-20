import { Avatar, AvatarProps, Card } from '@/components';
import styled from 'styled-components';

type ProfileAvatarProps = {
	isEditable?: boolean;
	isLoading?: boolean;
} & AvatarProps;

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

export const ProfileAvatar = styled(Avatar)<ProfileAvatarProps>`
	position: relative;
	cursor: ${({ isEditable, isLoading }) =>
		isEditable && !isLoading ? 'pointer' : 'default'};

	&:after,
	&:before {
		content: 'Add photo';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		opacity: 0;
		color: var(--white);
		background-color: rgba(0, 0, 0, 0.25);
		transition: opacity 0.3s ease-in-out;
	}

	&:before {
		content: 'Please wait...';
		opacity: ${({ isLoading }) => (isLoading ? 1 : 0)};
	}

	&:hover {
		&:after {
			opacity: ${({ isEditable, isLoading }) =>
				isEditable && !isLoading ? 1 : 0};
		}
	}
`;
