import { Suspense } from "react";
import Link from "next/link";
import AddTask from "./ui/add-task";
import Filter from "./ui/filter";
import { Loading } from "./ui/task-card";
import TaskList from "./ui/task-list";
import { TaskIcon } from "./ui/icons";
import Sort from "./ui/sort";

export default function Home({ searchParams }: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
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
              <div className="flex">
                <Filter />
                <Sort />
              </div>
            </Suspense>
          </div>

          <Suspense fallback={<Loading />}>
            <TaskList searchParams={searchParams} />
          </Suspense>
        </div>
      </main>

      <footer className="rounded-b-2xl bg-gray-100 py-3 px-6 text-center">
        <p>© 2025 陳子涵</p>
      </footer>
    </div>
  )
}
