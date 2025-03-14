interface InputFieldProps {
	label: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	placeholder?: string; // Hacemos que el placeholder sea opcional
	disabled?: boolean; // Agregamos la propiedad disabled
}

const InputField: React.FC<InputFieldProps> = ({ 
	label, 
	value, 
	onChange, 
	placeholder = "Ingrese un valor", 
	disabled = false // Valor predeterminado de disabled
}) => (
	<div className="mb-4">
		<label className="block text-sm font-medium text-gray-700">{label}</label>
		<input
			type="text"
			value={value}
			onChange={onChange}
			placeholder={placeholder} // Usamos el placeholder
			disabled={disabled} // Usamos la propiedad disabled
			className="mt-1 block w-full text-black bg-gray-100 p-2 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
		/>
	</div>
);

export default InputField;
