import { useState, useEffect } from "react";

const useFetchData = (fetchFn: Function, type: string) => {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	useEffect(() => {
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

	return { data, loading };
};

export default useFetchData;
