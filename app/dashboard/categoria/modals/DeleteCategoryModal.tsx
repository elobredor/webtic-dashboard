import { useState } from "react";
import Modal from "@/components/Modal/Modal";
import { api } from "@/services/api";

export default function DeleteCategoryModal({ isOpen, onClose, category, onSuccess }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState("");

  if (!category) return null;

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      setError("");
      
      await api.category.delete(category.id);
      
      if (onSuccess) onSuccess();
      onClose();
    } catch (error) {
      console.error("Error al eliminar:", error);
      setError("Ha ocurrido un error al eliminar la categoría");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Modal
      title={`Eliminar Categoría: ${category.title}`}
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="space-y-4">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative">
            {error}
          </div>
        )}
        
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
          <div className="flex">
            <div className="ml-3">
              <p className="text-yellow-700">
                ¿Está seguro que desea eliminar la categoría <span className="font-bold">{category.title}</span>?
              </p>
              <p className="text-yellow-700 text-sm mt-2">
                Esta acción no se puede deshacer.
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end space-x-2 pt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition"
            disabled={isDeleting}
          >
            Cancelar
          </button>
          <button
            onClick={handleDelete}
            className={`px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition ${isDeleting ? 'opacity-70 cursor-not-allowed' : ''}`}
            disabled={isDeleting}
          >
            {isDeleting ? 'Eliminando...' : 'Confirmar Eliminación'}
          </button>
        </div>
      </div>
    </Modal>
  );
}