import { Scalar } from "@scalar/hono-api-reference";
import { Hono } from "hono";
import { env, getRuntimeKey } from "hono/adapter";

const app = new Hono();

app.get("/", (c) => {
	const runtime = getRuntimeKey();
	const { APP_PORT, APP_KEY } = env<{ APP_PORT: number; APP_KEY: string }>(c);
	return c.json({ runtime, APP_PORT, APP_KEY });
});

app.get(
	"/scalar",
	Scalar(() => {
		return {
			url: "/doc",
			theme: "default",
		};
	}),
);

export default app;
