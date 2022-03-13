import { ExperienceEntity, UserEntity } from '@/database/models';

export type ProfileResponse = {
	_id: string;
} & Omit<UserEntity, '_id' | 'password'>;

export type ExperienceResponce = {
	_id: string;
} & Omit<ExperienceEntity, '_id'>;

export type ExperiencesResponce = ExperienceResponce[];
