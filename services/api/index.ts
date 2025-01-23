import { userService } from "./user.service";

export const api = {
	user: userService,
} as const;

// Type for the entire API
export type Api = typeof api;
