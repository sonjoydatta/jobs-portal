import { useOnClickOutside } from '@/libs/hooks';
import { FC, useEffect, useRef } from 'react';
import { ModalProps } from '../@types';
import { ModalWrapper } from './styles';

export const Modal: FC<ModalProps> = ({ children, onClose, ...rest }) => {
	const contentRef = useRef<HTMLDivElement>(null);
	useOnClickOutside(contentRef, () => onClose?.());

	useEffect(() => {
		const backdrop = document.createElement('div');
		backdrop.classList.add('modal-backdrop');

		const addBackdrop = () => {
			document.body.appendChild(backdrop);
		};

		const removeBackdrop = () => {
			if (document.body.contains(backdrop)) {
				document.body.removeChild(backdrop);
			}
		};

		if (rest.isOpen) {
			addBackdrop();
		} else {
			removeBackdrop();
		}

		return () => {
			removeBackdrop();
		};
	}, [onClose, rest.isOpen]);

	return (
		<ModalWrapper {...rest}>
			<div className='modal-dialog'>
				<div ref={contentRef} className='modal-content'>
					{children}
				</div>
			</div>
		</ModalWrapper>
	);
};

// Modal.Header = '';
// Modal.Body = '';
// Modal.Footer = '';
