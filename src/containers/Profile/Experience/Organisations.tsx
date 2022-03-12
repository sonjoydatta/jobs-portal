import { FC, memo, useCallback, useState } from 'react';
import { OrganisationForm } from './OrganisationForm';
import { OrganisationItem, OrganisationItemProps } from './OrganisationItem';
import { Wrapper } from './styles';
import { initialValues } from './validations';

type OrganisationItem = Omit<OrganisationItemProps, 'onEdit'>;

export type OrganisationsProps = {
	items: OrganisationItem[];
};

export const Organisations: FC<OrganisationsProps> = memo(({ items }) => {
	const [selectedItem, setSelectedItem] = useState<typeof initialValues>();

	const handleEdit = useCallback((item: OrganisationItem) => {
		const { jobTitle, company, startDate, endDate, description = '' } = item;
		setSelectedItem({
			jobTitle,
			company,
			startMonth: startDate.getMonth().toString(),
			startYear: startDate.getFullYear().toString(),
			endMonth: endDate?.getMonth().toString() || '',
			endYear: endDate?.getFullYear().toString() || '',
			description,
		});
	}, []);

	return (
		<Wrapper>
			{items.map((item) => (
				<OrganisationItem key={item.company} {...item} onEdit={() => handleEdit(item)} />
			))}
			<OrganisationForm
				isOpen={!!selectedItem}
				defaultValues={selectedItem}
				onSubmit={console.log}
				onClose={() => setSelectedItem(undefined)}
			/>
		</Wrapper>
	);
});
