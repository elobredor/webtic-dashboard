export interface Users {
	name: string;
	documento: string | null;
	telefono: string | null;
	id: number;
	email: string;
	tipoDocumento: string | null;
	fechaNacimiento: Date | null;
	rol: number;
}
