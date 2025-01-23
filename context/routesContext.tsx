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
			// Show loader while checking authentication status
			<h4>Cargando..</h4>;
			return;
		}

		if (user) {
			// If user is authenticated, navigate to the dashboard
			if (pathname === `/auth/login` || pathname === `/auth/register`) {
				router.push(`/dashboard`);
			}
		} else {
			router.push(`/auth/login`);
		}
	};

	useEffect(() => {
		checkAccess();
	}, [pathname, user, checkAccess]);

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
