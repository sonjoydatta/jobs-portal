import { ObjectID } from 'bson';
import { Collection } from 'mongodb';

export type ExperienceEntity = {
	userId: string;
	title: string;
	company: string;
	from: string;
	to?: string;
	isCurrent?: boolean;
	description?: string;
	avatar?: string;
};

export class ExperienceModel {
	static readonly COLLECTION_NAME = 'experiences';

	constructor(private collection: Collection<ExperienceEntity>) {}

	findOne(id: string) {
		return this.collection.findOne({ _id: new ObjectID(id) });
	}

	findAllByUserId(userId: string) {
		return this.collection.find({ userId }).toArray();
	}

	async create(experience: ExperienceEntity) {
		const { insertedId } = await this.collection.insertOne(experience);
		return { ...experience, _id: insertedId };
	}

	async update(id: string, experience: Partial<ExperienceEntity>) {
		const doc = await this.collection.findOneAndUpdate(
			{ _id: new ObjectID(id) },
			{ $set: experience },
			{ returnDocument: 'after' }
		);

		return doc.value;
	}
}
