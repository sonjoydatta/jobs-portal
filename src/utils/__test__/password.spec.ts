import { comparePassword, encryptPassword } from '../auth/password';

describe('bcrypt', () => {
	it('encryptPassword should be defined', () => {
		expect(encryptPassword).toBeDefined();
	});

	it('encryptPassword should be a function', () => {
		expect(typeof encryptPassword).toBe('function');
	});

	it('comparePassword should be defined', () => {
		expect(comparePassword).toBeDefined();
	});

	it('comparePassword should be a function', () => {
		expect(typeof comparePassword).toBe('function');
	});

	it('should return true if the passwords match', async () => {
		const password = 'newPass1234';
		const encrypted = await encryptPassword(password);
		expect(await comparePassword(password, encrypted)).toBe(true);
	});

	it('should return false if the passwords do not match', async () => {
		const password = 'newPass1234';
		const encrypted = await encryptPassword(password);
		expect(await comparePassword('wrongPassword', encrypted)).toBe(false);
	});
});
