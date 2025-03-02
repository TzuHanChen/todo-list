import AddTask from "./add-task";
import TaskCard, { NoTaskCard, DataError } from "./task-card";
import { Task } from "./type";

async function TaskList() {
  const res = await fetch(process.env.BACKEND_URL + '/task',{
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    method: 'GET'
  });
  if (!res.ok) return <DataError />

  const data = await res.json();
  if (data.total === 0) return <NoTaskCard />

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {data.data.map((task: Task) => {
        return <TaskCard key={task.id} data={task} />
      })}
    </div>
  )
}

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-5xl pt-18 pb-3 flex flex-col gap-3">
      <AddTask />

      <div className="bg-gray-100 p-6 flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h2 className="flex items-center gap-1.5">
            <span className="font-material-symbols-rounded text-2xl">task</span>
            <span className="text-xl">任務列表</span>
          </h2>
          <button data-show-completed={true} className="py-1.5 px-3 flex items-center gap-1.5 group cursor-pointer active:bg-gray-200 transition-colors duration-300">
            <span className="font-material-symbols-rounded font-variation-fill-1 text-2xl group-data-[show-completed=false]:hidden">visibility</span>
            <span className="font-material-symbols-rounded text-2xl hidden group-data-[show-completed=false]:inline">visibility_off</span>
            <span>顯示已完成的任務</span>
          </button>
        </div>

        <TaskList />
      </div>
    </main>
  )
}
