/* eslint-disable @typescript-eslint/no-explicit-any */
import config from '@/config';
import { InternalServerErrorException } from '@/utils/httpException';
import { MongoClient } from 'mongodb';

export interface ConstructableModel<T> {
	new (...args: any[]): T;
	COLLECTION_NAME: string;
}

let connection: MongoClient | null = null;

export const getModel = async <T>(model: ConstructableModel<T>): Promise<T> => {
	if (connection) {
		return new model(connection.db('glints').collection(model.COLLECTION_NAME));
	}

	const url = config.mongoURL;
	if (!url) throw new InternalServerErrorException('Failed to Connect to database');

	const client = new MongoClient(url);
	await client.connect();

	connection = client;

	const collection = client.db('glints').collection(model.COLLECTION_NAME);

	return new model(collection);
};
