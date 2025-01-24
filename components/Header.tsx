"use client";
import { useAuth } from "@/context/AuthContext";

const Header = () => {
	const { user } = useAuth(); // Obtén la información del usuario desde el contexto

	return (
		<header className="w-full bg-gray-800 text-white p-4 flex items-center justify-between shadow-md">
			<div className="text-xl font-bold">
				<h1>Portal administrador</h1>
				<h4>[LOGO EMPRESA]</h4>
			</div>
			<div className="flex items-center space-x-2">
				<div className="flex items-center space-x-2">
					<div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center text-sm font-semibold">
						{user?.name ? user.name[0].toUpperCase() : "U"}
					</div>
					<div>
						<p className="text-sm font-medium">{user?.name || "Usuario"}</p>
						<p className="text-xs text-gray-400">{user?.email || "Sin correo"}</p>
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
