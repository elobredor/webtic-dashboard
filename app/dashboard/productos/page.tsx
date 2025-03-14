"use client";
import React, { useState } from "react";

import useFetchData from "@/hooks/useFetchData";
import { api } from "@/services/api";
import { columns } from "./columnConfig";
import { Product } from "@/Models/Product";
import DataModal from "@/components/DataModal";
import { Eye, Edit} from "lucide-react";
import DataTable from "@/components/DataTable";

const ProductsView = () => {
	const { data, loading, refetch } = useFetchData(api.product.getAll, "products");
	const [modalOpen, setModalOpen] = useState(false);
	const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
	const [isEditing, setIsEditing] = useState(false);

	const handleView = (product: Product) => {
		setSelectedProduct(product);
		setIsEditing(false);
		setModalOpen(true);
	};

	const handleEdit = (product: Product) => {
		setSelectedProduct(product);
		setIsEditing(true);
		setModalOpen(true);
	};

	const handleSave = async (updatedProduct: Product) => {
		try {
			  await api.product.update(updatedProduct)

			setModalOpen(false);
			refetch()
		} catch (error) {
			console.error("Error updating product:", error);
		}
	};

	const columnsWithActions = [
		...columns,
		{
			key: "actions",
			title: "Acciones",
			sortable: false,
			render: (_: any, row: Product) => (
				<div className="flex gap-2">
					<button
						onClick={() => handleView(row)}
						className="px-4 py-2 border-2 border-green-400 text-green-400 rounded-md hover:bg-green-400 hover:text-white transition"
						title="Ver detalles"
					>
						<Eye className="h-4 w-4" />
					</button>
					<button
						onClick={() => handleEdit(row)}
						className="px-4 py-2 border-2 border-blue-400 text-blue-400 rounded-md hover:bg-blue-400 hover:text-white transition"
						title="Editar"
					>
						<Edit className="h-4 w-4" />
					</button>
				</div>
			),
		},
	];

	return (
		<div>
			<h1 className="text-2xl font-bold">Productos</h1>
			<p>Listado de Productos</p>

			<DataTable
				columns={columnsWithActions}
				data={data.data}
				tableId="products-table"
				loading={loading}
			/>

			{selectedProduct && (
				<DataModal
					isOpen={modalOpen}
					onClose={() => setModalOpen(false)}
					data={selectedProduct}
					columns={columnsWithActions}
					title={isEditing ? "Editar Producto" : "Detalles del Producto"}
					isEditing={isEditing}
					onSave={handleSave}
				/>
			)}
		</div>
	);
};

export default ProductsView;
