export default function TaskCard() {
	return (
		<div data-completed={false} className="border border-gray-300 p-6 group hover:shadow-lg transition-shadow duration-700">
			<div className="flex items-center gap-1.5">
				<button className="size-9 flex justify-center items-center gap-1.5 cursor-pointer active:bg-gray-200 transition-colors duration-300">
					<span className="font-material-symbols-rounded text-2xl group-data-[completed=true]:hidden">circle</span>
					<span className="font-material-symbols-rounded font-variation-fill-1 text-2xl hidden group-data-[completed=true]:inline">check_circle</span>
				</button>
				<h3 className="text-2xl">測試1</h3>
			</div>

			<p className="mt-3 text-xl">這是一個新的待辦事項</p>
			<div className="mt-6 flex flex-col gap-1.5 text-gray-600">
				<p>創建時間：2025-02-14 04:33:51</p>
				<p>更新時間：2025-02-14 08:26:16</p>
			</div>

			<div className="mt-6 w-full flex justify-between">
				<button className="bg-gray-200 py-3 px-6  cursor-pointer active:bg-gray-300 transition-colors duration-300">刪除</button>
				<button className="bg-gray-200 py-3 px-6  cursor-pointer active:bg-gray-300 transition-colors duration-300">編輯</button>
			</div>
		</div>
	)
}