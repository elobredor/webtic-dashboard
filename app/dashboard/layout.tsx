import Sidebar from "@/components/Sidebar";

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="es">
			<body>
				<div className="flex h-screen">
					{/* Sidebar */}
					<Sidebar />
					{/* Main Content */}
					<div className="flex-1 p-6">{children}</div>
				</div>
			</body>
		</html>
	);
}
