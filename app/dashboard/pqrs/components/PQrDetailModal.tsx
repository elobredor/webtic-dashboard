import React, { useEffect, useState, useRef } from "react";
import { SendHorizonal, X } from "lucide-react";
import { PQRService } from "@/services/api/pqr.service";
import { MultiFielInput } from "./CreatePQRModal/components";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/services/api";
import { formatISODate } from "@/utils/formatters";

interface Comment {
	comentario: string;
	fechaCreacion: string;
	id: number;
	imagenes?: string[];
	nombreUsuario: string;
	rol: number;
}

interface PQRDetailModalProps {
	isOpen: boolean;
	onClose: () => void;
	pqrDetails: {
		id: string;
		descripcion: string;
		tipo: string;
		fechaCreacion: string;
		estado: string;
		imagenes: string[];
	};
}

const PQRDetailModal: React.FC<PQRDetailModalProps> = ({
	isOpen,
	onClose,
	pqrDetails,
}) => {
	const [newMessage, setNewMessage] = useState("");
	const [messages, setMessages] = useState<Comment[]>([]);
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(false);
	const [expandedImage, setExpandedImage] = useState<string | null>(null);
	const [page, setPage] = useState(1);
	const [hasMore, setHasMore] = useState(true);
	const { user } = useAuth();
	const messagesEndRef = useRef<HTMLDivElement | null>(null);
	const [formData, setFormData] = useState({
		attachedFiles: [],
	});

	const fetchComments = async () => {
		try {
			const { data } = await PQRService.getComments(pqrDetails.id);
			if (data && data.data.length > 0) {
				setMessages((prev) =>
					[...prev, ...data.data].sort(
						(a, b) =>
							new Date(a.fechaCreacion).getTime() - new Date(b.fechaCreacion).getTime()
					)
				);
			}
			if (data.data.length === 0) setHasMore(false);
		} catch (error) {
			console.error("Error fetching comments", error);
		}
	};

	useEffect(() => {
		if (isOpen) {
			setMessages([]);
			setPage(1);
			setHasMore(true);
			fetchComments();
		}
	}, [isOpen, pqrDetails?.id]);

	const handleSendMessage = async (e: React.FormEvent) => {
		e.preventDefault();

		if (loading || (!newMessage.trim() && formData.attachedFiles.length === 0)) {
			setError(true);
			return;
		}

		setLoading(true);
		try {
			const formDataToSend = new FormData();
			formDataToSend.append("pqr_id", pqrDetails.id);
			formDataToSend.append("comentario", newMessage);

			formData.attachedFiles.forEach((file) => {
				formDataToSend.append("images", file);
			});

			const { data } = await api.pqr.sendComment(formDataToSend);

			const newComment: Comment = {
				id: data.id,
				comentario: newMessage,
				fechaCreacion: new Date().toISOString(),
				nombreUsuario: user?.nombre || "Usuario",
				rol: user?.rol || 0,
				imagenes: formData.attachedFiles.map((file) => URL.createObjectURL(file)),
			};

			setMessages((prev) =>
				[...prev, newComment].sort(
					(a, b) =>
						new Date(a.fechaCreacion).getTime() - new Date(b.fechaCreacion).getTime()
				)
			);
			setNewMessage("");
			setFormData({ attachedFiles: [] });
			setError(false);
			messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
		} catch (error) {
			console.error("Error al enviar el comentario:", error);
			setError(true);
		} finally {
			setLoading(false);
		}
	};

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
			<div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
				<div className="mb-2 flex justify-end">
					<button
						onClick={() => {
							setNewMessage("");
							setFormData({ attachedFiles: [] });
							setError(false);
							setMessages([]);
							onClose();
						}}
						className="text-sm font-medium text-white bg-red-500 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
					>
						<X size={20} />
					</button>
				</div>

				{/* Details */}
				<div className="px-6 py-4 space-y-2">
					<p className="text-sm text-gray-500">
						<strong>PQR:</strong> #{pqrDetails?.id}
					</p>
					<p className="text-sm text-gray-500">
						<strong>Descripción:</strong> {pqrDetails?.descripcion}
					</p>
					<p className="text-sm text-gray-500">
						<strong>Tipo:</strong> {pqrDetails?.tipo}
					</p>
					<p className="text-sm text-gray-500">
						<strong>Fecha:</strong> {formatISODate(pqrDetails?.fechaCreacion)}
					</p>
					<p className="text-sm text-gray-500">
						<strong>Estado:</strong>
						<span
							className={`ml-2 px-2 py-1 rounded-full text-xs ${
								pqrDetails?.estado === "ABIERTO"
									? "bg-green-100 text-green-800"
									: pqrDetails?.estado === "ENPROCESO"
									? "bg-blue-100 text-blue-800"
									: "bg-red-100 text-red-800"
							}`}
						>
							{pqrDetails?.estado}
						</span>
					</p>
				</div>
				<div className="px-6 py-4 border-t">
					<h3 className="text-sm font-medium text-gray-700">Adjuntos:</h3>
					<div className="flex flex-wrap gap-2 mt-2">
						{pqrDetails?.imagenes?.map((adjunto) => (
							<div
								key={adjunto}
								className="w-16 h-16 cursor-pointer"
								onClick={() => setExpandedImage(adjunto)}
							>
								<img
									src={adjunto}
									alt={`Adjunto ${adjunto}`}
									className="object-cover w-full h-full rounded-lg border"
								/>
							</div>
						))}
					</div>
				</div>

				{/* Comments */}
				<div className="px-6 py-4 border-t max-h-64 overflow-y-auto space-y-4">
					{messages.map((comentario) => (
						<div
							key={comentario.id}
							className={`flex ${
								comentario.rol !== user?.rol ? "justify-start" : "justify-end"
							}`}
						>
							<div
								className={`rounded-lg p-3 max-w-[70%] shadow-md ${
									comentario.rol !== user?.rol
										? "bg-gray-100 text-gray-800"
										: "bg-green-500 text-white"
								}`}
							>
								{comentario.rol !== user?.rol && (
									<p className="text-xs font-bold text-gray-600 mb-1">
										{comentario.nombreUsuario}
									</p>
								)}
								<p className="text-sm">{comentario.comentario}</p>
								{comentario.imagenes?.map((img, index) => (
									<img
										key={index}
										src={img}
										alt={`Imagen adjunta ${index + 1}`}
										className="mt-2 w-32 h-32 object-cover rounded-md cursor-pointer"
										onClick={() => setExpandedImage(img)}
									/>
								))}
								<span className="text-xs opacity-70 mt-1 block">
									{formatISODate(comentario.fechaCreacion)}
								</span>
							</div>
						</div>
					))}
				</div>

				{/* New Message Input */}
				{pqrDetails.estado !== "CERRADO" && (
					<div className="px-6 py-4 border-t bg-white">
						<form onSubmit={handleSendMessage} className="flex items-center gap-2">
							<div className="relative flex-grow">
								<input
									type="text"
									value={newMessage}
									onChange={(e) => setNewMessage(e.target.value)}
									placeholder="Escribe un mensaje..."
									className={`w-full pl-4 pr-12 py-2 text-sm border rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 ${
										error ? "border-red-500" : "border-gray-300"
									}`}
								/>
								{error && (
									<p className="text-xs text-red-500 absolute -bottom-4">
										El mensaje o imagen es obligatorio.
									</p>
								)}
							</div>
							<button
								type="submit"
								disabled={loading}
								className={`p-2 text-white rounded-full ${
									loading ? "bg-gray-400 cursor-not-allowed" : "bg-green-500"
								}`}
							>
								<SendHorizonal size={20} />
							</button>
						</form>
						<MultiFielInput
							label="Archivos adjuntos"
							files={formData.attachedFiles}
							onChange={(files) => setFormData({ ...formData, attachedFiles: files })}
							maxFiles={1}
						/>
					</div>
				)}
			</div>
		</div>
	);
};

export default PQRDetailModal;
