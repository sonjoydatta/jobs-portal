import { Avatar, Button } from '@/components';
import SolidSVG, { IconPencil } from '@/libs/SolidSVG';
import { useProfileStore } from '@/store';
import { FC, memo } from 'react';
import { ListItem } from './styles';

export type OrganisationItemProps = {
	onEdit?: () => void;
} & IAPI.ExperienceResponce;

export const OrganisationItem: FC<OrganisationItemProps> = memo((props) => {
	const { title, company, from, to, isCurrent, avatar, description, onEdit } = props;
	const { isEditable } = useProfileStore();

	return (
		<ListItem>
			<Avatar size='lg'>
				<img src={avatar} alt={company} />
			</Avatar>
			<div className='organisation-info'>
				<h2 className='organisation-info__title'>{title}</h2>
				<p className='organisation-info__name'>{company}</p>
				<p className='organisation-info__date'>
					{from} - {isCurrent ? 'Present' : to}
				</p>
				{description && <p className='organisation-info__description'>{description}</p>}
				{isEditable && (
					<Button className='action-button' rounded='circle' variant='link' onClick={onEdit}>
						<SolidSVG path={IconPencil} />
					</Button>
				)}
			</div>
		</ListItem>
	);
});
