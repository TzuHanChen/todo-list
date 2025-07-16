'use client';

import { useState, useRef } from "react";
import { Task } from "@/lib/types";
import { updateTask, updateTaskStatus, deleteTask } from '@/app/action/task';
import { CheckCircleIcon, CircleIcon, CloseIcon, DeleteForeverIcon, DeleteIcon, EditSquareIcon, ErrorIcon, ProgressActivityIcon, SaveIcon, TaskIcon } from "./icons";

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
					title={data.is_completed ? '已完成' : '未完成'}
					aria-label={data.is_completed ? '已完成' : '未完成'}
					className="rounded-full size-12 flex justify-center items-center cursor-pointer hover:bg-teal-50 active:bg-teal-50 transition-colors duration-300">
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

			<div className="rounded-b-2xl border-t border-gray-300 w-full py-3 px-4.5 bg-gray-50 flex justify-end gap-3">
				<button onClick={() => setView('delete')}
					className="rounded-full border border-gray-300 h-10 bg-white py-1.5 pr-6 pl-4 flex items-center gap-2 text-gray-700 cursor-pointer hover:bg-gray-100 active:bg-gray-100 transition-colors duration-300">
					<DeleteIcon className="fill-gray-700" />
					<span>刪除</span>
				</button>
				<button onClick={() => setView('edit')}
					className="rounded-full border border-gray-300 h-10 bg-white py-1.5 pr-6 pl-4 flex items-center gap-2 text-blue-700 cursor-pointer hover:bg-blue-50 active:bg-blue-50 transition-colors duration-300">
					<EditSquareIcon className="fill-blue-700" />
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
				<div className="rounded-full bg-blue-50 size-12 flex justify-center items-center">
					<EditSquareIcon className="fill-blue-700" />
				</div>
				<h3 className="text-2xl">編輯任務</h3>
			</div>

			<div className="mt-3 flex flex-col gap-3">
				<label className="flex flex-col gap-1.5">
					<p>名稱</p>
					<input type="text" name="name" defaultValue={data.name} required maxLength={10} ref={nameRef}
						className="rounded-2xl border border-gray-300 h-10 py-1.5 px-3" />
					{nameRequired && <p className="text-red-800">請輸入任務名稱</p>}
				</label>
				<label className="flex flex-col gap-1.5">
					<p>描述</p>
					<textarea name="description" defaultValue={data.description} maxLength={100} ref={descriptionRef}
						className="rounded-2xl border border-gray-300 min-h-10 py-1.5 px-3 field-sizing-content"></textarea>
				</label>
			</div>
		</div>

		<div className="rounded-b-2xl border-t border-gray-300 w-full py-3 px-4.5 bg-gray-50 flex justify-end gap-3">
			<button onClick={() => setView('read')}
				className="rounded-full border border-gray-300 h-10 bg-white py-1.5 pr-6 pl-4 flex items-center gap-2 text-gray-700 cursor-pointer hover:bg-gray-100 active:bg-gray-100 transition-colors duration-300">
				<CloseIcon className="fill-gray-700" />
				<span>取消</span>
			</button>
			<button onClick={() => handleUpdateTask()}
				className="rounded-full h-10 bg-blue-700 py-1.5 pr-6 pl-4 flex items-center gap-2 text-white cursor-pointer hover:bg-blue-800 active:bg-blue-800 transition-colors duration-300">
				<SaveIcon className="fill-white" />
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
				<div className="rounded-full bg-red-50 size-12 flex justify-center items-center">
					<DeleteIcon className="fill-red-600" />
				</div>
				<h3 className="text-2xl">刪除任務</h3>
			</div>
			<p className="mt-3 text-xl">確定要刪除這個任務嗎？</p>
		</div>

		<div className="rounded-b-2xl border-t border-gray-300 w-full py-3 px-4.5 bg-gray-50 flex justify-end gap-3">
			<button onClick={() => setView('read')}
				className="rounded-full border border-gray-300 h-10 bg-white py-1.5 pr-6 pl-4 flex items-center gap-2 text-gray-700 cursor-pointer hover:bg-gray-100 active:bg-gray-100 transition-colors duration-300">
				<CloseIcon className="fill-gray-700" />
				<span>取消</span>
			</button>
			<button onClick={() => deleteTask(data.id.toString())}
				className="rounded-full h-10 bg-red-600 py-1.5 pr-6 pl-4 flex items-center gap-2 text-white cursor-pointer hover:bg-red-700 active:bg-red-700 transition-colors duration-300">
				<DeleteForeverIcon className="fill-white" />
				<span>刪除</span>
			</button>
		</div>
	</>)
}

export default function TaskCard({ data }: { data: Task }) {
	const [view, setView] = useState('read');

	return (
		<div data-is-completed={data.is_completed}
			className="rounded-2xl border border-gray-300 min-h-72 bg-white flex flex-col justify-between group hover:shadow-lg transition-shadow duration-700 data-[is-completed=true]:bg-gray-50">
			{view === 'read' && <Read setView={setView} data={data} />}
			{view === 'edit' && <Edit setView={setView} data={data} />}
			{view === 'delete' && <Delete setView={setView} data={data} />}
		</div>
	)
}

export function Loading() {
	return (
		<div className="rounded-2xl border border-gray-300 min-h-72 bg-white p-6 flex flex-col justify-center items-center gap-3 group hover:shadow-lg transition-shadow duration-700">
			<div className="rounded-full size-16 bg-gray-100 flex justify-center items-center">
				<ProgressActivityIcon className="size-9 fill-gray-700 animate-spin" />
			</div>
			<p className="text-center">載入中，請稍候</p>
		</div>
	)
}

export function NoTaskCard() {
	return (
		<div className="rounded-2xl border border-gray-300 min-h-72 bg-white p-6 flex flex-col justify-center items-center gap-3 group hover:shadow-lg transition-shadow duration-700">
			<div className="rounded-full size-16 bg-gray-100 flex justify-center items-center">
				<TaskIcon className="size-9 fill-gray-700" />
			</div>
			<p className="text-center">目前沒有任務</p>
		</div>
	)
}

export function DataError() {
	return (
		<div className="rounded-2xl border border-gray-300 min-h-72 p-6 bg-white flex flex-col justify-center items-center gap-3 group hover:shadow-lg transition-shadow duration-700">
			<div className="rounded-full size-16 bg-gray-100 flex justify-center items-center">
				<ErrorIcon className="size-9 fill-gray-700" />
			</div>
			<p className="text-center">取得任務資料失敗，請稍後再試</p>
		</div>
	)
}