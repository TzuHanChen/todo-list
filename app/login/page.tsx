import { Metadata } from "next";
import { LoginIcon } from "@/app/ui/icons";

export const metadata: Metadata = {
	title: "登入",
};

export default function Login() {
	return (
		<main className="min-h-dvh bg-gray-100 py-12 px-6 flex flex-col items-center justify-center">
			<form action="" className="mx-auto rounded-2xl w-full max-w-sm bg-white py-9 px-6 flex flex-col items-center">
				<div className="mb-3 rounded-full w-max p-3 bg-gray-100">
					<LoginIcon className="size-9 fill-gray-700" />
				</div>
				<h1 className="mb-9 text-4xl font-bold text-center">登入</h1>

				<label className="mb-6 w-full flex flex-col gap-2">
					<span>電子郵件</span>
					<input type="email" name="email" id="email" className="rounded-xl border border-gray-300 py-1.5 px-3 focus:outline-gray-300" />
				</label>
				<label className="mb-6 w-full flex flex-col gap-2">
					<span>密碼</span>
					<input type="password" name="password" id="password" className="rounded-xl border border-gray-300 py-1.5 px-3 focus:outline-gray-300" />
				</label>
				<input type="submit" value="登入" className="block rounded-full mx-auto w-max py-3 px-6 bg-teal-700 text-white cursor-pointer hover:bg-teal-900 active:bg-teal-900 transition-colors duration-300" />
			</form>

			<div className="mt-6 mx-auto rounded-2xl w-full max-w-sm">
				<p>測試用帳號：</p>
				<p>電子郵件：test@example.com</p>
				<p>密碼：test</p>
			</div>
		</main>
	)
}