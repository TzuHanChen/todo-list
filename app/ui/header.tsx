import Link from "next/link";

export default function Header() {
	return (
		<header className="bg-gray-600 flex justify-between items-center">
			<Link href="/" className="block w-max py-4.5 px-6">
				<h1 className="text-3xl text-white font-bold">ToDo List</h1>
			</Link>
			{/* <Link href="/api" className="block w-max py-4.5 px-6">
				<h2 className="flex items-center gap-1.5">
					<span className="text-xl text-white">API document</span>
					<ArrowForwardIcon className="fill-white" />
				</h2>
			</Link> */}
		</header>
	)
}