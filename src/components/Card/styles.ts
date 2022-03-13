import styled from 'styled-components';

export const CardWrapper = styled.div`
	width: 100%;
	display: block;
	padding: 1.5rem;
	background-color: var(--white);
	border-radius: var(--base-border-radius);
	box-shadow: 0 0.25rem 0.375rem -1px rgba(0, 0, 0, 0.1),
		0 2px 0.25rem -2px rgba(0, 0, 0, 0.1);

	& + & {
		margin-top: 1.25rem;
	}
`;

export const CardHeader = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
`;

export const CardTitle = styled.h2`
	margin: 0;
	justify-content: space-between;
	flex-grow: 1;
	flex-direction: column;
	align-items: flex-start;
	font-size: 1.5rem;
`;
