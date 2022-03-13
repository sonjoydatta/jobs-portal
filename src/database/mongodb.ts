// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { server } from '@/config/server';
import { MongoClient } from 'mongodb';

const uri = server.mongoURL!;
const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!server.mongoURL) {
	throw new Error('Please add your Mongo URL to .env file');
}

if (process.env.NODE_ENV === 'development') {
	if (!global._mongoClientPromise) {
		client = new MongoClient(uri, options);
		global._mongoClientPromise = client.connect();
	}
	clientPromise = global._mongoClientPromise;
} else {
	client = new MongoClient(uri, options);
	clientPromise = client.connect();
}

export default clientPromise;
