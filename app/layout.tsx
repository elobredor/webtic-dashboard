import { AuthProvider } from "@/context/AuthContext";
import "./globals.css";
import { RoutesProvider } from "@/context/routesContext";

export const metadata = {
	title: "Admin panel",
	description: "Admin panel mercabaq",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="es">
			<body>
				<AuthProvider>
					<RoutesProvider>{children}</RoutesProvider>
				</AuthProvider>
			</body>
		</html>
	);
}
