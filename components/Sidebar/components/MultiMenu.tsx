import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { LinkItem } from "@/config/Links";

interface MultiMenuProps {
	label: string;
	icon?: React.ComponentType;
	subLinks: LinkItem[];
	isActive?: boolean;
}

const MultiMenu: React.FC<MultiMenuProps> = ({
	label,
	icon: Icon,
	subLinks,
	isActive,
}) => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div>
			{/* Encabezado del submenú */}
			<div
				className={`flex items-center justify-between px-4 py-2 rounded-lg cursor-pointer transition-colors ${
					isActive ? "bg-gray-700 text-primary font-bold" : "hover:bg-gray-700"
				}`}
				onClick={() => setIsOpen(!isOpen)}
			>
				<div className="flex items-center space-x-3">
					{Icon && <Icon className="w-5 h-5" />}
					<span>{label}</span>
				</div>
				{isOpen ? (
					<ChevronUp className="w-4 h-4" />
				) : (
					<ChevronDown className="w-4 h-4" />
				)}
			</div>

			{/* Lista de subenlaces */}
			{isOpen && (
				<ul className="space-y-2 ml-8 mt-2">
					{subLinks.map(({ href, label: subLabel }) => (
						<li key={href}>
							<Link
								href={href}
								className="block px-4 py-2 rounded-lg transition-colors hover:bg-gray-700 hover:text-primary"
							>
								{subLabel}
							</Link>
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default MultiMenu;
