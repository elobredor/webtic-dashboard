import { Product } from "../../Models/Product";
import axiosInstance from "./axios.instance";
import { ProductFilters } from "../../Models/Filters/Filters";
import { buildQueryString } from "../../utils/filterUtils";

export const productService = {
	getAll: async (page: number) => {
		const url = `/producto/getPag?page=${page}`;
		const response = await axiosInstance.get(url);

		return response;
	},
	getProductById: async (id: string) => {
		const response = await axiosInstance.get(`/producto/get/${id}`);
		return response?.data?.data;
	},
	getProductsByFilters: async ({
		categorias,
		marcas,
		tiposenvios,
		precioMin = 0,
		precioMax = 10000,
		page = 1,
	}: {
		categorias?: string;
		marcas?: string;
		tiposenvios?: string;
		page?: number;
		precioMin?: number;
		precioMax?: number;
	}) => {
		const paramsObj: Record<string, string | undefined> = {
			page: page?.toString(),
			categorias: categorias?.length ? categorias : undefined,
			marcas: marcas?.length ? marcas : undefined,
			tiposEnvio: tiposenvios?.length ? tiposenvios : undefined,
			precioMin: precioMin.toString(),
			precioMax: precioMax.toString(),
		};
		// Filtrar los parámetros para eliminar los no definidos o vacíos
		const filteredParams = new URLSearchParams(
			Object.entries(paramsObj).reduce((acc, [key, value]) => {
				if (value !== undefined) acc[key] = value;
				return acc;
			}, {} as Record<string, string>)
		);

		const response = await axiosInstance.get(
			`/producto/getPag?${filteredParams.toString()}`
		);
		return response?.data;
	},
	createProduct: async (producto: Product) => {
		const insertProduct = await axiosInstance.post("/producto/create", producto);

		return insertProduct?.data;
	},
	update: async (producto: Product) => {
		const insertProduct = await axiosInstance.post("/producto/update", producto);

		return insertProduct?.data?.data;
	},
	insertImageToProduct: async (productId: number, img?: File[]) => {
		const formData = new FormData();
		formData.append("productCode", productId.toString());
		img?.forEach((file) => {
			formData.append("images", file); // Append each file to the FormData
		});
		const insertProduct = await axiosInstance.post("/proimg/save", formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});

		return insertProduct?.data;
	},
	getProductImagesById: async (id: string) => {
		const response = await axiosInstance.get(`/proimg/get/${id}`);
		return response?.data?.data;
	},
	getFeactutedProduct: async (page: number) => {
		try {
			const response = await axiosInstance.get(`/producto/getPdPag?page=${page}`);
			return response?.data?.data;
		} catch (error) {}
	},
	changeToPrincipal: async (id: number) => {
		try {
			const response = await axiosInstance.get(`/producto/changeimg/${id}`);
			return response?.data;
		} catch (error) {}
	},
	dynamicProductFilter: async (filters: ProductFilters) => {
		try {
			const params = buildQueryString(filters);
			const response = await axiosInstance.get(`/producto/getPag?${params}`);
			return response?.data?.data;
		} catch (error) {}
	},
};
