import { Suspense } from "react";
import AddTask from "@/app/ui/add-task";
import Filter from "@/app/ui/filter";
import { Loading } from "@/app/ui/task-card";
import TaskList from "@/app/ui/task-list";
import { TaskIcon } from "@/app/ui/icons";
import Sort from "@/app/ui/sort";

export default function TaskPage({ searchParams }: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  return (
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
  )
}
