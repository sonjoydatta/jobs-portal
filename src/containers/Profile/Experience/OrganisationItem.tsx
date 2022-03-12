import { Avatar, Button } from '@/components';
import SolidSVG, { IconPencil } from '@/libs/SolidSVG';
import { FC, memo, useMemo } from 'react';
import { ListItem } from './styles';

export type OrganisationItemProps = {
	jobTitle: string;
	company: string;
	startDate: Date;
	endDate?: Date;
	logo: string;
	description?: string;
	onEdit?: () => void;
};

export const OrganisationItem: FC<OrganisationItemProps> = memo((props) => {
	const { jobTitle, company, startDate, endDate, logo, description, onEdit } = props;

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
				<img src={logo} alt={company} />
			</Avatar>
			<div className='organisation-info'>
				<h2 className='organisation-info__title'>{jobTitle}</h2>
				<p className='organisation-info__name'>{company}</p>
				<p className='organisation-info__date'>
					{renderStartDate} - {renderEndDate}
				</p>
				{description && <p className='organisation-info__description'>{description}</p>}
				<Button className='action-button' rounded='circle' variant='link' onClick={onEdit}>
					<SolidSVG path={IconPencil} />
				</Button>
			</div>
		</ListItem>
	);
});
