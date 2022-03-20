import { Button } from '@/components';
import { UserProfile } from '@/containers';
import { withAuth } from '@/HOC/withAuth';
import { profileService } from '@/libs/api';
import { profileStore } from '@/store';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Fragment, useCallback } from 'react';
import { useToasts } from 'react-toast-notifications';

const Profile: NextPage = () => {
	const router = useRouter();
	const { addToast } = useToasts();

	const handleSignout = useCallback(async () => {
		try {
			const res = await profileService.logout();
			if (!res.success) throw new Error(res.error);

			addToast('Logged out', {
				appearance: 'success',
				autoDismiss: true,
			});
			profileStore.destroy();
			router.push('/');
		} catch (error) {
			if (error instanceof Error) {
				addToast(error.message, { appearance: 'error', autoDismiss: true });
			}
		}
	}, [addToast, router]);

	return (
		<Fragment>
			<Button
				size='sm'
				variant='primary'
				rounded='pill'
				style={{
					position: 'absolute',
					top: '10px',
					right: '10px',
				}}
				onClick={handleSignout}
			>
				Sign out
			</Button>
			<UserProfile />
		</Fragment>
	);
};

Profile.getInitialProps = async () => {
	const promise1 = profileService.getProfile();
	const promise2 = profileService.getExperiences();

	try {
		const [res1, res2] = await Promise.all([promise1, promise2]);
		if (!res1.success || !res2.success) {
			throw new Error('Failed to get profile');
		}

		profileStore.setUser((prev) => ({ ...prev, ...res1.data }));
		profileStore.setExperiences(res2.data);
		// eslint-disable-next-line no-empty
	} catch (error) {}

	return { data: null };
};

export default withAuth(Profile);
