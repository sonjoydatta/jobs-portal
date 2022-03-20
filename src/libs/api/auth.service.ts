import { client } from '@/config/client';
import {
	AuthResponse,
	LoginPayload,
	PublicProfileResponse,
	RegisterPayload,
} from './@types';
import { HttpService } from './http.service';

class AuthService {
	constructor(private http: HttpService) {}

	login(payload: LoginPayload) {
		return this.http.post<AuthResponse>('auth/login', payload);
	}

	register(payload: RegisterPayload) {
		return this.http.post<AuthResponse>('auth/register', payload);
	}

	publicProfile(id: string) {
		return this.http.get<PublicProfileResponse>(`user/public?id=${id}`);
	}
}

const httpInstance = new HttpService(client.apiURL);
export const authService = new AuthService(httpInstance);
