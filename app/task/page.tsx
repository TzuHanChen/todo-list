import { Suspense } from "react";
import { Metadata } from "next";
import AddTask from "./add-task";
import Filter from "./filter";
import Sort from "./sort";
import { Loading } from "./task-card";
import TaskList from "./task-list";

export const metadata: Metadata = {
  title: "任務列表",
};

export default function TaskPage({ searchParams }: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  return (
    <main className="bg-gray-100 py-12 px-6">
      <AddTask />

      <div className="mx-auto w-full max-w-5xl pt-9">
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-xl">任務列表</h1>
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
