"use client";

import Link from "next/link";
import { links } from "@/data/links"; // Ajusta la ruta según la ubicación del archivo

import { LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
const Sidebar = () => {
	const { logout } = useAuth();

	return (
		<aside className="w-64 bg-secondary text-white h-full">
			<nav className="p-4">
				<ul>
					{links.map((link) => (
						<li key={link.href} className="mb-2">
							<Link href={link.href}>{link.label}</Link>
						</li>
					))}
				</ul>

				<button onClick={logout} className="flex items-center space-x-2">
					<LogOut className="w-5 h-5" />
					<span>Cerrar sesión</span>
				</button>
			</nav>
		</aside>
	);
};

export default Sidebar;
