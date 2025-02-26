"use client";

import { api } from "@/services/api";
import { AuthContextType, AuthState } from "../Models/auth";
import { User } from "../Models/User";
import { storage } from "@/utils/storage";
import { createContext, useContext, useEffect, useState } from "react";
import { redirect, useRouter } from "next/navigation";

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const initialState: AuthState = {
	user: null,
	isLoading: true,
	error: null,
	isAuthenticated: false,
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [state, setState] = useState<AuthState>(initialState);
	const [isChecking, setIsChecking] = useState(true);
	const router = useRouter();

	const updateState = (updates: Partial<AuthState>) => {
		setState((prev) => ({ ...prev, ...updates }));
	};

	const setAuthenticated = (user: User) => {
		updateState({
			user,
			isAuthenticated: true,
			isLoading: false,
			error: null,
		});
	};

	const setUnauthenticated = () => {
		updateState({
			user: null,
			isAuthenticated: false,
			isLoading: false,
			error: null,
		});
	};

	const setError = (error: string) => {
		updateState({ error, isLoading: false });
	};
	useEffect(() => {
		const initializeAuth = async () => {
			const storedUser = storage.getUser();
			const token = storage.getToken();
			console.log("storedUser", storedUser);

			if (storedUser !== null && token) {
				try {
					setAuthenticated(storedUser);
				} catch (error: any) {
					storage.clearAuth();
					setUnauthenticated();
				} finally {
					setIsChecking(false);
				}
			} else {
				setUnauthenticated();
			}
		};

		initializeAuth();
	}, []);

	const login = async (email: string, password: string) => {
		updateState({ isLoading: true, error: null });

		try {
			const response = await api.user.login({ email, password });

			const { userAct, accessToken, negocio } = response.data;
			if (userAct.rol !== 3) {
				const errorMessage = "Este usuario no es administrador";
				setError(errorMessage);
				throw new Error(errorMessage);
			}

			storage.setAuth(userAct, accessToken, negocio);
			setAuthenticated(userAct);
			router.push("/dashboard");
			

		
		} catch (error: any) {
			if (error.message === "Este usuario no es administrador") {
				setError(error.message);
			} else {
				setError("Credenciales incorrectas");
			}
			throw error;
		}
	};

	const logout = async () => {
		const confirmLogout = window.confirm("Seguro deseas cerrar sesión?");
		if (!confirmLogout) return;
		setUnauthenticated(); // esto deberia hacer que se enrute a login usando el context router
		storage.clearAuth();
		redirect("/auth/login");
	};

	const clearError = () => {
		updateState({ error: null });
	};

	const setAuth = (user: User, token: string, negocio) => {
		storage.setAuth(user, token, negocio);
		setAuthenticated(user);
	};
	const updateUser = (key: string, value: any) => {
		// Actualiza solo una propiedad en el localStorage
		storage.updateUserProperty(key, value);

		// Si el valor es un array, asegúrate de manejarlo correctamente
		const updatedValue = Array.isArray(value) ? [...value] : value;

		// Actualiza el usuario en el estado global
		const updatedUser: User = { ...state.user, [key]: updatedValue } as User;
		// Actualiza el estado global
		setAuthenticated(updatedUser);
	};

	return (
		<AuthContext.Provider
			value={{
				...state,
				login,
				logout,
				clearError,
				setAuth,
				updateUser,
				isChecking,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const context = useContext(AuthContext);

	if (context === undefined) {
		throw new Error("useAuth must be used within an AuthProvider");
	}

	return context;
};
