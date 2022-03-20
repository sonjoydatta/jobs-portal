import { authStore, AuthStore, IProfileStore, profileStore } from '@/store';
import type { AppContext, AppProps as NextAppProps } from 'next/app';
import App from 'next/app';
import Head from 'next/head';
import { parseCookies } from 'nookies';
import { ToastProvider } from 'react-toast-notifications';
import '../styles/app.scss';

type AppProps = {
	authStore: AuthStore;
	profileStore: IProfileStore;
} & NextAppProps;

const MyApp = ({
	Component,
	pageProps,
	authStore: hydrateAuthStore,
	profileStore: hydratedProfileStore,
}: AppProps) => {
	authStore.hydrate(hydrateAuthStore);
	profileStore.hydrate(hydratedProfileStore);

	return (
		<ToastProvider>
			<Head>
				<title>Glints Jobs Portal</title>
			</Head>
			<Component {...pageProps} />
		</ToastProvider>
	);
};

MyApp.getInitialProps = async (appContext: AppContext) => {
	const cookies = parseCookies(appContext.ctx);
	if (cookies?.token && cookies?.token !== '') {
		authStore.setState((state) => ({
			...state,
			isLoggedIn: true,
			accessToken: cookies.token,
		}));
	} else {
		authStore.setState((state) => ({
			...state,
			isLoggedIn: false,
			accessToken: '',
		}));
	}

	const appProps = await App.getInitialProps(appContext);
	return {
		...appProps,
		authStore: authStore.getState(),
		profileStore: profileStore.getState(),
	};
};

export default MyApp;
