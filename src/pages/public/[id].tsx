import { UserProfile } from '@/containers';
import { authService } from '@/libs/api';
import { profileStore } from '@/store';
import { NextPage, NextPageContext } from 'next';
import { useEffect } from 'react';
import { useToasts } from 'react-toast-notifications';

type Props = {
	isPublic: boolean;
};

const PublicProfile: NextPage<Props> = ({ isPublic }) => {
	const { addToast } = useToasts();

	useEffect(() => {
		if (!isPublic) {
			addToast('You have no permission to view this profile', {
				appearance: 'error',
				autoDismiss: true,
			});
		}
	}, [isPublic]);

	if (!isPublic) {
		return <p>You have no permission to view this profile</p>;
	}

	return <UserProfile />;
};

PublicProfile.getInitialProps = async (
	ctx: NextPageContext
): Promise<Props> => {
	try {
		const { id } = ctx.query;
		if (!id || Array.isArray(id)) throw new Error('Invalid id');

		const res = await authService.publicProfile(id);
		if (!res.success) throw new Error(res.error);

		profileStore.setState({
			...res.data,
			isEditable: false,
		});
		return { isPublic: true };
	} catch (error) {
		return { isPublic: false };
	}
};

export default PublicProfile;
