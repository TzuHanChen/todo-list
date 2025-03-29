'use client';

import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react';
import { CheckIcon, SortIcon } from "./icons";
import { useQueryParams } from "@/hook/useQueryParams";

type SortOption = {
	id: number;
	name: string;
	sortBy: string,
	sortOrder: string,
}

const sorts = [
	{ id: 1, name: '新增時間 新到舊', sortBy: 'created_at', sortOrder: 'desc' },
	{ id: 2, name: '新增時間 舊到新', sortBy: 'created_at', sortOrder: 'asc' },
	{ id: 3, name: '更新時間 新到舊', sortBy: 'updated_at', sortOrder: 'desc' },
	{ id: 4, name: '更新時間 舊到新', sortBy: 'updated_at', sortOrder: 'asc' },
]

export default function Sort() {
	const { searchParams, setQueryParams } = useQueryParams();

	const currentSortBy = searchParams.get("sortBy") || "created_at";
	const currentSortOrder = searchParams.get("sortOrder") || "desc";
	const selectedOption = sorts.find((option) => {
		return (option.sortBy === currentSortBy) && (option.sortOrder === currentSortOrder)
	}) || sorts[0];

	const handleSortChange = (value: SortOption) => {
		setQueryParams({
			sortBy: value.sortBy,
			sortOrder: value.sortOrder
		});
	};

	return (
		<Listbox value={selectedOption} onChange={handleSortChange}>
			<ListboxButton className="rounded h-12 py-2 px-3 flex items-center gap-3 cursor-pointer sm:min-w-44 hover:bg-gray-100 active:bg-gray-100 transition-colors duration-300">
				<SortIcon className="fill-gray-700" />
				<span className="hidden sm:inline">{selectedOption.name}</span>
			</ListboxButton>
			<ListboxOptions anchor="bottom end" className="shadow rounded min-w-44 bg-white">
				{sorts.map((option) => (
					<ListboxOption key={option.id} value={option} className="w-full h-12 py-2 px-3 flex items-center gap-3 cursor-pointer data-[focus]:bg-gray-100 hover:bg-gray-100 active:bg-gray-100 transition-colors duration-300">
						{selectedOption.id === option.id ? <CheckIcon /> : <span className='w-6'></span>}
						{option.name}
					</ListboxOption>
				))}
			</ListboxOptions>
		</Listbox>
	)
}