import axiosInstance from "./axios.instance";

export const PQRService = {
	// create: async (PQRInfo: any) => {
	// 	console.log(PQRInfo);

	// 	const response = await axiosInstance.post("/pqr/create", PQRInfo);

	// 	console.log(response);

	// 	return response?.data;
	// },
	create: async (PQRInfo: FormData, images?: File[]) => {
		const formData = PQRInfo;

		images?.forEach((image) => {
			formData.append("images", image); // Append each file to the FormData
		});
		const insertProduct = await axiosInstance.post("/pqr/create", formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});

		return insertProduct?.data;
	},
	getAll: async () => {
		const getFirst = await axiosInstance.get("/pqr/get");
		const pages = getFirst.data.data.pages;
		const page1Response = getFirst;
		const responses = [page1Response];

		if (pages >= 2) {
			const page2Response = await axiosInstance.get("/pqr/get?page=2");
			responses.push(page2Response);
		}

		if (pages >= 3) {
			const page3Response = await axiosInstance.get("/pqr/get?page=3");
			responses.push(page3Response);
		}

		const combinedData = responses.flatMap((response) => response.data.data.data);

		return combinedData;
	},
	sendComment: async (comentInfo: any) => {
		const response = await axiosInstance.post(`/comentario/create/`, comentInfo, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});
		return response?.data;
	},

	getComments: async (pqrId) => {
		const response = await axiosInstance.get(`/comentario/get/${pqrId}`);
		return response?.data;
	},
	// createPaySession: async (data: Checkout) => {
	// 	const response = await axiosInstance.post("/general/paysesion", data);
	// 	return response.data;
	// },
};
