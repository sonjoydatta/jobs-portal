import styled, { css } from 'styled-components';
import { ButtonProps } from './@types';

export const Button = styled.button<ButtonProps>`
	width: ${({ block }) => (block ? '100%' : 'fit-content')};
	height: auto;
	display: inline-block;
	text-align: center;
	outline: none;
	user-select: none;
	border-width: 1px;
	border-style: solid;
	cursor: pointer;
	font-weight: ${({ textBold }) => (textBold ? '600' : '400')};
	${({ variant = 'primary' }) => {
		switch (variant) {
			case 'link':
				return css`
					color: var(--primary);
					background-color: transparent;
					border-color: transparent;
					text-decoration: underline;
				`;
			default:
				return css`
					color: var(--white);
					background-color: var(--${variant});
					border-color: var(--${variant});
					text-decoration: none;
				`;
		}
	}}
	${({ size }) => {
		switch (size) {
			case 'sm':
				return css`
					padding: 0.438rem 1.25rem;
				`;
			case 'lg':
				return css`
					font-size: 1rem;
					padding: 0.875rem 1.25rem;
				`;
			default:
				return css`
					padding: 0.688rem 1.25rem;
				`;
		}
	}}
  box-shadow: ${({ shadow }) => (shadow ? '0 0.5rem 1rem rgba(0, 0, 0, 0.15)' : 'none')};
	border-radius: ${({ rounded }) =>
		rounded === 'circle' ? '50%' : rounded === 'pill' ? '50rem' : `var(--base-border-radius)`};
	transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);

	&:hover,
	&:focus {
		${({ variant }) => {
			switch (variant) {
				case 'link':
					return css`
						text-decoration: none;
					`;
				default:
					return css`
						background-color: var(--primary-hover)};
					`;
			}
		}}
	}

	&:disabled {
		cursor: default;
		${({ variant = 'primary' }) =>
			variant === 'primary'
				? css`
						background-color: #d2d2d2;
						border-color: #d2d2d2;
				  `
				: css`
						opacity: 0.5;
				  `}
	}
`;
