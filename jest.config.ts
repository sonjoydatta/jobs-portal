// eslint-disable-next-line import/no-anonymous-default-export
export default {
	testEnvironment: 'jsdom',
	transform: {
		'^.+\\.tsx?$': ['@swc/jest', { configFile: '.swcrc' }],
	},
	setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
	moduleNameMapper: {
		'@/(.*)$': '<rootDir>/src/$1',
	},
};
