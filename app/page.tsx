import AddTask from "./add-task";

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-5xl pt-18 pb-3 flex flex-col gap-3">
      <AddTask />

      <div className="mx-auto w-full max-w-5xl bg-gray-100 py-3 px-6">
        <h2 className="flex items-center gap-1.5">
          <span className="font-material-symbols-rounded text-2xl">task</span>
          <span className="text-xl">任務列表</span>
        </h2>
      </div>
    </main>
  )
}
