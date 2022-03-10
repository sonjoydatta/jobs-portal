import { Avatar, Button, Card } from '@/components';
import SolidSVG, { IconPencil } from '@/libs/SolidSVG';
import { FC, memo } from 'react';
import { CardHeader } from './styles';

type HeaderProps = {
	imageURL: string;
	name: string;
	age: string;
	onEdit?: () => void;
};

export const Header: FC<HeaderProps> = memo(({ name, imageURL, age, onEdit }) => (
	<CardHeader>
		<div className='content'>
			<Avatar size='xl'>
				<img src={imageURL} alt={name} />
			</Avatar>
			<Card.Title className='content-title'>{name}</Card.Title>
			<p className='content-subtitle'>Age: {age}</p>
		</div>
		<Button className='action-button' rounded='circle' variant='link' onClick={onEdit}>
			<SolidSVG path={IconPencil} />
		</Button>
	</CardHeader>
));
