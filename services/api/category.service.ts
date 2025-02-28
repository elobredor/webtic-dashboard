import axiosInstance from "./axios.instance";

export const CategoryService = {
	getAll: async () => {
		const {data} = await axiosInstance.get("/categoria/get/");
	
		return data;
	},
//aqui es multipart el asunto 
	create: async (data: any) =>{
		const response = await axiosInstance.post(`categoria/create/`, data, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});
		return response.data
	},
	//aquui tambien es multipart 
	update: async (data: any) =>{
		const response = await axiosInstance.post(`categoria/create/`,data)
		return response.data
	}, 
	delete: async (id) =>{ 
		const response = await axiosInstance.delete(`categoria/delete/${id}`)
		return response.data
	}
	
};
