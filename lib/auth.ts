import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import type { Provider } from "next-auth/providers"
import { sql } from "./db"
import bcryptjs from "bcryptjs"
import { signInSchema } from "./zod"
import { ZodError } from "zod"

const providers: Provider[] = [
	Credentials({
		credentials: {
			email: { type: "email", label: "Email", placeholder: "test@example.com" },
			password: { type: "password", label: "Password", placeholder: "********" }
		},
		authorize: async (credentials) => {
			try {
				const { email, password } = await signInSchema.parseAsync(credentials)
				const result = await sql`
					SELECT email, password_hash FROM users WHERE email = ${email}
				`
				if (result.length === 0) return null
				const user = result[0]
				const isPasswordValid = await bcryptjs.compare(password, user.password_hash)
				return isPasswordValid ? user : null
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
	},
	callbacks: {
		async redirect({ url, baseUrl }) {
			// Allows relative callback URLs
			if (url.startsWith("/")) return `${baseUrl}${url}`

			// Allows callback URLs on the same origin
			if (new URL(url).origin === baseUrl) return url

			return baseUrl
		},
		// async authorized({ request, auth }) {
		// 	console.log(request.nextUrl)

		// 	// Logged in users are authenticated, otherwise redirect to login page
		// 	return !!auth?.user
		// },
	},
})