"use client";
import { DataTable } from "webtic-ui";

export default function Request() {
	const data = [
		{ id: 1, name: "John Doe", request: "Request 1", status: "Pending" },
		{ id: 2, name: "Jane Smith", request: "Request 2", status: "Approved" },
		{ id: 3, name: "Sam Johnson", request: "Request 3", status: "Rejected" },
	];

  const columns = [
    { 
      Header: "ID", 
      accessor: "id", 
      key: "id", 
      title: "ID" 
    },
    { 
      Header: "Razón Social", 
      accessor: "nombreRazonSocial", 
      key: "nombreRazonSocial", 
      title: "Razón Social" 
    },
    { 
      Header: "Nombre", 
      accessor: "nombreMostrar", 
      key: "nombreMostrar", 
      title: "Nombre" 
    },
    { 
      Header: "Documento", 
      accessor: "numeroDocumento", 
      key: "numeroDocumento", 
      title: "Número de Documento" 
    },
    { 
      Header: "Estado", 
      accessor: (row) => row.estado ? "Activo" : "Inactivo",
      key: "estado", 
      title: "Estado" 
    },
    {
      Header: "Pedidos",
      accessor: "cantPedidos",
      key: "cantPedidos",
      title: "Cantidad de Pedidos"
    }
  ];
	return (
		<div>
			<h1 className="text-2xl font-bold">Solicitudes</h1>
			<p>Listado de solicitudes</p>
			<DataTable data={data} columns={columns} tableId={""} />
		</div>
	);
}
