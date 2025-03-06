"use client";

import { useState } from "react";
import useFetchData from "@/hooks/useFetchData";
import { api } from "@/services/api";
import { DataTable } from "webtic-ui";
import { Edit, Eye, Trash } from "lucide-react";
import ViewCategoryModal from "./modals/ViewCategoryModal";
import EditCategoryModal from "./modals/EditCategoryModal";
import DeleteCategoryModal from "./modals/DeleteCategoryModal";

export default function Categorias() {
  const { data, refetch } = useFetchData(api.category.getAll, "category");
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleView = (category) => {
    setSelectedCategory(category);
    setIsViewModalOpen(true);
  };

  const handleEdit = (category) => {
    setSelectedCategory(category);
    setIsEditModalOpen(true);
  };

  const handleDelete = (category) => {
    setSelectedCategory(category);
    setIsDeleteModalOpen(true);
  };

  const handleCreate = () => {
    setSelectedCategory(null);
    setIsCreateModalOpen(true);
  };

  const handleSuccessfulOperation = () => {
    refetch();
  };

  const columns = [
    { Header: "ID", accessor: "id", key: "id", title: "ID" },
    { Header: "Title", accessor: "title", key: "title", title: "Título" },
    {
      Header: "Image",
      accessor: "image",
      key: "image",
      title: "Imagen",
      // Se puede mejorar implementando un componente de imagen
      render: (image) => image ? (
        <div className="w-12 h-12 bg-gray-100 rounded overflow-hidden">
          <img src={image} alt="category" className="w-full h-full object-cover" />
        </div>
      ) : (
        <span className="text-gray-400">Sin imagen</span>
      ),
    },
    {
      Header: "Status",
      accessor: "status",
      key: "status",
      title: "Estado",
      render: (status) => (
        <span className={`px-2 py-1 rounded text-xs font-medium ${status ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
          {status ? "Activo" : "Inactivo"}
        </span>
      ),
    },
    {
      Header: "Actions",
      key: "actions",
      title: "Acciones",
      render: (_, row) => (
        <div className="flex space-x-2">
          <button
            onClick={() => handleView(row)}
          className="px-4 py-2 border-2 border-blue-400 text-blue-400 rounded-md hover:bg-blue-400 hover:text-white transition"
            title="Ver detalles"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleView(row)}
           		className="px-4 py-2 border-2 border-green-400 text-green-400 rounded-md hover:bg-green-400 hover:text-white transition"
            title="Editar categoría"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleDelete(row)}
          className="px-4 py-2 border-2 border-red-500 text-red-500 rounded-md hover:bg-red-500 hover:text-white transition"
            title="Eliminar categoría"
          >
            <Trash className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold mb-2">Categorías</h1>
        <p className="text-gray-600 mb-4">Gestión de categorías para la aplicación</p>
      </div>

      <DataTable 
        data={data?.data || []} 
        columns={columns} 
        tableId="categorias" 
        onAdd={handleCreate}
     
        loading={!data}
      />
      
      {/* Modal para ver categoría */}
      <ViewCategoryModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        category={selectedCategory}
      />
      
      {/* Modal para editar categoría */}
      <EditCategoryModal
        isOpen={isEditModalOpen || isCreateModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setIsCreateModalOpen(false);
        }}
        category={selectedCategory}
        isCreating={isCreateModalOpen}
        onSuccess={handleSuccessfulOperation}
      />
      
      {/* Modal para eliminar categoría */}
      <DeleteCategoryModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        category={selectedCategory}
        onSuccess={handleSuccessfulOperation}
      />
    </div>
  );
}