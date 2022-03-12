// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getModel } from '@/database';
import { ProfileEntity, ProfileModel } from '@/database/models/profile';
import { BadRequestException, HttpException, NotFoundException } from '@/utils/httpException';
import { WithId } from 'mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';

export const handleApiErrors = (error: unknown, res: NextApiResponse<HttpResponse<any>>) => {
	if (error instanceof HttpException) {
		return res.status(error.status).json({ error: error.message });
	}

	if (error instanceof Error) {
		return res.status(500).json({ error: error.message });
	}

	return res.status(500).json({ error: 'Unknown error' });
};

export type HttpResponse<T> = { data: T; error?: undefined } | { data?: undefined; error: string };

const handleGet = async (
	req: NextApiRequest,
	res: NextApiResponse<HttpResponse<WithId<ProfileEntity>>>
) => {
	const id = req.query.id;
	if (!id || Array.isArray(id)) throw new BadRequestException('Invalid id');

	const model = await getModel(ProfileModel);
	const doc = await model.findOne(id);

	if (!doc) throw new NotFoundException('Profile not found');
	return res.status(200).json({ data: doc });
};

const handlePost = async (
	req: NextApiRequest,
	res: NextApiResponse<HttpResponse<WithId<ProfileEntity>>>
) => {
	const model = await getModel(ProfileModel);

	const doc = await model.create(req.body);
	return res.status(200).json({ data: doc });
};

const handler = async (
	req: NextApiRequest,
	res: NextApiResponse<HttpResponse<WithId<ProfileEntity>>>
) => {
	try {
		const method = req.method;
		switch (method) {
			case 'GET':
				return await handleGet(req, res);
			case 'POST':
				return await handlePost(req, res);
			default:
				return res.status(405).json({ error: 'Method not allowed' });
		}
	} catch (error) {
		return handleApiErrors(error, res);
	}
};

export default handler;
