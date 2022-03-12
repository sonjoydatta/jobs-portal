import { createStore, withDevTools } from '@poly-state/poly-state';
import { createStoreHooks } from '@poly-state/react';

export type AuthStore = {
	isLoggedIn: boolean;
} & IAPI.AuthResponse;

const authStoreInitialProps: AuthStore = {
	isLoggedIn: false,
	token: '',
	user: {
		id: '',
		name: '',
		age: '',
		email: '',
		avatar: '',
	},
};

export const authStore = createStore(authStoreInitialProps);
withDevTools(authStore, 'Auth');
export const [useAuthStore, useAuthStoreSeletor] = createStoreHooks(authStore);
