'use client';

import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react';
import { CheckIcon, FilterAltIcon } from "./icons";
import { useQueryParams } from "@/lib/hooks";

type FilterOption = {
  id: number;
  name: string;
  value: string;
}

const filters = [
  { id: 1, name: '全部', value: 'all' },
  { id: 2, name: '未完成', value: 'uncompleted' },
  { id: 3, name: '已完成', value: 'completed' },
]

export default function Filter() {
  const { searchParams, setQueryParams } = useQueryParams();

  const currentFilter = searchParams.get("showCompleted") || "all";
  const selectedOption = filters.find((option) => option.value === currentFilter) || filters[0];

  const handleFilterChange = (value: FilterOption) => {
    setQueryParams({ showCompleted: value.value });
  }

  return (
    <Listbox value={selectedOption} onChange={handleFilterChange}>
      <ListboxButton className="rounded h-12 py-2 px-3 flex items-center gap-3 cursor-pointer sm:min-w-27 hover:bg-gray-100 active:bg-gray-100 transition-colors duration-300">
        <FilterAltIcon className="fill-gray-700" />
        <span className="hidden sm:inline">{selectedOption.name}</span>
      </ListboxButton>
      <ListboxOptions anchor="bottom end" className="shadow rounded min-w-27 bg-white">
        {filters.map((option) => (
          <ListboxOption key={option.id} value={option} className="w-full h-12 py-2 px-3 flex items-center gap-3 cursor-pointer data-[focus]:bg-gray-100 hover:bg-gray-100 active:bg-gray-100 transition-colors duration-300">
            {selectedOption.id === option.id ? <CheckIcon /> : <span className='w-6'></span>}
            {option.name}
          </ListboxOption>
        ))}
      </ListboxOptions>
    </Listbox>
  )
}