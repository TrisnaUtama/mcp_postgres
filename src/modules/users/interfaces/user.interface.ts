import type { NewUser, User } from "@settings/db/schemas";

export interface IUserRepositories {
	findById(id: string): Promise<User | undefined>;
	findByEmailOrUsername(payload: string): Promise<User | undefined>;
	findAll(): Promise<User[]>;
	insert(payload: NewUser): Promise<User | undefined>;
	update(id: string, payload: Partial<User>): Promise<User | undefined>;
	delete(id: string): void;
}
