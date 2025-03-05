import { Suspense } from "react";
import Link from "next/link";
import AddTask from "./add-task";
import ShowCompleted from "./show-completed";
import TaskCard, { NoTaskCard, DataError } from "./task-card";
import { Task } from "./type";
import { TaskIcon } from "./icons";

async function TaskList() {
  const res = await fetch(process.env.BACKEND_URL + '/task', {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    method: 'GET'
  });
  if (!res.ok) return <DataError />

  const data = await res.json();
  if (data.total === 0) return <NoTaskCard />

  return (
    <div className="min-h-72 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {data.data.map((task: Task) => {
        return <TaskCard key={task.id} data={task} />
      })}
    </div>
  )
}

export default function Home() {
  return (
    <div className="my-12 mx-auto shadow-md rounded-2xl border border-gray-200 w-full max-w-5xl">
      <header className="rounded-t-2xl bg-gray-600">
        <Link href="/" className="block w-max py-4.5 px-6">
          <h1 className="text-3xl text-white font-bold">ToDo List</h1>
        </Link>
      </header>

      <main className="py-12 px-6">
        <AddTask />

        <div className="pt-9">
          <div className="mb-6 flex justify-between items-center">
            <h2 className="flex items-center gap-2">
              <TaskIcon className="fill-gray-700" />
              <span className="text-xl">任務列表</span>
            </h2>
            <Suspense>
              <ShowCompleted />
            </Suspense>
          </div>

          <Suspense>
            <TaskList />
          </Suspense>
        </div>
      </main>

      <footer className="rounded-b-2xl bg-gray-100 py-3 px-6 text-center">
        <p>© 2025 陳子涵</p>
      </footer>
    </div>
  )
}
