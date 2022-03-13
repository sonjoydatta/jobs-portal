import { Button, Card } from '@/components';
import SolidSVG, { IconPlus } from '@/libs/SolidSVG';
import { FC, memo, useCallback, useState } from 'react';
import { OrganisationForm } from './OrganisationForm';
import { Organisations } from './Organisations';

export const Experience: FC = memo(() => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleModalOpen = useCallback(() => setIsModalOpen(true), []);
	const handleModalClose = useCallback(() => setIsModalOpen(false), []);

	const handleFormSubmit = useCallback(() => {
		console.log('handleFormSubmit');
	}, []);

	return (
		<Card>
			<Card.Header>
				<Card.Title>Experience</Card.Title>
				<Button className='action-button' rounded='circle' variant='link' onClick={handleModalOpen}>
					<SolidSVG path={IconPlus} />
				</Button>
				<OrganisationForm
					isOpen={isModalOpen}
					onSubmit={handleFormSubmit}
					onClose={handleModalClose}
				/>
			</Card.Header>
			<Organisations />
		</Card>
	);
});
