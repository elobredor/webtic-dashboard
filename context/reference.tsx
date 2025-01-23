"use client";

import {
	createContext,
	useContext,
	useState,
	useEffect,
	ReactNode,
	Suspense,
} from "react";

import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/router";

interface AuthContextType {
	isValid: boolean;
	user: IUser | null;
	signIn: (email: string, password: string) => Promise<void>;
	logout: () => void;
	updateUserInfo: (userData: IUser) => void;
	updateUserImage: (img: string) => void;
	checkingUser: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
	children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
	const [isValid, setIsValid] = useState(false);
	const [checkingUser, setCheckingUser] = useState(true);
	const [user, setUser] = useState<IUser | null>(null);
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	useEffect(() => {
		const initializeUser = async () => {
			const storedUser = localStorage.getItem("user");
			if (storedUser) {
				try {
					const user = JSON.parse(storedUser);
					setUser(user);
					setIsValid(true);
				} catch {
					logout();
				}
			}
			setCheckingUser(false);
		};

		initializeUser();
	}, []);

	useEffect(() => {
		const findUser = async () => {
			const user = localStorage.getItem("user");
			if (user) {
				const newUser = await findUserByEmail(JSON.parse(user).email);
				if (
					newUser.message === "Token not valid" ||
					newUser.message === "Authorization token missing"
				) {
					setIsValid(false);
					setUser(null);
					localStorage.removeItem("user");
					localStorage.removeItem("token");
					router.push("/auth/login");
				} else {
					setUser(newUser.data);
					setIsValid(true);
				}
			}
			setCheckingUser(false);
		};

		findUser();
	}, [pathname]);

	useEffect(() => {
		const userParams = searchParams.get("user");
		const tokenParams = searchParams.get("token");

		if (userParams) {
			const decodedUser = JSON.parse(decodeURIComponent(userParams)) as IUser;
			setUser(decodedUser);
			localStorage.setItem("user", userParams);
		}
		if (tokenParams) {
			localStorage.setItem("token", tokenParams);
			window.history.replaceState({}, document.title, window.location.pathname);
		}
	}, [searchParams]);

	const signInUser = async (email: string, password: string) => {
		try {
			setCheckingUser(true);
			const response = await signIn(email, password);
			setUser(response.data);
			localStorage.setItem("user", JSON.stringify(response.data));
			localStorage.setItem("token", response.token);
			setIsValid(true);
			//Aqui pones la ruta que quieras que se vea al loguearse
			router.push("/ruta1");
		} catch (error) {
			setCheckingUser(false);
			throw error;
		} finally {
			setCheckingUser(false);
		}
	};

	const logout = () => {
		setIsValid(false);
		setUser(null);
		localStorage.removeItem("user");
		localStorage.removeItem("token");
		//Aqui pones la ruta de tu login
		router.push("/auth/login");
	};

	const updateUserInfo = (userData: IUser) => {
		setUser(userData);
		localStorage.setItem("user", JSON.stringify(userData));
	};

	const updateUserImage = (userImage: string) => {
		if (user === null) return;
		const newUserData: IUser = { ...user, profile_url: userImage };

		setUser(newUserData);
		localStorage.setItem("user", JSON.stringify(newUserData));
	};

	return (
		<Suspense fallback={null}>
			<AuthContext.Provider
				value={{
					isValid,
					user,
					signIn: signInUser,
					logout,
					updateUserInfo,
					updateUserImage,
					checkingUser,
				}}
			>
				{children}
			</AuthContext.Provider>
		</Suspense>
	);
};

export const useAuth = () => {
	const context = useContext(AuthContext);

	if (context === undefined) {
		throw new Error("useAuth must be used within an AuthProvider");
	}

	return context;
};
