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
			pointer-events: auto;
			background-color: var(--white);
			border-radius: var(--base-border-radius);
			box-shadow: 0 0.25rem 0.375rem -1px rgba(0, 0, 0, 0.1),
				0 2px 0.25rem -2px rgba(0, 0, 0, 0.1);
			max-height: 100%;
			overflow: hidden;
		}
	}
`;

export const ModalHeaderWrapper = styled.div`
	display: flex;
	flex-shrink: 0;
	align-items: center;
	justify-content: space-between;
	padding: 1rem 1.5rem;
	border-top-left-radius: calc(0.3rem - 1px);
	border-top-right-radius: calc(0.3rem - 1px);
	border-bottom: 1px solid var(--gray-200);

	.action-button {
		margin-top: -0.5rem;
		margin-bottom: -0.5rem;
		margin-right: -0.5rem;
	}
`;

export const ModalTitle = styled.h5`
	margin-bottom: 0;
`;

export const ModalBody = styled.div`
	padding: 1rem 1.5rem;
	overflow-y: auto;
	max-height: 30rem;
`;

export const ModalFooter = styled.div`
	display: flex;
	flex-wrap: wrap;
	flex-shrink: 0;
	align-items: center;
	justify-content: flex-end;
	padding: 1rem 1.5rem;
	border-bottom-right-radius: calc(0.3rem - 1px);
	border-bottom-left-radius: calc(0.3rem - 1px);
	border-top: 1px solid var(--gray-200);
`;
