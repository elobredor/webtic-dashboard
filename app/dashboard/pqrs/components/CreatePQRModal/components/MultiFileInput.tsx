import React, { useState } from "react";
import { X } from "lucide-react";

interface MultiFileInputProps {
	label: string;
	onChange: (files: File[]) => void;
	files?: File[];
	maxFiles?: number;
	accept?: string;
}

const MultiFileInput: React.FC<MultiFileInputProps> = ({
	label,
	onChange,
	files = [],
	maxFiles = 10,
	accept = "image/*",
}) => {
	const [previewUrl, setPreviewUrl] = useState<string | null>(null);

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const selectedFiles = Array.from(e.target.files || []);
		const totalFiles = files.length + selectedFiles.length;

		if (totalFiles > maxFiles) {
			alert(`Solo puedes subir hasta ${maxFiles} archivos`);
			return;
		}

		onChange([...files, ...selectedFiles]);
		e.target.value = ""; // Reset input
	};

	const removeFile = (index: number) => {
		const newFiles = files.filter((_, i) => i !== index);
		onChange(newFiles);
	};

	const openPreview = (file: File) => {
		if (file.type.startsWith("image/")) {
			const url = URL.createObjectURL(file);
			setPreviewUrl(url);
		} else {
			alert("Vista previa solo disponible para imágenes.");
		}
	};

	const closePreview = () => {
		if (previewUrl) {
			URL.revokeObjectURL(previewUrl);
			setPreviewUrl(null);
		}
	};

	const isMaxFilesReached = files.length >= maxFiles;

	return (
		<div className="space-y-4">
			<div>
				<label className="block text-sm font-medium text-gray-700 mb-2">
					{label}
				</label>
				<input
					type="file"
					accept={accept}
					multiple
					onChange={handleFileChange}
					disabled={isMaxFilesReached}
					className="mt-1 block w-full text-sm text-gray-500 
            file:mr-4 file:py-2 file:px-4 file:rounded-md 
            file:border file:border-gray-300 file:bg-gray-100 
            file:text-gray-700 hover:file:bg-gray-200"
				/>
				<p className="mt-2 text-sm text-gray-500">
					{isMaxFilesReached
						? maxFiles === 1
							? "Completo"
							: "Subido con éxito"
						: `${files.length} de ${maxFiles} archivos seleccionados`}
				</p>
			</div>

			{/* Files Grid */}
			{files && files.length > 0 && (
				<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
					{files.map((file, index) => (
						<div
							key={`${file.name}-${index}`}
							className="relative group aspect-square border border-gray-200 rounded-lg overflow-hidden"
						>
							{/* Mostrar miniatura solo para imágenes */}
							{file.type.startsWith("image/") ? (
								<img
									src={URL.createObjectURL(file)}
									alt={file.name}
									className="w-full h-full object-cover cursor-pointer"
									onClick={() => openPreview(file)}
								/>
							) : (
								<div className="flex items-center justify-center h-full text-sm text-gray-500 bg-gray-100">
									PDF
								</div>
							)}
							<button
								onClick={() => removeFile(index)}
								className="absolute top-2 right-2 p-1 bg-red-100 text-red-600 rounded-full 
                  opacity-0 group-hover:opacity-100 transition-opacity duration-200"
							>
								<X className="w-4 h-4" />
							</button>
						</div>
					))}
				</div>
			)}

			{/* Preview Modal */}
			{previewUrl && (
				<div
					className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
					onClick={closePreview}
				>
					<div className="relative max-w-4xl max-h-[90vh] w-full">
						<img
							src={previewUrl}
							alt="Preview"
							className="w-full h-full object-contain"
						/>
						<button
							onClick={closePreview}
							className="absolute top-4 right-4 p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-75"
						>
							<X className="w-6 h-6" />
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default MultiFileInput;
