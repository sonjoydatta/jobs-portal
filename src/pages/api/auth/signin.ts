import { getModel } from '@/database';
import { UserEntity, UserModel } from '@/database/models';
import { signJWT } from '@/utils/auth/jwt';
import { comparePassword } from '@/utils/auth/password';
import {
	BadRequestException,
	handleApiErrors,
	InvalidMethodException,
} from '@/utils/httpException';
import { WithId } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

export const getUserWithJWT = async (user: WithId<UserEntity>) => {
	const token = await signJWT({ id: user._id.toString() });
	return {
		token,
		user: {
			id: user._id.toString(),
			name: user.name,
			age: user.age,
			email: user.email,
		},
	};
};

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

		const data = await getUserWithJWT(user);

		res.status(200).json({ data });
	} catch (error) {
		handleApiErrors(error, res);
	}
};

export default handler;
