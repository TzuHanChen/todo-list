import Link from "next/link";
import { Fira_Code } from "next/font/google";

const firaCode = Fira_Code({
  weight: ['400', '700'],
  subsets: ["latin"],
  fallback: ["sans-serif"],
  display: 'swap',
  variable: "--font-fira",
});

export default function APIdocument() {
	return (
		<div className="my-12 mx-auto shadow-md rounded-2xl border border-gray-200 w-full max-w-5xl">
			<header className="rounded-t-2xl bg-gray-600 flex items-center gap-1.5">
				<Link href="/" className="block w-max py-4.5 px-6">
					<h1 className="text-3xl text-white font-bold">ToDo List</h1>
				</Link>
				<h2 className="text-xl text-white">API document</h2>
			</header>

			<main className={`py-12 px-6 ${firaCode.variable} [&>code]:font-fira`}>
				API route, payload, response code...

				<code>test</code>
			</main>

			<footer className="rounded-b-2xl bg-gray-100 py-3 px-6 text-center">
				<p>© 2025 陳子涵</p>
			</footer>
		</div>
	)
}