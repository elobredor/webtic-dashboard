// Define la interfaz para ColumnConfig
export interface ColumnConfig {
	key: string; // Clave del campo de datos
	title: string; // Título que se muestra en la cabecera
	sortable?: boolean; // Si la columna puede ordenarse
	render?: (value: any, record?: any) => JSX.Element; // Renderizado personalizado para la celda
}

export const estadoColors: Record<string, string> = {
	NUEVO: "bg-yellow-100 text-yellow-800",
	PENDIENTE: "bg-yellow-100 text-yellow-800",
	ENPROCESO: "bg-blue-100 text-blue-800",
	TRANSITO: "bg-purple-100 text-purple-800",
	ENVIADO: "bg-indigo-100 text-indigo-800",
	ENTREGADO: "bg-green-100 text-green-800",
	ACEPTADO: "bg-green-100 text-green-800",
	CANCELADO: "bg-red-100 text-red-800",
	RECHAZADA: "bg-red-100 text-red-800",
};
