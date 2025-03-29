import { type NextRequest, NextResponse } from "next/server"
import { sql } from "@/lib/db"

// Helper function to check if task exists
async function getTaskById(id: number) {
  const result = await sql`
    SELECT * FROM tasks WHERE id = ${id}
  `

  return result.length > 0 ? result[0] : null
}

export async function GET(request: NextRequest,
  { params }: { params: Promise<{ id: string }> }) {
  try {
    const id = Number.parseInt((await params).id)
    const task = await getTaskById(id)

    if (!task) {
      return NextResponse.json({ error: "任務不存在" }, { status: 404 })
    }

    return NextResponse.json(task)
  } catch (error) {
    console.error("Error fetching task:", error)
    return NextResponse.json({ error: "系統發生錯誤，請稍後再試" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest,
  { params }: { params: Promise<{ id: string }> }) {
  try {
    const id = Number.parseInt((await params).id)
    const body = await request.json()
    const { name, description } = body

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

    // Check if task exists
    const existingTask = await getTaskById(id)
    if (!existingTask) {
      return NextResponse.json({ error: "任務不存在" }, { status: 404 })
    }

    const now = new Date().toISOString()

    const result = await sql`
      UPDATE tasks
      SET name = ${name}, description = ${description || null}, updated_at = ${now}
      WHERE id = ${id}
      RETURNING *
    `

    return NextResponse.json(result[0])
  } catch (error) {
    console.error("Error updating task:", error)
    return NextResponse.json({ error: "系統發生錯誤，請稍後再試" }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest,
  { params }: { params: Promise<{ id: string }> }) {
  try {
    const id = Number.parseInt((await params).id)

    // Check if task exists
    const existingTask = await getTaskById(id)
    if (!existingTask) {
      return NextResponse.json({ error: "任務不存在" }, { status: 404 })
    }

    const now = new Date().toISOString()

    const result = await sql`
      UPDATE tasks
      SET is_completed = NOT is_completed, updated_at = ${now}
      WHERE id = ${id}
      RETURNING *
    `

    return NextResponse.json(result[0])
  } catch (error) {
    console.error("Error updating task status:", error)
    return NextResponse.json({ error: "系統發生錯誤，請稍後再試" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest,
  { params }: { params: Promise<{ id: string }> }) {
  try {
    const id = Number.parseInt((await params).id)

    // Check if task exists
    const existingTask = await getTaskById(id)
    if (!existingTask) {
      return NextResponse.json({ error: "任務不存在" }, { status: 404 })
    }

    await sql`
      DELETE FROM tasks
      WHERE id = ${id}
    `

    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error("Error deleting task:", error)
    return NextResponse.json({ error: "系統發生錯誤，請稍後再試" }, { status: 500 })
  }
}
