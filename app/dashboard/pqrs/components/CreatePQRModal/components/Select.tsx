interface SelectProps {
	label: string;
	options: string[];
	value: string;
	onChange: (value: string) => void;
	disabled?: boolean;
}

const Select: React.FC<SelectProps> = ({
	label,
	options,
	value,
	onChange,
	disabled,
}) => {
	return (
		<div className="mb-4">
			<label className="block text-sm font-medium text-gray-700">{label}</label>

			<select
				value={value}
				onChange={(e) => onChange(e.target.value)}
				disabled={disabled}
				className="block w-full text-black bg-gray-100 p-2 rounded-md shadow-sm"
			>
				{options.map((opt, idx) => (
					<option key={idx} value={opt}>
						{opt}
					</option>
				))}
			</select>
		</div>
	);
};

export default Select;
