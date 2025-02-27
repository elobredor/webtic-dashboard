import { useState, useEffect, useCallback } from "react";

const useFetchData = (fetchFn: Function, type: string) => {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [refetchIndex, setRefetchIndex] = useState(0);

	const refetch = useCallback(() => {
		setRefetchIndex(prevIndex => prevIndex + 1);
	}, []);

	useEffect(() => {
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
	}, [fetchFn, type, refetchIndex]);

	return { data, loading, refetch };
};

export default useFetchData;
