import { Hono } from "hono";
import { userRoutes } from "../modules/users/routes/user.route";

export const routes = new Hono();
routes.route("/users", userRoutes);
