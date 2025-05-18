import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { sql } from "./db"
import bcrypt from "bcrypt"
import { signInSchema } from "./zod"
import { ZodError } from "zod"

async function getUserFromDb(email: string, password: string) {
	const result = await sql`
		SELECT email, password_hash FROM users WHERE email = ${email}
	`

	if (result.length === 0) return null

	const user = result[0]
	const isPasswordValid = await bcrypt.compare(password, user.password_hash)
	return isPasswordValid ? user : null
}

export const { handlers, signIn, signOut, auth } = NextAuth({
	providers: [
		Credentials({
			credentials: {
				email: { type: "email", label: "Email", placeholder: "test@example.com" },
				password: { type: "password", label: "Password", placeholder: "********" }
			},
			authorize: async (credentials) => {
				try {
					let user = null

					const { email, password } = await signInSchema.parseAsync(credentials)
					user = await getUserFromDb(email, password)

					if (!user) {
						throw new Error("Invalid credentials.")
					}
					return user
				} catch (error) {
					if (error instanceof ZodError) return null
				}
			},
		})
	],
})