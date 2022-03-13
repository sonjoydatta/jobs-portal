import { ButtonHTMLAttributes } from 'react';
import { Rounded, Size, Variant } from './index';

type ButtonSize = Extract<Size, 'sm' | 'md' | 'lg'>;
type ButtonVariant =
	| Extract<Variant, 'primary' | 'success' | 'danger'>
	| 'link';
type ButtonRounded = Extract<Rounded, 'pill' | 'circle'>;

export type ButtonProps = {
	size?: ButtonSize;
	variant?: ButtonVariant;
	rounded?: ButtonRounded;
	block?: boolean;
	textBold?: boolean;
	shadow?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;
