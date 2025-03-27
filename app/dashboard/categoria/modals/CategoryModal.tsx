// CategoryModal.jsx
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import InputField from "./components/InputField";

import { Loading } from "@/components/Loading";
import { Category } from "@/Models/Categorie";
import MultiFileInput from "./components/MultiFileInput";

interface CategoryModalProps {
	isOpen: boolean;
	mode: "view" | "create" | "edit";
	category?: Category;
	onClose: () => void;
	onSave: (formData: FormData) => Promise<void>;
}

const CategoryModal: React.FC<CategoryModalProps> = ({
	isOpen,
	mode,
	category,
	onClose,
	onSave,
}) => {
	const [title, setTitle] = useState("");
	const [files, setFiles] = useState<File[]>([]);
	const [loading, setLoading] = useState(false);

	// Reset form data when modal opens or changes mode
	useEffect(() => {
		if (mode === "edit" || mode === "view") {
			setTitle(category?.title || "");
			setFiles([]);
		} else {
			setTitle("");
			setFiles([]);
		}
	}, [category, mode, isOpen]);

	const handleSubmit = async () => {
		if (!title && (mode === "create" || mode === "edit")) {
			alert("Por favor, completa todos los campos obligatorios.");
			return;
		}

		setLoading(true);

		try {
			const formData = new FormData();
			formData.append("title", title);
			formData.append("status", "true");

			if (mode === "edit" && category?.id) {
				formData.append("id", category.id.toString());
			}

			// Add files if they exist
			if (files.length > 0) {
				for (const file of files) {
					formData.append("images", file);
				}
			}

			await onSave(formData);
			setLoading(false);
		} catch (error) {
			console.error("Error al guardar categoría:", error);
			setLoading(false);
		}
	};

	if (!isOpen) return null;

	const isViewOnly = mode === "view";
	const modalTitle = {
		view: "Detalles de la Categoría",
		create: "Crear Categoría",
		edit: "Editar Categoría",
	}[mode];

	return (
		<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
			<div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
				<div className="flex justify-between items-center mb-4">
					<h2 className="text-xl font-bold">{modalTitle}</h2>
					<button
						onClick={onClose}
						className="text-sm font-medium text-white bg-red-500 rounded-md"
					>
						<X size={25} />
					</button>
				</div>

				{(mode === "edit" || mode === "view") && category?.id && (
					<InputField label="ID" value={category.id.toString()} disabled />
				)}

				<InputField
					label="Título"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					placeholder="Verduras"
					disabled={isViewOnly}
				/>

				{!isViewOnly && (
					<MultiFileInput
						label="Selecciona imágenes"
						files={files}
						onChange={setFiles}
						maxFiles={1}
					/>
				)}

				{category?.image && files.length === 0 && (
					<div className="mt-4">
						<Image
							src={category.image}
							alt="Imagen actual"
							className="mt-2 w-full h-auto rounded-md border"
							width={250}
							height={250}
						/>
					</div>
				)}

				<div className="flex justify-end gap-2 mt-4">
					{!isViewOnly && (
						<button
							onClick={handleSubmit}
							className="px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-md"
						>
							{mode === "create" ? "Crear" : "Actualizar"}
						</button>
					)}

					<button
						onClick={onClose}
						className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md"
					>
						{isViewOnly ? "Cerrar" : "Cancelar"}
					</button>
				</div>
			</div>
			<Loading show={loading} fullscreen={true} size={40} text="Cargando..." />
		</div>
	);
};

export default CategoryModal;
