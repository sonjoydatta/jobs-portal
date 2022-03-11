import { useOnClickOutside } from '@/libs/hooks';
import SolidSVG, { IconClose } from '@/libs/SolidSVG';
import { FC, useEffect, useRef } from 'react';
import { ModalProperties, ModalProps } from '../@types';
import { Button } from '../button';
import { ModalBody, ModalFooter, ModalHeaderWrapper, ModalTitle, ModalWrapper } from './styles';

export const Modal: FC<ModalProps> & ModalProperties = ({ children, onClose, ...rest }) => {
	const contentRef = useRef<HTMLDivElement>(null);
	useOnClickOutside(contentRef, () => onClose?.());

	useEffect(() => {
		const backdrop = document.createElement('div');
		backdrop.classList.add('modal-backdrop');

		const addBackdrop = () => {
			document.body.classList.add('modal-open');
			document.body.appendChild(backdrop);
		};

		const removeBackdrop = () => {
			if (document.body.contains(backdrop)) {
				document.body.classList.remove('modal-open');
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

const ModalHeader: FC<Pick<ModalProps, 'onClose'>> = ({ children, onClose }) => (
	<ModalHeaderWrapper>
		{children}
		{onClose && (
			<Button className='action-button' rounded='circle' variant='link' onClick={onClose}>
				<SolidSVG path={IconClose} />
			</Button>
		)}
	</ModalHeaderWrapper>
);

Modal.Header = ModalHeader;
Modal.Title = ModalTitle;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;
