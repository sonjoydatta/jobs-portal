/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import { StyledComponent } from 'styled-components';

type PropertyType = 'Header' | 'Body' | 'Footer';
export type ModalProperties = Record<PropertyType, StyledComponent<'div', any, {}, never>>;

export type ModalProps = {
	isOpen?: boolean;
	onClose?: () => void;
};
