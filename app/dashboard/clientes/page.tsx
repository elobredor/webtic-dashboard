"use client";
import { api } from "@/services/api";
import DataTable from "@/components/DataTable";
import { columns } from "./columnConfig";

export default function Clientes() {
	const fetchClients = async (page: number = 1) => {
		try {
			const response = await api.user.getAll(page || 1);
			return {
				data:
					response?.data?.data?.filter((item: { rol: number }) => item.rol === 1) ||
					[],
				total: response?.data?.total || 0,
			};
		} catch (error) {
			console.error("Error al cargar vendedores:", error);
			return { data: [], total: 0 };
		}
	};

	return (
		<div>
			<h1 className="text-2xl font-bold">Clientes</h1>
			<p>Listado de clientes</p>
			<DataTable
				columns={columns}
				tableId={"client-table"}
				fetchFunction={fetchClients}
				initialPageSize={10}
			/>
		</div>
	);
}
