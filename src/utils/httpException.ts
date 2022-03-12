import { NextApiResponse } from 'next';

type HttpResponse<T> = { data: T; error?: undefined } | { data?: undefined; error: string };

export class HttpException extends Error {
	constructor(public status: number, message: string) {
		super(message);
	}
}

export class NotFoundException extends HttpException {
	constructor(message: string) {
		super(404, message);
	}
}

export class BadRequestException extends HttpException {
	constructor(message: string) {
		super(400, message);
	}
}

export class InternalServerErrorException extends HttpException {
	constructor(message: string) {
		super(500, message);
	}
}

export class InvalidMethodException extends HttpException {
	constructor(message: string) {
		super(405, message);
	}
}

export const handleApiErrors = (error: unknown, res: NextApiResponse<HttpResponse<unknown>>) => {
	if (error instanceof HttpException) {
		res.status(error.status).json({ error: error.message });
	}

	if (error instanceof Error) {
		res.status(500).json({ error: error.message });
	}

	res.status(500).json({ error: 'Unknown error' });
};
