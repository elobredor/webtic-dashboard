import Link from "next/link";

interface SimpleLinkProps {
	href: string;
	label: string;
	icon?: React.ComponentType;
	isActive: boolean;
}

const SimpleLink: React.FC<SimpleLinkProps> = ({
	href,
	label,
	icon: Icon,
	isActive,
}) => {
	return (
		<Link
			href={href}
			className={`flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${
				isActive
					? "bg-gray-700 text-primary border-l-4 border-primary font-bold"
					: "hover:bg-gray-700 hover:text-primary"
			}`}
		>
			{Icon && <Icon className="w-5 h-5" />}
			<span>{label}</span>
		</Link>
	);
};

export default SimpleLink;
