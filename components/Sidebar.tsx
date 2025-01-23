"use client";
import Link from "next/link";
import { links } from "@/data/links";
import { LogOut, Home, FileText, HelpCircle, UserCheck } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

// Icon mapping object
const iconMap = {
	"dashboard-icon": Home,
	"solicitudes-icon": FileText,
	"pqr-icon": HelpCircle,
	"vendedores-icon": UserCheck,
};

const Sidebar = () => {
	const { logout } = useAuth();

	return (
		<aside className="w-64 bg-secondary text-white h-full">
			<nav className="p-4">
				<ul>
					{links.map((link) => {
						const Icon = iconMap[link.icon];
						return (
							<li key={link.href} className="mb-2 flex items-center space-x-2">
								{Icon && <Icon className="w-5 h-5" />}
								<Link href={link.href}>{link.label}</Link>
							</li>
						);
					})}
				</ul>

				<button onClick={logout} className="flex items-center space-x-2 mt-4">
					<LogOut className="w-5 h-5" />
					<span>Cerrar sesión</span>
				</button>
			</nav>
		</aside>
	);
};

export default Sidebar;
