import { Button, Form, Modal, ModalProps } from '@/components';
import { useForm } from '@/libs/hooks';
import { monthOptions } from '@/utils/constants';
import { yearOptions } from '@/utils/helpers';
import { FC, memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { GridItems } from './styles';
import { initialErrors, initialValues, validateForm } from './validations';

type OrganisationFormProps = ModalProps & {
	defaultValues?: typeof initialValues;
	onSubmit: (data: typeof initialValues) => void;
};

export const OrganisationForm: FC<OrganisationFormProps> = memo(
	({ isOpen, onClose, defaultValues, onSubmit }) => {
		const modalProps = { isOpen, onClose };
		const formRef = useRef<HTMLFormElement>(null);
		const [isChecked, setIsChecked] = useState(true);

		const handleTriggerSubmit = useCallback(() => {
			if (formRef.current) {
				formRef.current.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
			}
		}, []);

		const { values, setValues, setErrors, errors, handleChange, handleSubmit } = useForm({
			initialValues,
			initialErrors,
			onSuccess: onSubmit,
			validate: validateForm,
		});

		useEffect(() => {
			if (defaultValues) {
				setValues(defaultValues);
				if (defaultValues.endMonth && defaultValues.endYear) {
					setIsChecked(false);
				} else {
					setIsChecked(true);
				}
			}
		}, [defaultValues, setValues]);

		const handleIsCurrentChange = useCallback(() => {
			setIsChecked((prev) => !prev);
			setValues((prev) => ({
				...prev,
				endMonth: '',
				endYear: '',
			}));
			setErrors((prev) => ({
				...prev,
				endMonth: '',
				endYear: '',
			}));
		}, [setErrors, setValues]);

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
								htmlFor: 'jobTitle',
							}}
							inputProps={{
								type: 'text',
								name: 'jobTitle',
								placeholder: 'Ex: Software Engineer',
								value: values.jobTitle,
								onChange: handleChange,
							}}
							variant={errors.jobTitle ? 'danger' : undefined}
							message={errors.jobTitle}
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
						<Form.ItemCheck
							labelProps={{
								labelText: 'Currently working here',
								htmlFor: 'isCurrent',
							}}
							inputProps={{
								type: 'checkbox',
								id: 'isCurrent',
								checked: isChecked,
								onChange: handleIsCurrentChange,
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
									labelText: `Start year`,
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
									disabled: isChecked,
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
									disabled: isChecked,
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
					<Button type='button' rounded='pill' size='sm' onClick={handleTriggerSubmit}>
						Save
					</Button>
				</Modal.Footer>
			</Modal>
		);
	}
);
