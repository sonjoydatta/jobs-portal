import { server } from '@/config/server';
import { MongoClient } from 'mongodb';

declare global {
	// eslint-disable-next-line no-var
	var _mongoClientPromise: Promise<MongoClient>;
}

const uri = server.mongoURL;
if (!uri) {
	throw new Error('Please add your MONGO_URL to .env file');
}

const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (server.isDev) {
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
