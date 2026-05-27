import { SQL } from "bun";
import { settings } from "settings/configs";

const DB_LOG = {
	init: true,
	connection: false,
	query: false,
	error: true,
};

export const db = new SQL({
	hostname: settings.postgres.host,
	port: Number(settings.postgres.port),
	database: settings.postgres.name,
	username: settings.postgres.user,
	password: settings.postgres.password,

	max: 10,
	idleTimeout: 60,
	maxLifetime: 300,
	connectionTimeout: 30,

	onconnect: () => {
		if (DB_LOG.connection) {
			console.log("🟢 PostgreSQL connection established");
		}
	},
	onclose: () => {
		if (DB_LOG.connection) {
			console.log("🔴 PostgreSQL connection closed");
		}
	},
});

if (DB_LOG.init) {
	console.log(
		`🟢 DB initialized → ${settings.postgres.host}:${settings.postgres.port}`,
	);
}
