import { OrderService } from "./order.service";
import { PQRService } from "./pqr.service";
import { userService } from "./user.service";

export const api = {
	user: userService,
	pqr: PQRService,
	order: OrderService,
} as const;

// Type for the entire API
export type Api = typeof api;
