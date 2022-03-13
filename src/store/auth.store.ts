import { createStore, withDevTools } from '@poly-state/poly-state';
import { createStoreHooks } from '@poly-state/react';

export type AuthStore = {
	isLoggedIn: boolean;
	accessToken: string;
};

const authStoreInitialProps: AuthStore = {
	isLoggedIn: false,
	accessToken: '',
};

export const authStore = createStore(authStoreInitialProps);
withDevTools(authStore, 'Auth');
export const [useAuthStore, useAuthStoreSeletor] = createStoreHooks(authStore);
