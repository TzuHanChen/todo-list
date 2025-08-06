import { sql } from "@/lib/db-init"

export async function buildTasksQuery(
  showCompleted: string,
  sortBy: string,
  sortOrder: string,
  // limit: number,
  // offset: number,
) {
  const validSortFields = ["created_at", "updated_at"]
  const validSortOrders = ["ASC", "DESC"]
  const finalSortField = validSortFields.includes(sortBy) ? sortBy : "created_at"
  const finalSortOrder = validSortOrders.includes(sortOrder.toUpperCase()) ? sortOrder.toUpperCase() : "DESC"

  let whereClause = '';
  if (showCompleted === "completed") {
    whereClause = 'WHERE is_completed = true'
  } else if (showCompleted === "uncompleted") {
    whereClause = 'WHERE is_completed = false'
  }

  return sql(`
    SELECT * FROM tasks
    ${whereClause}
    ORDER BY ${finalSortField} ${finalSortOrder}
  `)
  // LIMIT ${limit} OFFSET ${offset}
}
