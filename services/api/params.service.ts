import axiosInstance from "./axios.instance";

export const ParamsService = {
	getAll: async () => {
		const {data} = await axiosInstance.get("params/get");
	
		return data;
	},
	update: async (data: any) => {
		const response = await axiosInstance.post(`params/update/`, data);
		return response.data;
	}
	
};
