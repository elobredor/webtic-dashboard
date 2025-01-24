"use client";

import { LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { usePathname } from "next/navigation";
import { links } from "@/config/Links";
import MultiMenu from "./components/MultiMenu";
import SimpleLink from "./components/SimpleLink";

const Sidebar = () => {
	const { logout } = useAuth();
	const pathname = usePathname();

	return (
		<aside className="w-64 bg-gray-800 text-white h-full flex flex-col justify-between">
			{/* Navegación principal */}
			<nav className="p-2">
				<ul className="space-y-2">
					{/* Renderizar los enlaces dinámicamente */}
					{links.map(({ href, label, subLinks, icon: Icon }) => {
						const isActive = pathname === href;

						return (
							<li key={href}>
								{subLinks ? (
									<MultiMenu
										label={label}
										icon={Icon}
										subLinks={subLinks}
										isActive={isActive}
									/>
								) : (
									<SimpleLink
										href={href}
										label={label}
										icon={Icon}
										isActive={isActive}
									/>
								)}
							</li>
						);
					})}
				</ul>
			</nav>

			{/* Botón de cerrar sesión */}
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
