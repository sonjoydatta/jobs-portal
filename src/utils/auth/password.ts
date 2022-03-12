import { compare, hash } from '@node-rs/bcrypt';

export const encryptPassword = (password: string) => hash(password, 10);

export const comparePassword = (incoming: string, encrypted: string) =>
	compare(incoming, encrypted);
