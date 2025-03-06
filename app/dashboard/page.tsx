"use client";
import { useEffect, useState } from "react";
import { Users,DollarSign, Store } from "lucide-react";

const Dashboard = () => {
	const [activeUsers, setActiveUsers] = useState(0);
	const [pendingOrders, setPendingOrders] = useState(0);
	const [monthlyIncome, setMonthlyIncome] = useState(0);
	const [loading, setLoading] = useState(false);


	useEffect(() => {
		const loadDashboardData = async () => {
			try {
				setLoading(true);
			} catch (error) {
				console.error("Error cargando datos del dashboard:", error);
			} finally {
				setLoading(false);
			}
		};

		loadDashboardData();
	}, []);

	return (
		<div className="space-y-6">
			<h1 className="text-2xl font-bold text-gray-900 dark:text-white">
				Dashboard
			</h1>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				<div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
					<div className="flex items-center gap-4">
						<div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
							<Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
						</div>
						<div>
							<p className="text-sm font-medium text-gray-600 dark:text-gray-400">
								Usuarios Activos
							</p>
							<p className="text-2xl font-bold text-gray-900 dark:text-white">
								{loading ? "Cargando..." : activeUsers}
							</p>
						</div>
					</div>
				</div>

				<div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
					<div className="flex items-center gap-4">
						<div className="p-3 bg-orange-50 dark:bg-orange-900/30 rounded-lg">
							<Store className="w-6 h-6 text-orange-600 dark:text-orange-400" />
						</div>
						<div>
							<p className="text-sm font-medium text-gray-600 dark:text-gray-400">
								Solicitudes pendientes
							</p>
							<p className="text-2xl font-bold text-gray-900 dark:text-white">
								{loading ? "Cargando..." : pendingOrders}
							</p>
						</div>
					</div>
				</div>

				<div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
					<div className="flex items-center gap-4">
						<div className="p-3 bg-green-50 dark:bg-green-900/30 rounded-lg">
							<DollarSign className="w-6 h-6 text-green-600 dark:text-green-400" />
						</div>
						<div>
							<p className="text-sm font-medium text-gray-600 dark:text-gray-400">
								Ingresos del Mes
							</p>
							<p className="text-2xl font-bold text-gray-900 dark:text-white">
								{loading ? "Cargando..." : `$${monthlyIncome.toLocaleString()}`}
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
