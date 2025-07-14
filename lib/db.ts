import { neon } from "@neondatabase/serverless"

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

export async function initializeUsersTable() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        email varchar(255) NOT NULL UNIQUE,
        password_hash varchar(255) NOT NULL,
        name varchar(100) NOT NULL,
        created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
      )
    `
    console.log("Users table initialized")
  } catch (error) {
    console.error("Error initializing users table:", error)
    throw error
  }
}

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
