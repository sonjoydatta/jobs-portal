import { getModel } from '@/database';
import { ExperienceEntity, ExperienceModel } from '@/database/models';
import { getJWTId } from '@/utils/auth/jwt';
import { BadRequestException, handleApiErrors } from '@/utils/httpException';
import { NextApiRequest, NextApiResponse } from 'next';

const handlerAdd = async (req: NextApiRequest, res: NextApiResponse) => {
	const userId = await getJWTId(req);

	const payload: ExperienceEntity = req.body || {};
	if (Object.keys(payload).length === 0)
		throw new BadRequestException('Request body is empty or invalid');

	if (!payload.title) throw new BadRequestException('Title is required');

	if (!payload.company) throw new BadRequestException('Company is required');

	if (!payload.from) throw new BadRequestException('Start date is required');

	if (payload.isCurrent === undefined) payload.isCurrent = false;

	if (!payload.isCurrent && !payload.to)
		throw new BadRequestException('End date is required');

	const model = await getModel(ExperienceModel);
	const experience = await model.create({
		userId,
		title: payload.title,
		company: payload.company,
		from: payload.from,
		to: payload.to,
		isCurrent: payload.isCurrent,
		description: payload.description,
		avatar: payload.avatar,
	});

	res.status(200).json({ success: true, data: experience });
};

const handlerUpdate = async (req: NextApiRequest, res: NextApiResponse) => {
	await getJWTId(req);

	const id = req.query.id;
	if (!id || Array.isArray(id)) throw new BadRequestException('Id is required');

	const payload = req.body || {};
	delete payload._id;
	delete payload.userId;
	if (Object.keys(payload).length === 0)
		throw new BadRequestException('Request body is empty or invalid');

	const model = await getModel(ExperienceModel);
	const experience = await model.update(id, payload);

	res.status(200).json({ success: true, data: experience });
};

const handlerGet = async (req: NextApiRequest, res: NextApiResponse) => {
	const id = await getJWTId(req);

	const model = await getModel(ExperienceModel);
	const experiences = await model.findAllByUserId(id);

	res.status(200).json({ success: true, data: experiences });
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		switch (req.method) {
			case 'POST':
				await handlerAdd(req, res);
				break;

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
