/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { getJWTId } from '@/utils/auth/jwt';
import { BadRequestException, handleApiErrors } from '@/utils/httpException';
import { uploadLogo } from '@/utils/uploadfile';
import { IncomingForm } from 'formidable';
import { NextApiRequest, NextApiResponse } from 'next';
import sharp from 'sharp';

export const config = {
	api: {
		bodyParser: false,
	},
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		if (req.method !== 'POST')
			throw new BadRequestException('Method not allowed');

		await getJWTId(req);

		const fileParts: any[] = [];

		const form = new IncomingForm({ maxFileSize: 10 * 1024 * 1024 });
		form.onPart = (part) => {
			part.on('data', (chunk) => fileParts.push(chunk));
		};

		await new Promise<void>((resolve, reject) => {
			form.parse(req, (error) => {
				if (error) return reject(error);
				resolve();
			});
		});

		const file = Buffer.concat(fileParts);
		const optimizedBuffer = await sharp(file).webp().toBuffer();
		const url = await uploadLogo(
			`${Date.now().toString()}.webp`,
			optimizedBuffer
		);
		const data = {
			avatar: url,
		};

		res.status(200).json({ success: true, data });
	} catch (error) {
		handleApiErrors(error, res);
	}
};

export default handler;
