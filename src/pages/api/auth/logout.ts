import { handleApiErrors, InvalidMethodException } from '@/utils/httpException';
import { NextApiRequest, NextApiResponse } from 'next';
import { destroyCookie } from 'nookies';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		// await getJWTId(req);

		if (req.method !== 'POST')
			throw new InvalidMethodException('Method not allowed');

		destroyCookie({ res }, 'token', {
			path: '/',
		});
		res.status(200).json({ success: true, data: { message: 'Logged out' } });
	} catch (error) {
		handleApiErrors(error, res);
	}
};

export default handler;
