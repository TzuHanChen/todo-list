'use client';

import { useRef, useState } from 'react';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { createTask } from './actions';

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
		<Disclosure as="div" className="mx-auto w-full max-w-xl bg-gray-100">
			<DisclosureButton className="w-full py-3 px-6 flex justify-between items-center cursor-pointer group">
				<h2 className="flex items-center gap-1.5">
					<span className="font-material-symbols-rounded text-2xl">add_task</span>
					<span className="text-xl">新增任務</span>
				</h2>
				<span className="font-material-symbols-rounded text-2xl group-data-open:rotate-180 group-data-open:transition group-data-open:duration-300">keyboard_arrow_down</span>
			</DisclosureButton>

			<DisclosurePanel className="w-full flex flex-col gap-3 py-3 px-6">
				<label className="flex flex-col gap-1.5">
					<p>名稱</p>
					<input type="text" name="name" required maxLength={10} ref={nameRef}
						className="border border-gray-400 py-1.5 px-3" />
					{nameRequired && <p className="text-red-800">請輸入任務名稱</p>}
				</label>
				<label className="flex flex-col gap-1.5">
					<p>描述</p>
					<textarea name="description" maxLength={30} ref={descriptionRef}
						className="border border-gray-400 py-1.5 px-3 field-sizing-content"></textarea>
				</label>
				<div className="mt-3 flex justify-end">
					<button onClick={() => handleCreateTask()}
						className="bg-teal-700 py-3 px-6 text-white text-xl cursor-pointer active:bg-teal-900 transition-colors duration-300">新增</button>
				</div>
			</DisclosurePanel>
		</Disclosure>
	)
}