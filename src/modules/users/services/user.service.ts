import { AppError } from "@core/error/app.error";
import type { NewUser, User } from "@settings/db/schemas";
import type { UserRepositories } from "../repositories/user.repo";

export class UserService {
	constructor(private readonly userRepo: UserRepositories) {}

	async findById(id: string): Promise<User> {
		const user = await this.userRepo.findById(id);
		if (!user) {
			throw new AppError("User not found", 404, "NOT_FOUND");
		}
		return user;
	}

	async findByEmailOrUsername(payload: string): Promise<User> {
		const user = await this.userRepo.findByEmailOrUsername(payload);
		if (!user) {
			throw new AppError("User not found", 404, "NOT_FOUND");
		}
		return user;
	}

	async findAll(): Promise<User[]> {
		const user = await this.userRepo.findAll();
		return user;
	}

	async createUser(payload: NewUser): Promise<User> {
		const existing = await this.userRepo.findByEmailOrUsername(payload.email);

		if (existing) {
			throw new AppError("Email already exists", 409, "CONFLICT");
		}

		const newUser = await this.userRepo.insert(payload);

		if (!newUser) {
			throw new AppError("Failed to create user", 500, "CREATE_FAILED");
		}

		return newUser;
	}

	async updateUser(id: string, payload: Partial<NewUser>): Promise<User> {
		const user = await this.userRepo.findById(id);

		if (!user) {
			throw new AppError("User not found", 404, "NOT_FOUND");
		}

		const updated = await this.userRepo.update(id, payload);

		if (!updated) {
			throw new AppError("Failed to update user", 500, "UPDATE_FAILED");
		}

		return updated;
	}

	async deleteUser(id: string): Promise<{ message: string }> {
		const user = await this.userRepo.findById(id);

		if (!user) {
			throw new AppError("User not found", 404, "NOT_FOUND");
		}

		await this.userRepo.delete(id);

		return {
			message: "User deleted successfully",
		};
	}
}
