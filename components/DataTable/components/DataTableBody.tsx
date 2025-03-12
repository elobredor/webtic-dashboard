import { FC } from "react";
import { Column } from "@/data/Column";

interface DataTableBodyProps {
  visibleColumnsList: Column[];
  paginatedData: any[];
  tableId: string;
  renderActions?: (item: any) => React.ReactNode;
  onView: ()=> void;
}

const DataTableBody: FC<DataTableBodyProps> = ({
  visibleColumnsList = [],
  paginatedData = [],
  tableId,
  renderActions,
  onView
}) => {
  return (
    <tbody>
      {paginatedData.length === 0 ? (
        <tr>
        	<td
						colSpan={
							visibleColumnsList.length +
							(onView || renderActions ? 1 : 0)
						}
						className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400"
					>
            No hay datos disponibles
          </td>
        </tr>
      ) : (
        paginatedData.map((item, index) => (
          <tr
            key={`${tableId}-row-${index}`}
            className="border-b hover:bg-gray-50 dark:hover:bg-gray-700/50"
          >
            {visibleColumnsList.map((column) => (
                <td
                key={`${tableId}-cell-${index}-${column.key}`}
                className="px-6 py-4 border-b border-gray-200"
                >
                {column.render ? column.render(item[column.key], item) : item[column.key]}
                </td>
            ))}
          </tr>
        ))
      )}
    </tbody>
  );
};

export default DataTableBody;
