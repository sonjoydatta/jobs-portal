import { Button, Card } from '@/components';
import { profileService } from '@/libs/api';
import SolidSVG, { IconPlus } from '@/libs/SolidSVG';
import { profileStore, useProfileStore } from '@/store';
import { FC, memo, useCallback, useState } from 'react';
import { OrganisationForm } from './OrganisationForm';
import { Organisations } from './Organisations';

export const Experience: FC = memo(() => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const { isEditable } = useProfileStore();

	const handleModalOpen = useCallback(() => setIsModalOpen(true), []);
	const handleModalClose = useCallback(() => setIsModalOpen(false), []);

	const handleFormSubmit = useCallback(async (item: IAPI.ExperiencePayload) => {
		if (item) {
			const res = await profileService.addExperience(item);
			if (res.success) {
				profileStore.setExperiences((prev) => [...prev, res.data]);
				setIsModalOpen(false);
			}
		}
	}, []);

	return (
		<Card>
			<Card.Header>
				<Card.Title>Experience</Card.Title>
				{isEditable && (
					<Button
						className='action-button'
						rounded='circle'
						variant='link'
						onClick={handleModalOpen}
					>
						<SolidSVG path={IconPlus} />
					</Button>
				)}
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
