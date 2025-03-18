import { formatCurrency, formatDate } from "@/utils/formatters";

const estadoColors: Record<string, string> = {
	NUEVO: "bg-yellow-100 text-yellow-800",
	ENPROCESO: "bg-blue-100 text-blue-800",
	TRANSITO: "bg-purple-100 text-purple-800",
	ENVIADO: "bg-indigo-100 text-indigo-800",
	ENTREGADO: "bg-green-100 text-green-800",
	CANCELADO: "bg-red-100 text-red-800",
};

export const columns = [
	{ key: "id", title: "ID", sortable: true },
	{
		key: "fecha",
		title: "Fecha",
		sortable: true,
		render: (value: string) => <span>{formatDate(new Date(value))}</span>,
	},
	{
		key: "montoTotal",
		title: "Total",
		sortable: true,
		render: (value: number) => <span>{formatCurrency(value)}</span>,
	},
	{ key: "estadoPago", title: "Estado P.", sortable: true },
	// {
	// 	key: "estado",
	// 	title: "Estado",
	// 	sortable: true,
	// 	render: (value: string) => (
	// 		<span
	// 			className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
	// 				estadoColors[value] || "bg-gray-100 text-gray-800"
	// 			}`}
	// 		>
	// 			{value}
	// 		</span>
	// 	),
	// },
];
