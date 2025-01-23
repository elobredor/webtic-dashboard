import { User } from "../Models/User";
export interface AuthState {
	user: User | null;
	isLoading: boolean;
	error: string | null;
	isAuthenticated: boolean;
}

export interface AuthContextType {
	user: User | null;
	isAuthenticated: boolean;
	isLoading: boolean;
	error: string | null;
	logout: () => void;
	clearError: () => void;
	isChecking: boolean;
	setAuth: (user: User, token: string, negocio: any) => void;
	updateUser: (key: string, value: any) => void;
}
