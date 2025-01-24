export interface LinkItem {
	href: string;
	label: string;
	subLinks?: LinkItem[];
}

export const links: LinkItem[] = [
	{ href: "/dashboard", label: "Dashboard" },
	{ href: "/dashboard/solicitudes", label: "Solicitudes" },
	{ href: "/dashboard/vendedores", label: "Vendedores" },
	{
		href: "/dashboard/menu",
		label: "INCISOS",
		subLinks: [
			{ href: "/dashboard/menu/example1", label: "Ejemplo1" },
			{ href: "/dashboard/menu/example2", label: "Ejemplo2" },
			{ href: "/dashboard/menu/example3", label: "Ejemplo3" },
		],
	},
];
