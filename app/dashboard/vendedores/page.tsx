"use client";
import { api } from "@/services/api";
import DataTable from "@/components/DataTable";

export default function Vendedores() {
  // Función que pasaremos al DataTable para obtener datos
  const fetchVendedores = async (page, pageSize, searchTerm) => {
    try {
      const response = await api.user.getSeller(page, pageSize, searchTerm);
      return {
        data: response?.data?.data || [],
        total: response?.data?.total || 0
      };
    } catch (error) {
      console.error("Error al cargar vendedores:", error);
      return { data: [], total: 0 };
    }
  };

  // Acciones personalizadas para cada fila
  const renderActions = (item) => {
    // Puedes añadir botones de acción personalizados si los necesitas
    return null;
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
                // La tabla se refrescará automáticamente al llamar a la API
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
      <p>Listado de vendedores</p>
      <DataTable
        columns={columns}
        tableId="sellers-table"
        fetchFunction={fetchVendedores}
        renderActions={renderActions}
        initialPageSize={10}
      />
    </div>
  );
}