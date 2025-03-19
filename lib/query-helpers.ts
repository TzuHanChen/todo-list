import { sql as neonSql } from "@/lib/db"

export function buildTasksQuery(show_completed: string, sortBy: string, sortOrder: string, pageSize: number, offset: number) {
  // Build the WHERE clause based on type
  let whereClause = ""
  if (show_completed === "completed") {
    whereClause = "WHERE is_completed = true"
  } else if (show_completed === "uncompleted") {
    whereClause = "WHERE is_completed = false"
  }

  // Validate sort parameters
  const validSortFields = ["created_at", "updated_at"]
  const validSortOrders = ["ASC", "DESC"]
  const finalSortField = validSortFields.includes(sortBy) ? sortBy : "created_at"
  const finalSortOrder = validSortOrders.includes(sortOrder.toUpperCase()) ? sortOrder.toUpperCase() : "DESC"

  // Use the raw SQL method for this specific case
  // Note: This is safe because we've validated the inputs
  return neonSql`
    SELECT * FROM tasks
    ${neonSql(whereClause)}
    ORDER BY ${neonSql(finalSortField)} ${neonSql(finalSortOrder)}
    LIMIT ${pageSize} OFFSET ${offset}
  `
}
