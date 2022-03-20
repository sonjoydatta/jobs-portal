export const client = {
	apiURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
	isDev: process.env.NODE_ENV === 'development',
};
