import React from "react";

interface DataTableFooterProps {
	pageSize: number;
	currentPage: number;
	totalPages: number;
	totalRecords: number;

	onPageChange: (page: number) => void;
}

const DataTableFooter: React.FC<DataTableFooterProps> = ({
	pageSize,
	currentPage,
	totalPages,
	totalRecords,

	onPageChange,
}) => {
	return (
		<div className="flex justify-between items-center p-4 border-t border-gray-100 dark:border-gray-700">
			{totalPages > 0 && (
				<div className="flex flex-col gap-4">
					<div className="text-sm text-gray-600 dark:text-gray-300">
						Mostrando {pageSize <= 10 ? totalRecords : pageSize} registros de{" "}
						{totalRecords} en total
					</div>
					<div className="flex gap-2">
						<button
							className="px-4 py-2 border rounded disabled:opacity-50"
							disabled={currentPage === 1}
							onClick={() => onPageChange(currentPage - 1)}
						>
							{"<"}
						</button>
						<span className="px-4 py-2">
							Página {currentPage} de {totalPages}
						</span>
						<button
							className="px-4 py-2 border rounded disabled:opacity-50"
							disabled={currentPage === totalPages}
							onClick={() => onPageChange(currentPage + 1)}
						>
							{">"}
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default DataTableFooter;
