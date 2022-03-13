/* eslint-disable @typescript-eslint/no-explicit-any */
import { authStore } from '@/store';
import { NextPage, NextPageContext } from 'next';
import Router from 'next/router';

const redirectURL = '/dashboard/profile';

export const withoutAuth = (WrappedComponent: NextPage<any>) => {
	const hocComponent = ({ ...props }) => <WrappedComponent {...props} />;

	hocComponent.getInitialProps = async (ctx: NextPageContext) => {
		const { isLoggedIn } = authStore.getState();

		if (isLoggedIn) {
			if (ctx?.res) {
				ctx.res.writeHead(302, { location: redirectURL });
				ctx.res.end();
			} else {
				Router.push(redirectURL);
			}
		} else if (WrappedComponent.getInitialProps) {
			const wrappedProps = await WrappedComponent.getInitialProps(ctx);
			return wrappedProps;
		}

		return { data: null };
	};

	return hocComponent;
};
