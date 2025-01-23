type Column = {
	key: string;
	title: string;
	sortable: boolean;
	render?: (value: any) => JSX.Element;
};

type ColumnConfig<T> = Partial<{
	title: string;
	sortable: boolean;
	render: (value: T[keyof T]) => JSX.Element;
}>;

const useTableColumns = <T extends Record<string, any>>(
	model: T,
	columnConfig: Partial<Record<keyof T, ColumnConfig<T>>> = {}
): Column[] => {
	return Object.keys(model).map((key) => {
		const config = columnConfig[key as keyof T] || {};
		const type = typeof model[key as keyof T];

		// Definir un render predeterminado para tipos específicos
		let render;
		if (type === "boolean") {
			render = (value: boolean) => (
				<input
					type="checkbox"
					checked={value}
					readOnly
					className="cursor-pointer"
				/>
			);
		} else if (
			type === "string" &&
			(key as string).toLowerCase().includes("fecha")
		) {
			render = (value: string) => (
				<span>{new Date(value).toLocaleDateString()}</span>
			);
		}

		return {
			key,
			title: config.title || key.charAt(0).toUpperCase() + key.slice(1), // Por defecto, capitalizamos el nombre del campo
			sortable: config.sortable ?? true, // Por defecto, todas las columnas son ordenables
			render: config.render || render, // Configuración personalizada tiene prioridad
		};
	});
};

export default useTableColumns;
