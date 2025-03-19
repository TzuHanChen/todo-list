import { type NextRequest, NextResponse } from "next/server"
import { buildTasksQuery } from "@/lib/query-helpers"
import { sql } from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const page = Number.parseInt(searchParams.get("page") || "1")
    const show_completed = searchParams.get("show_completed") || "all"
    const sortBy = searchParams.get("sortBy") || "created_at"
    const sortOrder = searchParams.get("sortOrder") || "DESC"

    const pageSize = 6
    const offset = (page - 1) * pageSize

    // Use the helper function to build and execute the query
    const result = await buildTasksQuery(show_completed, sortBy, sortOrder, pageSize, offset)

    return NextResponse.json(result)
  } catch (error) {
    console.error("Error fetching tasks:", error)
    return NextResponse.json({ error: "系統發生錯誤，請稍後再試" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, description, is_completed = false } = body

    // Validate input
    if (!name) {
      return NextResponse.json({ error: "請輸入任務名稱" }, { status: 400 })
    }

    if (name.length > 10) {
      return NextResponse.json({ error: "任務名稱長度不得超過10個字" }, { status: 400 })
    }

    if (description && description.length > 100) {
      return NextResponse.json({ error: "任務描述長度不得超過100個字" }, { status: 400 })
    }

    const now = new Date().toISOString()

    const result = await sql`
      INSERT INTO tasks (name, description, is_completed, created_at, updated_at)
      VALUES (${name}, ${description || null}, ${is_completed}, ${now}, ${now})
      RETURNING *
    `

    return NextResponse.json(result[0])
  } catch (error) {
    console.error("Error creating task:", error)
    return NextResponse.json({ error: "系統發生錯誤，請稍後再試" }, { status: 500 })
  }
}