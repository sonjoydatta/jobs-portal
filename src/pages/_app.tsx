import { defaultTheme } from '@/config/theme';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from 'styled-components';
import '../styles/app.scss';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ThemeProvider theme={defaultTheme}>
			<Head>
				<title>Glints Jobs Portal</title>
			</Head>
			<Component {...pageProps} />
		</ThemeProvider>
	);
}

export default MyApp;
