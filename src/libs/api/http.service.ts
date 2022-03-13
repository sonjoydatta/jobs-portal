type RequestOptions = {
	headers: Record<string, string>;
};

export type HttpResponse<T> = { data: T; success: true } | { error: string; success: false };

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

	upload<T>(url: string, body: FormData, options?: RequestInit) {
		return this.request<T>('POST', url, { ...options, body });
	}

	private async request<T>(
		method: string,
		url: string,
		options?: RequestInit
	): Promise<HttpResponse<T>> {
		// Generate request URL with base URL and URL path
		const requestURL = `${this.baseURL}/${url}`;

		try {
			const response = await fetch(requestURL, {
				headers: {
					Accept: 'application/json',
					...options?.headers,
					Authorization: this.config.getToken?.() || '',
				},
				body: options?.body,
				method,
			});

			if (response.ok) return await response.json();
			if (response.status === 401) this.config.onUnauthorized?.();

			const res = await response.json().catch(() => ({
				error: 'Something went wrong',
			}));

			throw new Error(res.error);
		} catch (error) {
			if (error instanceof Error) {
				return { error: error?.message, success: false };
			}
			return { error: 'Something Went Wrong', success: false };
		}
	}
}
