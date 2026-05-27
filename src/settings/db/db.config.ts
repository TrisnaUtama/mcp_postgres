import { SQL } from "bun";
import { settings } from "settings/configs";

export const db = new SQL({
	// connections details
	hostname: settings.postgres.host,
	port: Number(settings.postgres.port),
	database: settings.postgres.name,
	username: settings.postgres.user,
	password: settings.postgres.password,

	// connection pools
	max: 10,
	idleTimeout: 60,
	maxLifetime: 300,
	connectionTimeout: 30,

	// ssl / tls options
	// tls: true,

	// detail connection up and close
	onconnect: (client) => {
		console.log("connected to postgresql", client?.message);
	},
	onclose: (client) => {
		console.log("postgresql connection closed", client?.message);
	},
});
