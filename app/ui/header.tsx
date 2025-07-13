import Link from "next/link";
import { TaskIcon } from "./icons";

export default function Header() {
	return (
		<header className="bg-gray-600 px-6 flex justify-between items-center">
			<Link href="/" className="w-max py-3 flex items-center gap-2">
				<div className="rounded-full bg-gray-100 p-1">
					<TaskIcon className="fill-gray-700" />
				</div>
				<p className="text-3xl text-white font-bold">ToDo List</p>
			</Link>

			<nav className="flex gap-3">
				<Link href="/task" className="block w-max p-3 text-lg text-white">任務</Link>
				<Link href="/api" className="block w-max p-3 text-lg text-white">API</Link>
			</nav>
		</header>
	)
}