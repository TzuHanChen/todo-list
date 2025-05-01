import { type NextRequest, NextResponse } from "next/server"
import { sql } from "@/lib/db"
import bcrypt from "bcrypt";

export async function POST(request: NextRequest) {
	try {
		const body = await request.json()
		const { email, password } = body

		if (!email || !password) {
			return NextResponse.json({ error: "請輸入電子郵件和密碼" }, { status: 400 })
		}

		const result = await sql`
			SELECT email, password_hash, name FROM users
			WHERE email = ${email}
		`

		if (result.length === 0) {
			return NextResponse.json({ error: "電子郵件或密碼錯誤" }, { status: 401 })
		}

		const user = result[0]
		const isPasswordValid = await bcrypt.compare(password, user.password_hash)
		if (!isPasswordValid) {
			return NextResponse.json({ error: "電子郵件或密碼錯誤" }, { status: 401 })
		}

		return NextResponse.json({ email: user.email, name: user.name }, { status: 200 })
	} catch (error) {
		console.error("Error logging in:", error)
		return NextResponse.json({ error: "系統發生錯誤，請稍後再試" }, { status: 500 })
	}
}