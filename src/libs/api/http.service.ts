export type HttpResponse<T> =
	| { data: T; success: true }
	| { error: string; success: false };

type HttpServiceConfig = {
	getToken?: () => string | null;
	onUnauthorized?: () => void;
};

type RequestOptions = {
	headers?: Record<string, string>;
};

export class HttpService {
	constructor(
		private baseURL: string,
		private config: HttpServiceConfig = {}
	) {}

	get<T>(url: string, options?: RequestOptions) {
		return this.request<T>('GET', url, null, options);
	}

	post<T>(url: string, body: unknown, options?: RequestOptions) {
		return this.request<T>('POST', url, JSON.stringify(body), options);
	}

	put<T>(url: string, body: unknown, options?: RequestOptions) {
		return this.request<T>('PUT', url, JSON.stringify(body), options);
	}

	delete<T>(url: string, options?: RequestOptions) {
		return this.request<T>('DELETE', url, null, options);
	}

	patch<T>(url: string, body: unknown, options?: RequestOptions) {
		return this.request<T>('PATCH', url, JSON.stringify(body), options);
	}

	upload<T>(url: string, body: FormData, options?: RequestOptions) {
		return this.request<T>('POST', url, body, {
			...options,
			headers: { ...options?.headers },
		});
	}

	private async request<T>(
		method: string,
		url: string,
		body: string | FormData | null = null,
		options?: RequestOptions
	): Promise<HttpResponse<T>> {
		// Generate request URL with base URL and URL path
		const requestURL = `${this.baseURL}/${url}`;

		try {
			const headers: Record<string, string> = {
				'content-type': 'application/json',
				...options?.headers,
				Authorization: this.config.getToken?.() || '',
			};

			if (body?.constructor?.name === 'FormData') {
				delete headers['content-type'];
			}
			const response = await fetch(requestURL, {
				headers,
				body,
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
