"use client";
import useFetchData from "@/hooks/useFetchData";
import { api } from "@/services/api";
import { DataTable } from "webtic-ui";

export default function Vendedores() {
	const { data } = useFetchData(api.user.getSeller, "user");
	

	const columns = [
		{ key: "user", title: "ID Usuario", sortable: true },
		{ key: "nombreRazonSocial", title: "Razón Social", sortable: true },
		{ key: "idnegocio", title: "ID Negocio", sortable: true },
		{ key: "nombreMostrar", title: "Nombre a Mostrar", sortable: true },
		{ key: "numeroDocumento", title: "Número de Documento", sortable: true },
		{ key: "nombretipodoc", title: "Tipo de Documento", sortable: true },
		{ key: "nombretipopers", title: "Tipo de Persona", sortable: true }
	  ];
	  
	return (
		<div>
			<h1 className="text-2xl font-bold">Vendedores</h1>
			<p>Listado de vendedores</p>
			<DataTable data={data} columns={columns} tableId={""} />
		</div>
	);
}
