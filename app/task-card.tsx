'use client';

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Task } from "./type";

function Read({ data, setView }: {
	setView: React.Dispatch<React.SetStateAction<string>>,
	data: Task
}) {
	const createdTime = new Date(data.created_at);
	const createdTimeString = createdTime.toISOString().split('.')[0].replace('T', ' ');
	const updatedTime = new Date(data.updated_at);
	const updatedTimeString = updatedTime.toISOString().split('.')[0].replace('T', ' ');

	return (<>
		<div>
			<div className="flex items-center gap-1.5">
				<button className="size-9 flex justify-center items-center gap-1.5 cursor-pointer active:bg-gray-200 transition-colors duration-300">
					<span className="font-material-symbols-rounded text-2xl group-data-[is-completed=true]:hidden">circle</span>
					<span className="font-material-symbols-rounded font-variation-fill-1 text-2xl hidden group-data-[is-completed=true]:inline">check_circle</span>
				</button>
				<h3 className="text-2xl">{data.name}</h3>
			</div>

			<p className="mt-3 text-xl">{data.description}</p>
		</div>

		<div>
			<div className="mt-6 flex flex-col gap-1.5 text-gray-600">
				<p>創建時間：{createdTimeString}</p>
				<p>更新時間：{updatedTimeString}</p>
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

export default function TaskCard({ data }: { data: Task }) {
	const [view, setView] = useState('read');
	const searchParams = useSearchParams();
	const showCompleted = (searchParams.get('show-completed') === 'true');

	return (
		<div data-is-completed={data.is_completed}
			data-show={!data.is_completed || (data.is_completed && showCompleted)}
			className="border border-gray-300 min-h-80 p-6 flex flex-col justify-between group hover:shadow-lg transition-shadow duration-700 data-[show=false]:hidden">
			{view === 'read' && <Read setView={setView} data={data} />}
			{view === 'edit' && <Edit setView={setView} />}
		</div>
	)
}

export function NoTaskCard() {
	return (
		<div className="border border-gray-300 min-h-80 p-6 flex flex-col justify-center group hover:shadow-lg transition-shadow duration-700">
			<p className="text-center">目前沒有任務</p>
		</div>
	)
}

export function DataError() {
	return (
		<div className="border border-gray-300 min-h-80 p-6 flex flex-col justify-center group hover:shadow-lg transition-shadow duration-700">
			<p className="text-center">取得任務資料失敗，請稍後再試</p>
		</div>
	)
}