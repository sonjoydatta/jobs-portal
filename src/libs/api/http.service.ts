type RequestOptions = {
	headers: Record<string, string>;
};

type HttpResponse<T> = { data: T; error: null } | { error: string };

type HttpServiceConfig = {
	getToken?: () => string | null;
	onUnauthorized?: () => void;
};

export class HttpService {
	constructor(private baseURL: string, private config: HttpServiceConfig = {}) {}

	get<T>(url: string, options?: RequestOptions) {
		return this.request<T>('GET', url, options);
	}

	post<T>(url: string, body: unknown, options?: RequestOptions) {
		return this.request<T>('POST', url, { ...options, body: JSON.stringify(body) });
	}

	put<T>(url: string, body: unknown, options?: RequestOptions) {
		return this.request<T>('PUT', url, { ...options, body: JSON.stringify(body) });
	}

	delete<T>(url: string, options?: RequestOptions) {
		return this.request<T>('DELETE', url, options);
	}

	patch<T>(url: string, body: unknown, options?: RequestOptions) {
		return this.request<T>('PATCH', url, { ...options, body: JSON.stringify(body) });
	}

	private async request<T>(
		method: string,
		url: string,
		options?: RequestInit
	): Promise<HttpResponse<T>> {
		const requestURL = `${this.baseURL}/${url}`;

		try {
			const response = await fetch(requestURL, {
				method,
				headers: {
					'content-type': 'application/json',
					...options?.headers,
					Authorization: this.config.getToken?.() || '',
				},
			});

			if (response.ok) {
				return { data: (await response.json()) as T, error: null };
			}
			if (response.status === 401) {
				this.config.onUnauthorized?.();
			}

			const res = await response.json().catch(() => ({
				error: 'Something went wrong',
			}));

			throw new Error(res.error);
		} catch (error) {
			if (error instanceof Error) {
				return { error: error?.message };
			}
			return { error: 'Something Went Wrong' };
		}
	}
}
