import { type NewUser, type User, users } from "@settings/db/schemas";
import { and, eq, ilike, isNull, or } from "drizzle-orm";
import { orm } from "../../../../drizzle/drizzle";
import type { IUserRepositories } from "../interfaces/user.interface";

export class UserRepositories implements IUserRepositories {
	async findById(id: string): Promise<User | undefined> {
		const [user] = await orm
			.select()
			.from(users)
			.where(and(eq(users.id, id), isNull(users.deletedAt)));

		return user ?? undefined;
	}

	async findByEmailOrUsername(payload: string): Promise<User | undefined> {
		const [user] = await orm
			.select()
			.from(users)
			.where(
				and(
					isNull(users.deletedAt),
					or(eq(users.email, payload), ilike(users.name, payload)),
				),
			);

		return user ?? undefined;
	}

	async findAll(): Promise<User[]> {
		return await orm.select().from(users).where(isNull(users.deletedAt));
	}

	async insert(payload: NewUser): Promise<User | undefined> {
		const [created] = await orm.insert(users).values(payload).returning();
		return created ?? undefined;
	}

	async update(
		id: string,
		payload: Partial<NewUser>,
	): Promise<User | undefined> {
		const [updated] = await orm
			.update(users)
			.set(payload)
			.where(eq(users.id, id))
			.returning();

		return updated ?? undefined;
	}

	async delete(id: string): Promise<void> {
		await orm
			.update(users)
			.set({
				deletedAt: new Date(),
			})
			.where(eq(users.id, id));
	}
}
