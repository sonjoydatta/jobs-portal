import { UserProfile } from '@/containers';
import { withAuth } from '@/HOC/withAuth';
import { profileService } from '@/libs/api';
import { profileStore } from '@/store';
import { NextPage } from 'next';

const Profile: NextPage = () => <UserProfile />;

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
