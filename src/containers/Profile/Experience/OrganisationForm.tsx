import { Button, Form, Modal, ModalProps } from '@/components';
import { monthOptions, yearOptions } from '@/utils/constants';
import { FC, memo, useCallback, useRef, useState } from 'react';
import { GridItems } from './styles';

type OrganisationFormProps = ModalProps & {
	onSubmit: () => void;
};

export const OrganisationForm: FC<OrganisationFormProps> = memo(({ isOpen, onClose }) => {
	const modalProps = { isOpen, onClose };
	const formRef = useRef<HTMLFormElement>(null);
	const [isChecked, setIsChecked] = useState(true);

	const handleTriggerSubmit = useCallback(() => {
		if (formRef.current) {
			formRef.current.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
		}
	}, []);

	const handleIsCurrentChange = useCallback(() => {
		setIsChecked((prev) => !prev);
	}, []);

	return (
		<Modal {...modalProps}>
			<Modal.Header onClose={onClose}>
				<Modal.Title>Add experience</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<form ref={formRef}>
					<Form.Item
						labelProps={{
							labelText: 'Job title',
							htmlFor: 'jobTitle',
						}}
						inputProps={{
							type: 'text',
							name: 'jobTitle',
							placeholder: 'Ex: Software Engineer',
						}}
					/>
					<Form.Item
						labelProps={{
							labelText: 'Company name',
							htmlFor: 'companyName',
						}}
						inputProps={{
							type: 'text',
							name: 'companyName',
							placeholder: 'Ex: Facebook',
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
							checked: isChecked,
							onChange: handleIsCurrentChange,
						}}
					/>
					<GridItems>
						<Form.Group>
							<Form.Label htmlFor='startMonth'>Start date</Form.Label>
							<Form.Select name='startMonth'>
								<option value='' disabled>
									Month
								</option>
								{monthOptions.map(({ value, label }) => (
									<option key={value} value={value}>
										{label}
									</option>
								))}
							</Form.Select>
						</Form.Group>
						<Form.Group>
							<Form.Label htmlFor='startYear'>&nbsp;</Form.Label>
							<Form.Select name='startYear'>
								<option value='' disabled>
									Year
								</option>
								{yearOptions().map(({ value, label }) => (
									<option key={value} value={value}>
										{label}
									</option>
								))}
							</Form.Select>
						</Form.Group>
					</GridItems>
					<GridItems>
						<Form.Group>
							<Form.Label htmlFor='endMonth'>End date</Form.Label>
							<Form.Select name='endMonth' disabled={isChecked}>
								<option value='' disabled>
									Month
								</option>
								{monthOptions.map(({ value, label }) => (
									<option key={value} value={value}>
										{label}
									</option>
								))}
							</Form.Select>
						</Form.Group>
						<Form.Group>
							<Form.Label htmlFor='endYear'>&nbsp;</Form.Label>
							<Form.Select name='endYear' disabled={isChecked}>
								<option value='' disabled>
									Year
								</option>
								{yearOptions().map(({ value, label }) => (
									<option key={value} value={value}>
										{label}
									</option>
								))}
							</Form.Select>
						</Form.Group>
					</GridItems>
					<Form.Group>
						<Form.Label htmlFor='description'>Description</Form.Label>
						<Form.Textarea rows={3} name='description' />
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
});
