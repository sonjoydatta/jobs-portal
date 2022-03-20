import { Card } from '@/components';
import { useProfileStore } from '@/store';
import { FC, memo } from 'react';
import { BasicInfoForm } from './BasicInfoForm';
import { ProfilePhoto } from './ProfilePhoto';
import { PublicButton } from './PublicButton';
import { CardHeader } from './styles';

export const Header: FC = memo(() => {
	const {
		user: { name, age },
	} = useProfileStore();

	return (
		<CardHeader style={{ position: 'relative' }}>
			<div className='content'>
				<ProfilePhoto />
				<Card.Title className='content-title'>{name}</Card.Title>
				<p className='content-subtitle'>Age: {age}</p>
			</div>
			<PublicButton />
			<BasicInfoForm />
		</CardHeader>
	);
});
