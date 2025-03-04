'use client';

import { useState, useCallback } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { VisibilityIcon, VisibilityOffIcon } from "./icons";

export default function ShowCompleted() {
	const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

	const [showCompleted, setShowCompleted] = useState(true);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)
      return params.toString()
    },
    [searchParams],
  );

	const handleToggle = (showCompleted: boolean) => {
		setShowCompleted(showCompleted);
		router.push(pathname + "?" + createQueryString("show-completed", showCompleted.toString()));
	}

	return (
		<button data-show-completed={showCompleted} onClick={() => handleToggle(!showCompleted)}
		className="rounded-full h-10 py-1.5 pr-4 pl-3 flex items-center gap-2 group cursor-pointer hover:bg-gray-100 active:bg-gray-100 transition-colors duration-300">
			<VisibilityIcon className="fill-gray-700 group-data-[show-completed=false]:hidden" />
			<VisibilityOffIcon className="fill-gray-700 group-data-[show-completed=true]:hidden" />
			<span>顯示已完成</span>
		</button>
	)
}