"use client";
import { api } from "@/services/api";
import DataTable from "@/components/DataTable";
import { columns } from "./configColumn";

export default function Vendedores() {
	const fetchVendedores = async (page) => {
		try {
			const response = await api.user.getSeller(page);
			return {
				data: response?.data?.data || [],
				total: response?.data?.total || 0,
			};
		} catch (error) {
			console.error("Error al cargar vendedores:", error);
			return { data: [], total: 0 };
		}
	};

	const extendedColumns = [
		...columns,
		{
			key: "estado",
			title: "Estado",
			sortable: true,
			render: (estado, item) => (
				<select
					className="border rounded p-1"
					value={estado}
					onChange={(e) => {
						const newEstado = parseInt(e.target.value);
						api.user
							.updateSellerStatus({ id: item.user, estado: newEstado })
							.then(() => {
								console.log(`Estado actualizado a ${newEstado}`);
								// La tabla se refrescará automáticamente al llamar a la API
							})
							.catch((error) => {
								console.error("Error al actualizar estado:", error);
							});
					}}
				>
					<option value={1}>Activo</option>
					<option value={0}>Inactivo</option>
					<option value={3}>Retirado</option>
				</select>
			),
		},
	];

	return (
		<div>
			<div className="pb-4 bg-gray-100 rounded-md">
				<h1 className="text-2xl font-bold">Vendedores</h1>
				<p>Listado de vendedores</p>
			</div>
			<DataTable
				columns={extendedColumns}
				tableId="sellers-table"
				fetchFunction={fetchVendedores}
			/>
		</div>
	);
}
