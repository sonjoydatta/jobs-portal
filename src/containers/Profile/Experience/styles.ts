import styled from 'styled-components';

export const Wrapper = styled.ul`
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	list-style-type: none;
	margin: 0;
	padding: 0;
`;

export const ListItem = styled.li`
	display: flex;
	flex-direction: row;
	gap: 10px;
	width: 100%;
	padding: 0.875rem 0 0 0;

	&:first-child {
		padding-top: 0;
	}

	& + & {
		margin-top: 0.875rem;
		border-top: 1px solid var(--gray-200);
	}

	.organisation {
		&-info {
			width: calc(100% - 3rem);
			display: flex;
			flex-direction: column;
			position: relative;

			p {
				margin-bottom: 0.125rem;
			}

			&__title {
				font-size: 1.125rem;
				font-weight: bold;
				margin-bottom: 0.125rem;
			}

			&__date {
				color: var(--gray-600);
			}

			&__description {
				margin-top: 0.5rem;
			}

			.action-button {
				position: absolute;
				right: 0;
				top: 0;
			}
		}
	}

	@media (max-width: 36rem) {
		flex-direction: column;

		.organisation {
			&-info {
				width: 100%;

				.action-button {
					top: -3.625rem;
				}
			}
		}
	}
`;
