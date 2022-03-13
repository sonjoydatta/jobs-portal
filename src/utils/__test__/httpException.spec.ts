import { HttpException } from '../httpException';

describe('HttpException', () => {
	it('should be defined', () => {
		expect(HttpException).toBeDefined();
	});

	it('should be a function', () => {
		expect(typeof HttpException).toBe('function');
	});

	it('should be a class', () => {
		expect(new HttpException(401, 'Unauthorized')).toBeInstanceOf(HttpException);
	});

	it('should have a status property', () => {
		const error = new HttpException(401, 'Unauthorized');
		expect(error.status).toBe(401);
	});

	it('should have a message property', () => {
		const error = new HttpException(401, 'Unauthorized');
		expect(error.message).toBe('Unauthorized');
	});
});
