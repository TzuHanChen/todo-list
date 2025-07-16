import Link from "next/link";
import { TaskIcon } from "./icons";

export default function Header() {
	return (
		<header className="bg-gray-600 px-6">
			<div className="mx-auto w-full max-w-5xl flex justify-between items-center">
				<Link href="/" className="w-max py-3 flex items-center gap-2">
					<div className="rounded-full bg-gray-100 p-1">
						<TaskIcon className="fill-gray-700" />
					</div>
					<p className="text-xl text-white font-bold md:text-3xl">ToDo List</p>
				</Link>

				<nav className="flex gap-6">
					<Link href="/task" className="block w-max py-3 text-white md:text-xl">任務</Link>
					<Link href="/api-doc" className="block w-max py-3 text-white md:text-xl">API 文件</Link>
				</nav>
			</div>
		</header>
	)
}