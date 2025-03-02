'use server';

import { revalidatePath } from 'next/cache';

export async function createTask(formData: FormData) {
	const createdAt = new Date().toISOString();
	const payload = {
		"name": formData.get('name'),
		"description": formData.get('description'),
		"is_completed": false,
		"created_at": createdAt,
		"updated_at": createdAt
	};

	try {
		await fetch(process.env.BACKEND_URL + '/task', {
			headers: { 'Content-Type': 'application/json; charset=utf-8' },
			method: 'POST',
			body: JSON.stringify(payload)
		})
		revalidatePath('/');
	} catch (error) {
		console.error(error);
	}
}