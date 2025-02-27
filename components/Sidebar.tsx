"use client";
import Link from "next/link";
import {
	Home,
	UserCheck,
	ShoppingCart,
	Package,
	Archive,
	Users,
	ChevronDown,
	ChevronUp,
	LogOut,
	Copy,
	User,
	Cog,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { links } from "@/data/links";

// Icon mapping object
const iconMap = {
	Dashboard: Home,
	Solicitudes: UserCheck,
	PQRS: Archive,
	Usuarios: Users,
	Productos: ShoppingCart,
	Pedidos: Package,
	Clientes: User,
	INCISOS: Copy,
	Parámetros: Cog,	
};

const Sidebar = () => {
	const { logout } = useAuth();
	const pathname = usePathname();
	const [openSubmenus, setOpenSubmenus] = useState<Record<string, boolean>>({}); // Estado para múltiples submenús

	const toggleSubmenu = (label: string) => {
		setOpenSubmenus((prev) => ({ ...prev, [label]: !prev[label] }));
	};

	return (
		<aside className="w-64 bg-gray-800 text-white h-full flex flex-col justify-between">
			<nav className="p-2">
				<ul className="space-y-2">
					{links.map((link) => {
						const Icon = iconMap[link.label];
						const isActive = pathname === link.href;
						const isSubmenuOpen = openSubmenus[link.label] || false;

						return (
							<li key={link.href}>
								{link.subLinks ? (
									// Renderizar enlace con submenú
									<div>
										<div
											className="flex items-center justify-between px-4 py-2 rounded-lg cursor-pointer transition-colors hover:bg-gray-700"
											onClick={() => toggleSubmenu(link.label)}
										>
											<div className="flex items-center space-x-3">
												{Icon && <Icon className="w-5 h-5" />}
												<span>{link.label}</span>
											</div>
											{isSubmenuOpen ? (
												<ChevronUp className="w-4 h-4" />
											) : (
												<ChevronDown className="w-4 h-4" />
											)}
										</div>
										{/* Submenú */}
										{isSubmenuOpen && (
											<ul className="space-y-2 ml-8 mt-2">
												{link.subLinks.map((subLink) => {
													const isSubActive = pathname === subLink.href;
													return (
														<li key={subLink.href}>
															<Link
																href={subLink.href}
																className={`block px-4 py-2 rounded-lg transition-colors ${
																	isSubActive
																		? "bg-gray-700 text-primary font-bold"
																		: "hover:bg-gray-700 hover:text-primary"
																}`}
															>
																{subLink.label}
															</Link>
														</li>
													);
												})}
											</ul>
										)}
									</div>
								) : (
									// Renderizar enlace simple
									<Link
										href={link.href}
										className={`flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${
											isActive
												? "bg-gray-700 text-primary border-l-4 border-primary font-bold"
												: "hover:bg-gray-700 hover:text-primary"
										}`}
									>
										{Icon && <Icon className="w-5 h-5" />}
										<span>{link.label}</span>
									</Link>
								)}
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
