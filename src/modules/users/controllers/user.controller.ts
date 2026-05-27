import type { Context } from "hono";
import type { UserService } from "../services/user.service";

export class UserController {
	constructor(private readonly userService: UserService) {}

	getById = async (c: Context) => {
		const id = c.req.param("id");
		const user = await this.userService.findById(id!);

		return c.json({
			success: true,
			data: user,
		});
	};

	getAll = async (c: Context) => {
		const users = await this.userService.findAll();

		return c.json({
			success: true,
			data: users,
		});
	};

	create = async (c: Context) => {
		const body = await c.req.json();

		const user = await this.userService.createUser(body);

		return c.json({
			success: true,
			data: user,
		});
	};

	update = async (c: Context) => {
		const id = c.req.param("id");
		const body = await c.req.json();

		const user = await this.userService.updateUser(id!, body);

		return c.json({
			success: true,
			data: user,
		});
	};

	delete = async (c: Context) => {
		const id = c.req.param("id");

		const result = await this.userService.deleteUser(id!);

		return c.json({
			success: true,
			...result,
		});
	};
}
