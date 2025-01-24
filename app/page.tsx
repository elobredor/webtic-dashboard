import React from "react";
import { ArrowRight, Layout, Settings, FileCode, Database } from "lucide-react";

function App() {
	return (
		<div className="min-h-screen bg-[#142334]">
			{/* Hero Section */}
			<div className="relative min-h-screen">
				<div className="absolute inset-0 bg-gradient-to-b from-[#142334] to-black/90 z-0" />

				{/* Header */}
				<header className="relative z-10">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
						<div className="flex items-center justify-between">
							<div className="flex items-center">
								<img
									src="https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?auto=format&fit=crop&w=48&h=48&q=80"
									alt="Webtic Logo"
									className="h-14 w-14 rounded-lg"
								/>
								<h1 className="ml-3 text-2xl font-bold text-white">Webtic</h1>
							</div>
						</div>
					</div>
				</header>

				{/* Main Hero Content */}
				<main className="relative z-10">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
						<div className="text-center">
							<h2 className="text-5xl font-bold text-white sm:text-6xl md:text-7xl lg:text-8xl">
								Bienvenido al <span className="text-[#419F3B]">dashboard</span>{" "}
								reutilizable de Webtic
							</h2>
							<p className="mt-6 max-w-2xl mx-auto text-xl text-gray-300 sm:text-2xl">
								Una solución modular y personalizable para gestionar tus aplicaciones de
								manera eficiente.
							</p>
							<div className="mt-10">
								<a
									href="/dashboard"
									className="inline-flex items-center px-8 py-4 text-lg font-medium text-white bg-[#419F3B] rounded-lg hover:bg-[#419F3B]/90 transition-colors duration-200"
								>
									Ir al Dashboard
									<ArrowRight className="ml-2 h-6 w-6" />
								</a>
							</div>
						</div>

						{/* Features Grid */}
						<div className="mt-32 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
							<div className="relative group bg-white/5 backdrop-blur-sm p-8 rounded-xl border border-white/10 hover:border-[#419F3B]/50 transition-all duration-300">
								<div>
									<span className="rounded-lg inline-flex p-3 bg-[#419F3B]/10 text-[#419F3B]">
										<Layout className="h-7 w-7" />
									</span>
								</div>
								<div className="mt-8">
									<h3 className="text-xl font-semibold text-white">
										Vistas Configurables
									</h3>
									<p className="mt-3 text-gray-400">
										Configura tus vistas y personaliza íconos en /config/Link
									</p>
								</div>
							</div>

							<div className="relative group bg-white/5 backdrop-blur-sm p-8 rounded-xl border border-white/10 hover:border-[#419F3B]/50 transition-all duration-300">
								<div>
									<span className="rounded-lg inline-flex p-3 bg-[#419F3B]/10 text-[#419F3B]">
										<FileCode className="h-7 w-7" />
									</span>
								</div>
								<div className="mt-8">
									<h3 className="text-xl font-semibold text-white">
										App Router Next.js
									</h3>
									<p className="mt-3 text-gray-400">
										Crea tus vistas en /app aprovechando el poder del App Router de
										Next.js
									</p>
								</div>
							</div>

							<div className="relative group bg-white/5 backdrop-blur-sm p-8 rounded-xl border border-white/10 hover:border-[#419F3B]/50 transition-all duration-300">
								<div>
									<span className="rounded-lg inline-flex p-3 bg-[#419F3B]/10 text-[#419F3B]">
										<Settings className="h-7 w-7" />
									</span>
								</div>
								<div className="mt-8">
									<h3 className="text-xl font-semibold text-white">
										Configuración Flexible
									</h3>
									<p className="mt-3 text-gray-400">
										Configura tu API_URL en .env o directamente en /config/api.config.ts
									</p>
								</div>
							</div>
						</div>

						{/* Webtic UI Section */}
						<div className="mt-32 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-12">
							<div className="text-center">
								<Database className="h-16 w-16 mx-auto text-[#419F3B]" />
								<h3 className="mt-6 text-3xl font-bold text-white">Webtic UI</h3>
								<p className="mt-4 max-w-2xl mx-auto text-xl text-gray-300">
									Aprovecha nuestra biblioteca de componentes empresariales Webtic UI
									para construir interfaces consistentes y profesionales.
								</p>
							</div>
						</div>
					</div>
				</main>

				{/* Footer */}
				<footer className="relative z-10 mt-24 border-t border-white/10">
					<div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
						<p className="text-center text-gray-400">
							&copy; {new Date().getFullYear()} Webtic. Todos los derechos reservados.
						</p>
					</div>
				</footer>
			</div>
		</div>
	);
}

export default App;
