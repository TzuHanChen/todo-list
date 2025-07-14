'use client';

import { useForm, SubmitHandler } from "react-hook-form";
import { LogInFormInputs } from "@/lib/types";
import { LoginIcon, ProgressActivityIcon } from "@/app/ui/icons";
import { logInWithCredentials } from "@/app/action/auth";

export default function LoginForm() {
	const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LogInFormInputs>();
	const onSubmit: SubmitHandler<LogInFormInputs> = async (data) => {
		await logInWithCredentials(data);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}
			className="mx-auto rounded-2xl w-full max-w-sm bg-white py-9 px-6 flex flex-col items-center">
			<div className="mb-3 rounded-full w-max p-3 bg-gray-100">
				<LoginIcon className="size-9 fill-gray-700" />
			</div>
			<h1 className="mb-9 text-4xl font-bold text-center">登入</h1>

			<label className="mb-6 w-full flex flex-col gap-2">
				<span>電子郵件</span>
				<input type="email" {...register("email", {
					required: "請輸入電子郵件",
					pattern: { value: /^\S+@\S+\.\S{2,4}$/i, message: "請輸入有效的電子郵件" }
				})}
					autoComplete="email"
					aria-invalid={errors.email ? "true" : "false"}
					className="rounded-xl border border-gray-300 py-1.5 px-3 focus:outline-gray-300 invalid:outline-red-500" />
				{errors.email &&
					<span role="alert" className="text-red-500 text-sm">{errors.email.message}</span>}
			</label>

			<label className="mb-6 w-full flex flex-col gap-2">
				<span>密碼</span>
				<input type="password" {...register("password", {
					required: "請輸入密碼",
					pattern: { value: /^\S{8,20}$/, message: "密碼必須為 8 - 20 個字元" }
				})}
					autoComplete="current-password"
					aria-invalid={errors.password ? "true" : "false"}
					className="rounded-xl border border-gray-300 py-1.5 px-3 focus:outline-gray-300" />
				{errors.password &&
					<span role="alert" className="text-red-500 text-sm">{errors.password.message}</span>}
			</label>

			<button type="submit"
				disabled={isSubmitting}
				className="rounded-full mx-auto w-max bg-teal-700 py-3 px-6 flex items-center gap-1.5 text-white cursor-pointer hover:bg-teal-900 active:bg-teal-900 transition-colors duration-300 disabled:bg-gray-500 disabled:cursor-not-allowed">
				{isSubmitting && <ProgressActivityIcon className="size-5 fill-white animate-spin" />}
				<span>{isSubmitting ? "登入中..." : "登入"}</span>
			</button>
		</form>
	)
}