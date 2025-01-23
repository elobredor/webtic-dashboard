import { useState } from "react";

interface SelectSearchProps {
	label: string;
	options: string[];
	value: string;
	onChange: (value: string) => void;
	onSearch?: (query: string) => void;
	disabled?: boolean;
	placeholder?: string;
}

const SelectSearch: React.FC<SelectSearchProps> = ({
	label,
	options,
	value,
	onChange,
	onSearch,
	disabled,
	placeholder = "Buscar",
}) => {
	const [search, setSearch] = useState("");

	// Filtrar las opciones en base al texto ingresado
	const filteredOptions = options.filter((opt) =>
		opt.toLowerCase().includes(search.toLowerCase())
	);

	return (
		<div className="mb-4">
			<label className="block text-sm font-medium text-gray-700">{label}</label>
			{/* Input de texto para buscar */}
			<input
				type="text"
				value={search}
				onChange={(e) => {
					const query = e.target.value;
					setSearch(query);
					onSearch?.(query); // Llamada opcional a una API o función externa
				}}
				className="block w-full text-black bg-gray-100 p-2 rounded-md shadow-sm"
				placeholder={placeholder}
				disabled={disabled}
			/>
			{/* Mostrar el select solo si hay resultados y se ingresó texto */}
			{search && filteredOptions.length > 0 && (
				<select
					value={value}
					onChange={(e) => onChange(e.target.value)}
					className="mt-2 block w-full text-black bg-gray-100 p-2 rounded-md shadow-sm"
				>
					{filteredOptions.map((opt, idx) => (
						<option key={idx} value={opt}>
							{opt}
						</option>
					))}
				</select>
			)}
			{/* Mostrar mensaje si no hay resultados */}
			{search && filteredOptions.length === 0 && (
				<p className="mt-2 text-sm text-gray-500">No se encontraron resultados.</p>
			)}
		</div>
	);
};

export default SelectSearch;
