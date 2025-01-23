import { detectFieldFormat } from "./filedsFormats";

export function generateDynamicColumns(fields: string[]): any[] {
	return fields.map((field) => {
		const fieldConfig = detectFieldFormat(field);

		return {
			key: field,
			title: field.charAt(0).toUpperCase() + field.slice(1),
			sortable: fieldConfig.sortable ?? false,
			render: fieldConfig.render,
		};
	});
}
