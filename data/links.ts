export interface LinkItem {
	href: string;
	label: string;
	icon: string;
}

export const links: LinkItem[] = [
	{ href: "/dashboard", label: "Home", icon: "dashboard-icon" },
	{
		href: "/dashboard/solicitudes",
		label: "Solicitudes",
		icon: "solicitudes-icon",
	},
	{ href: "/dashboard/pqrs", label: "PQRS", icon: "pqr-icon" },
	{ href: "/dashboard/productos", label: "Productos", icon: "pqr-icon" },
	{ href: "/dashboard/pedidos", label: "Pedidos", icon: "pqr-icon" },
	{
		href: "/dashboard/vendedores",
		label: "Vendedores",
		icon: "vendedores-icon",
	},
];
