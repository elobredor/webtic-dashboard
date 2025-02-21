import axiosInstance from "./axios.instance";

export const userService = {
	login: async (credentials: { email: string; password: string }) => {
		const response = await axiosInstance.post("/login", credentials);
		return response?.data;
	},
	loginByCode: async (credentials: { email: string; userCode: string }) => {
		const response = await axiosInstance.post("/loginTf", credentials);
		return response?.data;
	},
	logout: async () => {
		const response = await axiosInstance.post("/logout");
		return response?.data;
	},
	getDirections: async () => {
		const response = await axiosInstance.get(`/dir/get/`);
		return response?.data;
	},

	getProfile: async () => {
		const response = await axiosInstance.get("/users/profile");
		return response.data;
	},
	updateProfile: async (data: any) => {
		const response = await axiosInstance.post("/users/profile", data);
		return response.data;
	},
	createUser: async (data: any) => {
		const response = await axiosInstance.post("/user/create", data);
		return response.data;
	},
	updateUser: async (data: any) => {
		const response = await axiosInstance.post("/user/updatep", data);
		return response.data;
	},
	getAll: async () => {
		const response = await axiosInstance.get(`/user/get/`);
		return response?.data;
	},
};
