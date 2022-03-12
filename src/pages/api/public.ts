import { getModel } from '@/database';
import { ProfileEntity, ProfileModel } from '@/database/models/profile';
import { BadRequestException, NotFoundException } from '@/utils/httpException';
import { WithId } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import { handleApiErrors, HttpResponse } from './hello';

const handleGet = async (
	req: NextApiRequest,
	res: NextApiResponse<HttpResponse<WithId<ProfileEntity>>>
) => {
	const id = req.query.id;
	if (!id || Array.isArray(id)) throw new BadRequestException('Invalid id');

	const model = await getModel(ProfileModel);
	const doc = await model.findOne(id);

	if (!doc || !doc?.isPublic) throw new NotFoundException('Profile not found');
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
			default:
				return res.status(405).json({ error: 'Method not allowed' });
		}
	} catch (error) {
		return handleApiErrors(error, res);
	}
};

export default handler;
