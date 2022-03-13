/* eslint-disable @typescript-eslint/no-unused-vars */
import { getModel } from '@/database';
import { ExperienceModel, UserModel } from '@/database/models';
import { BadRequestException, handleApiErrors, NotFoundException } from '@/utils/httpException';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		if (req.method !== 'GET') throw new BadRequestException('Request method is required');

		const id = req.query.id;
		if (!id || Array.isArray(id)) throw new BadRequestException('Id is required');

		const model = await getModel(UserModel);
		const user = await model.findOne(id);
		if (!user) throw new NotFoundException('User not found');

		if (!user.isPublic)
			throw new BadRequestException('You have no permission to view this profile');

		const model1 = await getModel(ExperienceModel);
		const experiences = await model1.findAllByUserId(id);

		res.status(200).json({
			success: true,
			data: {
				user,
				experiences,
			},
		});
	} catch (error) {
		handleApiErrors(error, res);
	}
};

export default handler;
