import { getStoreClass, withDevTools } from '@poly-state/poly-state';
import { createStoreHooks } from '@poly-state/react';

export type IProfileStore = {
	user: IAPI.ProfileResponse;
	experiences: IAPI.ExperiencesResponce;
	isEditable: boolean;
};

const initialState: IProfileStore = {
	user: {
		_id: '',
		name: '',
		email: '',
		avatar: '',
		age: '',
	},
	experiences: [],
	isEditable: true,
};

class ProfileStore extends getStoreClass<IProfileStore>() {}

export const profileStore = new ProfileStore(initialState);
if (process.env.NODE_ENV === 'development') {
	withDevTools(profileStore, 'Profile');
}
export const [useProfileStore, useProfileSelector] =
	createStoreHooks(profileStore);
