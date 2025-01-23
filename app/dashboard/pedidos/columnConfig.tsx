import { Order } from "@/Models/Order";
import { formatCurrency, formatDate } from "@/utils/formatters";

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
	{
		key: "montoTotal",
		title: "Total",
		sortable: true,
		render: (value: number) => <span>{formatCurrency(value)}</span>,
	},
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
