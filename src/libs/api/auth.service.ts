import config from '@/config';
import { AuthResponse, LoginPayload, RegisterPayload } from './@types';
import { HttpService } from './http.service';

class AuthService {
	constructor(private http: HttpService) {}

	login(payload: LoginPayload) {
		return this.http.post<AuthResponse>('auth/login', payload);
	}

	register(payload: RegisterPayload) {
		return this.http.post<AuthResponse>('auth/register', payload);
	}
}

const httpInstance = new HttpService(config.apiURL!);
export const authService = new AuthService(httpInstance);
