import Modal from "@/components/Modal/Modal";

export default function ViewCategoryModal({ isOpen, onClose, category }) {
  if (!category) return null;

  return (
    <Modal
      title={`Ver Categoría: ${category.title}`}
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500">ID</h3>
            <p className="mt-1">{category.id}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Título</h3>
            <p className="mt-1">{category.title}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Estado</h3>
            <p className="mt-1">
              <span className={`px-2 py-1 rounded text-xs font-medium ${category.status ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                {category.status ? "Activo" : "Inactivo"}
              </span>
            </p>
          </div>
        </div>
        
        {category.image && (
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">Imagen</h3>
            <div className="border rounded p-2">
              <div className="w-full h-40 bg-gray-100 rounded overflow-hidden">
                <img src={category.image} alt={category.title} className="w-full h-full object-contain" />
              </div>
              <p className="text-xs text-gray-500 mt-2 truncate">URL: {category.image}</p>
            </div>
          </div>
        )}
        
        <div className="flex justify-end pt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition"
          >
            Cerrar
          </button>
        </div>
      </div>
    </Modal>
  );
}