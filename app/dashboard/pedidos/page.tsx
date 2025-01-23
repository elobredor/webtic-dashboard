"use client";
import React, { useState } from "react";
import DataTable from "@/components/DataTable/DataTable";
import useFetchData from "@/hooks/useFetchData";
import { api } from "@/services/api";

import { PQR } from "@/data/PQR";
import { Eye } from "lucide-react";
import { columns } from "./columnConfig";

const PedidosView = () => {
	const { data, loading } = useFetchData(api.order.getAll, "products"); // ahora envio el string, este hook deberia 1. encontrar la interface PQR, 2. hacer devolver el formato de columnas
	const [modalOpen, setModalOpen] = useState(false);

	console.log(data.data);

	// declarar la funcion
	return (
		<div>
			<h1 className="text-2xl font-bold">Pedidos</h1>
			<p>Listado de Pedidos</p>

			<DataTable
				columns={columns}
				data={data.data}
				tableId="orders-table"
				loading={loading}
			/>
		</div>
	);
};

export default PedidosView;
