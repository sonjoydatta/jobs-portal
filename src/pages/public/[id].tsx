import { UserProfile } from '@/containers';
import { authService } from '@/libs/api';
import { profileStore } from '@/store';
import { NextPage, NextPageContext } from 'next';

type Props = {
	isPublic: boolean;
};

const PublicProfile: NextPage<Props> = ({ isPublic }) => {
	if (!isPublic) {
		return <p>You have no permission to view this profile</p>;
	}

	return <UserProfile />;
};

PublicProfile.getInitialProps = async (ctx: NextPageContext): Promise<Props> => {
	const { id } = ctx.query;
	const res = await authService.publicProfile(id as string);
	if (res.success) {
		profileStore.setState({
			...res.data,
			isEditable: false,
		});
		return { isPublic: true };
	}

	return { isPublic: false };
};

export default PublicProfile;
