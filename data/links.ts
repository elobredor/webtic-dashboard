export interface LinkItem {
	href: string;
	label: string;
}

export const links: LinkItem[] = [
	{ href: "/dashboard", label: "Dashboard" },
	{ href: "/dashboard/solicitudes", label: "Solicitudes" },
	{ href: "/dashboard/pedidos", label: "Pedidos" },
	{ href: "/dashboard/productos", label: "Productos" },
	{ href: "/dashboard/vendedores", label: "Vendedores" },
	{ href: "/dashboard/pqrs", label: "PQRS" },
];
