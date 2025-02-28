import { useState, useEffect } from "react";
import Modal from "@/components/Modal/Modal";

import { api } from "@/services/api";
import { MultiFielInput } from "../../pqrs/components/CreatePQRModal/components";

export default function EditCategoryModal({ isOpen, onClose, category, isCreating = false, onSuccess }) {
  const [formData, setFormData] = useState({
    title: "",
    status: true,
    attachedFiles: []
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (category && !isCreating) {
      setFormData({
        title: category.title || "",
        status: category.status || true,
        attachedFiles: category.image ? [{ name: "Current Image", url: category.image }] : []
      });
    } else {
      setFormData({
        title: "",
        status: true,
        attachedFiles: []
      });
    }
  }, [category, isCreating, isOpen]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      setError("");
      
      // Validaciones
      if (!formData.title.trim()) {
        setError("El título es obligatorio");
        setIsSubmitting(false);
        return;
      }

      // Preparar datos para API
      const dataToSave = {
        title: formData.title.trim(),
        status: formData.status,
        image: formData.attachedFiles.length > 0 ? formData.attachedFiles[0].url : ""
      };

      if (isCreating) {
        await api.category.create(dataToSave);
      } else {
        await api.category.update(category.id, dataToSave);
      }
      
      if (onSuccess) onSuccess();
      onClose();
    } catch (error) {
      console.error("Error:", error);
      setError("Ha ocurrido un error al guardar la categoría");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      title={isCreating ? "Crear Nueva Categoría" : `Editar Categoría: ${category?.title}`}
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="space-y-4">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative">
            {error}
          </div>
        )}
        
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="title">Título <span className="text-red-500">*</span></label>
          <input
            type="text"
            id="title"
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
          <label htmlFor="status" className="ml-2 block text-sm">
            Categoría activa
          </label>
        </div>
        
        <div className="flex justify-end space-x-2 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition"
            disabled={isSubmitting}
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Guardando...' : isCreating ? "Crear Categoría" : "Guardar Cambios"}
          </button>
        </div>
      </div>
    </Modal>
  );
}