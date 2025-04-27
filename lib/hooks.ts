import { useRouter, usePathname, useSearchParams } from "next/navigation";

export function useQueryParams() {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const setQueryParams = (params: Record<string, string>) => {
		const urlParams = new URLSearchParams(searchParams.toString());

		Object.entries(params).forEach(([key, value]) => {
			if (value === null || value === undefined) {
				urlParams.delete(key);
			} else {
				urlParams.set(key, value);
			}
		});

		router.push(`${pathname}?${urlParams.toString()}`);
	};

	return { searchParams, setQueryParams };
}