import { Button, Form, Modal, ModalProps } from '@/components';
import { profileService } from '@/libs/api';
import { useForm } from '@/libs/hooks';
import { monthOptions } from '@/utils/constants';
import { yearOptions } from '@/utils/helpers';
import {
	FC,
	memo,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';
import { useToasts } from 'react-toast-notifications';
import { convertToPayload, convertToValues } from './helpers';
import { GridItems } from './styles';
import { initialErrors, initialValues, validateForm } from './validations';

type OrganisationFormProps = ModalProps & {
	defaultValues?: IAPI.ExperienceResponce;
	onSubmit: (data: IAPI.ExperiencePayload) => void;
	isLoading: boolean;
};

export const OrganisationForm: FC<OrganisationFormProps> = memo(
	({ isOpen, onClose, defaultValues, onSubmit, isLoading }) => {
		const modalProps = { isOpen, onClose };
		const formRef = useRef<HTMLFormElement>(null);
		const [avatar, setAvatar] = useState<string>();
		const { addToast } = useToasts();

		const handleAvatarChange = useCallback(
			async (e: React.ChangeEvent<HTMLInputElement>) => {
				const file = e.target.files?.[0];
				if (file) {
					try {
						const res = await profileService.updateCompanyLogo(file);
						if (!res.success) throw new Error(res.error);

						setAvatar(res.data.avatar);
					} catch (error) {
						if (error instanceof Error) {
							addToast(error.message, {
								appearance: 'error',
								autoDismiss: true,
							});
						}
					}
				}
			},
			[addToast]
		);

		const handleTriggerSubmit = useCallback(() => {
			if (formRef.current) {
				formRef.current.dispatchEvent(
					new Event('submit', { cancelable: true, bubbles: true })
				);
			}
		}, []);

		const handleFormSubmit = useCallback(
			(data: typeof initialValues) => {
				if (data) {
					const parsedData = convertToPayload(data);
					onSubmit({
						...parsedData,
						avatar,
					});
				}
			},
			[avatar, onSubmit]
		);

		const { values, setValues, errors, handleChange, handleSubmit } = useForm({
			initialValues,
			initialErrors,
			onSuccess: handleFormSubmit,
			validate: validateForm,
		});

		useEffect(() => {
			if (defaultValues) {
				const { avatar: avatarURL, ...rest } = convertToValues(defaultValues);
				if (avatarURL) setAvatar(avatarURL);
				setValues(rest);
			}
		}, [defaultValues, setValues]);

		const selectYearOption = useMemo(() => yearOptions(), []);

		return (
			<Modal {...modalProps}>
				<Modal.Header onClose={onClose}>
					<Modal.Title>Add experience</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<form ref={formRef} onSubmit={handleSubmit}>
						<Form.Item
							labelProps={{
								labelText: 'Job title',
								htmlFor: 'title',
							}}
							inputProps={{
								type: 'text',
								name: 'title',
								placeholder: 'Ex: Software Engineer',
								value: values.title,
								onChange: handleChange,
							}}
							variant={errors.title ? 'danger' : undefined}
							message={errors.title}
						/>
						<Form.Item
							labelProps={{
								labelText: 'Company name',
								htmlFor: 'company',
							}}
							inputProps={{
								type: 'text',
								name: 'company',
								placeholder: 'Ex: Facebook',
								value: values.company,
								onChange: handleChange,
							}}
							variant={errors.company ? 'danger' : undefined}
							message={errors.company}
						/>
						<Form.Item
							labelProps={{
								labelText: 'Company logo',
							}}
							inputProps={{
								type: 'file',
								name: 'avatar',
								accept: 'image/*',
								onChange: handleAvatarChange,
							}}
						/>
						<Form.ItemCheck
							labelProps={{
								labelText: 'Currently working here',
								htmlFor: 'isCurrent',
							}}
							inputProps={{
								type: 'checkbox',
								id: 'isCurrent',
								name: 'isCurrent',
								checked: values.isCurrent,
								onChange: handleChange,
							}}
						/>
						<GridItems>
							<Form.ItemSelect
								labelProps={{
									labelText: 'Start month',
								}}
								selectProps={{
									name: 'startMonth',
									value: values.startMonth,
									onChange: handleChange,
								}}
								options={monthOptions}
							/>
							<Form.ItemSelect
								labelProps={{
									labelText: 'Start year',
								}}
								selectProps={{
									name: 'startYear',
									value: values.startYear,
									onChange: handleChange,
								}}
								options={selectYearOption}
							/>
						</GridItems>
						<GridItems>
							<Form.ItemSelect
								labelProps={{
									labelText: 'End month',
								}}
								selectProps={{
									name: 'endMonth',
									value: values.endMonth,
									onChange: handleChange,
									disabled: values.isCurrent,
								}}
								options={monthOptions}
							/>
							<Form.ItemSelect
								labelProps={{
									labelText: 'End year',
								}}
								selectProps={{
									name: 'endYear',
									value: values.endYear,
									onChange: handleChange,
									disabled: values.isCurrent,
								}}
								options={selectYearOption}
							/>
						</GridItems>
						<Form.Group>
							<Form.Label htmlFor='description'>Description</Form.Label>
							<Form.Textarea
								rows={3}
								name='description'
								value={values.description}
								onChange={handleChange}
							/>
						</Form.Group>
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
						{isLoading ? 'Loading...' : 'Save'}
					</Button>
				</Modal.Footer>
			</Modal>
		);
	}
);
