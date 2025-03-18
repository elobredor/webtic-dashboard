"use client";
import { useState, useEffect, useRef } from "react";
import { DataTableBody, DataTableHeader, DataTableFooter } from "./components";
import { Column } from "@/data/Column";

interface DataTableProps {
	columns: Column[];
	tableId: string;
	fetchFunction: (
		page: number,
		pageSize: number,
		searchTerm: string
	) => Promise<{
		data: any[];
		total: number;
	}>;
	onAdd?: () => void;
	renderActions?: (item: any) => React.ReactNode;
	initialPageSize?: number;
}

const DataTable: React.FC<DataTableProps> = ({
	columns,
	tableId,
	fetchFunction,
	onAdd,
	renderActions,
	initialPageSize = 10,
}) => {
	// Estado para manejar datos y paginación
	const [data, setData] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);
	const [currentPage, setCurrentPage] = useState(1);
	const [pageSize, setPageSize] = useState(initialPageSize);
	const [totalRecords, setTotalRecords] = useState(0);
	const [searchTerm, setSearchTerm] = useState("");
	const searchTimeout = useRef<NodeJS.Timeout | null>(null);

	// Estado para manejo de columnas visibles
	const [visibleColumns, setVisibleColumns] = useState<Set<string>>(() => {
		if (typeof window !== "undefined") {
			const savedColumns = localStorage.getItem(`${tableId}-visible-columns`);
			return savedColumns
				? new Set(JSON.parse(savedColumns))
				: new Set(columns.map((col) => col.key));
		}
		return new Set(columns.map((col) => col.key));
	});

	const [showColumnSelector, setShowColumnSelector] = useState(false);
	const columnSelectorRef = useRef<HTMLDivElement>(null);

	// Cargar datos usando la función proporcionada
	const fetchData = async (
		page = currentPage,
		size = pageSize,
		search = searchTerm
	) => {
		setLoading(true);
		try {
			const result = await fetchFunction(page, size, search);
			setData(result.data || []);
			setTotalRecords(result.total || 0);
		} catch (error) {
			console.error(`Error fetching data for table ${tableId}:`, error);
		} finally {
			setLoading(false);
		}
	};

	// Efecto para cargar datos al iniciar o cambiar parámetros
	useEffect(() => {
		fetchData();
	}, [currentPage, pageSize]);

	// Guardar columnas visibles en localStorage
	useEffect(() => {
		if (typeof window !== "undefined") {
			localStorage.setItem(
				`${tableId}-visible-columns`,
				JSON.stringify(Array.from(visibleColumns))
			);
		}
	}, [visibleColumns, tableId]);

	// Cerrar selector de columnas al hacer clic fuera
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				columnSelectorRef.current &&
				!columnSelectorRef.current.contains(event.target as Node)
			) {
				setShowColumnSelector(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	// Handlers para acciones de la tabla
	const handlePageChange = (page: number) => {
		setCurrentPage(page);
	};

	const handlePageSizeChange = (size: number) => {
		setPageSize(size);
		setCurrentPage(1);
	};

	const handleRefresh = () => {
		fetchData(currentPage, pageSize, searchTerm);
	};

	const handleSearch = (term: string) => {
		setSearchTerm(term);

		if (searchTimeout.current) {
			clearTimeout(searchTimeout.current);
		}

		searchTimeout.current = setTimeout(() => {
			setCurrentPage(1); // Volver a la primera página al buscar
			fetchData(1, pageSize, term);
		}, 500);
	};

	// Calcular valores para la paginación
	const totalPages = Math.ceil(totalRecords / pageSize);
	const startIndex = (currentPage - 1) * pageSize;
	const endIndex = Math.min(startIndex + pageSize, totalRecords);

	// Filtrar columnas visibles
	const visibleColumnsList = columns.filter((col) =>
		visibleColumns.has(col.key)
	);

	// Función para cambiar visibilidad de columnas
	const toggleColumnVisibility = (key: string) => {
		setVisibleColumns((prev) => {
			const next = new Set(prev);
			if (next.has(key)) {
				if (next.size > 1) {
					next.delete(key);
				}
			} else {
				next.add(key);
			}
			return next;
		});
	};

	return (
		<div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
			<DataTableHeader
				setShowColumnSelector={setShowColumnSelector}
				columnSelectorRef={columnSelectorRef}
				showColumnSelector={showColumnSelector}
				columns={columns}
				visibleColumns={visibleColumns}
				toggleColumnVisibility={toggleColumnVisibility}
				onAdd={onAdd}
				onRefresh={handleRefresh}
				searchTerm={searchTerm}
				onSearch={handleSearch}
			/>

			<div className="overflow-x-auto">
				<table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
					<thead className="bg-gray-50 dark:bg-gray-700">
						<tr>
							{visibleColumnsList.map((column) => (
								<th
									key={column.key}
									className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
								>
									{column.title}
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						<DataTableBody
							paginatedData={data}
							visibleColumnsList={visibleColumnsList}
							loading={loading}
							tableId={tableId}
							renderActions={renderActions}
						/>
					</tbody>
				</table>
			</div>

			<DataTableFooter
				pageSize={pageSize}
				currentPage={currentPage}
				totalPages={totalPages}
				totalRecords={totalRecords}
				startIndex={startIndex}
				endIndex={endIndex}
				onPageSizeChange={handlePageSizeChange}
				onPageChange={handlePageChange}
			/>
		</div>
	);
};

export default DataTable;
