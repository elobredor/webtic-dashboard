"use client";
import useFetchData from "@/hooks/useFetchData";
import { api } from "@/services/api";
import DataTable from "@/components/DataTable";

export default function Clientes() {
	const { data } = useFetchData(api.user.getAll, "user");
	const filteredData = data?.data?.filter((item) => item.rol === 1);
	const columns = [
		{ Header: "ID", accessor: "id", key: "id", title: "ID" },
		{ Header: "Name", accessor: "name", key: "name", title: "Nombre" },
		{
			Header: "Document",
			accessor: "documento",
			key: "documento",
			title: "# Documento",
		},
		{
			Header: "Document Type",
			accessor: "tipoDocumento",
			key: "tipoDocumento",
			title: "Tipo de documento",
		},
		{ Header: "Phone", accessor: "telefono", key: "telefono", title: "Teléfono" },
		{ Header: "Email", accessor: "email", key: "email", title: "Email" },
		// {
		// 	Header: "Birth Date",
		// 	accessor: "fechaNacimiento",
		// 	key: "fechaNacimiento",
		// 	title: "Fecha de nacimiento",
		// },
		// { Header: "Role", accessor: "rol", key: "rol", title: "Rol" },
	];
	return (
		<div>
			<h1 className="text-2xl font-bold">Clientes</h1>
			<p>Listado de clientes</p>
			<DataTable data={filteredData} columns={columns} tableId={""} />
		</div>
	);
}
