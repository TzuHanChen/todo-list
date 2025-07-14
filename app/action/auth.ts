"use server"

import { redirect } from "next/navigation";
import { signIn } from "@/lib/auth";
import { AuthError } from "next-auth";

import { LogInFormInputs } from "@/lib/types";

export async function logInWithCredentials(data: LogInFormInputs) {
	console.log(data);
	try {
		await signIn();
		// await signIn("credentials", { redirectTo: "/task" });
	} catch (error) {
		if (error instanceof AuthError) {
			return redirect(`/error?error=${error.type}`)
		}
		throw error
	}
}