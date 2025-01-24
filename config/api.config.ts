export const API_CONFIG = {
	baseURL: process.env.API_URL || "https://cualquierapi.com",
	timeout: 10000,
	headers: {
		"Content-Type": "application/json",
	},
	mode: "cors" as RequestMode,
	credentials: "include" as RequestCredentials,
	HEADERS: {
		DEFAULT: {
			"Content-Type": "application/json",
			Accept: "application/json",
		},
		AUTH: (token: string) => ({
			Authorization: `Bearer ${token}`,
		}),
	},
};
