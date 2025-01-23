import { OrderDetail } from "@/Models/Order";
import axiosInstance from "./axios.instance";

export const OrderService = {
	createOrder: async (data: any) => {
		const response = await axiosInstance.post("/pedido/create", data);
		return response?.data;
	},
	getAll: async () => {
		const response = await axiosInstance.get("/pedido/get");
		return response?.data?.data;
	},
	// createPaySession: async (data: Checkout) => {
	// 	const response = await axiosInstance.post("/general/paysesion", data);
	// 	return response.data;
	// },
	getOrdeStatusCount: async () => {
		const response = await axiosInstance.get("/pedido/getcount");
		return response.data;
	},
	getOrderDetails: async (id: number): Promise<OrderDetail[]> => {
		const response = await axiosInstance.get(`pedido/getdet/${id}`);
		return response.data.data;
	},
	getOrderByStatus: async (estado: string) => {
		let endpointUrl = "/pedido/getest/";

		if (!["", null, undefined].includes(estado)) {
			endpointUrl = `${endpointUrl}?estado=${estado}&page=1`;
		}
		const response = await axiosInstance.get(endpointUrl);
		return response.data?.data?.data;
	},
	updateOrderStatus: async (id: number, estado: string) => {
		const response = await axiosInstance.post(`/pedido/update/estado`, {
			estado,
			pedido: id,
		});
		return response.data;
	},
	getListOrdersPendingQualify: async () => {
		const response = await axiosInstance.get("/pedido/getpp");
		return response.data;
	},
	getDetailOrderPendingQualify: async (id: number) => {
		const response = await axiosInstance.get(`/pedido/getpd/${id}`);
		return response.data;
	},
	sendQualify: async (values: any) => {
		const response = await axiosInstance.post(`/pedido/qualify`, values);
		return response.data;
	},
	getPaymemtInfo: async (id: string) => {
		try {
			const response = await axiosInstance.get(`/general/pay/info/${id}`);
			return response.data;
		} catch (error) {
			console.log(error);
		}
	},
};
