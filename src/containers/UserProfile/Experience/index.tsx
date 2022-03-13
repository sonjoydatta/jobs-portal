import { Button, Card } from '@/components';
import { profileService } from '@/libs/api';
import SolidSVG, { IconPlus } from '@/libs/SolidSVG';
import { profileStore, useProfileStore } from '@/store';
import { sortByDate } from '@/utils/helpers';
import { FC, memo, useCallback, useState } from 'react';
import { OrganisationForm } from './OrganisationForm';
import { Organisations } from './Organisations';

export const Experience: FC = memo(() => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const { isEditable } = useProfileStore();

	const handleModalOpen = useCallback(() => setIsModalOpen(true), []);
	const handleModalClose = useCallback(() => setIsModalOpen(false), []);

	const handleFormSubmit = useCallback(async (item: IAPI.ExperiencePayload) => {
		if (item) {
			setIsLoading(true);
			const res = await profileService.addExperience(item);
			if (res.success) {
				profileStore.setExperiences((prev) =>
					[...prev, res.data].sort((a, b) => sortByDate(b.to, a.to))
				);
				setIsModalOpen(false);
			}
			setIsLoading(false);
		}
	}, []);

	return (
		<Card>
			<Card.Header style={{ minHeight: '3rem' }}>
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
					isLoading={isLoading}
				/>
			</Card.Header>
			<Organisations />
		</Card>
	);
});
