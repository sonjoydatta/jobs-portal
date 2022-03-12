import config from '@/config';
import { ProfileEntity } from '@/database/models';
import { authStore } from '@/store/auth.store';
import { HttpService } from './http.service';

class ProfileService {
	constructor(private http: HttpService) {}

	getProfile() {
		return this.http.get<ProfileEntity>('/api/profile');
	}
}

const privateHttpInstance = new HttpService(config.apiURL!, {
	getToken: () => authStore.getState().accessToken,
	onUnauthorized: () => {
		authStore.setState({ accessToken: '', isLoggedIn: false, id: '' });
	},
});

export const authService = new ProfileService(privateHttpInstance);
