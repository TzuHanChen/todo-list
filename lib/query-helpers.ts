import { sql } from "@/lib/db"

export async function buildTasksQuery(
  show_completed: string,
  sortBy: string,
  sortOrder: string,
  pageSize: number,
  offset: number,
) {
  // Validate sort parameters
  const validSortFields = ["created_at", "updated_at"]
  const validSortOrders = ["ASC", "DESC"]
  const finalSortField = validSortFields.includes(sortBy) ? sortBy : "created_at"
  const finalSortOrder = validSortOrders.includes(sortOrder.toUpperCase()) ? sortOrder.toUpperCase() : "DESC"

  // Build the WHERE clause based on type
  let whereClause = '';
  if (show_completed === "completed") {
    whereClause = 'WHERE is_completed = true'
  } else if (show_completed === "uncompleted") {
    whereClause = 'WHERE is_completed = false'
  }

  return sql(`
    SELECT * FROM tasks
    ${whereClause}
    ORDER BY ${finalSortField} ${finalSortOrder}
    LIMIT ${pageSize} OFFSET ${offset}
  `)
}
