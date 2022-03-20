import { Button } from '@/components';
import { UserProfile } from '@/containers';
import { withAuth } from '@/HOC/withAuth';
import { profileService } from '@/libs/api';
import { profileStore } from '@/store';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Fragment, useCallback } from 'react';

const Profile: NextPage = () => {
	const router = useRouter();

	const handleSignout = useCallback(async () => {
		const res = await profileService.logout();
		if (res.success) {
			profileStore.destroy();
			router.push('/');
		}
	}, [router]);

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
	const [res1, res2] = await Promise.all([promise1, promise2]);

	if (res1.success) {
		profileStore.setUser((prev) => ({ ...prev, ...res1.data }));
	}

	if (res2.success) {
		profileStore.setExperiences(res2.data);
	}

	return { data: null };
};

export default withAuth(Profile);
