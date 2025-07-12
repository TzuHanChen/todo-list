import Link from "next/link";

export default function Header() {
	return (
		<header className="bg-gray-600 flex justify-between items-center">
			<Link href="/" className="block w-max py-4.5 px-6">
				<p className="text-3xl text-white font-bold">ToDo List</p>
			</Link>
			{/* <Link href="/api" className="block w-max py-4.5 px-6">
				<p className="flex items-center gap-1.5">
					<span className="text-xl text-white">API</span>
					<ArrowForwardIcon className="fill-white" />
				</p>
			</Link> */}
		</header>
	)
}