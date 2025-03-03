'use client';

import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { useState, useCallback } from "react"

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
		className="rounded-full py-1.5 px-4.5 flex items-center gap-1.5 group cursor-pointer hover:bg-gray-100 active:bg-gray-100 transition-colors duration-300">
			<span className="font-material-symbols-rounded font-variation-fill-1 text-2xl group-data-[show-completed=false]:hidden">visibility</span>
			<span className="font-material-symbols-rounded text-2xl hidden group-data-[show-completed=false]:inline">visibility_off</span>
			<span>顯示已完成</span>
		</button>
	)
}