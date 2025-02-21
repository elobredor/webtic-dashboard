"use client";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";

const Header = () => {
	const { user } = useAuth(); // Obtén la información del usuario desde el contexto

	return (
		<header className="w-full bg-gray-800 text-white p-4 flex items-center justify-between shadow-md">
			<div className="text-xl font-bold">
				<h4 className="font-volkswagen">Portal administrativo</h4>

				<Image
					src={"/logoblanco.png"}
					alt="Company Logo"
					className={`sidebar-logo transition-all duration-300 object-contain`}
					width={250}
					height={250}
				/>
			</div>
			<div className="flex items-center space-x-2">
				<div className="flex items-center space-x-2">
					{user?.avatar ? (
						<Image
							src={user.avatar}
							alt="Avatar de usuario"
							className="w-10 h-10 rounded-full"
						/>
					) : (
						<div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center text-sm font-semibold">
							{user?.name ? user.name[0].toUpperCase() : "U"}
						</div>
					)}
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
