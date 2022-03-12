import { getModel } from '@/database';
import { UserModel } from '@/database/models';
import { signJWT } from '@/utils/auth/jwt';
import { comparePassword } from '@/utils/auth/password';
import {
	BadRequestException,
	handleApiErrors,
	InvalidMethodException,
} from '@/utils/httpException';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		if (req.method !== 'POST') {
			throw new InvalidMethodException('Method not allowed');
		}

		if (!req.body.email) {
			throw new BadRequestException('Email is required');
		}

		if (!req.body.password) {
			throw new BadRequestException('Password is required');
		}

		const model = await getModel(UserModel);
		const user = await model.findOneByEmail(req.body.email);
		if (!user) {
			throw new BadRequestException('User not found');
		}

		const isValid = await comparePassword(req.body.password, user.password);
		if (!isValid) {
			throw new BadRequestException('Password is invalid');
		}

		const signedJWT = await signJWT({ id: user._id.toString() });
		const data = {
			token: signedJWT,
			user: {
				id: user._id.toString(),
				name: user.name,
				age: user.age,
				email: user.email,
			},
		};

		return res.status(200).json({ data });
	} catch (error) {
		return handleApiErrors(error, res);
	}
};

export default handler;
