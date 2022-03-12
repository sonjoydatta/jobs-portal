import { UserEntity } from '@/database/models';

export type LoginPayload = Pick<UserEntity, 'email' | 'password'>;

export type RegisterPayload = Omit<UserEntity, 'avatar'>;

export type AuthResponse = {
	token: string;
	user: {
		id: string;
	} & Omit<UserEntity, 'password'>;
};
