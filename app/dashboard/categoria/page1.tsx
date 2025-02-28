"use client";

import { useState } from "react";
import useFetchData from "@/hooks/useFetchData";
import { api } from "@/services/api";
import { DataTable } from "webtic-ui";
import Modal from "@/components/Modal/Modal";
import { Edit, Eye, Trash } from "lucide-react";
import { MultiFielInput } from "../pqrs/components/CreatePQRModal/components";

export default function Categorias() {
  const { data, refetch } = useFetchData(api.category.getAll, "category");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState("view"); // "view", "edit", "delete", "create"
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    status: true,
    image: "",
    images: []
  });

  const handleAction = (type, category) => {
    setSelectedCategory(category);
    setModalType(type);
    
    if (type === "edit") {
      // Initialize form data with the selected category's data
      setFormData({
        title: category.title || "",
        status: category.status || true,
        image: category.image || "",
        attachedFiles: category.image ? [{ name: "Current Image", url: category.image }] : []
      });
    } else {
      // Reset form data for other actions
      setFormData({
        title: "",
        status: true,
        image: "",
        attachedFiles: []
      });
    }
    
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedCategory(null);
    setFormData({
      title: "",
      status: true,
      image: "",
      attachedFiles: []
    });
  };

  const handleSaveCategory = async () => {
    try {
      // Prepare data for API call
      const dataToSave = {
        title: formData.title,
        status: formData.status,
        image: formData.attachedFiles.length > 0 ? formData.attachedFiles[0].url : ""
      };

      if (modalType === "create") {
        await api.category.create(dataToSave);
      } else if (modalType === "edit") {
        await api.category.update(selectedCategory.id, dataToSave);
      } else if (modalType === "delete") {
        await api.category.delete(selectedCategory.id);
      }
      // Refresh data after changes
      refetch();
      handleCloseModal();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const columns = [
    { Header: "ID", accessor: "id", key: "id", title: "ID" },
    { Header: "Title", accessor: "title", key: "title", title: "Título" },
    {
      Header: "Image",
      accessor: "image",
      key: "image",
      title: "Imagen",
      // Uncomment when you have Image component imported
      // render: (image) => (
      //   <Image src={image} alt="category" width={50} height={50} className="rounded" />
      // ),
    },
    {
      Header: "Status",
      accessor: "status",
      key: "status",
      title: "Estado",
      render: (status) => (status ? "Activo" : "Inactivo"),
    },
    {
      Header: "Actions",
      key: "actions",
      title: "Acciones",
      render: (_, row) => (
        <div className="flex space-x-2">
          <button
            onClick={() => handleAction("view", row)}
            className="px-2 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleAction("edit", row)}
            className="px-2 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleAction("delete", row)}
            className="px-2 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
          >
            <Trash className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  const renderModalContent = () => {
    if (modalType === "view" && !selectedCategory) return null;

    if (modalType === "view") {
      return (
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium">ID</h3>
            <p>{selectedCategory.id}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium">Título</h3>
            <p>{selectedCategory.title}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium">Estado</h3>
            <p>{selectedCategory.status ? "Activo" : "Inactivo"}</p>
          </div>
          {selectedCategory.image && (
            <div>
              <h3 className="text-sm font-medium">Imagen</h3>
              {/* Uncomment when you have Image component imported */}
              {/* <Image src={selectedCategory.image} alt="category" width={100} height={100} className="rounded" /> */}
              <p className="text-gray-500">URL: {selectedCategory.image}</p>
            </div>
          )}
        </div>
      );
    }

    if (modalType === "edit" || modalType === "create") {
      return (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Título</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          
          <MultiFielInput
            label="Imagen de categoría"
            files={formData.attachedFiles}
            onChange={(files) => setFormData({ ...formData, attachedFiles: files })}
            maxFiles={1}
          />
          
          <div className="flex items-center">
            <input
              type="checkbox"
              name="status"
              id="status"
              checked={formData.status}
              onChange={handleInputChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="status" className="ml-2 block text-sm font-medium">
              Activo
            </label>
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={handleCloseModal}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleSaveCategory}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              {modalType === "create" ? "Crear" : "Guardar"}
            </button>
          </div>
        </div>
      );
    }

    if (modalType === "delete") {
      return (
        <div className="space-y-4">
          <p>
            ¿Está seguro que desea eliminar la categoría{" "}
            <span className="font-bold">{selectedCategory.title}</span>?
          </p>
          <div className="flex justify-end space-x-2">
            <button
              onClick={handleCloseModal}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
            >
              Cancelar
            </button>
            <button
              onClick={() => handleSaveCategory()}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Eliminar
            </button>
          </div>
        </div>
      );
    }
  };

  const onCreate = () => {
    setSelectedCategory(null);
    setFormData({
      title: "",
      status: true,
      images: []
    });
    setModalType("create");
    setModalOpen(true);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">Categorías</h1>
      <p>Listado de categorías</p>
      <DataTable data={data?.data} columns={columns} tableId={"categorias"} onAdd={() => onCreate()} />
      <Modal
        title={
          modalType === "view"
            ? `Ver Categoría: ${selectedCategory?.title}`
            : modalType === "edit"
            ? `Editar Categoría: ${selectedCategory?.title}`
            : modalType === "create"
            ? "Crear Nueva Categoría"
            : `Eliminar Categoría: ${selectedCategory?.title}`
        }
        isOpen={modalOpen}
        onClose={handleCloseModal}
      >
        {renderModalContent()}
      </Modal>
    </div>
  );
}