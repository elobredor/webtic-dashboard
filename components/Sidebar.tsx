"use client";
import Link from "next/link";
import { links } from "@/data/links";
import {
	LogOut,
	Home,
	FileText,
	HelpCircle,
	UserCheck,
	ShoppingCart,
	Package,
	Archive,
	Store,
	Users,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { usePathname } from "next/navigation"; // Reemplazamos useRouter por usePathname

// Icon mapping object
const iconMap = {
	Dashboard: Home,
	Solicitudes: UserCheck,
	PQRS: Archive,
	Vendedores: Users,
	Productos: ShoppingCart,
	Pedidos: Package,
};

const Sidebar = () => {
	const { logout } = useAuth();
	const pathname = usePathname(); // Obtener la ruta activa directamente

	return (
		<aside className="w-64 bg-gray-800 text-white h-full flex flex-col justify-between">
			<nav className="p-2">
				<ul className="space-y-2">
					{links.map((link) => {
						const Icon = iconMap[link.label];
						const isActive = pathname === link.href; // Comprobar si el link es activo

						return (
							<li key={link.href}>
								<Link
									href={link.href}
									className={`flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${
										isActive
											? "bg-gray-700 text-primary border-l-4 border-primary font-bold" // Estilo para el activo
											: "hover:bg-gray-700 hover:text-primary"
									}`}
								>
									{Icon && <Icon className="w-5 h-5" />}
									<span>{link.label}</span>
								</Link>
							</li>
						);
					})}
				</ul>
			</nav>

			<div className="p-6 border-t border-gray-700">
				<button
					onClick={logout}
					className="flex items-center space-x-3 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 transition-colors w-full"
				>
					<LogOut className="w-5 h-5" />
					<span>Cerrar sesión</span>
				</button>
			</div>
		</aside>
	);
};

export default Sidebar;
