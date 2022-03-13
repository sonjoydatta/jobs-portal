import { getStoreClass, withDevTools } from '@poly-state/poly-state';
import { createStoreHooks } from '@poly-state/react';

export type IProfileStore = {
	user: IAPI.ProfileResponse;
	experiences: IAPI.ExperiencesResponce;
};

const initialState: IProfileStore = {
	user: {
		_id: '',
		name: '',
		email: '',
		avatar:
			'https://media-exp1.licdn.com/dms/image/C5603AQGIj2HGGzpnlA/profile-displayphoto-shrink_400_400/0/1637839690654?e=1652313600&v=beta&t=ynPtpehm05GizVRcPhlACJjKaRc8LAYXWoKgfvKbvIQ',
		age: '',
	},
	experiences: [],
};

class ProfileStore extends getStoreClass<IProfileStore>() {}

export const profileStore = new ProfileStore(initialState);
withDevTools(profileStore, 'Profile');

export const [useProfileStore, useProfileSelector] = createStoreHooks(profileStore);
