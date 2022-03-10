import styled, { css } from 'styled-components';
import { AvatarProps } from './@types';

export const Avatar = styled.div<AvatarProps>`
	${({ size }) => {
		switch (size) {
			case 'sm':
				return css`
					width: 18px;
					height: 18px;
					line-height: 18px;
				`;
			case 'md':
				return css`
					width: 24px;
					height: 24px;
					line-height: 24px;
				`;
			case 'lg':
				return css`
					width: 48px;
					height: 48px;
					line-height: 48px;
				`;
			default:
				return css`
					width: 152px;
					height: 152px;
					line-height: 152px;
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
