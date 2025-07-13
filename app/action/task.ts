'use server';

import { getBaseUrl } from '@/lib/url';
import { revalidatePath } from 'next/cache';

export async function createTask(formData: FormData) {
	try {
		const baseUrl = getBaseUrl();

		const payload = {
			"name": formData.get('name'),
			"description": formData.get('description'),
		};

		const response = await fetch(`${baseUrl}/api/task`, {
			headers: { 'Content-Type': 'application/json; charset=utf-8' },
			method: 'POST',
			body: JSON.stringify(payload)
		});

		if (!response.ok) {
			const errorData = await response.json();
			throw new Error(errorData.error || "Failed to create task");
		}

		revalidatePath('/task');
		return await response.json();
	} catch (error) {
		console.error("Error in createTask action:", error);
		throw error;
	}
}

export async function updateTask(id: string, formData: FormData) {
	try {
		const baseUrl = getBaseUrl();

		const updatedAt = new Date().toISOString();
		const payload = {
			"name": formData.get('name'),
			"description": formData.get('description'),
			"updated_at": updatedAt
		};

		const response = await fetch(`${baseUrl}/api/task/${id}`, {
			headers: { 'Content-Type': 'application/json; charset=utf-8' },
			method: 'PUT',
			body: JSON.stringify(payload)
		});

		if (!response.ok) {
			const errorData = await response.json();
			throw new Error(errorData.error || "Failed to update task");
		}

		revalidatePath('/task');
		return await response.json();
	} catch (error) {
		console.error("Error in updateTask action:", error);
		throw error;
	}
}

export async function updateTaskStatus(id: string) {
	try {
		const baseUrl = getBaseUrl();

		const response = await fetch(`${baseUrl}/api/task/${id}`, {
			headers: { 'Content-Type': 'application/json; charset=utf-8' },
			method: 'PATCH',
		});

		if (!response.ok) {
			const errorData = await response.json();
			throw new Error(errorData.error || "Failed to update task status");
		}

		revalidatePath('/task');
		return await response.json();
	} catch (error) {
		console.error("Error in updateTaskStatus action:", error);
		throw error;
	}
}

export async function deleteTask(id: string) {
	try {
		const baseUrl = getBaseUrl();

		const response = await fetch(`${baseUrl}/api/task/${id}`, {
			headers: { 'Content-Type': 'application/json; charset=utf-8' },
			method: 'DELETE',
		});

		if (!response.ok && response.status !== 204) {
			const errorData = await response.json();
			throw new Error(errorData.error || "Failed to delete task");
		}

		revalidatePath('/task');
		return true;
	} catch (error) {
		console.error("Error in deleteTask action:", error);
		throw error;
	}
}