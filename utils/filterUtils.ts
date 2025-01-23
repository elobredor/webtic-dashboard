import { ProductFilters } from "@/Models/Filters/Filters";

export const buildQueryString = (filters: ProductFilters): string => {
	const params = new URLSearchParams();

	// Add required parameter
	params.append("page", filters.page.toString());

	// Add optional parameters if they exist
	if (filters.filtro) params.append("filtro", filters.filtro);
	if (filters.categorias?.length)
		params.append("categorias", filters.categorias.join(","));
	if (filters.vendedores?.length)
		params.append("vendedores", filters.vendedores.join(","));
	if (filters.tiposEnvio?.length)
		params.append("tiposEnvio", filters.tiposEnvio.join(","));
	if (filters.precioMin !== undefined)
		params.append("precioMin", filters.precioMin.toString());
	if (filters.precioMax !== undefined)
		params.append("precioMax", filters.precioMax.toString());

	return params.toString();
};
