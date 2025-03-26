'use client';

import { useCallback } from "react";
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react';
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { FilterAltIcon } from "./icons";

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
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentFilter = searchParams.get("showCompleted") || "all";
  const selectedOption = filters.find((option) => option.value === currentFilter) || filters[0];

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)
      return params.toString()
    },
    [searchParams],
  );

  const handleFilterChange = (value: FilterOption) => {
    router.push(pathname + "?" + createQueryString("showCompleted", value.value));
  }

  return (
    <Listbox value={selectedOption} onChange={handleFilterChange}>
      <ListboxButton className="rounded min-w-28 h-12 py-2 px-3 flex items-center gap-3 cursor-pointer hover:bg-gray-100 active:bg-gray-100 transition-colors duration-300">
        <FilterAltIcon className="fill-gray-700" />
        {selectedOption.name}
      </ListboxButton>
      <ListboxOptions anchor="bottom" className="shadow rounded min-w-28 bg-white">
        {filters.map((option) => (
          <ListboxOption key={option.id} value={option} className="w-full h-12 py-2 px-3 flex items-center gap-3 cursor-pointer data-[focus]:bg-gray-100 hover:bg-gray-100 active:bg-gray-100 transition-colors duration-300">
            {option.name}
          </ListboxOption>
        ))}
      </ListboxOptions>
    </Listbox>
  )
}