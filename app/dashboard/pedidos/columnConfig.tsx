import { Order } from "@/Models/Order";
import { formatDate } from "@/utils/formatters";

export const columns = [
	{ key: "id", title: "ID", sortable: true },
	{
		key: "fecha",
		title: "Fecha",
		sortable: true,
		render: (value: string) => (
			<>
				<span>{formatDate(new Date(value))}</span>
			</>
		),
	},
	{ key: "montoTotal", title: "Total", sortable: true },
	{ key: "estadoPago", title: "Estado P.", sortable: true },
	{
		key: "estado",
		title: "Estado",
		sortable: true,
		render: (value: any, row: Order) => {
			return <span>{value}</span>;
		},
	},
];
