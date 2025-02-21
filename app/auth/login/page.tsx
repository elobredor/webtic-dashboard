"use client";

import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { useState } from "react";

export const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	const { login } = useAuth();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		setError("");
		setLoading(true);

		try {
			const result = login(email, password);
			// guardar este resultado en cache y guardarlo en el context
			console.log("esto responde el asunto", result);

			router.push("/dashboard");
		} catch (err: any) {
			setError(err || "Error al conectar con el servidor");
			console.log("error en login", err);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="min-h-screen min-w-screen bg-secondary  flex items-center justify-center">
			<div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md z-10">
				<div className="flex items-center justify-center mb-8">
					<Image
						src={"/logo.png"}
						alt="Company Logo"
						className={`sidebar-logo transition-all duration-100 object-contain`}
						width={300}
						height={300}
					/>
				</div>

				{error && (
					<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
						{error}
					</div>
				)}
				<form onSubmit={handleSubmit} className="space-y-6">
					<div>
						<label className="block text-gray-700 text-sm font-bold mb-2">
							Correo
						</label>
						<input
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
							required
							disabled={loading}
						/>
					</div>
					<div>
						<label className="block text-gray-700 text-sm font-bold mb-2">
							Contraseña
						</label>
						<input
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
							required
							disabled={loading}
						/>
					</div>
					<button
						type="submit"
						className="w-full bg-primary text-white py-3 px-4 rounded-lg transition duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
						disabled={loading}
					>
						{loading ? (
							<svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
								<circle
									className="opacity-25"
									cx="12"
									cy="12"
									r="10"
									stroke="currentColor"
									strokeWidth="4"
								/>
								<path
									className="opacity-75"
									fill="currentColor"
									d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
								/>
							</svg>
						) : null}
						{loading ? "Iniciando sesión..." : "Ingresar"}
					</button>
				</form>
				<h2></h2>
			</div>
		</div>
	);
};

export default Login;
