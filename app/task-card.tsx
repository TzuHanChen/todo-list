'use client';

import { useState, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { Task } from "./type";
import { updateTask, updateTaskStatus, deleteTask } from './actions';
import { CheckCircleIcon, CircleIcon, CloseIcon, DeleteForeverIcon, DeleteIcon, EditSquareIcon, SaveIcon } from "./icons";

function Read({ data, setView }: {
	setView: React.Dispatch<React.SetStateAction<string>>,
	data: Task
}) {
	const createdTime = new Date(data.created_at);
	const createdTimeString = createdTime.toISOString().split('.')[0].replace('T', ' ');
	const updatedTime = new Date(data.updated_at);
	const updatedTimeString = updatedTime.toISOString().split('.')[0].replace('T', ' ');

	return (<>
		<div className="p-4.5">
			<div className="flex items-center gap-1.5">
				<button onClick={() => updateTaskStatus(data.id.toString())}
					className="size-9 flex justify-center items-center gap-1.5 cursor-pointer active:bg-gray-200 transition-colors duration-300">
					<CircleIcon className="size-9 fill-teal-700 group-data-[is-completed=true]:hidden" />
					<CheckCircleIcon className="hidden size-9 fill-teal-700 group-data-[is-completed=true]:inline" />
				</button>
				<h3 className="text-2xl group-data-[is-completed=true]:line-through">{data.name}</h3>
			</div>

			<p className="mt-3 text-xl group-data-[is-completed=true]:line-through">{data.description}</p>
		</div>

		<div>
			<div className="p-4.5 flex flex-col gap-1.5 text-gray-500 text-sm">
				<p>創建時間：{createdTimeString}</p>
				<p>更新時間：{updatedTimeString}</p>
			</div>

			<div className="rounded-b-xl border-t border-gray-300 w-full py-3 px-4.5 bg-gray-50 flex justify-end gap-3">
				<button onClick={() => setView('delete')}
					className="rounded-full outline outline-gray-50 bg-white py-1.5 px-4.5 flex items-center gap-1.5 text-red-500 cursor-pointer hover:outline-red-500 active:bg-red-50 transition-colors duration-300">
					<DeleteIcon className="fill-red-500" />
					<span>刪除</span>
				</button>
				<button onClick={() => setView('edit')}
					className="rounded-full outline outline-gray-50 bg-white py-1.5 px-4.5 flex items-center gap-1.5 text-blue-500 cursor-pointer hover:outline-blue-500 active:bg-blue-50 transition-colors duration-300">
					<EditSquareIcon className="fill-blue-500" />
					<span>編輯</span>
				</button>
			</div>
		</div>
	</>)
}

function Edit({ data, setView }: {
	setView: React.Dispatch<React.SetStateAction<string>>,
	data: Task
}) {
	const nameRef = useRef<HTMLInputElement>(null);
	const descriptionRef = useRef<HTMLTextAreaElement>(null);
	const [nameRequired, setNameRequired] = useState(false);

	function handleUpdateTask() {
		if (nameRef.current && descriptionRef.current) {
			if (nameRef.current.value === '') {
				setNameRequired(true);
			} else {
				setNameRequired(false);
				const formData = new FormData();
				formData.set('name', nameRef.current.value);
				formData.set('description', descriptionRef.current.value);
				updateTask(data.id.toString(), formData)
					.then(() => setView('read'));
			}
		}
	}

	return (<>
		<div className="p-4.5">
			<div className="flex items-center gap-1.5">
				<div className="size-9 flex justify-center items-center">
					<EditSquareIcon className="fill-gray-700" />
				</div>
				<h3 className="text-2xl">編輯任務</h3>
			</div>

			<div className="mt-3 flex flex-col gap-3">
				<label className="flex flex-col gap-1.5">
					<p>名稱</p>
					<input type="text" name="name" defaultValue={data.name} required maxLength={10} ref={nameRef}
						className="rounded-xl border border-gray-300 py-1.5 px-3" />
					{nameRequired && <p className="text-red-800">請輸入任務名稱</p>}
				</label>
				<label className="flex flex-col gap-1.5">
					<p>描述</p>
					<textarea name="description" defaultValue={data.description} maxLength={30} ref={descriptionRef}
						className="rounded-xl border border-gray-300 py-1.5 px-3 field-sizing-content"></textarea>
				</label>
			</div>
		</div>

		<div className="rounded-b-xl border-t border-gray-300 w-full py-3 px-4.5 bg-gray-50 flex justify-end gap-3">
			<button onClick={() => setView('read')}
				className="rounded-full outline outline-gray-50 bg-white py-1.5 px-4.5 flex items-center gap-1.5 text-gray-700 cursor-pointer hover:outline-gray-700 active:bg-gray-50 transition-colors duration-300">
				<CloseIcon className="fill-gray-700" />
				<span>取消</span>
			</button>
			<button onClick={() => handleUpdateTask()}
				className="rounded-full outline outline-gray-50 bg-white py-1.5 px-4.5 flex items-center gap-1.5 text-blue-500 cursor-pointer hover:outline-blue-500 active:bg-blue-50 transition-colors duration-300">
				<SaveIcon className="fill-blue-500" />
				<span>儲存</span>
			</button>
		</div>
	</>)
}

function Delete({ data, setView }: {
	setView: React.Dispatch<React.SetStateAction<string>>,
	data: Task
}) {
	return (<>
		<div className="p-4.5">
			<div className="flex items-center gap-1.5">
				<div className="size-9 flex justify-center items-center">
					<DeleteIcon className="fill-gray-700" />
				</div>
				<h3 className="text-2xl">刪除任務</h3>
			</div>
			<p className="mt-3 text-xl">確定要刪除這個任務嗎？</p>
		</div>

		<div className="rounded-b-xl border-t border-gray-300 w-full py-3 px-4.5 bg-gray-50 flex justify-end gap-3">
			<button onClick={() => setView('read')}
				className="rounded-full outline outline-gray-50 bg-white py-1.5 px-4.5 flex items-center gap-1.5 text-gray-700 cursor-pointer hover:outline-gray-700 active:bg-gray-50 transition-colors duration-300">
				<CloseIcon className="fill-gray-700" />
				<span>取消</span>
			</button>
			<button onClick={() => deleteTask(data.id.toString())}
				className="rounded-full outline outline-gray-50 bg-white py-1.5 px-4.5 flex items-center gap-1.5 text-red-500 cursor-pointer hover:outline-red-500 active:bg-red-50 transition-colors duration-300">
				<DeleteForeverIcon className="fill-red-500" />
				<span>刪除</span>
			</button>
		</div>
	</>)
}

export default function TaskCard({ data }: { data: Task }) {
	const [view, setView] = useState('read');
	const searchParams = useSearchParams();
	const showCompleted = (searchParams.get('show-completed') || 'true');

	return (
		<div data-is-completed={data.is_completed}
			data-show={!data.is_completed || (data.is_completed && showCompleted)}
			className="rounded-xl border border-gray-300 min-h-80 flex flex-col justify-between group hover:shadow-lg transition-shadow duration-700 data-[is-completed=true]:bg-gray-50 data-[show=false]:hidden">
			{view === 'read' && <Read setView={setView} data={data} />}
			{view === 'edit' && <Edit setView={setView} data={data} />}
			{view === 'delete' && <Delete setView={setView} data={data} />}
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