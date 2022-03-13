import { UserProfile } from '@/containers';
import { withAuth } from '@/HOC/withAuth';
import { profileService } from '@/libs/api';
import { profileStore } from '@/store';
import { NextPage } from 'next';

const Profile: NextPage = () => <UserProfile />;

Profile.getInitialProps = async () => {
	const res = await profileService.getProfile();
	console.log(res);
	if (res.success) {
		profileStore.setUser((prev) => ({ ...prev, ...res.data }));
	}

	const res2 = await profileService.getExperiences();
	if (res2.success) {
		profileStore.setExperiences(res2.data);
	}

	return { data: null };
};

export default withAuth(Profile);
