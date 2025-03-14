import axiosInstance from "./axios.instance";

export const RequestService = {
	getAll: async () => {
		const getFirst = await axiosInstance.get("/negocio/getAll");
		const data = getFirst.data.data;
		

		return data;
	},
	sendComment: async (comentInfo: any) => {
		const response = await axiosInstance.post(`/comentario/create/`, comentInfo, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});
		return response?.data;
	},

	approve: async (id: number) => {
		const response = await axiosInstance.post("negocio/update", { id: id });
		return response?.data;
	},
	reject: async (id: number, comentario: string) => {
		const response = await axiosInstance.post("negocio/decline", {
			id: id,
			comentario: comentario,
		});
		return response?.data;
	},
};
