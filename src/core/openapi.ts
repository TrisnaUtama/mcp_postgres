import {
	OpenAPIRegistry,
	OpenApiGeneratorV3,
} from "@asteasolutions/zod-to-openapi";
import { userRegistry } from "../modules/users/routes/user.registry";

export const buildOpenAPI = () => {
	const registry = new OpenAPIRegistry();
	Object.assign(registry, userRegistry);
	const generator = new OpenApiGeneratorV3(registry.definitions);
	return generator.generateDocument({
		openapi: "3.0.0",
		info: {
			title: "MCP API",
			version: "1.0.0",
		},
	});
};
