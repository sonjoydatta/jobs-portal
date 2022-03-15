import { getModel } from '@/database';
import { UserModel } from '@/database/models';
import { encryptPassword } from '@/utils/auth/password';
import {
	BadRequestException,
	handleApiErrors,
	InvalidMethodException,
} from '@/utils/httpException';
import { NextApiRequest, NextApiResponse } from 'next';
import { setCookie } from 'nookies';
import { getUserWithJWT } from './login';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		if (req.method !== 'POST') {
			throw new InvalidMethodException('Method not allowed');
		}

		if (!req.body.name) {
			throw new BadRequestException('Name is required');
		}

		if (!req.body.age) {
			throw new BadRequestException('Age is required');
		}

		if (!req.body.email) {
			throw new BadRequestException('Email is required');
		}

		if (!req.body.password) {
			throw new BadRequestException('Password is required');
		}

		const model = await getModel(UserModel);
		const user = await model.findOneByEmail(req.body.email);
		if (user) {
			throw new BadRequestException('User already exists');
		}

		const password = await encryptPassword(req.body.password);
		const newUser = await model.create({
			name: req.body.name,
			age: req.body.age,
			email: req.body.email,
			password,
		});
		if (!newUser) {
			throw new BadRequestException('Something went wrong');
		}

		const data = await getUserWithJWT(newUser);
		setCookie({ res }, 'token', data.token, {
			maxAge: 7 * 24 * 60 * 60,
			path: '/',
		});

		res.status(200).json({ success: true, data });
	} catch (error) {
		handleApiErrors(error, res);
	}
};

export default handler;
