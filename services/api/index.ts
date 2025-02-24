import { OrderService } from "./order.service";
import { PQRService } from "./pqr.service";
import { productService } from "./products.service";
import { RequestService } from "./request.service";
import { userService } from "./user.service";

export const api = {
	user: userService,
	pqr: PQRService,
	order: OrderService,
	product: productService,
	request: RequestService,
} as const;

// Type for the entire API
export type Api = typeof api;
