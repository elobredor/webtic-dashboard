import axios from "axios";
import { API_CONFIG } from "@/config/api.config";
import { storage } from "@/utils/storage";

const axiosInstance = axios.create(API_CONFIG);

// Request interceptor
axiosInstance.interceptors.request.use(
	(config) => {
		const token = storage.getToken();

		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}

		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

// Response interceptor
axiosInstance.interceptors.response.use(
	(response) => response,
	async (error) => {
		if (error.response?.status === 401) {
			// Handle unauthorized access
			// useAuthStore.getState().logout();
			// window.location.href = '/login'; esto es lo que enruta hacia login cuando el token es inválido
		}
		return Promise.reject(error);
	}
);

export default axiosInstance;
