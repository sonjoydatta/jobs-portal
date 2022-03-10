import { Avatar, Button } from '@/components';
import SolidSVG, { IconPencil } from '@/libs/SolidSVG';
import { FC } from 'react';
import { HeaderWrapper } from './styles';

type HeaderProps = {
	imageURL: string;
	name: string;
	age: string;
};

export const Header: FC<HeaderProps> = ({ name, imageURL, age }) => (
	<HeaderWrapper>
		<Avatar size='xl'>
			<img src={imageURL} alt={name} />
		</Avatar>
		<h1 className='header-title'>{name}</h1>
		<p className='header-subtitle'>Age: {age}</p>
		<Button className='header-edit__button' rounded='circle' variant='link'>
			<SolidSVG path={IconPencil} />
		</Button>
	</HeaderWrapper>
);
