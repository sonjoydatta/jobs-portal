import { ObjectID } from 'bson';
import { Collection, WithId } from 'mongodb';

export type UserEntity = {
	name: string;
	age: string;
	email: string;
	password: string;
	avatar?: string;
};

export class UserModel {
	static readonly COLLECTION_NAME = 'users';

	constructor(private collection: Collection<UserEntity>) {}

	findOne(id: string) {
		return this.collection.findOne({ _id: new ObjectID(id) });
	}

	findOneByEmail(email: string) {
		return this.collection.findOne({ email });
	}

	async create(user: UserEntity): Promise<WithId<UserEntity>> {
		const { insertedId } = await this.collection.insertOne(user);
		return { ...user, _id: insertedId };
	}

	async update(id: string, profile: Partial<UserEntity>) {
		const doc = await this.collection.findOneAndUpdate(
			{ _id: new ObjectID(id) },
			{ $set: profile }
		);

		return doc.value;
	}
}
