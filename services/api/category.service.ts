import axiosInstance from "./axios.instance";

export const CategoryService = {
	getAll: async (page: number) => {
		const url = page ? `/categoria/get?page=${page}` : `/categoria/get`;
		const data = await axiosInstance.get(url);

		return data;
	},

	create: async (data: FormData, images?: File[]) => {
		const formData = data;

		images?.forEach((image) => {
			formData.append("images", image); // Append each file to the FormData
		});
		const insertProduct = await axiosInstance.post(
			"categoria/create/",
			formData,
			{
				headers: {
					"Content-Type": "multipart/form-data",
				},
			}
		);

		return insertProduct?.data;
	},
	//aquui tambien es multipart
	update: async (data: FormData, images?: File[]) => {
		const formData = data;

		images?.forEach((image) => {
			formData.append("images", image); // Append each file to the FormData
		});
		const insertProduct = await axiosInstance.post(
			"categoria/update/",
			formData,
			{
				headers: {
					"Content-Type": "multipart/form-data",
				},
			}
		);

		return insertProduct?.data;
	},
	delete: async (id) => {
		const response = await axiosInstance.delete(`categoria/delete/${id}`);
		return response.data;
	},
};
