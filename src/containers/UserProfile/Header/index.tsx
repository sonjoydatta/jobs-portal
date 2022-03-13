import { Avatar, Card } from '@/components';
import { profileService } from '@/libs/api';
import { profileStore, useProfileStore } from '@/store';
import { ChangeEvent, FC, memo, useCallback, useRef } from 'react';
import { BasicInfoForm } from './BasicInfoForm';
import { PublicButton } from './PublicButton';
import { CardHeader } from './styles';

export const Header: FC = memo(() => {
	const inputRef = useRef<HTMLInputElement>(null);
	const {
		user: { name, age, avatar },
	} = useProfileStore();

	const handleTriggerAvatarClick = useCallback(() => {
		if (inputRef.current) {
			inputRef.current.click();
		}
	}, []);

	const handleUploadAvatar = useCallback(async (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			const img = e.target.files[0];
			if (img) {
				const res = await profileService.updateProfileAvatar(img);
				if (res.success) {
					profileStore.setUser(res.data);
				}
			}
		}
	}, []);

	return (
		<CardHeader style={{ position: 'relative' }}>
			<div className='content'>
				<Avatar className='content-avatar' size='xl' onClick={handleTriggerAvatarClick}>
					<img src={avatar} alt={name} />
					<input
						ref={inputRef}
						type='file'
						style={{ display: 'none' }}
						onChange={handleUploadAvatar}
					/>
				</Avatar>
				<Card.Title className='content-title'>{name}</Card.Title>
				<p className='content-subtitle'>Age: {age}</p>
			</div>
			<PublicButton />
			<BasicInfoForm />
		</CardHeader>
	);
});
