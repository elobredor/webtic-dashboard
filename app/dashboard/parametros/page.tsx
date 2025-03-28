"use client";
import React, { useState } from "react";
import { api } from "@/services/api";
import { Pencil, Save } from "lucide-react";
import Modal from "@/components/Modal/Modal";
import DataTable from "@/components/DataTable";

interface Parametro {
	id: number;
	nombre: string;
	value: string;
}

const ParametrosView = () => {
	const fetchParams = async () => {
		try {
			const response = await api.params.getAll();
			return {
				data: response?.data,
				total: response?.data?.total || 0,
			};
		} catch (error) {
			console.error("Error al cargar vendedores:", error);
			return { data: [], total: 0 };
		}
	};

	const [selectedParam, setSelectedParam] = useState<Parametro | null>(null);
	const [modalOpen, setModalOpen] = useState(false);
	const [newValue, setNewValue] = useState("");
	const [saving, setSaving] = useState(false);
	const [success, setSuccess] = useState<boolean | null>(null);

	const openModal = (param: Parametro) => {
		setSelectedParam(param);
		setNewValue(param.value);
		setModalOpen(true);
	};

	const handleSave = async () => {
		if (!selectedParam) return;
		setSaving(true);
		setSuccess(null);

		try {
			await api.params.update({
				id: selectedParam.id,
				data: {
					nombre: selectedParam.nombre,
					value: newValue,
				},
			});
			setSuccess(true);

			setTimeout(() => setModalOpen(false), 400);
			fetchParams();
		} catch (error) {
			console.error("❌ Error al actualizar:", error);
			setSuccess(false);
		} finally {
			setSaving(false);
			fetchParams();
		}
	};

	const columns = [
		{ key: "id", title: "ID", sortable: true },
		{ key: "nombre", title: "Nombre", sortable: true },
		{ key: "value", title: "Valor", sortable: true },
		{
			key: "actions",
			title: "Acciones",
			sortable: false,
			render: (_: any, row: Parametro) => (
				<button
					onClick={() => openModal(row)}
					className="px-4 py-2 border-2 border-blue-400 text-blue-400 rounded-md hover:bg-blue-400 hover:text-white transition"
					title="Ver y Editar"
				>
					<Pencil className="h-4 w-4" />
				</button>
			),
		},
	];

	return (
		<div className="p-4">
			<h1 className="text-2xl font-bold mb-4">Parámetros del Sistema</h1>
			<DataTable
				columns={columns}
				fetchFunction={fetchParams}
				tableId="params-table"
			/>

			<Modal
				title={`Editar Parámetro: ${selectedParam?.nombre}`}
				isOpen={modalOpen}
				onClose={() => setModalOpen(false)}
			>
				<div className="p-4">
					<label className="block mb-2 text-lg font-semibold">Nuevo Valor:</label>
					<input
						type="text"
						value={newValue}
						onChange={(e) => setNewValue(e.target.value)}
						className="w-full p-2 border border-gray-300 rounded"
					/>
					<div className="mt-4 flex justify-end gap-2">
						<button
							onClick={() => setModalOpen(false)}
							className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition"
						>
							Cancelar
						</button>
						<button
							onClick={handleSave}
							disabled={saving}
							className={`px-4 py-2 flex items-center gap-2 rounded-md ${
								saving ? "bg-gray-400" : "bg-green-500 hover:bg-green-600"
							} text-white transition`}
						>
							{saving ? "Guardando..." : <Save className="h-4 w-4" />} Guardar
						</button>
					</div>
					{success === true && (
						<p className="text-green-500 mt-2">¡Actualizado con éxito!</p>
					)}
					{success === false && (
						<p className="text-red-500 mt-2">Error al actualizar.</p>
					)}
				</div>
			</Modal>
		</div>
	);
};

export default ParametrosView;
