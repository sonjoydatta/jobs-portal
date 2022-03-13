import { client } from '@/config/client';
import { authStore } from '@/store/auth.store';
import {
	ExperiencePayload,
	ExperienceResponce,
	ExperiencesResponce,
	ProfileResponse,
} from './@types';
import { HttpService } from './http.service';

class ProfileService {
	constructor(private http: HttpService) {}

	getProfile() {
		return this.http.get<ProfileResponse>('user/profile');
	}

	updateProfile(profile: Partial<ProfileResponse>) {
		return this.http.patch<ProfileResponse>('user/profile', profile);
	}

	updateProfileAvatar(avatar: File) {
		const formData = new FormData();
		formData.append('avatar', avatar);
		return this.http.upload<ProfileResponse>('user/avatar/profile', formData);
	}

	addExperience(experience: ExperiencePayload) {
		return this.http.post<ExperienceResponce>('user/experience', experience);
	}

	getExperiences() {
		return this.http.get<ExperiencesResponce>('user/experience');
	}

	updateExperience(id: string, experience: Partial<ExperiencePayload>) {
		return this.http.patch<ExperienceResponce>(
			`user/experience?id=${id}`,
			experience
		);
	}

	updateCompanyLogo(logo: File) {
		const formData = new FormData();
		formData.append('logo', logo);
		return this.http.upload<{ avatar: string }>(
			`user/avatar/company`,
			formData
		);
	}
}

const httpInstance = new HttpService(client.apiURL!, {
	getToken: () => authStore.getState().accessToken,
	onUnauthorized: () => {
		authStore.setState({ accessToken: '', isLoggedIn: false });
	},
});
export const profileService = new ProfileService(httpInstance);
