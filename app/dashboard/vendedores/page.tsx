"use client";
import { useState, useEffect } from "react";

import { api } from "@/services/api";
import DataTable from "@/components/DataTable";


export default function Vendedores() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalRecords, setTotalRecords] = useState(0);

  const fetchVendedores = async (page = 1, size = pageSize, searchTerm = "") => {
    setLoading(true);
    try {
      const response = await api.user.getSeller(page, size, searchTerm);
      setData(response?.data?.data || []);
      setTotalRecords(response?.data?.total || 0);
    } catch (error) {
      console.error("Error al cargar vendedores:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVendedores(currentPage, pageSize);
  }, [currentPage, pageSize]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(1); // Reiniciar a la primera página
  };

  const handleRefresh = () => {
    fetchVendedores(1, pageSize);
  };

  const columns = [
    { key: "user", title: "ID Usuario", sortable: true },
    { key: "nombreRazonSocial", title: "Razón Social", sortable: true },
    { key: "idnegocio", title: "ID Negocio", sortable: true },
    { key: "nombreMostrar", title: "Nombre a Mostrar", sortable: true },
    { key: "numeroDocumento", title: "Número de Documento", sortable: true },
    { key: "nombretipodoc", title: "Tipo de Documento", sortable: true },
    { key: "nombretipopers", title: "Tipo de Persona", sortable: true },
    {
      key: "estado",
      title: "Estado",
      sortable: true,
      render: (estado, item) => (
        <select
          className="border rounded p-1"
          value={estado}
          onChange={(e) => {
            const newEstado = parseInt(e.target.value);
            api.user
              .updateSellerStatus({ id: item.user, estado: newEstado })
              .then(() => {
                console.log(`Estado actualizado a ${newEstado}`);
                handleRefresh();
              })
              .catch((error) => {
                console.error("Error al actualizar estado:", error);
              });
          }}
        >
          <option value={1}>Activo</option>
          <option value={0}>Inactivo</option>
          <option value={3}>Retirado</option>
        </select>
      ),
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold">Vendedores</h1>
      <p>Listado de vendedores </p>

      <DataTable
        data={data}
        columns={columns}
        tableId="seller-table"
        loading={loading}
        currentPage={currentPage}
        pageSize={pageSize}
        totalRecords={totalRecords}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
        onFetchData={fetchVendedores}
  
        
      />
    </div>
  );
}
