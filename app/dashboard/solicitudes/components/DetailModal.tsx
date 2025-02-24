"use client";

import { api } from "@/services/api";
import { X, Send, XCircle, FileText } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const DocumentLink = ({ title, pdfPath }) => (
	<div className="border rounded-lg p-4">
		<h4 className="font-medium mb-2">{title}</h4>
		{pdfPath ? (
			<Link
				href={pdfPath}
				target="_blank"
				rel="noopener noreferrer"
				className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 hover:underline"
			>
				<FileText className="h-5 w-5" />
				Ver documento
			</Link>
		) : (
			<span className="text-gray-500">Documento no disponible</span>
		)}
	</div>
);

const RequestDetailModal = ({ request, isOpen, onClose }) => {
	const [isRejecting, setIsRejecting] = useState(false);
	const [rejectReason, setRejectReason] = useState("");
	const [showRejectError, setShowRejectError] = useState(false);

	if (!request || !isOpen) return null;

	const handleReject = async () => {
		if (!rejectReason.trim()) {
			setShowRejectError(true);
			return;
		}
		try {
			await api.request.reject(request.id, rejectReason);
			setRejectReason("");
			setIsRejecting(false);
			onClose();
		} catch (error) {
			console.error("Error al rechazar la solicitud:", error);
		}
	};

	const handleApprove = async () => {
		try {
			await api.request.approve(request.id);
			onClose();
		} catch (error) {
			console.error("Error al aprobar la solicitud:", error);
		}
	};

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
			<div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
				<div className="p-6">
					<div className="flex justify-between items-center mb-6">
						<h2 className="text-2xl font-semibold">
							Detalles de la Solicitud #{request.id}
						</h2>
						<button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
							<X className="h-5 w-5" />
						</button>
					</div>

					<div className="grid md:grid-cols-2 gap-6">
						<div>
							<p className="text-sm text-gray-500">Nombre / Razón Social</p>
							<p className="font-medium">{request.nombreRazonSocial}</p>
						</div>
						<div>
							<p className="text-sm text-gray-500">Nombre en Plataforma</p>
							<p className="font-medium">{request.nombreMostrar}</p>
						</div>
						<div>
							<p className="text-sm text-gray-500">Tipo de Persona</p>
							<p className="font-medium">
								{request.tipoPersona == "1" ? "NATURAL" : "JURÍDICA"}
							</p>
						</div>
						<div>
							<p className="text-sm text-gray-500">Tipo de Documento</p>
							<p className="font-medium">{request.tipoDocumento}</p>
						</div>
						<div>
							<p className="text-sm text-gray-500">Número de Documento</p>
							<p className="font-medium">{request.numeroDocumento}</p>
						</div>
						<div>
							<p className="text-sm text-gray-500">Estado</p>
							<p
								className={`font-medium ${
									request.estado === "1"
										? "text-green-600"
										: request.estado === "En revisión"
										? "text-yellow-600"
										: request.estado === "Inactivo"
										? "text-red-600"
										: "text-gray-600"
								}`}
							>
								{request.estado !== "0" ? "Inactivo" : "Activo"}
							</p>
						</div>
					</div>

					<div className="mt-8">
						<h3 className="text-lg font-medium mb-4">Documentos Adjuntos</h3>
						<div className="grid md:grid-cols-2 gap-4">
							<DocumentLink title="RUT" pdfPath={request.fileCamaraComercio} />
							<DocumentLink
								title="Documento de Identidad"
								pdfPath={request.fileCedula}
							/>
							{request.tipoPersona == "2" && (
								<DocumentLink
									title="Cámara de Comercio"
									pdfPath={request.fileCamaraComercio}
								/>
							)}
						</div>
					</div>

					{isRejecting && (
						<div className="mt-6">
							<h3 className="text-lg font-medium mb-2">Motivo del Rechazo</h3>
							<textarea
								value={rejectReason}
								onChange={(e) => {
									setRejectReason(e.target.value);
									setShowRejectError(false);
								}}
								className={`w-full p-3 border rounded-lg resize-none h-32 ${
									showRejectError ? "border-red-500" : "border-gray-300"
								}`}
								placeholder="Por favor, explique el motivo del rechazo..."
							/>
							{showRejectError && (
								<p className="text-red-500 text-sm mt-1">
									Debe proporcionar un motivo para el rechazo
								</p>
							)}
						</div>
					)}

					<div className="flex justify-end gap-4 mt-8">
						{isRejecting ? (
							<>
								<button
									onClick={() => setIsRejecting(false)}
									className="px-4 py-2 border rounded-lg hover:bg-gray-50"
								>
									Cancelar
								</button>
								<button
									onClick={handleReject}
									className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center gap-2"
								>
									<XCircle className="h-4 w-4" />
									Confirmar Rechazo
								</button>
							</>
						) : (
							<>
								<button
									onClick={() => setIsRejecting(true)}
									className="px-4 py-2 border border-red-600 text-red-600 rounded-lg hover:bg-red-50 flex items-center gap-2"
								>
									<XCircle className="h-4 w-4" />
									Rechazar
								</button>
								<button
									onClick={handleApprove}
									className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
								>
									<Send className="h-4 w-4" />
									Aprobar Solicitud
								</button>
							</>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};
export default RequestDetailModal;
