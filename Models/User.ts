export interface User {
	name?: string | undefined;
	googleId?: any;
	facebookId?: any;
	id: number | undefined;
	email: string;
	rol: number;
	password: string;
	isVerified: boolean;
	tokenTime: string;
	tokenCode: string;
	createdAt: string;
	updatedAt: string;
	directions?: any[];

	deletedAt: any;
	createdBy: any;
	updatedBy: any;
	deletedBy: any;
}

export interface UserRegister {
	name: string;
	documento: string;
	telefono: string;
	tipoDocumento: string;
	email: string;
	rol: number;
	password: string;
}

export interface LoginResponse {
	error: boolean;
	data?: {
		accessToken: string;
		user: User;
	};
	message: string;
}
