export type Task = {
	id: number;
	name: string;
	description?: string;
	is_completed: boolean;
	created_at: Date;
	updated_at: Date;
}

export type User = {
	id: string;
	email: string;
	password_hash: string;
	name: string;
	created_at: Date;
}