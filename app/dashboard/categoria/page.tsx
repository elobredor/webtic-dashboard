"use client";
import React, { useState } from "react";
import { DataTable } from "webtic-ui";
import useFetchData from "@/hooks/useFetchData";
import { api } from "@/services/api";

import { Category } from "@/Models/Category";
import DataModal from "@/components/DataModal";
import { Eye, Edit, Trash } from "lucide-react";
import { columns } from "./columnConfig";

const Categorias = () => {
  const { data, loading, refetch } = useFetchData(api.category.getAll, "category");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleView = (category: Category) => {
    setSelectedCategory(category);
    setIsEditing(false);
    setModalOpen(true);
  };

  const handleEdit = (category: Category) => {
    setSelectedCategory(category);
    setIsEditing(true);
    setModalOpen(true);
  };

  const handleDelete = async (category: Category) => {
    try {
      await api.category.delete(category.id);
      refetch();
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const handleSave = async (updatedCategory: Category) => {
    try {
      await api.category.update(updatedCategory);
      setModalOpen(false);
      refetch();
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  const columnsWithActions = [
    ...columns,
    {
      key: "actions",
      title: "Acciones",
      sortable: false,
      render: (_: any, row: Category) => (
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
          <button
            onClick={() => handleDelete(row)}
            className="px-4 py-2 border-2 border-red-500 text-red-500 rounded-md hover:bg-red-500 hover:text-white transition"
            title="Eliminar"
          >
            <Trash className="h-4 w-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold">Categorías</h1>
      <p>Listado de Categorías</p>

      <DataTable
        columns={columnsWithActions}
        data={data?.data || []}
        tableId="categories-table"
        loading={loading}
      />

      {selectedCategory && (
        <DataModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          data={selectedCategory}
          columns={columns}
          title={isEditing ? "Editar Categoría" : "Detalles de la Categoría"}
          isEditing={isEditing}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default Categorias;
