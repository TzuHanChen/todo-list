import Link from "next/link";
import { LogoutIcon } from "@/app/ui/icons";

export default function Logout() {
	return (
		<main className="min-h-dvh bg-gray-100 py-12 px-6 flex flex-col items-center justify-center">
			<div className="mx-auto rounded-2xl w-full max-w-sm bg-white p-9 flex flex-col items-center">
				<div className="mb-3 rounded-full w-max p-3 bg-gray-100">
					<LogoutIcon className="size-9 fill-gray-700" />
				</div>
				<h1 className="mb-9 text-4xl font-bold">登出</h1>
				<p className="mb-6">您已成功登出系統</p>
				<Link href="/" className="block rounded-full mx-auto w-max py-3 px-6 bg-teal-700 text-white cursor-pointer hover:bg-teal-900 active:bg-teal-900 transition-colors duration-300">返回首頁</Link>
			</div>
		</main>
	)
}