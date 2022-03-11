import styled, { css } from 'styled-components';
import {
	FormCheckProps,
	FormGroupProps,
	FormInputProps,
	FormLabelProps,
	FormMessageProps,
	FormTextareaProps,
} from '../@types';

export const FormGroup = styled.div<FormGroupProps>`
	display: block;
	width: 100%;
	margin-bottom: 1rem;
`;

export const FormLabel = styled.label<FormLabelProps>`
	margin-bottom: 0.5rem;
	display: inline-block;

	${({ srOnly }) => {
		if (srOnly) {
			return css`
				position: absolute;
				width: 1px;
				height: 1px;
				padding: 0;
				margin: -1px;
				overflow: hidden;
				clip: rect(0, 0, 0, 0);
				border: 0;
			`;
		}
		return null;
	}}
`;

export const FormInput = styled.input<FormInputProps>`
	display: block;
	width: 100%;
	height: auto;
	padding: 0.69rem 1rem;
	border: 1px solid ${({ variant = 'primary' }) => `var(--${variant})`};
	appearance: none;
	border-radius: var(--base-border-radius);
	box-shadow: none;
	transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

	&:focus {
		border-color: ${({ variant = 'primary' }) => `var(--${variant}-hover)`};
	}
`;

export const FormTextarea = styled.textarea<FormTextareaProps>`
	display: block;
	width: 100%;
	height: auto;
	padding: 1rem;
	border: 1px solid ${({ variant = 'primary' }) => `var(--${variant})`};
	appearance: none;
	border-radius: var(--base-border-radius);
	box-shadow: none;
	outline: none;
	transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

	&:focus {
		border-color: ${({ variant = 'primary' }) => `var(--${variant}-hover)`};
	}
`;

export const FormCheck = styled.input<FormCheckProps>`
	width: 1rem;
	height: 1rem;
	margin-right: 0.5rem;
	appearance: none;
	border: 1px solid ${({ variant = 'primary' }) => `var(--${variant})`};
	border-radius: ${({ type }) => (type === 'radio' ? '50%' : '0.25rem')};
	box-shadow: none;
	transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

	&:checked {
		background-color: var(--primary);
		border-color: var(--primary);

		&[type='checkbox'] {
			background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3e%3cpath fill='none' stroke='%23fff' stroke-linecap='round' stroke-linejoin='round' stroke-width='3' d='M6 10l3 3l6-6'/%3e%3c/svg%3e");
		}
	}
`;

export const FormMessage = styled.p<FormMessageProps>`
	margin: 0.25rem 0 0 0;
	color: ${({ variant = 'danger' }) => `var(--${variant})`};
`;
