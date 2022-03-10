import { FC, memo } from 'react';
import { OrganisationItem, OrganisationItemProps } from './OrganisationItem';
import { Wrapper } from './styles';

export type OrganisationsProps = {
	items: OrganisationItemProps[];
};

export const Organisations: FC<OrganisationsProps> = memo(({ items }) => (
	<Wrapper>
		{items.map((item) => (
			<OrganisationItem key={item.name} {...item} />
		))}
	</Wrapper>
));
