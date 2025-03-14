"use client";

import { api } from "@/services/api";
import { AuthContextType, AuthState } from "../Models/auth";
import { User } from "../Models/User";
import { storage } from "@/utils/storage";
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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
		setIsChecking(false);
	};

	const setUnauthenticated = () => {
		updateState({
			user: null,
			isAuthenticated: false,
			isLoading: false,
			error: null,
		});
		setIsChecking(false);
	};

	const setError = (error: string) => {
		updateState({ error, isLoading: false });
	};

	useEffect(() => {
		const initializeAuth = async () => {
			console.log("🔄 Inicializando autenticación...");
			const storedUser = storage.getUser();
			const token = storage.getToken();
			console.log("📌 Usuario almacenado:", storedUser);

			if (storedUser !== null && token) {
				try {
					setAuthenticated(storedUser);
					console.log("✅ Usuario autenticado:", storedUser);
					// equi validar la vigencia del token
					router.push("/dashboard");
				} catch (error: any) {
					console.error("❌ Error en autenticación:", error);
					storage.clearAuth();
					setUnauthenticated();
				}
			} else {
				console.log("🚫 No hay usuario autenticado.");
				setUnauthenticated();
			}

			setIsChecking(false); // ✅ Esto asegura que el estado se actualiza
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
			router.replace("/dashboard"); // Cambio a replace()
		} catch (error: any) {
			setError(
				error.message === "Este usuario no es administrador"
					? error.message
					: "Credenciales incorrectas"
			);
			throw error;
		}
	};

	const logout = async () => {
		console.log("🔴 Cerrando sesión...");
		storage.clearAuth();
		setUnauthenticated();
		router.push('/auth/login')
	};

	const clearError = () => {
		updateState({ error: null });
	};

	const setAuth = (user: User, token: string, negocio) => {
		storage.setAuth(user, token, negocio);
		setAuthenticated(user);
	};

	const updateUser = (key: string, value: any) => {
		storage.updateUserProperty(key, value);
		const updatedValue = Array.isArray(value) ? [...value] : value;
		const updatedUser: User = { ...state.user, [key]: updatedValue } as User;
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
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};
