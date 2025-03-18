"use client";
import React, { useState } from "react";
import useFetchData from "@/hooks/useFetchData";
import { api } from "@/services/api";
import PQRDetailModal from "./components/PQrDetailModal";
import { PQR } from "@/data/PQR";
import { Eye } from "lucide-react";
import { columns } from "./columnConfig";
import DataTable from "@/components/DataTable";

const PqrTable = () => {
	const fetchPqrs = async (page: number = 1) => {
		try {
			const response = await api.pqr.getAllPqrs(page);
			return {
				data: response?.data?.data || [],
				total: response?.data?.total || 0,
			};
		} catch (error) {
			console.error("Error al cargar vendedores:", error);
			return { data: [], total: 0 };
		}
	};

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
			<h1 className="text-2xl font-bold">PQRS</h1>
			<p>Listado de PQRS</p>
			<PQRDetailModal
				isOpen={modalOpen}
				onClose={() => {
					setModalOpen(false);
				}}
				pqrDetails={selectedPQR}
			/>

			<DataTable
				columns={columns}
				tableId="pqrs-table"
				fetchFunction={fetchPqrs}
				renderActions={renderActions}
			/>
		</div>
	);
};

export default PqrTable;
