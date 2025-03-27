"use client";
import { api } from "@/services/api";
import { formatCurrency } from "@/utils/formatters";
import Image from "next/image";

export const columns = [
	{
		key: "id",
		title: "ID",
		sortable: true,
		editable: false,
	},
	// {
	// 	key: "image",
	// 	title: "Imagen",
	// 	sortable: false,
	// 	render: (value: string) => (
	// 		<Image
	// 			src={value}
	// 			alt="Producto"
	// 			width={64}
	// 			height={64}
	// 			className="object-cover rounded-lg"
	// 		/>
	// 	),
	// },
	{
		key: "name",
		title: "Nombre",
		sortable: true,
		type: "text",
	},

	{
		key: "status",
		title: "Estado",
		sortable: true,
		type: "boolean",
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
	{
		key: "stock",
		title: "Stock",
		sortable: true,
		type: "number",
	},
	{
		key: "price",
		title: "Precio",
		sortable: true,
		type: "number",
		render: (value: number) => <span>{formatCurrency(value)}</span>,
	},
	{
		key: "um",
		title: "Unidad de Medida",
		sortable: true,
		type: "text",
	},
	{
		key: "rating",
		title: "Calificación",
		sortable: true,
		type: "number",
		render: (value: number) => (
			<span className="flex items-center">
				<span className="ml-1">{value}</span>
				{/* <span className="text-yellow-400">★</span> */}
			</span>
		),
	},
	{
		key: "nombrecategoria",
		title: "Categoría",
		sortable: true,
		type: "select",
		get: api.category.getAll,
	},
	{
		key: "nombremarca",
		title: "Marca",
		sortable: true,
		type: "text",
	},

	{
		key: "disponible",
		title: "Disponible",
		sortable: true,
		type: "select",
		options: [
			{ label: "Sí", value: "SI" },
			{ label: "No", value: "NO" },
		],
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
		type: "text",
		editable: false,
		render: (value: string | undefined) => (
			<span>{value || "Sin información"}</span>
		),
	},
];
