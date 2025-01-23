export interface ProductFilter {
	id?: number;
	name: string;
	seller: string;
	price: number;
	image: string;
	rating: number;
	sales?: number;
	freeShipping: boolean;
	stock: string;
	um?: string;
	categoria: any;
	brand?: any;
	shipping?: string;
	nombrecategoria?: string;
	tipoenvio?: string;
	nombremarca?: string;
}

export interface Product {
	id: number
	name: string
	image: string
	um: string
	freeShipping: boolean
	status: boolean
	seller:  any
	stock: string
	stockmax: any
	price: any
	rating: any
	descripcion: any
	brand: number
	categoria: number
	nombrecategoria: string
	tipoenvio: string
	nombremarca: string
	MiNegocioModel?: MiNegocioModel
	disponible?: string
	vendedor?: string
	marca?: string
	tipoenv?: number
	sales?: any
	shipping?: any
  }
  
  export interface MiNegocioModel {
	nombreMostrar: string
  }
