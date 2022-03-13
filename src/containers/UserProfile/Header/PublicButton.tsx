import { Button } from '@/components';
import { profileService } from '@/libs/api';
import { profileStore, useProfileStore } from '@/store';
import { FC, Fragment, useEffect, useState } from 'react';

export const PublicButton: FC = () => {
	const [baseURL, setBaseURL] = useState('');

	useEffect(() => {
		if (typeof window !== 'undefined') {
			setBaseURL(window.location.origin);
		}
	}, []);

	const {
		isEditable,
		user: { _id, isPublic = false },
	} = useProfileStore();

	const handleClick = async () => {
		const res = await profileService.updateProfile({ isPublic: !isPublic });
		if (res.success) {
			profileStore.setUser(res.data);
		}
	};

	return (
		<Fragment>
			{isEditable && (
				<Button
					className='action-button-public'
					rounded='circle'
					variant='link'
					onClick={handleClick}
				>
					Mark as {isPublic ? 'private' : 'public'}
				</Button>
			)}
			{isPublic && isEditable && (
				<input
					type='text'
					className='public-url'
					value={`${baseURL}/public/${_id}`}
					readOnly
				/>
			)}
		</Fragment>
	);
};
