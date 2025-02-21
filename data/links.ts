export interface LinkItem {
	href: string;
	label: string;
	subLinks?: LinkItem[];
}

export const links: LinkItem[] = [
	{ href: "/dashboard", label: "Dashboard" },
	{ href: "/dashboard/solicitudes", label: "Solicitudes" },
	{ href: "/dashboard/pedidos", label: "Pedidos" },
	{ href: "/dashboard/productos", label: "Productos" },
	{ href: "/dashboard/pqrs", label: "PQRS" },
	{
		href: "/dashboard/clientes",
		label: "Usuarios",
		subLinks: [
			{ href: "/dashboard/clientes", label: "Clientes" },
			{ href: "/dashboard/vendedores", label: "Vendedores" },
		],
	},
];
