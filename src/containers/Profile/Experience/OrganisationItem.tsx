import { Avatar, Button } from '@/components';
import SolidSVG, { IconPencil } from '@/libs/SolidSVG';
import { FC, memo, useMemo } from 'react';
import { ListItem } from './styles';

export type OrganisationItemProps = {
	jobTitle: string;
	name: string;
	startDate: Date;
	endDate?: Date;
	logo: string;
	description?: string;
};

export const OrganisationItem: FC<OrganisationItemProps> = memo((props) => {
	const { jobTitle, name, startDate, endDate, logo, description } = props;

	const renderStartDate = useMemo(
		() =>
			startDate.toLocaleDateString('en-GB', {
				month: 'short',
				year: 'numeric',
			}),
		[startDate]
	);

	const renderEndDate = useMemo(
		() =>
			endDate
				? endDate.toLocaleDateString('en-GB', {
						month: 'short',
						year: 'numeric',
				  })
				: 'Present',
		[endDate]
	);

	return (
		<ListItem>
			<Avatar size='lg'>
				<img src={logo} alt={name} />
			</Avatar>
			<div className='organisation-info'>
				<h2 className='organisation-info__title'>{jobTitle}</h2>
				<p className='organisation-info__name'>{name}</p>
				<p className='organisation-info__date'>
					{renderStartDate} - {renderEndDate}
				</p>
				{description && <p className='organisation-info__description'>{description}</p>}
				<Button className='action-button' rounded='circle' variant='link'>
					<SolidSVG path={IconPencil} />
				</Button>
			</div>
		</ListItem>
	);
});
