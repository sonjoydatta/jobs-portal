/* eslint-disable @typescript-eslint/no-unused-vars */
import { getModel } from '@/database';
import { UserModel } from '@/database/models';
import { getJWTId } from '@/utils/auth/jwt';
import { BadRequestException, handleApiErrors, NotFoundException } from '@/utils/httpException';
import { NextApiRequest, NextApiResponse } from 'next';

const handlerGet = async (req: NextApiRequest, res: NextApiResponse) => {
	const id = await getJWTId(req);

	const model = await getModel(UserModel);
	const user = await model.findOne(id);
	if (!user) throw new BadRequestException('User not found');
	const { password, ...data } = user;

	res.status(200).json({ success: true, data });
};

const handlerUpdate = async (req: NextApiRequest, res: NextApiResponse) => {
	const id = await getJWTId(req);

	const payload = req.body || {};
	delete payload.email;
	delete payload.password;
	if (Object.keys(payload).length === 0)
		throw new BadRequestException('Request body is empty or invalid');

	const model = await getModel(UserModel);
	const user = await model.update(id, JSON.parse(payload));
	if (!user) throw new NotFoundException('User not found');
	const { password, ...data } = user;

	res.status(200).json({ success: true, data });
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		switch (req.method) {
			case 'GET':
				await handlerGet(req, res);
				break;

			case 'PATCH':
				await handlerUpdate(req, res);
				break;

			default:
				throw new BadRequestException('Method not allowed');
		}
	} catch (error) {
		handleApiErrors(error, res);
	}
};

export default handler;
