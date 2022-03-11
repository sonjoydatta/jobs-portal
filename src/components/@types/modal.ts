/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import { FC } from 'react';
import { StyledComponent } from 'styled-components';

export type ModalProperties = {
	Header: FC<Pick<ModalProps, 'onClose'>>;
	Title: StyledComponent<'div', any, {}, never>;
	Body: StyledComponent<'div', any, {}, never>;
	Footer: StyledComponent<'div', any, {}, never>;
};

export type ModalProps = {
	isOpen?: boolean;
	onClose?: () => void;
};
