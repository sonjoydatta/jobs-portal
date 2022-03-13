import { ObjectID } from 'bson';
import { Collection, WithId } from 'mongodb';

export type UserEntity = {
	name: string;
	age: string;
	email: string;
	password: string;
	isPublic?: boolean;
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

	async create(user: Omit<UserEntity, 'isPublic'>): Promise<WithId<UserEntity>> {
		const { insertedId } = await this.collection.insertOne(user);
		return { ...user, _id: insertedId };
	}

	async update(id: string, profile: Partial<Omit<UserEntity, 'email' | 'password'>>) {
		const doc = await this.collection.findOneAndUpdate(
			{ _id: new ObjectID(id) },
			{ $set: profile },
			{ returnDocument: 'after' }
		);

		return doc.value;
	}
}
