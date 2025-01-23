import { OrderService } from "./order.service";
import { PQRService } from "./pqr.service";
import { productService } from "./products.service";
import { userService } from "./user.service";

export const api = {
	user: userService,
	pqr: PQRService,
	order: OrderService,
	product: productService,
} as const;

// Type for the entire API
export type Api = typeof api;
