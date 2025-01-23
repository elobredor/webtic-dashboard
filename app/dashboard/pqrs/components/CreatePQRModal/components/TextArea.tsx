interface TextAreaProps {
	label: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextArea: React.FC<TextAreaProps> = ({ label, value, onChange }) => (
	<div className="mb-4">
		<label className="block text-sm font-medium text-gray-700">{label}</label>
		<textarea
			value={value}
			onChange={onChange}
			className="mt-1 block w-full text-black bg-gray-100 p-2 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
		/>
	</div>
);

export default TextArea;
