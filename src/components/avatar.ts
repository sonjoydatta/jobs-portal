import styled, { css } from 'styled-components';
import { AvatarProps } from './@types';

export const Avatar = styled.div<AvatarProps>`
	${({ size }) => {
		switch (size) {
			case 'sm':
				return css`
					width: 1.125rem;
					height: 1.125rem;
					line-height: 1.125rem;
				`;
			case 'md':
				return css`
					width: 1.5rem;
					height: 1.5rem;
					line-height: 1.5rem;
				`;
			case 'lg':
				return css`
					width: 3rem;
					height: 3rem;
					line-height: 3rem;
				`;
			default:
				return css`
					width: 7rem;
					height: 7rem;
					line-height: 7rem;
				`;
		}
	}}
	display: inline-block;
	overflow: hidden;
	white-space: nowrap;
	text-align: center;
	vertical-align: middle;
	background-color: var(--white);
	border-radius: 50%;

	img {
		width: 100%;
	}
`;
