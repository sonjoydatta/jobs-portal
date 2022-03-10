import { OrganisationItemProps } from '@/containers/Profile/Experience/OrganisationItem';
import { getStoreClass, withDevTools } from '@poly-state/poly-state';
import { createStoreHooks } from '@poly-state/react';

type InitialState = {
	name: string;
	imageURL: string;
	age: string;
	experiences: OrganisationItemProps[];
};

const initialState: InitialState = {
	name: '',
	imageURL: '',
	age: '',
	experiences: [],
};

class ProfileStore extends getStoreClass<InitialState>() {}

export const profileStore = new ProfileStore(initialState);
withDevTools(profileStore, 'Profile');

export const [useProfileStore, useProfileSelector] = createStoreHooks(profileStore);
