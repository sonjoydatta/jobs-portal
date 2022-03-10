import { Button, Card } from '@/components';
import SolidSVG, { IconPlus } from '@/libs/SolidSVG';
import { FC, memo } from 'react';
import { Organisations, OrganisationsProps } from './Organisations';

export type ExperienceProps = {
	onAdd?: () => void;
} & OrganisationsProps;

export const Experience: FC<ExperienceProps> = memo(({ items, onAdd }) => (
	<Card>
		<Card.Header>
			<Card.Title>Experience</Card.Title>
			<Button className='action-button' rounded='circle' variant='link' onClick={onAdd}>
				<SolidSVG path={IconPlus} />
			</Button>
		</Card.Header>
		<Organisations items={items} />
	</Card>
));
