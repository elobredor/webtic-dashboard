import { formatCurrency } from "@/utils/formatters"; // Formatear precios

export const columns = [
	{ key: "id", title: "ID", sortable: true },
	{ key: "name", title: "Nombre", sortable: true },
	{
		key: "image",
		title: "Imagen",
		sortable: false,
		render: (value: string) => (
			<img
				src={value}
				alt="Producto"
				className="w-16 h-16 object-cover rounded-lg"
			/>
		),
	},

	{
		key: "freeShipping",
		title: "Envío Gratis",
		sortable: true,
		render: (value: boolean) => (
			<span
				className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
					value ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
				}`}
			>
				{value ? "Sí" : "No"}
			</span>
		),
	},
	{
		key: "status",
		title: "Estado",
		sortable: true,
		render: (value: boolean) => (
			<span
				className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
					value ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800"
				}`}
			>
				{value ? "Activo" : "Inactivo"}
			</span>
		),
	},
	{ key: "stock", title: "Stock", sortable: true },
	{
		key: "price",
		title: "Precio",
		sortable: true,
		render: (value: any) => <span>{formatCurrency(value)}</span>,
	},
	{ key: "um", title: "Unidad de Medida", sortable: true },
	{
		key: "rating",
		title: "Calificación",
		sortable: true,
	},
	{ key: "nombrecategoria", title: "Categoría", sortable: true },
	{ key: "nombremarca", title: "Marca", sortable: true },
	{ key: "tipoenvio", title: "Tipo de Envío", sortable: true },
	{
		key: "disponible",
		title: "Disponible",
		sortable: true,
		render: (value: string | undefined) => (
			<span
				className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
					value === "SI"
						? "bg-green-100 text-green-800"
						: value === "NO"
						? "bg-red-100 text-red-800"
						: "bg-gray-100 text-gray-800"
				}`}
			>
				{value || "No especificado"}
			</span>
		),
	},
	{
		key: "vendedor",
		title: "Vendedor",
		sortable: true,
		render: (value: string | undefined) => (
			<span>{value || "Sin información"}</span>
		),
	},
	{ key: "sales", title: "Ventas", sortable: true },
];
