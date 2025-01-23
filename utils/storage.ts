import { User } from "../Models/User";
import { STORAGE_KEYS } from "@/constants/storage";

export const storage = {
	getUser: (): User | null => {
		const userData = localStorage.getItem(STORAGE_KEYS.AUTH_USER);
		if (userData) {
			try {
				return JSON.parse(userData);
			} catch (error) {
				console.error("Error al parsear JSON:", error);
				return null; // Devuelve null si el JSON es inválido
			}
		} else {
			return null; // Si no hay datos, devuelve null
		}
	},
	getToken: (): string | null => {
		return localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
	},

	setAuth: (user: User, token: string, negocio: any): void => {
		localStorage.setItem(STORAGE_KEYS.AUTH_USER, JSON.stringify(user));
		localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
		localStorage.setItem("negocio", JSON.stringify(negocio));
	},

	clearAuth: (): void => {
		localStorage.removeItem(STORAGE_KEYS.AUTH_USER);
		localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
	},
	updateUserProperty: (key: string, value: any): void => {
		const currentUser = storage.getUser();
		if (currentUser) {
			const updatedUser = { ...currentUser, [key]: value };
			localStorage.setItem(STORAGE_KEYS.AUTH_USER, JSON.stringify(updatedUser));
		}
	},
};
