import { UserEntity } from '@/database/models';
import { ExperiencesResponce, ProfileResponse } from './profile';

export type LoginPayload = Pick<UserEntity, 'email' | 'password'>;

export type RegisterPayload = Omit<UserEntity, 'avatar'>;

export type AuthResponse = {
	token: string;
};

export type PublicProfileResponse = {
	user: ProfileResponse;
	experiences: ExperiencesResponce;
};
