import { createStore } from '@poly-state/poly-state';
import { createStoreHooks } from '@poly-state/react';

export type AuthStore = {
	isLoggedIn: boolean;
	accessToken: string;
	id: string;
};

const authStoreInitialProps: AuthStore = {
	isLoggedIn: false,
	accessToken: '',
	id: '',
};

export const authStore = createStore(authStoreInitialProps);
export const [useAuthStore, useAuthStoreSeletor] = createStoreHooks(authStore);
