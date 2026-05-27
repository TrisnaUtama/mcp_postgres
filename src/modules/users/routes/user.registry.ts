import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";

import {
	Response200,
	Response400,
	Response422,
	Response500,
} from "@modules/shared/schemas/response";

export const userRegistry = new OpenAPIRegistry();

// =========================
// GET USERS
// =========================
userRegistry.registerPath({
	method: "get",
	tags: ["USER"],
	summary: "Get all users",
	path: "/users",
	responses: {
		200: {
			description: "Success",
			content: {
				"application/json": {
					schema: Response200,
				},
			},
		},
		400: {
			description: "Bad Request",
			content: { "application/json": { schema: Response400 } },
		},
		422: {
			description: "Validation Error",
			content: { "application/json": { schema: Response422 } },
		},
		500: {
			description: "Internal Server Error",
			content: { "application/json": { schema: Response500 } },
		},
	},
});

// =========================
// GET BY ID
// =========================
userRegistry.registerPath({
	method: "get",
	tags: ["USER"],
	summary: "Get user by id",
	path: "/users/{id}",
	parameters: [
		{
			in: "path",
			name: "id",
			required: true,
			schema: { type: "string", format: "uuid" },
		},
	],
	responses: {
		200: {
			description: "Success",
			content: { "application/json": { schema: Response200 } },
		},
		400: {
			description: "Bad Request",
			content: { "application/json": { schema: Response400 } },
		},
		422: {
			description: "Validation Error",
			content: { "application/json": { schema: Response422 } },
		},
		500: {
			description: "Internal Server Error",
			content: { "application/json": { schema: Response500 } },
		},
	},
});

// =========================
// CREATE USER
// =========================
userRegistry.registerPath({
	method: "post",
	tags: ["USER"],
	summary: "Create user",
	path: "/users",
	request: {
		body: {
			content: {
				"application/json": {
					schema: {
						type: "object",
						required: ["name", "email", "role"],
						properties: {
							name: { type: "string" },
							email: { type: "string" },
							role: { type: "string" },
						},
					},
				},
			},
		},
	},
	responses: {
		201: {
			description: "Created",
			content: { "application/json": { schema: Response200 } },
		},
		400: {
			description: "Bad Request",
			content: { "application/json": { schema: Response400 } },
		},
		422: {
			description: "Validation Error",
			content: { "application/json": { schema: Response422 } },
		},
		500: {
			description: "Internal Server Error",
			content: { "application/json": { schema: Response500 } },
		},
	},
});
