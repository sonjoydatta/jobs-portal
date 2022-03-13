/* eslint-disable @typescript-eslint/no-explicit-any */
import client from './mongodb';

export interface ConstructableModel<T> {
	new (...args: any[]): T;
	COLLECTION_NAME: string;
}

export const getModel = async <T>(model: ConstructableModel<T>): Promise<T> => {
	const collection = (await client)
		.db('glints')
		.collection(model.COLLECTION_NAME);

	return new model(collection);
};
