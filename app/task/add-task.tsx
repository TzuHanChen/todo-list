'use client';

import { useRef, useState } from 'react';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { createTask } from '@/app/action/task';
import { AddIcon, AddTaskIcon, KeyboardArrowDownIcon } from '@/app/ui/icons';

export default function AddTask() {
	const nameRef = useRef<HTMLInputElement>(null);
	const descriptionRef = useRef<HTMLTextAreaElement>(null);
	const [nameRequired, setNameRequired] = useState(false);

	function handleCreateTask() {
		if (nameRef.current && descriptionRef.current) {
			if (nameRef.current.value === '') {
				setNameRequired(true);
			} else {
				setNameRequired(false);
				const formData = new FormData();
				formData.set('name', nameRef.current.value);
				formData.set('description', descriptionRef.current.value);
				createTask(formData);
			}
		}
	}

	return (
		<Disclosure as="div" className="mx-auto rounded-xl border border-gray-300 w-full max-w-xl bg-white">
			<DisclosureButton className="rounded-xl w-full py-3 px-6 flex justify-between items-center cursor-pointer group hover:bg-teal-50 active:bg-teal-50 transition-colors duration-300 data-open:rounded-b-none">
				<h2 className="flex items-center gap-2">
					<AddTaskIcon className="fill-teal-700" />
					<span className="text-xl text-teal-700">新增任務</span>
				</h2>
				<KeyboardArrowDownIcon className="fill-teal-700 group-data-open:rotate-180 transition duration-300" />
			</DisclosureButton>

			<DisclosurePanel className="rounded-b-2xl w-full pt-3 px-6 pb-6 flex flex-col gap-3">
				<label className="flex flex-col gap-1.5">
					<p>名稱</p>
					<input type="text" name="name" required maxLength={10} ref={nameRef}
						className="rounded-2xl border border-gray-300 h-10 py-1.5 px-3" />
					{nameRequired && <p className="text-red-800">請輸入任務名稱</p>}
				</label>
				<label className="flex flex-col gap-1.5">
					<p>描述</p>
					<textarea name="description" maxLength={100} ref={descriptionRef}
						className="rounded-2xl border border-gray-300 min-h-10 py-1.5 px-3 field-sizing-content"></textarea>
				</label>
				<div className="mt-3 flex justify-end">
					<button onClick={() => handleCreateTask()}
						className="rounded-full h-10 py-1.5 pr-6 px-4 flex items-center gap-2 bg-teal-700 text-white cursor-pointer hover:bg-teal-800 active:bg-teal-800 transition-colors duration-300">
						<AddIcon className="fill-white" />
						<span>新增</span>
					</button>
				</div>
			</DisclosurePanel>
		</Disclosure>
	)
}