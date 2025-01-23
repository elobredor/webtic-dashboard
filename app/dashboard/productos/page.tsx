"use client";
import React, { useState } from "react";
import DataTable from "@/components/DataTable/DataTable";
import useFetchData from "@/hooks/useFetchData";
import { api } from "@/services/api";
import { columns } from "./columnConfig";

const ProductsView = () => {
	const { data, loading } = useFetchData(api.product.getAll, "products"); // ahora envio el string, este hook deberia 1. encontrar la interface PQR, 2. hacer devolver el formato de columnas
	// const [modalOpen, setModalOpen] = useState(false);
	// const [selectedPQR, setSelectedPQR] = useState<PQR | undefined>();

	// declarar la funcion

	return (
		<div>
			<h1 className="text-2xl font-bold">Productos</h1>
			<p>Listado de Prodcutos</p>

			<DataTable
				columns={columns}
				data={data.data}
				tableId="products-table"
				loading={loading}
			/>
		</div>
	);
};

export default ProductsView;
