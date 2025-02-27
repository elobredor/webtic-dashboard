"use client";
import { DataTable } from "webtic-ui";
import { columns } from "./columnConfig";
import useFetchData from "@/hooks/useFetchData";
import { api } from "@/services/api";
import { Eye } from "lucide-react";
import { useState } from "react";
import RequestDetailModal from "./components/DetailModal";

// ajustar la data que se le pasa al modal, probar con unoq si tenga pdf
// hacerr que se envie el cometario
// de una ir a corregir lo de cuando se envia la solicitud en mercabaq

export default function Request() {
	const { data, refetch } = useFetchData(api.request.getAll, "request");
	const [modalOpen, setModalOpen] = useState(false);
	const [selectedRequest, setSelectedRequest] = useState(null);

	const handleView = (request) => {
		setSelectedRequest(request);
		setModalOpen(true);
	};

	const handleCloseModal = () => {
		setModalOpen(false);
		setSelectedRequest(null);
		// Recargar los datos después de cerrar el modal por si hubo cambios
	};

	const columnsWithActions = [
		...columns,
		{
			key: "actions",
			title: "Acciones",
			sortable: false,
			render: (_: any, row) => (
				<div className="flex gap-2">
					<button
						onClick={() => handleView(row)}
						className="px-4 py-2 border-2 border-green-400 text-green-400 rounded-md hover:bg-green-400 hover:text-white transition"
						title="Ver detalles"
					>
						<Eye className="h-4 w-4" />
					</button>
				</div>
			),
		},
	];

	return (
		<div>
			<h1 className="text-2xl font-bold">Solicitudes</h1>
			<p>Listado de solicitudes</p>
			<DataTable data={data} columns={columnsWithActions} tableId={""}  onRefresh={refetch}/>
			<RequestDetailModal
				request={selectedRequest}
				isOpen={modalOpen}
				onClose={handleCloseModal}
				refetch={refetch}
			/>
		</div>
	);
}
