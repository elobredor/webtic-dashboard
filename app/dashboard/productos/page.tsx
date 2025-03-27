"use client";
import React, { useRef, useState } from "react";
import { api } from "@/services/api";
import { columns } from "./columnConfig";
import { Product } from "@/Models/Product";
import EntityModal from "@/components/EntityModal";
import { Eye, Edit } from "lucide-react";
import DataTable from "@/components/DataTable";

const ProductsView = () => {
	const dataTableRef = useRef<{ handleRefresh: () => void } | null>(null);
	const fetchProducts = async (page: number = 1) => {
		try {
			const response = await api.product.getAll(page);
			return {
				data: response?.data?.data?.data || [],
				total: response?.data?.total || 0,
			};
		} catch (error) {
			console.error("Error al cargar productos:", error);
			return { data: [], total: 0 };
		}
	};

	const [modalOpen, setModalOpen] = useState(false);
	const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
	const [mode, setMode] = useState<"view" | "edit">("view");

	const handleView = (product: Product) => {
		setSelectedProduct(product);
		setMode("view");
		setModalOpen(true);
	};

	const handleEdit = (product: Product) => {
		setSelectedProduct(product);
		setMode("edit");
		setModalOpen(true);
	};

	const handleSave = async (updatedProduct: FormData) => {
		try {
			await api.product.update(updatedProduct);
			setModalOpen(false);
			dataTableRef.current?.handleRefresh(); // 🔄 Refresca la tabla
		} catch (error) {
			console.error("Error al actualizar el producto:", error);
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
				tableId="products-table"
				fetchFunction={fetchProducts}
				ref={dataTableRef}
			/>

			{selectedProduct && (
				<EntityModal
					isOpen={modalOpen}
					onClose={() => setModalOpen(false)}
					entity={selectedProduct}
					mode={mode}
					onSave={handleSave}
					title={mode === "edit" ? "Editar Producto" : "Detalles del Producto"}
					columns={columns}
				/>
			)}
		</div>
	);
};

export default ProductsView;
