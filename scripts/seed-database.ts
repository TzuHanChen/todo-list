import { sql } from "@/lib/db"
import { initializeTasksTable } from "@/lib/db"

async function seedTasksTable() {
  try {
    // First ensure the table exists
    await initializeTasksTable()

    // Clear existing data
    await sql`TRUNCATE TABLE tasks RESTART IDENTITY`

    // Insert sample tasks
    await sql`
      INSERT INTO tasks (name, description, is_completed, created_at, updated_at)
      VALUES 
        ('Task 1', 'Description for task 1', false, NOW(), NOW()),
        ('Task 2', 'Description for task 2', true, NOW(), NOW()),
        ('Task 3', 'Description for task 3', false, NOW(), NOW())
    `

    console.log("Tasks table seeded successfully")
  } catch (error) {
    console.error("Error seeding tasks table:", error)
  }
}

async function seedDatabase() {
  await seedTasksTable()
}

seedDatabase()
