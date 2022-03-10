import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Fragment } from 'react';
import '../styles/app.scss';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<Fragment>
			<Head>
				<title>Glints Jobs Portal</title>
			</Head>
			<Component {...pageProps} />
		</Fragment>
	);
}

export default MyApp;
