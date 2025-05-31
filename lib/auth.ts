import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import type { Provider } from "next-auth/providers"
import { sql } from "./db"
import bcryptjs from "bcryptjs"
import { signInSchema } from "./zod"
import { ZodError } from "zod"

async function getUserFromDb(email: string, password: string) {
	const result = await sql`
		SELECT email, password_hash FROM users WHERE email = ${email}
	`

	if (result.length === 0) return null

	const user = result[0]
	const isPasswordValid = await bcryptjs.compare(password, user.password_hash)
	return isPasswordValid ? user : null
}

const providers: Provider[] = [
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

				if (!user) return null
				return user
			} catch (error) {
				if (error instanceof ZodError) return null
				return null
			}
		},
	}),
]

export const providerMap = providers
	.map((provider) => {
		if (typeof provider === "function") {
			const providerData = provider()
			return { id: providerData.id, name: providerData.name }
		} else {
			return { id: provider.id, name: provider.name }
		}
	})
	.filter((provider) => provider.id !== "credentials")

export const { handlers, signIn, signOut, auth } = NextAuth({
	providers,
	pages: {
		signIn: "/login",
		signOut: "/logout",
		// signIn: '/auth/signin',
    // signOut: '/auth/signout',
		// error: '/auth/error',
    // verifyRequest: '/auth/verify-request',
    // newUser: '/auth/new-user'
  }
})