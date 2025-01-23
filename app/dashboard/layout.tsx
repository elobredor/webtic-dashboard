import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="es">
			<body className="h-screen w-screen">
				<div className="flex flex-col h-full">
					{/* Header */}
					<Header />
					<div className="flex flex-1">
						{/* Sidebar */}
						<Sidebar />
						{/* Main Content */}
						<div className="flex-1 p-6 overflow-y-auto bg-gray-100">{children}</div>
					</div>
				</div>
			</body>
		</html>
	);
}
