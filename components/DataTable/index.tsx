"use client";
import { useState, useEffect, useRef } from "react";
import {

	DataTableBody,
	DataTableHeader,
	DataTableFooter,
} from "./components";
import { Column } from "@/data/Column";

interface DataTableProps {
  columns: Column[];
  data: any[];
  loading?: boolean;
  pageSize: number;
  currentPage: number;
  totalRecords: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  onRefresh?: () => void;
  renderActions?: (item: any) => React.ReactNode;
  tableId: string;
  onAdd?: () => void;
}

const DataTable: React.FC<DataTableProps> = ({
  columns,
  data,
  loading = false,
  pageSize,
  currentPage,
  totalRecords,
  onPageChange,
  onPageSizeChange,
  renderActions,
  tableId,
  onAdd, 

}) => {
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

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(
        `${tableId}-visible-columns`,
        JSON.stringify(Array.from(visibleColumns))
      );
    }
  }, [visibleColumns, tableId]);

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

  const totalPages = Math.ceil(totalRecords / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalRecords);

  const visibleColumnsList = columns.filter((col) => visibleColumns.has(col.key));

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

          <DataTableBody
            paginatedData={data}
            visibleColumnsList={visibleColumnsList}
            loading={loading}
            tableId={tableId}
            renderActions={renderActions}
          />
        </table>
      </div>

      <DataTableFooter
        pageSize={pageSize}
        currentPage={currentPage}
        totalPages={totalPages}
        totalRecords={data?.length}
        startIndex={startIndex}
        endIndex={endIndex}
        onPageSizeChange={onPageSizeChange}
        onPageChange={onPageChange}
      />

   
    </div>
  );
};

export default DataTable;
