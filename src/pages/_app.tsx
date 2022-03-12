import { authStore, AuthStore } from '@/store';
import type { AppContext, AppProps as NextAppProps } from 'next/app';
import App from 'next/app';
import Head from 'next/head';
import { parseCookies } from 'nookies';
import { Fragment } from 'react';
import '../styles/app.scss';

type AppProps = {
	authStore: AuthStore;
} & NextAppProps;

const MyApp = ({ Component, pageProps, authStore: hydrateAuthStore }: AppProps) => {
	authStore.hydrate(hydrateAuthStore);

	return (
		<Fragment>
			<Head>
				<title>Glints Jobs Portal</title>
			</Head>
			<Component {...pageProps} />
		</Fragment>
	);
};

MyApp.getInitialProps = async (appContext: AppContext) => {
	const cookies = parseCookies(appContext.ctx);
	if (cookies?.token && cookies?.token !== '') {
		authStore.setState((state) => ({ ...state, isLoggedIn: true, token: cookies.token }));
	}
	const appProps = await App.getInitialProps(appContext);
	return { ...appProps, authStore: authStore.getState() };
};

export default MyApp;
