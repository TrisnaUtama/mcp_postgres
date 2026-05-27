import { Hono } from "hono";
import { UserController } from "../controllers/user.controller";
import { UserRepositories } from "../repositories/user.repo";
import { UserService } from "../services/user.service";

const userRepo = new UserRepositories();
const userService = new UserService(userRepo);
const userController = new UserController(userService);

// =========================
// ROUTER
// =========================
export const userRoutes = new Hono();

// =========================
// GET BY ID
// =========================
userRoutes.get("/:id", async (c) => {
	return userController.getById(c);
});

// =========================
// GET ALL
// =========================
userRoutes.get("/", async (c) => {
	return userController.getAll(c);
});

// =========================
// CREATE
// =========================
userRoutes.post("/", async (c) => {
	return userController.create(c);
});

// =========================
// UPDATE
// =========================
userRoutes.put("/:id", async (c) => {
	return userController.update(c);
});

// =========================
// DELETE
// =========================
userRoutes.delete("/:id", async (c) => {
	return userController.delete(c);
});
