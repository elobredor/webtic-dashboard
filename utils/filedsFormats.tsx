import { ColumnConfig } from "@/data/ColumnConfig";
import { formatDate } from "./formatters";

export const fieldFormats: Record<string, Partial<ColumnConfig>> = {
	fecha: {
		render: (value: string) => <span>{formatDate(new Date(value))}</span>,
		sortable: true,
	},
	estado: {
		render: (value: string) => (
			<span
				className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
					value === "ABIERTO"
						? "bg-green-100 text-green-800"
						: value === "ENPROCESO"
						? "bg-blue-100 text-blue-800"
						: "bg-red-100 text-red-800"
				}`}
			>
				{value.toLowerCase().charAt(0).toUpperCase() + value.slice(1)}
			</span>
		),
		sortable: true,
	},
	id: {
		sortable: true,
	},
	default: {
		sortable: false,
	},
};

export function detectFieldFormat(fieldName: string): Partial<ColumnConfig> {
	if (fieldName.toLowerCase().includes("fecha")) {
		return fieldFormats.fecha;
	}
	if (fieldName.toLowerCase().includes("estado")) {
		return fieldFormats.estado;
	}
	if (fieldName.toLowerCase().includes("id")) {
		return fieldFormats.id;
	}
	return fieldFormats.default;
}
