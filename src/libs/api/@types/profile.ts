import { ExperienceEntity, UserEntity } from '@/database/models';

export type ProfileResponse = {
	_id: string;
} & Omit<UserEntity, 'password'>;

export type ExperiencePayload = Omit<ExperienceEntity, 'userId'>;

export type ExperienceResponce = {
	_id: string;
} & ExperienceEntity;

export type ExperiencesResponce = ExperienceResponce[];
