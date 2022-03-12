import config from '@/config';
import jwt from 'jsonwebtoken';

type JWTPayload = {
	id: string;
};

export const signJWT = async (payload: JWTPayload) => {
	const secret = config.JWTSecret;
	if (!secret) throw new Error('jwt secret not found');

	return await new Promise<string>((resolve, reject) => {
		jwt.sign(payload, secret, { expiresIn: '1h' }, (err, token) => {
			if (err) return reject(err);
			resolve(token!);
		});
	});
};

export const verifyJWT = (token: string) => {
	const secret = config.JWTSecret;
	if (!secret) throw new Error('jwt secret not found');

	return new Promise<JWTPayload>((resolve, reject) => {
		jwt.verify(token, secret, (err, decoded) => {
			if (err) return reject(err);
			resolve(decoded as JWTPayload);
		});
	});
};
