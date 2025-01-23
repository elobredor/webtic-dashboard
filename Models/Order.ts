export type ContactInfoModel = {
    name: string;
    lastName: string;
    idType: string;
    id: string;
    phone: string;
  };
  
  export type ShippingMethod = {
    value :string;
  }
  
  export type PaymentInfo = {
    cardNumber: string;
    cardHolder: string;
    expiryDate: string;
    cvv: string;
    cardName:string;
    expiryMonth:string;
    expiryYear:string;
  };
  
  export type OrderState = {
    userInfo: ContactInfoModel | null;
    shippingMethod: ShippingMethod | null;
    paymentInfo: PaymentInfo | null;
  };

  export interface FormOrder {
    data: Data
    detail: Detail[]
  }
  
  export interface Data {
    montoTotal: number
    moneda: string
    clienteId: number
    direccionId: number
    comentario: string
  }
  
  export interface Detail {
    productoId: number
    nombreProducto: string
    cantidad: number
    precio: number
    subTotal: number
    sellerId: number
  }
  

  export interface Order {
    id: number
    fecha: string
    estado: string
    montoTotal: string
    moneda: string
    estadoPago: string
    metodoPago: any
    clienteId: number
    direccionId: number
    comentario: string
    nombreReceptor: any
    calificado: boolean
    createdAt: string
    updatedAt: any
    deletedAt: any
    createdBy: number
    updatedBy: any
    deletedBy: any
    UserModel: UserModel
  }
  
  export interface UserModel {
    name: string
    DireccionesModel: DireccionesModel
  }
  
  export interface DireccionesModel {
    complemento: string
    ciudad: string
    departamento: string
  }

  export interface OrderDetail {
    id: number
    pedidoId: number
    productoId: number
    nombreProducto: string
    cantidad: number
    precio: number
    subTotal: string
    sellerId: number
  }
  
  