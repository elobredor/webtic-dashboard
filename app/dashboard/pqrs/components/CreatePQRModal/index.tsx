import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { SelectSearch, TextArea, Select } from "./components";
import { Order } from "@/Models/Order";
import { api } from "@/services/api";
import MultiFileInput from "./components/MultiFileInput";
import InputField from "./components/InputField";

interface CreatePQRModalProps {
	isOpen: boolean;
	onClose: () => void;
	order?: Order;
}

const CreatePQRModal: React.FC<CreatePQRModalProps> = ({
	isOpen,
	onClose,
	order,
}) => {
	const [asunto, setAsunto] = useState(
		order?.id ? `PQR Relacionado con el pedido #${order?.id}` : ""
	);
	const [tipo, setTipo] = useState("Reclamo");
	const [receptor, setReceptor] = useState("");

	//const [files, setFiles] = useState([]);
	const [files, setFiles] = useState<File[]>([]);
	const [descripcion, setDescripcion] = useState("");

	useEffect(() => {
		resetFormData();
	}, [order]);
	const resetFormData = () => {
		setAsunto(order?.id ? `PQR Relacionado con el pedido #${order?.id}` : "");
		setTipo("Reclamo");
		setReceptor("");
		setDescripcion("");
		setFiles([]);
	};

	const onSubmit = async () => {
		if (!asunto || !tipo || !descripcion) {
			alert("Por favor, completa todos los campos obligatorios.");
			return;
		}

		const formData = new FormData();
		formData.append("tipo", tipo);
		formData.append("asunto", asunto);
		formData.append("descripcion", descripcion);
		if (order?.id) formData.append("pedido", String(order.id));

		try {
			await api.pqr.create(formData, files);
			resetFormData();
			onClose();
		} catch (error) {
			console.error("Error al crear PQR:", error);
		}
	};

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
			<div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
				<div className="flex justify-between items-center mb-4">
					<h2 className="text-xl font-bold">
						{order ? `Reclamo de pedido #${order.id}` : "Crear PQRS"}
					</h2>
					<button
						onClick={onClose}
						className="text-sm font-medium text-white bg-red-500 rounded-md"
					>
						<X size={25} />
					</button>
				</div>

				<InputField
					label="Asunto"
					value={asunto}
					onChange={(e) => setAsunto(e.target.value)}
				/>
				<Select
					label="Tipo"
					options={["Petición", "Queja", "Reclamo", "Sugerencia"]}
					value={tipo}
					onChange={setTipo}
				/>
				<Select
					label="Relacionado a"
					options={
						order?.id
							? ["Pedido", "Plataforma", "Vendedores"]
							: ["Plataforma", "Vendedores"]
					}
					value={receptor}
					onChange={setReceptor}
					disabled={Boolean(order?.id)}
				/>
				{receptor === "Vendedores" && (
					<SelectSearch
						label="Seleccionar Vendedor"
						placeholder="Buscar vendedor por nombre"
						options={["Vendedor #11", "Vendedor #22", "Vendedor #23"]}
						onSearch={(query) => console.log("Simular API:", query)}
						value={""}
						onChange={function (value: string): void {
							throw new Error("Function not implemented.");
						}}
					/>
				)}
				<TextArea
					label="Descripción"
					value={descripcion}
					onChange={(e) => setDescripcion(e.target.value)}
				/>
				<MultiFileInput
					label="Selecciona imágenes"
					files={files}
					onChange={setFiles}
					maxFiles={10}
				/>
				<div className="flex justify-end gap-2">
					<button
						onClick={onSubmit}
						className="px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-md"
					>
						Crear
					</button>
				</div>
			</div>
		</div>
	);
};

export default CreatePQRModal;
