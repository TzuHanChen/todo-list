import { neon } from "@neondatabase/serverless"

// Create a SQL client with better error handling
export const sql = (() => {
  const databaseUrl = process.env.DATABASE_URL

  if (!databaseUrl) {
    throw new Error("DATABASE_URL environment variable is not set")
  }

  try {
    return neon(databaseUrl)
  } catch (error) {
    console.error("Error initializing Neon client:", error)
    console.error("DATABASE_URL format should be: postgres://user:password@host:port/database")
    throw error
  }
})()

// Initialize the database schema
export async function initializeTasksTable() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS tasks (
        id SERIAL PRIMARY KEY,
        name VARCHAR(10) NOT NULL,
        description VARCHAR(100),
        is_completed BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `
    console.log("Tasks table initialized")
  } catch (error) {
    console.error("Error initializing tasks table:", error)
    throw error
  }
}
