type TipoPersona = 1 | 2; // 1: Natural, 2: Jurídica
type TipoDocumento = 1 | 2; // 1: CC, 2: NIT

export const columns = [
	{
		key: "id",
		title: "ID",
		sortable: true,
		editable: false,
	},
	{
		key: "nombreRazonSocial",
		title: "Razón Social",
		sortable: true,
		type: "text",
	},
	{
		key: "nombreMostrar",
		title: "Nombre en Plataforma",
		sortable: true,
		type: "text",
	},
	{
		key: "tipoPersona",
		title: "Tipo Persona",
		sortable: true,
		type: "select",
		options: [
			{ label: "Natural", value: 1 },
			{ label: "Jurídica", value: 2 },
		],
		render: (value: TipoPersona) => (
			<span
				className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
					value === 1 ? "bg-blue-100 text-blue-800" : "bg-purple-100 text-purple-800"
				}`}
			>
				{value === 1 ? "Natural" : "Jurídica"}
			</span>
		),
	},
	{
		key: "tipoDocumento",
		title: "Tipo Documento",
		sortable: true,
		type: "select",
		options: [
			{ label: "CC", value: 1 },
			{ label: "NIT", value: 2 },
		],
		render: (value: TipoDocumento) => (
			<span
				className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
					value === 1 ? "bg-gray-100 text-gray-800" : "bg-yellow-100 text-yellow-800"
				}`}
			>
				{value === 1 ? "CC" : "NIT"}
			</span>
		),
	},
	{
		key: "numeroDocumento",
		title: "Número Documento",
		sortable: true,
		type: "text",
	},
	{
		key: "estado",
		title: "Estado",
		sortable: true,
		type: "boolean",
		render: (value: boolean) => (
			<span
				className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
					value ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
				}`}
			>
				{value ? "Activo" : "Inactivo"}
			</span>
		),
	},
	{
		key: "cantPedidos",
		title: "Pedidos",
		sortable: true,
		type: "number",
	},
	{
		key: "rating",
		title: "Calificación",
		sortable: true,
		type: "number",
		render: (value: number) => (
			<span className="flex items-center">
				<span className="text-yellow-400">★</span>
				<span className="ml-1">{value.toFixed(1)}</span>
			</span>
		),
	},
	{
		key: "fileRut",
		title: "RUT",
		sortable: false,
		type: "text",
		render: (value: string) => (
			<span
				className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
					value ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800"
				}`}
			>
				{value ? "Cargado" : "Pendiente"}
			</span>
		),
	},
	{
		key: "fileCedula",
		title: "Documento ID",
		sortable: false,
		type: "text",
		render: (value: string) => (
			<span
				className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
					value ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800"
				}`}
			>
				{value ? "Cargado" : "Pendiente"}
			</span>
		),
	},
	{
		key: "fileCamaraComercio",
		title: "Cámara Comercio",
		sortable: false,
		type: "text",
		render: (value: string) => (
			<span
				className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
					value ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800"
				}`}
			>
				{value ? "Cargado" : "Pendiente"}
			</span>
		),
	},
];
