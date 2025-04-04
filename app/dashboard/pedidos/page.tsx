"use client";
import React, { useState } from "react";
import { api } from "@/services/api";
import { Eye } from "lucide-react";
import { Order, OrderDetail } from "@/Models/Order";
import Modal from "@/components/Modal/Modal";
import { formatCurrency, formatDate } from "@/utils/formatters";
import DataTable from "@/components/DataTable";

const PedidosView = () => {
	const estadoColors: Record<string, string> = {
		NUEVO: "bg-yellow-100 text-yellow-800",
		PENDIENTE: "bg-yellow-100 text-yellow-800",
		ENPROCESO: "bg-blue-100 text-blue-800",
		TRANSITO: "bg-purple-100 text-purple-800",
		ENVIADO: "bg-indigo-100 text-indigo-800",
		ENTREGADO: "bg-green-100 text-green-800",
		ACEPTADO: "bg-green-100 text-green-800",
		CANCELADO: "bg-red-100 text-red-800",
		RECHAZADA: "bg-red-100 text-red-800",
	};
	const fetchOrders = async (page: number) => {
		try {
			const response = await api.order.getAll(page || 1);
			return {
				data: response?.data?.data || [],
				total: response?.data?.total || 0,
			};
		} catch (error) {
			console.error("Error al cargar vendedores:", error);
			return { data: [], total: 0 };
		}
	};

	const [modalOpen, setModalOpen] = useState(false);
	const [selectedOrder, setSelectedOrder] = useState<Order>();
	const [orderDetails, setOrderDetails] = useState<OrderDetail[]>([]);

	const getOrderDetail = async (id: number) => {
		try {
			const data = await api.order.getOrderDetails(id);
			setOrderDetails(data);
		} catch (error) {
			console.error("Error fetching categories:", error);
		}
	};

	const openModal = async (order: Order) => {
		setSelectedOrder(order);
		await getOrderDetail(order.id).then(() => {
			setModalOpen(true);
		});
	};

	const columns = [
		{
			key: "id",
			title: "ID",
			sortable: true,
		},
		{
			key: "fecha",
			title: "Fecha",
			sortable: true,
			render: (value: string) => <span>{formatDate(new Date(value))}</span>,
		},
		{
			key: "montoTotal",
			title: "Total",
			sortable: true,
			render: (value: number) => <span>{formatCurrency(value)}</span>,
		},
		{
			key: "estadoPago",
			title: "Estado P.",
			sortable: true,
			render: (value: string) => (
				<span
					className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
						estadoColors[value] || "bg-gray-100 text-gray-800"
					}`}
				>
					{value}
				</span>
			),
		},
		{
			key: "estado",
			title: "Estado",
			sortable: true,
			render: (value: string) => (
				<span
					className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
						estadoColors[value] || "bg-gray-100 text-gray-800"
					}`}
				>
					{value}
				</span>
			),
		},
		{
			key: "actions",
			title: "Acciones",
			sortable: false,
			render: (_: any, row: Order) => (
				<div className="flex gap-2">
					<button
						onClick={() => openModal(row)}
						className="px-4 py-2 border-2 border-green-400 text-green-400 rounded-md hover:bg-green-400 hover:text-white transition"
						title="Ver detalles"
					>
						<Eye className="h-4 w-4" />
					</button>
				</div>
			),
		},
	];

	// declarar la funcion
	return (
		<div>
			<h1 className="text-2xl font-bold">Pedidos</h1>
			<p>Listado de Pedidos</p>

			<DataTable
				columns={columns}
				tableId="orders-table"
				fetchFunction={fetchOrders}
			/>

			<Modal
				title={`Pedido # ${selectedOrder?.id ?? ""}`}
				isOpen={modalOpen}
				onClose={() => setModalOpen(false)}
			>
				<div className="">
					<div className="grid grid-flow-row gap-2">
						<div className="bg-white p-2 rounded-lg shadow-sm">
							<div className="flex justify-between mb-5">
								<div className="text-right flex items-start flex-col">
									<p className="font-medium text-gray-600 text-left">Fecha:</p>
									<p>
										{selectedOrder?.createdAt &&
											formatDate(new Date(selectedOrder.createdAt))}
									</p>
								</div>
							</div>

							<div className="mb-8">
								<h3 className="text-lg font-semibold text-gray-700 mb-2">Cliente:</h3>
								<p>{selectedOrder?.UserModel.name}</p>
							</div>

							<table className="w-full mb-8 rounded-lg shadow-orange-900">
								<thead>
									<tr className="border-b border-gray-200 text-left">
										<th className="py-2 px-4 font-semibold text-gray-600">Descripción</th>
										<th className="py-2 px-4 font-semibold text-gray-600">Cantidad</th>
										<th className="py-2 px-4 font-semibold text-gray-600">Precio</th>
										<th className="py-2 px-4 font-semibold text-gray-600">Total</th>
									</tr>
								</thead>
								<tbody>
									{orderDetails?.map((item, index) => (
										<tr key={index} className="border-b border-gray-100">
											<td className="py-2 px-2 text-center">{item.nombreProducto}</td>
											<td className="py-2 px-2 text-center">{item.cantidad}</td>
											<td className="py-2 px-2 text-center">$ {item.precio}</td>
											<td className="py-2 px-2 text-center">
												$ {(item.cantidad * item.precio).toFixed(2)}
											</td>
										</tr>
									))}
								</tbody>
							</table>

							<div className="text-right">
								<p className="text-lg font-semibold text-gray-700">
									Total:
									{selectedOrder?.montoTotal
										? formatCurrency(parseFloat(selectedOrder?.montoTotal))
										: "0"}
								</p>
							</div>
						</div>
					</div>
					<button
						className="shadow p-2 mt-2 float-end px-4 py-2 bg-red-600 text-white rounded-lg
         hover:bg-red-700 transition-colors;"
						onClick={() => setModalOpen(false)}
					>
						Cerrar
					</button>
				</div>
			</Modal>
		</div>
	);
};

export default PedidosView;
