"use client";
import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import Image from "next/image";

interface Column {
	key: string;
	title: string;
	sortable?: boolean;
	render?: (value: any, row: any) => React.ReactNode;
	editable?: boolean;
	type?: "text" | "number" | "date" | "boolean" | "select" | "image";
	options?: { label: string; value: any }[];
}

interface DataModalProps {
	isOpen: boolean;
	onClose: () => void;
	data: any;
	columns: Column[];
	title: string;
	isEditing?: boolean;
	onSave?: (updatedData: any) => Promise<void>;
}

const DataModal = ({
	isOpen,
	onClose,
	data,
	columns,
	title,
	isEditing = false,
	onSave,
}: DataModalProps) => {
	const [formData, setFormData] = useState(data);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setFormData(data);
	}, [data]);

	const handleChange = (key: string, value: any) => {
		setFormData((prev) => ({
			...prev,
			[key]: value,
		}));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (onSave) {
			setLoading(true);
			try {
				await onSave(formData);
				onClose();
			} catch (error) {
				console.error("Error saving data:", error);
			} finally {
				setLoading(false);
			}
		}
	};

	if (!isOpen) return null;

	const renderField = (column: Column) => {
		const value = formData[column.key];

		// Skip actions column
		if (column.key === "actions") {
			return isEditing ? null : column.render?.(value, formData);
		}

		// Use custom render function in view mode
		if (!isEditing && column.render) {
			return column.render(value, formData);
		}

		// If not editable in edit mode, show rendered view
		if (isEditing && column.editable === false) {
			return column.render ? column.render(value, formData) : value;
		}

		// Handle image type specially
		if (column.type === "Imagen") {
			// In edit mode
			if (isEditing) {
				return (
					<div className="space-y-3">
						{/* Always show image preview when there's a URL */}
						{value && (
							<div className="relative w-32 h-32">
								<Image
									src={value}
									alt={`${column.title}`}
									fill
									className="object-cover rounded-md"
									sizes="128px"
								/>
								<button
									type="button"
									onClick={() => handleChange(column.key, "")}
									className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center z-10"
								>
									<X className="w-4 h-4" />
								</button>
							</div>
						)}
						
						<input
							type="text"
							value={value ?? ""}
							onChange={(e) => handleChange(column.key, e.target.value)}
							className="w-full p-2 border rounded-md"
							placeholder="URL de la imagen"
						/>
					</div>
				);
			}
			
			// In view mode, show the image instead of URL text
			if (value) {
				return (
					<div className="relative w-32 h-32">
						<Image
							src={value}
							alt={`${column.title}`}
							fill
							className="object-cover rounded-md"
							sizes="128px"
						/>
					</div>
				);
			}
			
			return "Sin imagen";
		}

		// Edit mode inputs based on type
		if (isEditing) {
			switch (column.type) {
				case "number":
					return (
						<input
							type="number"
							value={value ?? ""}
							onChange={(e) => handleChange(column.key, Number(e.target.value))}
							className="w-full p-2 border rounded-md"
							step={column.key.toLowerCase().includes("price") ? "0.01" : "1"}
						/>
					);

				case "date":
					return (
						<input
							type="datetime-local"
							value={value}
							onChange={(e) => handleChange(column.key, e.target.value)}
							className="w-full p-2 border rounded-md"
						/>
					);

				case "boolean":
					return (
						<select
							value={value?.toString()}
							onChange={(e) => handleChange(column.key, e.target.value === "true")}
							className="w-full p-2 border rounded-md"
						>
							<option value="true">Sí</option>
							<option value="false">No</option>
						</select>
					);

				case "select":
					return (
						<select
							value={value}
							onChange={(e) => handleChange(column.key, e.target.value)}
							className="w-full p-2 border rounded-md"
						>
							{column.options?.map((option) => (
								<option key={option.value} value={option.value}>
									{option.label}
								</option>
							))}
						</select>
					);

				default:
					return (
						<input
							type="text"
							value={value ?? ""}
							onChange={(e) => handleChange(column.key, e.target.value)}
							className="w-full p-2 border rounded-md"
						/>
					);
			}
		}

		// View mode default rendering
		return value?.toString() ?? "";
	};

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center">
			<div
				className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
				onClick={onClose}
			/>

			<div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white rounded-lg shadow-xl p-6">
				<button
					onClick={onClose}
					className="absolute right-4 top-4 text-gray-400 hover:text-gray-500"
				>
					<X className="h-6 w-6" />
				</button>

				<h2 className="text-xl font-semibold mb-4">{title}</h2>

				<form onSubmit={handleSubmit} className="space-y-4">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						{columns
							.filter((column) => column.key !== "actions")
							.map((column) => (
								<div key={column.key} className="space-y-1">
									<label className="block text-sm font-medium text-gray-700">
										{column.title}
									</label>
									{renderField(column)}
								</div>
							))}
					</div>

					{/* Render actions at the bottom */}
					<div className="flex justify-between mt-4">
						<div className="flex gap-2">
							{columns
								.filter((column) => column.key === "actions")
								.map((column) => renderField(column))}
						</div>

						{isEditing && (
							<div className="flex gap-2">
								<button
									type="button"
									onClick={onClose}
									className="px-4 py-2 border rounded-md text-gray-600 hover:bg-gray-50"
									disabled={loading}
								>
									Cancelar
								</button>
								<button
									type="submit"
									className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
									disabled={loading}
								>
									{loading ? "Guardando..." : "Guardar"}
								</button>
							</div>
						)}
					</div>
				</form>
			</div>
		</div>
	);
};

export default DataModal;