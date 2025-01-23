import { Product } from "../Product";

export interface Category {
    id: string;
    name: string;
    count: number;
}

export interface PriceRange {
    id: string;
    name?: string;
    range: string;
    count: number;
}

export interface Brand {
    id: string;
    nombre: string;
    count: number;
}

export interface ShippingOption {
    id: string;
    name: string;
    count: number;
}

export interface ProductFilters {
    page: number;
    filtro?: string;
    categorias?: number[];
    vendedores?: number[];
    tiposEnvio?: number[];
    precioMin?: number;
    precioMax?: number;
  }
  
  export interface ProductResponse {
    data: Product[];
    pages: number;
    currentPage: number;
  }