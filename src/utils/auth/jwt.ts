import { server } from '@/config/server';
import jwt from 'jsonwebtoken';
import { NextApiRequest } from 'next';
import { UnauthorizedException } from '../httpException';

type JWTPayload = {
	id: string;
};

export const signJWT = async (payload: JWTPayload) => {
	const secret = server.JWTSecret;
	if (!secret) throw new Error('jwt secret not found');

	return await new Promise<string>((resolve, reject) => {
		jwt.sign(payload, secret, { expiresIn: '7d' }, (err, token) => {
			if (err) return reject(err);
			resolve(token!);
		});
	});
};

export const verifyJWT = (token: string) => {
	const secret = server.JWTSecret;
	if (!secret) throw new Error('jwt secret not found');

	return new Promise<JWTPayload>((resolve, reject) => {
		jwt.verify(token, secret, (err, decoded) => {
			if (err) return reject(err);
			resolve(decoded as JWTPayload);
		});
	});
};

export const getJWTId = async (req: NextApiRequest) => {
	const authorization = req.headers.authorization;
	if (!authorization) throw new UnauthorizedException('User not authorized');

	try {
		const { id } = await verifyJWT(authorization);
		if (!id) {
			throw new UnauthorizedException('User not authorized');
		}
		return id;
	} catch (error) {
		throw new UnauthorizedException('User not authorized');
	}
};
