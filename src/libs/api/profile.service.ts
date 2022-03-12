import { ProfileEntity } from '@/database/models/profile';
import { authStore } from '@/store/auth.store';
import { HttpService } from './http.service';

class ProfileService {
	constructor(private http: HttpService) {}

	getProfile() {
		return this.http.get<ProfileEntity>('/api/profile');
	}
}

const privateHttpInstance = new HttpService('http://localhost:3000', {
	getToken: () => authStore.getState().accessToken,
	onUnauthorized: () => {
		authStore.setState({ accessToken: '', isLoggedIn: false, id: '' });
	},
});

export const authService = new ProfileService(privateHttpInstance);
