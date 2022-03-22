import { Button } from '@/components';
import { profileService } from '@/libs/api';
import { profileStore, useProfileStore } from '@/store';
import { FC, Fragment, useCallback, useEffect, useState } from 'react';
import { useToasts } from 'react-toast-notifications';

export const PublicButton: FC = () => {
	const [baseURL, setBaseURL] = useState('');
	const { addToast } = useToasts();

	useEffect(() => {
		if (typeof window !== 'undefined') {
			setBaseURL(window.location.origin);
		}
	}, []);

	const {
		isEditable,
		user: { _id, isPublic = false },
	} = useProfileStore();

	const handleClick = useCallback(async () => {
		try {
			const res = await profileService.updateProfile({ isPublic: !isPublic });
			if (!res.success) throw new Error(res.error);

			addToast(
				`Your profile is now ${res.data?.isPublic ? 'public' : 'private'}`,
				{ appearance: 'info', autoDismiss: true }
			);
			profileStore.setUser((prev) => ({ ...prev, ...res.data }));
		} catch (error) {
			if (error instanceof Error) {
				addToast(error.message, { appearance: 'error', autoDismiss: true });
			}
		}
	}, [isPublic, addToast]);

	return (
		<Fragment>
			{isEditable && (
				<Button
					className='action-button-public'
					rounded='circle'
					variant='link'
					data-testid='profile-public-button'
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
					data-testid='profile-public-url'
					readOnly
				/>
			)}
		</Fragment>
	);
};
