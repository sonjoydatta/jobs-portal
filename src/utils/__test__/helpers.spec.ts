import { capitalize, formatReadable, formatValidatorKey, isNullProperties } from '../helpers';

describe('capitalize', () => {
	it('should be defined', () => {
		expect(capitalize).toBeDefined();
	});

	it('should be a function', () => {
		expect(typeof capitalize).toBe('function');
	});

	it('should capitalize the first letter of a string', () => {
		expect(capitalize('hello')).toBe('Hello');
	});

	it('should not capitalize the first letter of a string', () => {
		expect(capitalize('Hello')).toBe('Hello');
	});
});

describe('formatReadable', () => {
	it('should be defined', () => {
		expect(formatReadable).toBeDefined();
	});

	it('should be a function', () => {
		expect(typeof formatReadable).toBe('function');
	});

	it('should format a readable string', () => {
		expect(formatReadable('helloWorld')).toBe('hello World');
	});
});

describe('formatValidatorKey', () => {
	it('should be defined', () => {
		expect(formatValidatorKey).toBeDefined();
	});

	it('should be a function', () => {
		expect(typeof formatValidatorKey).toBe('function');
	});

	it('should format a validator key', () => {
		expect(formatValidatorKey('helloWorld')).toBe('Hello world');
	});
});

describe('isNullProperties', () => {
	it('should be defined', () => {
		expect(isNullProperties).toBeDefined();
	});

	it('should be a function', () => {
		expect(typeof isNullProperties).toBe('function');
	});

	it('should return true if all properties are null', () => {
		expect(
			isNullProperties({
				a: null,
				b: null,
				c: null,
			})
		).toBe(true);
	});

	it('should return true if properties are empty string', () => {
		expect(
			isNullProperties({
				a: null,
				b: null,
				c: '',
			})
		).toBe(true);
	});

	it('should return false if all properties are defined', () => {
		expect(
			isNullProperties({
				a: 'A',
				b: 'B',
				c: 'C',
			})
		).toBe(false);
	});
});
