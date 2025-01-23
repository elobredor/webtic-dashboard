import { AuthProvider } from "@/context/AuthContext";
import "./globals.css";
import { RoutesProvider } from "@/context/routesContext";

export const metadata = {
	title: "Next.js App",
	description: "Next.js App with Sidebar and Login",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body>
				<AuthProvider>
					<RoutesProvider>
						<div className="flex h-screen bg-gray-100">
							<div className="flex-1 p-6">{children}</div>
						</div>
					</RoutesProvider>
				</AuthProvider>
			</body>
		</html>
	);
}
