import styled from 'styled-components';
import { ModalProps } from '../@types';

export const ModalWrapper = styled.div<ModalProps>`
	position: fixed;
	top: 0;
	left: 0;
	display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
	opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
	width: 100%;
	height: 100%;
	overflow-x: hidden;
	overflow-y: auto;
	outline: 0;
	z-index: 1060;

	.modal {
		&-dialog {
			max-width: 31.25rem;
			height: calc(100% - 3.5rem);
			margin: 1.75rem auto;
			display: flex;
			align-items: center;
			pointer-events: none;
		}

		&-content {
			width: 100%;
			padding: 1.5rem;
			pointer-events: auto;
			background-color: var(--white);
			border-radius: var(--base-border-radius);
			box-shadow: 0 0.25rem 0.375rem -1px rgba(0, 0, 0, 0.1), 0 2px 0.25rem -2px rgba(0, 0, 0, 0.1);
		}
	}
`;
