
import Image from "next/image";

export const columns = [
  { key: "id", title: "ID", sortable: true },
  {
		key: "image",
		title: "Imagen",
		sortable: false,
		render: (value: string) => (
			<Image
				src={value}
				alt="Producto"
				width={64}
				height={64}
				className="object-cover rounded-lg"
			/>
		),
	},
  { key: "title", title: "título", sortable: true },
  


];




