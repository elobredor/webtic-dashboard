export interface LinkItem {
	href: string;
	label: string;
	icon: string; // Añadido para incluir iconos
}

export const links: LinkItem[] = [
	{ href: "/dashboard", label: "Home", icon: "dashboard-icon" },
	{
		href: "/dashboard/solicitudes",
		label: "Solicitudes",
		icon: "solicitudes-icon",
	},
	// { href: "/dashboard/config", label: "Config", icon: "config-icon" },
	{ href: "/dashboard/pqrs", label: "PQR", icon: "pqr-icon" },
	{
		href: "/dashboard/vendedores",
		label: "Vendedores",
		icon: "vendedores-icon",
	},
];
