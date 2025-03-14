"use client";
import React, { useState } from "react";
import useFetchData from "@/hooks/useFetchData";
import { api } from "@/services/api"; 
import { Eye, Edit, Trash } from "lucide-react";
import { columns } from "./columnConfig";
import DataTable from "@/components/DataTable"; 
import { Category } from "@/Models/Categorie";
import CategoryModal from "./modals/CategoryModal";
import Alert from "@/components/Alert"; 

const Categorias = () => {
  const { data, loading, refetch } = useFetchData(api.category.getAll, "category");
  
  // Alert state
  const [alertState, setAlertState] = useState({
    isOpen: false,
    categoryToDelete: null
  });
  
  // Unified modal state
  const [modalState, setModalState] = useState({
    isOpen: false,
    mode: 'view', // 'view', 'create', or 'edit'
    category: null
  });

  const openModal = (mode, category = null) => {
    setModalState({
      isOpen: true,
      mode,
      category
    });
  };

  const closeModal = () => {
    setModalState({
      isOpen: false,
      mode: 'view',
      category: null
    });
  };

  const handleView = (category) => openModal('view', category);
  const handleCreate = () => openModal('create');
  const handleEdit = (category) => openModal('edit', category);

  // This now opens the confirmation alert instead of deleting directly
  const confirmDelete = (category) => {
    setAlertState({
      isOpen: true,
      categoryToDelete: category
    });
  };
  
  // Actual delete function called after confirmation
  const handleDelete = async () => {
    try {
      if (alertState.categoryToDelete) {
        await api.category.delete(alertState.categoryToDelete?.id);
        refetch();
        // Close the alert after successful deletion
        setAlertState({
          isOpen: false,
          categoryToDelete: null
        });
      }
    } catch (error) {
      console.error("Error deleting category:", error);
      // Close the alert even if there's an error
      setAlertState({
        isOpen: false,
        categoryToDelete: null
      });
    }
  };
  
  // Function to close the alert without deleting
  const closeAlert = () => {
    setAlertState({
      isOpen: false,
      categoryToDelete: null
    });
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
            onClick={() => confirmDelete(row)} // Changed to confirmDelete
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
        onAdd={() => handleCreate()}
      />
      
      <Alert 
        title="¿Estás seguro?" 
        onAccept={handleDelete}
        isOpen={alertState.isOpen}
        onClose={closeAlert}
        description="Eliminar una categoría puede afectar la visualización de algunos productos en la página principal"
      />
      
      <CategoryModal
        isOpen={modalState.isOpen}
        mode={modalState.mode}
        category={modalState.category}
        onClose={closeModal}
        onSave={async (categoryData) => {
          try {
            if (modalState.mode === 'edit') {
              await api.category.update(categoryData);
            } else if (modalState.mode === 'create') {
              await api.category.create(categoryData);
            }
            closeModal();
            refetch();
          } catch (error) {
            console.error("Error saving category:", error);
          }
        }}
      />
    </div>
  );
};

export default Categorias;