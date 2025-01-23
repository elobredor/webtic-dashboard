import axios from "axios";
import { API_CONFIG } from "@/config/api.config";
import { storage } from "@/utils/storage";

const api = axios.create({
	baseURL: API_CONFIG.baseURL,
	timeout: API_CONFIG.timeout,
	headers: API_CONFIG.HEADERS.DEFAULT,
	withCredentials: false,
});

// Request interceptor
api.interceptors.request.use(
	(config) => {
		const token = storage.getToken();
		if (token) {
			Object.entries(API_CONFIG.HEADERS.AUTH(token)).forEach(([key, value]) => {
				config.headers.set(key, value as string);
			});
		}

		// Ensure the URL doesn't have double slashes
		if (config.url) {
			config.url = config.url.replace(/([^:]\/)\/+/g, "$1");
		}

		return config;
	},
	(error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
	(response) => response,
	async (error) => {
		if (error.response?.status === 401) {
			localStorage.clear();
			window.location.href = "/mercabaq/login";
			return Promise.reject(error);
		}
		return Promise.reject(error);
	}
);

export default api;
