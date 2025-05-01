import { sql } from "@/lib/db"
import { initializeUsersTable, initializeTasksTable } from "@/lib/db"
import bcrypt from "bcrypt";

async function seedUsersTable() {
  try {
    await initializeUsersTable()

    await sql`TRUNCATE TABLE users RESTART IDENTITY`

    const password_hash = await bcrypt.hash('test', 10)

    await sql`
      INSERT INTO users (email, password_hash, name)
      VALUES 
        ('test@example.com', ${password_hash}, 'test')
    `

    console.log("Users table seeded successfully")
  } catch (error) {
    console.error("Error seeding users table:", error)
  }
}

async function seedTasksTable() {
  try {
    await initializeTasksTable()

    await sql`TRUNCATE TABLE tasks RESTART IDENTITY`

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
  await seedUsersTable()
  await seedTasksTable()
}

seedDatabase()
  .then(() => console.log("\nDatabase seeding completed"))
  .catch((error) => console.error("Error during database seeding:", error))
  .finally(() => process.exit(0))