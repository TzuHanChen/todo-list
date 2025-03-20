import { getBaseUrl, getQueryString } from "@/lib/url";
import TaskCard, { NoTaskCard, DataError } from "./task-card";
import { Task } from "@/app/type";

export default async function TaskList({ searchParams }: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const baseUrl = getBaseUrl();
  const queryString = getQueryString(await searchParams);
  const res = await fetch(`${baseUrl}/api/task${queryString}`, {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    method: 'GET'
  });
  if (!res.ok) return <DataError />

  const data = await res.json();
  if (data.length === 0) return <NoTaskCard />

  return (
    <div className="min-h-72 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {data.map((task: Task) => {
        return <TaskCard key={task.id} data={task} />
      })}
    </div>
  )
}