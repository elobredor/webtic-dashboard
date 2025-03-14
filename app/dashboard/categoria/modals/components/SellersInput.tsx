import React, { useState, useEffect, useRef } from "react";
import { api } from "../../../../services/api";

interface Seller {
  id: number;
  nombreMostrar: string;
}

interface SellersInputProps {
  placeholder?: string;
  onItemSelected: (selectedItems: Seller[]) => void;
}

const SellerInput = ({ placeholder = "Buscar vendedores...", onItemSelected }: SellersInputProps) => {
  const [inputValue, setInputValue] = useState("");
  const [sellers, setSellers] = useState<Seller[]>([]);
  const [selectedSellers, setSelectedSellers] = useState<Seller[]>([]);
  const searchTimeout = useRef<NodeJS.Timeout | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Buscar vendedores con debounce
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    if (searchTimeout.current) clearTimeout(searchTimeout.current);
    searchTimeout.current = setTimeout(() => {
      fetchSellers(value);
    }, 300);
  };

  // Obtener datos de la API
  const fetchSellers = async (searchTerm: string = "") => {
    try {
      const { data } = await api.business.getSellers(searchTerm);
      // Filtrar los que ya están seleccionados dinámicamente
      setSellers(data);
    } catch (error) {
      console.error("Error al buscar vendedores:", error);
    }
  };

  // Manejar selección de vendedor
  const handleSelectSeller = (seller: Seller) => {
    setSelectedSellers((prev) => {
      const newSelection = [...prev, seller];
      onItemSelected(newSelection);
      return newSelection;
    });
    setInputValue(""); // Limpiar input
    inputRef.current?.focus(); // Mantener foco en el input
  };

  // Eliminar vendedor seleccionado
  const handleRemoveSeller = (sellerId: number) => {
    setSelectedSellers((prev) => {
      const newSelection = prev.filter((s) => s.id !== sellerId);
      onItemSelected(newSelection);
      return newSelection;
    });
    inputRef.current?.focus(); // Foco después de eliminar
  };

  // Mantener foco en el input después de selección/eliminación
  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, [selectedSellers]);

  return (
    <div className="relative w-full">
      {/* Contenedor de selección múltiple */}
      <div className="flex flex-wrap gap-2 p-2 border rounded-md focus-within:border-blue-500">
        {/* Etiquetas seleccionadas */}
        {selectedSellers.map((seller) => (
          <div
            key={seller.id}
            className="flex items-center gap-1 px-3 py-1 bg-blue-100 rounded-full"
          >
            <span>{seller.nombreMostrar}</span>
            <button
              type="button"
              className="text-blue-600 hover:text-blue-800"
              onClick={() => handleRemoveSeller(seller.id)}
            >
              ×
            </button>
          </div>
        ))}

        {/* Campo de entrada */}
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder={placeholder}
          className="flex-grow p-0 border-0 focus:outline-none focus:ring-0"
        />
      </div>

      {/* Lista de sugerencias */}
      {sellers.length > 0 && inputValue && (
        <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-md mt-1 max-h-60 overflow-y-auto">
          {sellers.map((seller, index) => (
            <li
              key={index}
              onClick={() => handleSelectSeller(seller)}
              className="p-2 hover:bg-gray-100 cursor-pointer"
            >
              {seller.nombreMostrar}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SellerInput;