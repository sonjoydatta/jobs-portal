import { profileStore } from '@/store';
import Router from 'next/router';
import { destroyCookie } from 'nookies';

export const destroySession = () => {
	profileStore.destroy();
	destroyCookie(null, 'token', { path: '/' });
	if (typeof window !== 'undefined') {
		Router.push('/');
	}
};
