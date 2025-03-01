'use client';

import { useState } from "react";

function Read({ setView }: { setView: React.Dispatch<React.SetStateAction<string>> }) {
	return (<>
		<div>
			<div className="flex items-center gap-1.5">
				<button className="size-9 flex justify-center items-center gap-1.5 cursor-pointer active:bg-gray-200 transition-colors duration-300">
					<span className="font-material-symbols-rounded text-2xl group-data-[completed=true]:hidden">circle</span>
					<span className="font-material-symbols-rounded font-variation-fill-1 text-2xl hidden group-data-[completed=true]:inline">check_circle</span>
				</button>
				<h3 className="text-2xl">測試1</h3>
			</div>

			<p className="mt-3 text-xl">這是一個新的待辦事項</p>
		</div>

		<div>
			<div className="mt-6 flex flex-col gap-1.5 text-gray-600">
				<p>創建時間：2025-02-14 04:33:51</p>
				<p>更新時間：2025-02-14 08:26:16</p>
			</div>

			<div className="mt-6 w-full flex justify-between">
				<button className="bg-gray-200 py-3 px-6  cursor-pointer active:bg-gray-300 transition-colors duration-300">刪除</button>
				<button onClick={() => setView('edit')}
					className="bg-gray-200 py-3 px-6  cursor-pointer active:bg-gray-300 transition-colors duration-300">編輯</button>
			</div>
		</div>
	</>)
}

function Edit({ setView }: { setView: React.Dispatch<React.SetStateAction<string>> }) {
	return (<>
		<div>
			<div className="flex items-center gap-1.5">
				<button className="size-9 flex justify-center items-center gap-1.5 cursor-pointer active:bg-gray-200 transition-colors duration-300">
					<span className="font-material-symbols-rounded text-2xl">edit_note</span>
				</button>
				<h3 className="text-2xl">編輯任務</h3>
			</div>

			<div className="mt-3 flex flex-col gap-3">
				<label className="flex flex-col gap-1.5">
					<p>名稱</p>
					<input type="text" name="name" required maxLength={10} className="border border-gray-400 py-1.5 px-3" />
					<p className="text-red-800">請輸入任務名稱</p>
				</label>
				<label className="flex flex-col gap-1.5">
					<p>描述</p>
					<textarea name="description" maxLength={30} className="border border-gray-400 py-1.5 px-3 field-sizing-content"></textarea>
				</label>
			</div>
		</div>

		<div className="mt-6 w-full flex justify-between">
			<button onClick={() => setView('read')} className="bg-gray-200 py-3 px-6  cursor-pointer active:bg-gray-300 transition-colors duration-300">取消</button>
			<button
				className="bg-gray-200 py-3 px-6  cursor-pointer active:bg-gray-300 transition-colors duration-300">保存</button>
		</div>
	</>)
}

export default function TaskCard() {
	const [view, setView] = useState('read');

	return (
		<div data-completed={false} className="border border-gray-300 min-h-80 p-6 flex flex-col justify-between group hover:shadow-lg transition-shadow duration-700">
			{view === 'read' && <Read setView={setView} />}
			{view === 'edit' && <Edit setView={setView} />}
		</div>
	)
}