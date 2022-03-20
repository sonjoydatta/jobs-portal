import { Button, Form, Modal } from '@/components';
import { profileService } from '@/libs/api';
import { useForm } from '@/libs/hooks';
import SolidSVG, { IconPencil } from '@/libs/SolidSVG';
import { profileStore, useProfileStore } from '@/store';
import {
	Fragment,
	memo,
	useCallback,
	useEffect,
	useRef,
	useState,
} from 'react';
import { useToasts } from 'react-toast-notifications';
import { initialErrors, initialValues, validateForm } from './validations';

export const BasicInfoForm = memo(() => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const {
		user: { name, age },
		isEditable,
	} = useProfileStore();
	const formRef = useRef<HTMLFormElement>(null);
	const { addToast } = useToasts();

	const handleModalOpen = useCallback(() => setIsModalOpen(true), []);
	const handleModalClose = useCallback(() => setIsModalOpen(false), []);

	const handleTriggerSubmit = useCallback(() => {
		if (formRef.current) {
			formRef.current.dispatchEvent(
				new Event('submit', { cancelable: true, bubbles: true })
			);
		}
	}, []);

	const handleFormSubmit = useCallback(
		async (data: typeof initialValues) => {
			if (data) {
				setIsLoading(true);
				try {
					const res = await profileService.updateProfile(data);
					if (!res.success) throw new Error(res.error);

					addToast('Profile updated', {
						appearance: 'success',
						autoDismiss: true,
					});
					profileStore.setUser((prev) => ({ ...prev, ...res.data }));
					handleModalClose();
				} catch (error) {
					if (error instanceof Error) {
						addToast(error.message, { appearance: 'error', autoDismiss: true });
					}
				} finally {
					setIsLoading(false);
				}
			}
		},
		[addToast, handleModalClose]
	);

	const { values, setValues, errors, handleChange, handleSubmit } = useForm({
		initialValues,
		initialErrors,
		onSuccess: handleFormSubmit,
		validate: validateForm,
	});

	useEffect(() => setValues({ name, age }), [name, age, setValues]);

	return (
		<Fragment>
			{isEditable && (
				<Button
					className='action-button'
					rounded='circle'
					variant='link'
					onClick={handleModalOpen}
				>
					<SolidSVG path={IconPencil} />
				</Button>
			)}

			<Modal isOpen={isModalOpen} onClose={handleModalClose}>
				<Modal.Header onClose={handleModalClose}>
					<Modal.Title>Edit intro</Modal.Title>
				</Modal.Header>

				<Modal.Body>
					<form ref={formRef} onSubmit={handleSubmit}>
						<Form.Item
							labelProps={{
								labelText: 'Full name',
								htmlFor: 'name',
							}}
							inputProps={{
								type: 'text',
								name: 'name',
								placeholder: 'Ex: John Doe',
								value: values.name,
								onChange: handleChange,
							}}
							variant={errors.name ? 'danger' : undefined}
							message={errors.name}
						/>
						<Form.Item
							labelProps={{
								labelText: 'Age',
								htmlFor: 'age',
							}}
							inputProps={{
								type: 'text',
								name: 'age',
								placeholder: 'Ex: 21 years 2 months',
								value: values.age,
								onChange: handleChange,
							}}
							variant={errors.age ? 'danger' : undefined}
							message={errors.age}
						/>
					</form>
				</Modal.Body>

				<Modal.Footer>
					<Button
						type='button'
						rounded='pill'
						size='sm'
						onClick={handleTriggerSubmit}
						disabled={isLoading}
					>
						{isLoading ? 'Loading...' : 'Save changes'}
					</Button>
				</Modal.Footer>
			</Modal>
		</Fragment>
	);
});
