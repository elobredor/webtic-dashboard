import { useState, useEffect } from "react";

import { generateDynamicColumns } from "@/utils/columnGenerator";
import { getInterface } from "@/data";

const useFetchData = (fetchFn: Function, type: string) => {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [columns, setColumns] = useState([]);

	useEffect(() => {
		// Recuperar la interfaz según el tipo proporcionado
		// const interfaceDef = getInterface(type);

		// if (!interfaceDef) {
		// 	console.error(`No se encontró la interfaz para el tipo: ${type}`);
		// 	setLoading(false);
		// 	return;
		// }

		// // Generar las columnas dinámicamente
		// const dynamicColumns = generateDynamicColumns(Object.keys(interfaceDef));
		// setColumns(dynamicColumns);

		// Llamar a la función de fetch
		const fetchData = async () => {
			try {
				setLoading(true);
				const result = await fetchFn();

				setData(result);
			} catch (error) {
				console.error("Error fetching data:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [fetchFn, type]);

	return { data, loading, columns };
};

export default useFetchData;
