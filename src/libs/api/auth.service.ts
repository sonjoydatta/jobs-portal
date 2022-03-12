import { HttpService } from './http.service';

class AuthService {
	constructor(private http: HttpService) {}

	login(email: string, password: string) {
		return this.http.post<string>('/api/auth/login', { email, password });
	}
}

const publicHttpInstance = new HttpService('http://localhost:3000');

export const authService = new AuthService(publicHttpInstance);
