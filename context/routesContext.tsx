"use client";

import React, { createContext, useContext, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "./AuthContext";

interface RoutesContextType {
	checkAccess: () => void;
	redirectPath: (path: string) => void;
}

const RoutesContext = createContext<RoutesContextType | undefined>(undefined);

export const RoutesProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const { user, isChecking } = useAuth();
	const router = useRouter();
	const pathname = usePathname();

	const checkAccess = () => {
		if (isChecking) {
			console.log("⏳ Esperando a que termine la verificación...");
			return;
		}
		if (user) {
			// Si el usuario está autenticado y está en login o register, lo redirigimos al dashboard
			if (pathname === "/auth/login" || pathname === "/auth/register") {
				console.log("➡️ Usuario autenticado, redirigiendo al /dashboard");
				router.push("/dashboard");
			}
		} else {
			// Si no hay usuario, bloqueamos el acceso a rutas protegidas
			if (pathname === "/dashboard" || pathname === "/") {
				console.log("🚫 Acceso denegado, redirigiendo a /auth/login");
				router.push("/auth/login");
			}
		}
	};

	useEffect(() => {
		checkAccess();
	}, [pathname, user, isChecking]);

	const redirectPath = (path: string) => {
		router.push(path);
	};

	return (
		<RoutesContext.Provider value={{ checkAccess, redirectPath }}>
			{children}
		</RoutesContext.Provider>
	);
};

export const useRoutes = () => {
	const context = useContext(RoutesContext);
	if (context === undefined) {
		throw new Error("useRoutes must be used within a RoutesProvider");
	}
	return context;
};
