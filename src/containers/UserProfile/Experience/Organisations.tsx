import { profileService } from '@/libs/api';
import { profileStore, useProfileStore } from '@/store';
import { FC, memo, useState } from 'react';
import { OrganisationForm } from './OrganisationForm';
import { OrganisationItem, OrganisationItemProps } from './OrganisationItem';
import { Wrapper } from './styles';

type OrganisationItem = Omit<OrganisationItemProps, 'onEdit'>;

export type OrganisationsProps = {
	items: OrganisationItem[];
};

export const Organisations: FC = memo(() => {
	const [selectedItem, setSelectedItem] = useState<IAPI.ExperienceResponce>();
	const { experiences } = useProfileStore();

	const handleUpdate = async (item: Omit<IAPI.ExperienceResponce, '_id' | 'userId'>) => {
		if (selectedItem?._id && item) {
			const res = await profileService.updateExperience(selectedItem._id, item);
			if (res.success) {
				profileStore.setExperiences((prev) => {
					const index = prev.findIndex((i) => i._id === selectedItem._id);
					prev[index] = res.data;
					return prev;
				});
				setSelectedItem(undefined);
			}
		}
	};

	return (
		<Wrapper>
			{experiences.map((item) => (
				<OrganisationItem key={item._id} {...item} onEdit={() => setSelectedItem(item)} />
			))}
			<OrganisationForm
				isOpen={!!selectedItem}
				defaultValues={selectedItem}
				onSubmit={handleUpdate}
				onClose={() => setSelectedItem(undefined)}
			/>
		</Wrapper>
	);
});
