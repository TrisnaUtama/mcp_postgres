import { getRuntimeKey } from "hono/adapter";

export const settings = {
	app: {
		port: Number(process.env.APP_PORT || 3000),
		key: process.env.APP_KEY || "",
		nodeEnv: process.env.NODE_ENV || "development",
		runtime: getRuntimeKey(),
	},

	postgres: {
		host: process.env.POSTGRESQL_HOST || "localhost",
		name: process.env.POSTGRESQL_NAME || "",
		user: process.env.POSTGRESQL_USER || "",
		password: process.env.POSTGRESQL_PASS || "",
		port: Number(process.env.POSTGRESQL_PORT || 5432),
		url: process.env.POSTGRESQL_URL || "",
	},
} as const;
