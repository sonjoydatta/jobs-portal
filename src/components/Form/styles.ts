import styled, { css } from 'styled-components';
import {
	FormCheckProps,
	FormGroupProps,
	FormInputProps,
	FormLabelProps,
	FormMessageProps,
	FormSelectProps,
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
	border: 1px solid ${({ variant }) => `var(--${variant ?? 'gray-300'})`};
	appearance: none;
	border-radius: var(--base-border-radius);
	box-shadow: none;
	transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

	&:focus {
		box-shadow: 0 0 0 2px
			${({ variant = 'primary' }) => `var(--${variant}-outline)`};
		border-color: ${({ variant = 'primary' }) => `var(--${variant})`};
	}
`;

export const FormTextarea = styled.textarea<FormTextareaProps>`
	display: block;
	width: 100%;
	height: auto;
	padding: 1rem;
	border: 1px solid ${({ variant }) => `var(--${variant ?? 'gray-300'})`};
	appearance: none;
	border-radius: var(--base-border-radius);
	box-shadow: none;
	outline: none;
	transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

	&:focus {
		box-shadow: 0 0 0 2px
			${({ variant = 'primary' }) => `var(--${variant}-outline)`};
		border-color: ${({ variant = 'primary' }) => `var(--${variant})`};
	}
`;

export const FormCheck = styled.input<FormCheckProps>`
	width: 1rem;
	height: 1rem;
	margin-right: 0.5rem;
	appearance: none;
	border: 1px solid ${({ variant }) => `var(--${variant ?? 'gray-300'})`};
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

export const FormSelect = styled.select<FormSelectProps>`
	display: block;
	width: 100%;
	height: auto;
	padding: 0.69rem 2rem 0.69rem 1rem;
	border: 1px solid ${({ variant }) => `var(--${variant ?? 'gray-300'})`};
	appearance: none;
	background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23343a40' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M2 5l6 6 6-6'/%3e%3c/svg%3e");
	background-repeat: no-repeat;
	background-position: right 0.75rem center;
	background-size: 16px 12px;
	border-radius: var(--base-border-radius);
	box-shadow: none;
	transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

	&:focus {
		box-shadow: 0 0 0 2px
			${({ variant = 'primary' }) => `var(--${variant}-outline)`};
		border-color: ${({ variant = 'primary' }) => `var(--${variant})`};
	}
`;
