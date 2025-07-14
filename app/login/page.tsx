import { Metadata } from "next";
import LoginForm from "./form";

export const metadata: Metadata = {
	title: "登入",
};

export default function Login() {
	return (
		<main className="min-h-dvh bg-gray-100 py-12 px-6 flex flex-col items-center justify-center">
			<LoginForm />

			<div className="mt-6 mx-auto rounded-2xl w-full max-w-sm">
				<p>測試用帳號：</p>
				<p>電子郵件：test@example.com</p>
				<p>密碼：todolist</p>
			</div>
		</main>
	)
}