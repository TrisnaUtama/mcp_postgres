import { defineConfig } from "drizzle-kit";
import { settings } from "settings/configs";

export default defineConfig({
	schema: "./src/settings/db/schemas/*",
	out: "./drizzle/migrations",
	dialect: "postgresql",
	dbCredentials: {
		url: settings.postgres.url,
	},
});
