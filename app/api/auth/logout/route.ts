import { NextResponse } from "next/server"

export async function POST() {
	try {
		// 假設使用 Cookie 存儲 JWT，清除 Cookie 以登出
		const response = NextResponse.json({ message: "登出成功" }, { status: 200 });
		response.cookies.set("token", "", { httpOnly: true, maxAge: 0 }); // 清除 JWT Token
		return response;
	} catch (error) {
		console.error("Error logging out:", error)
		return NextResponse.json({ error: "系統發生錯誤，請稍後再試" }, { status: 500 })
	}
}