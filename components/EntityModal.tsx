import React, { useEffect, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { Loading } from "@/components/Loading";
import MultiFileInput from "@/app/dashboard/categoria/modals/components/MultiFileInput";
import InputField from "@/app/dashboard/categoria/modals/components/InputField";
import { api } from "@/services/api";

interface Column {
	key: string;
	title: string;
	type?: "text" | "number" | "boolean" | "select" | "image";
	options?: { label: string; value: any }[];
	editable?: boolean;
	get?: string; // Nombre del endpoint para cargar dinámicamente opciones
	render?: (value: any) => JSX.Element;
}

interface EntityModalProps {
	isOpen: boolean;
	mode: "view" | "create" | "edit";
	entity?: Record<string, any>;
	onClose: () => void;
	onSave: (formData: FormData) => Promise<void>;
	columns: Column[];
	title: string;
}

const EntityModal: React.FC<EntityModalProps> = ({
	isOpen,
	mode,
	entity,
	onClose,
	onSave,
	columns,
	title,
}) => {
	const [formData, setFormData] = useState<Record<string, any>>({});
	const [files, setFiles] = useState<File[]>([]);
	const [loading, setLoading] = useState(false);
	const [dynamicOptions, setDynamicOptions] = useState<
		Record<string, { label: string; value: string }[]>
	>({});

	// Cargar opciones dinámicas cuando el modal se abre
	useEffect(() => {
		if (isOpen) {
			const fetchDynamicOptions = async () => {
				const newOptions: Record<string, { label: string; value: string }[]> = {};

				// Filtrar columnas que tienen `get` definido y son `select`
				const dynamicColumns = columns.filter(
					(col) => col.type === "select" && typeof col.get === "function"
				);

				for (const column of dynamicColumns) {
					try {
						// Llamar a la función `get` directamente
						const { data } = await column.get(1); // Si `getAll` requiere un parámetro, pásalo aquí

						// Ajustar la estructura según lo que devuelva el API
						newOptions[column.key] = data.data.map(
							(item: { id: number; title: string }) => ({
								label: item.title,
								value: item.id.toString(),
							})
						);
					} catch (error) {
						console.error(`Error al obtener datos para ${column.key}:`, error);
					}
				}

				setDynamicOptions(newOptions);
			};

			fetchDynamicOptions();
		}
	}, [isOpen, columns]);

	// Manejo de datos cuando se abre el modal
	useEffect(() => {
		if (mode === "edit" || mode === "view") {
			const newFormData = { ...entity };

			// Si hay selects dinámicos, convertir el valor al `id` correspondiente
			Object.keys(dynamicOptions).forEach((key) => {
				const option = dynamicOptions[key]?.find(
					(opt) => opt.label === entity?.[key]
				);
				if (option) {
					newFormData[key] = option.value; // Asignar el `id`
				}
			});

			setFormData(newFormData);
			setFiles([]);
		} else {
			setFormData({});
			setFiles([]);
		}
	}, [entity, mode, isOpen, dynamicOptions]);

	const handleChange = (key: string, value: any) => {
		setFormData((prev) => ({
			...prev,
			[key]: value,
		}));
	};

	const handleSubmit = async () => {
		if (!formData || Object.keys(formData).length === 0) {
			alert("Por favor, completa los campos obligatorios.");
			return;
		}

		setLoading(true);

		try {
			const formDataObject = new FormData();

			// Agregar los valores al FormData (excepto imágenes)
			Object.entries(formData).forEach(([key, value]) => {
				if (value !== undefined && value !== null) {
					if (typeof value === "boolean") {
						formDataObject.append(key, value ? "true" : "false");
					} else {
						formDataObject.append(key, value);
					}
				}
			});

			if (files.length > 0) {
				for (const file of files) {
					formDataObject.append("images", file);
				}
			}

			// Enviar al backend
			await onSave(formDataObject);
		} catch (error) {
			console.error("Error al guardar:", error);
		} finally {
			setLoading(false);
		}
	};

	if (!isOpen) return null;
	const isViewOnly = mode === "view";

	return (
		<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
			<div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl">
				<div className="flex justify-between items-center mb-4">
					<h2 className="text-xl font-bold">{title}</h2>
					<button
						onClick={onClose}
						className="text-sm font-medium text-white bg-red-500 p-2 rounded-md"
					>
						<X size={25} />
					</button>
				</div>
				<div className="grid grid-cols-2 gap-4">
					{columns.map((column) => {
						const { key, title, type, options, editable, render } = column;
						const value = formData[key] ?? "";

						const isFieldEditable =
							(mode === "edit" && key !== "id" && key !== "vendedor") ||
							(mode === "create" && editable !== false);

						// Si hay un render, usarlo
						if (render) {
							return (
								<div key={key} className="col-span-1">
									<label className="font-medium">{title}</label>
									<div className="mt-1">{render(value)}</div>
								</div>
							);
						}

						// Select dinámico o estático
						if (type === "select") {
							const selectOptions = dynamicOptions[key] || options;

							return (
								<div key={key} className="col-span-1">
									<label className="font-medium">{title}</label>
									<select
										value={value}
										onChange={(e) => handleChange(key, e.target.value)}
										className="w-full p-2 border rounded-md"
										disabled={!isFieldEditable}
									>
										<option value="">Selecciona una opción</option>
										{selectOptions?.map((option) => (
											<option key={option.value} value={option.value}>
												{option.label}
											</option>
										))}
									</select>
								</div>
							);
						}

						// Boolean (Sí/No)
						if (type === "boolean") {
							return (
								<div key={key} className="col-span-1">
									<label className="font-medium">{title}</label>
									<select
										value={value ? "true" : "false"}
										onChange={(e) => handleChange(key, e.target.value === "true")}
										className="w-full p-2 border rounded-md"
										disabled={!isFieldEditable}
									>
										<option value="true">Sí</option>
										<option value="false">No</option>
									</select>
								</div>
							);
						}

						// Text y Number
						return (
							<div key={key} className="col-span-1">
								<InputField
									label={title}
									value={value}
									onChange={(e) => handleChange(key, e.target.value)}
									placeholder={title}
									disabled={!isFieldEditable}
								/>
							</div>
						);
					})}
				</div>

				{columns.some((column) => column.key === "image") && (
					<div className="mt-4">
						<MultiFileInput
							label="Selecciona una nueva imagen"
							files={files}
							onChange={(newFiles) => {
								if (newFiles.length > 0) {
									setFiles([newFiles[0]]); // Solo permitimos 1 imagen y reemplazamos la anterior
									setFormData((prev) => ({
										...prev,
										image: URL.createObjectURL(newFiles[0]), // Mostrar previsualización de la nueva imagen
									}));
								}
							}}
							maxFiles={1}
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

export default EntityModal;
