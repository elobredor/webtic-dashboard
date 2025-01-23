export interface LinkItem {
	href: string;
	label: string;
}

export const links: LinkItem[] = [
	{ href: "/dashboard", label: "Dashboard" },
	{ href: "/dashboard/request", label: "Solicitudes" },
	// { href: "/dashboard/config", label: "Config" },
	// { href: "/auth/login", label: "Login" },
];
