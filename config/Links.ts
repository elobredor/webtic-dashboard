import { Home, UserCheck, Users, Copy, File } from "lucide-react";

export interface LinkItem {
	href: string;
	label: string;
	subLinks?: LinkItem[];
	icon?: React.ComponentType;
}
// Si quiere personalizar el icono escribe aquí el Label como clave y el ícono como valor.
// fuente: https://lucide.dev/icons/
const iconMap: Partial<Record<string, React.ComponentType>> = {
	Vendedores: Users,
	Solicitudes: UserCheck,
	Múltiple: Copy,
	Dashboard: Home,
};

const assignIcons = (
	links: LinkItem[],
	options: { defaultIcon?: React.ComponentType; subLabelPrefix?: string } = {}
): LinkItem[] => {
	const { defaultIcon = File, subLabelPrefix = "•" } = options;

	return links.map((link) => ({
		...link,
		icon: link.icon || iconMap[link.label] || defaultIcon,
		label: link.subLinks ? link.label : link.label,
		subLinks: link.subLinks
			? assignIcons(
					link.subLinks.map((subLink) => ({
						...subLink,
						label: `${subLabelPrefix} ${subLink.label}`,
					})),
					options
			  )
			: undefined,
	}));
};

// Lista principal de links
export const links: LinkItem[] = assignIcons(
	[
		{ href: "/dashboard", label: "Dashboard" },
		{ href: "/dashboard/solicitudes", label: "Solicitudes" },
		{ href: "/dashboard/vendedores", label: "Vendedores" },
		{
			href: "/dashboard/menu",
			label: "Múltiple",
			subLinks: [
				{ href: "/dashboard/menu/example1", label: "Ejemplo1" },
				{ href: "/dashboard/menu/example2", label: "Ejemplo2" },
				{ href: "/dashboard/menu/example3", label: "Ejemplo3" },
			],
		},
	],
	{
		defaultIcon: File, // Ícono por defecto
		subLabelPrefix: "•", // Prefijo para subitems
	}
);
