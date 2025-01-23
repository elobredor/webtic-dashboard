"use client";
import React, { useState } from "react";
import DataTable from "@/components/DataTable/DataTable";
import useFetchData from "@/hooks/useFetchData";
import { api } from "@/services/api";

import { PQR } from "@/data/PQR";
import { Eye } from "lucide-react";
// import { columns } from "./columnConfig";

const ProductsView = () => {
	const { data, loading } = useFetchData(api.order.getAll, "products"); // ahora envio el string, este hook deberia 1. encontrar la interface PQR, 2. hacer devolver el formato de columnas
	const [modalOpen, setModalOpen] = useState(false);
	const [selectedPQR, setSelectedPQR] = useState<PQR | undefined>();

	const renderActions = (item: any) => (
		<div className="flex gap-2">
			<button
				onClick={() => {
					setSelectedPQR(item);
					setModalOpen(true);
				}}
				className="px-4 py-2 border-2 border-green-400 text-green-400 rounded-md hover:bg-green-400 hover:text-white transition"
				title="Ver detalles"
			>
				<Eye />
			</button>
		</div>
	);
	// declarar la funcion
	return (
		<div>
			<h1 className="text-2xl font-bold">Productos</h1>
			<p>Listado de Prodcutos</p>

			{/* <DataTable
				columns={columns}
				data={data}
				tableId="products-table"
				loading={loading}
				renderActions={renderActions}
			/> */}
		</div>
	);
};

export default ProductsView;
