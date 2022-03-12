import {
	HTMLAttributes,
	InputHTMLAttributes,
	LabelHTMLAttributes,
	ReactNode,
	SelectHTMLAttributes,
	TextareaHTMLAttributes,
} from 'react';
import { Variant } from './index';

type FormVariant = Extract<Variant, 'primary' | 'success' | 'danger'>;

export type FormGroupProps = {
	children: ReactNode;
};

export type FormLabelProps = {
	srOnly?: boolean;
} & LabelHTMLAttributes<HTMLLabelElement>;

export type FormInputProps = {
	variant?: FormVariant;
} & InputHTMLAttributes<HTMLInputElement>;

export type FormCheckProps = {
	type?: 'checkbox' | 'radio';
} & Omit<FormInputProps, 'type'>;

export type FormTextareaProps = {
	variant?: FormVariant;
} & TextareaHTMLAttributes<HTMLTextAreaElement>;

export type FormSelectProps = {
	variant?: FormVariant;
} & SelectHTMLAttributes<HTMLSelectElement>;

export type FormMessageProps = {
	message?: ReactNode;
	variant?: FormVariant;
};

export type FormItemProps = {
	labelProps?: {
		labelText?: string;
	} & FormLabelProps;
	inputProps?: Omit<FormInputProps, 'variant'>;
} & FormMessageProps &
	HTMLAttributes<HTMLDivElement>;

export type FormItemCheckProps = {
	labelProps?: {
		labelText?: string;
	} & FormLabelProps;
	inputProps?: Omit<FormCheckProps, 'variant'>;
} & FormMessageProps &
	HTMLAttributes<HTMLDivElement>;

export type FormItemSelectProps = {
	labelProps?: {
		labelText?: string;
	} & FormLabelProps;
	selectProps?: Omit<FormSelectProps, 'variant'>;
	options?: {
		value: string | number;
		label: string;
	}[];
} & FormMessageProps &
	HTMLAttributes<HTMLDivElement>;
