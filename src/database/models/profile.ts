import { ObjectID } from 'bson';
import { Collection, WithId } from 'mongodb';

export type ProfileEntity = {
	name: string;
	age: string;
	experiences: any[];

	isPublic: boolean;
};

export class ProfileModel {
	static readonly COLLECTION_NAME = 'profiles';

	constructor(private collection: Collection<ProfileEntity>) {}

	findOne(id: string) {
		return this.collection.findOne({ _id: new ObjectID(id) });
	}

	async create(profile: ProfileEntity): Promise<WithId<ProfileEntity>> {
		const { insertedId } = await this.collection.insertOne(profile);

		return { ...profile, _id: insertedId };
	}

	async update(id: string, profile: Partial<ProfileEntity>) {
		const doc = await this.collection.findOneAndUpdate(
			{ _id: new ObjectID(id) },
			{ $set: profile }
		);

		return doc.value;
	}

	async delete(id: string) {
		return await this.collection.deleteOne({ _id: new ObjectID(id) });
	}

	async findAll() {
		return await this.collection.find().toArray();
	}
}
