import Link from "next/link";
import { AddIcon, CheckIcon, DeleteIcon, EditSquareIcon, FilterAltIcon, GridViewIcon, SortIcon } from "@/app/ui/icons";

function Slogan() {
	return (
		<div className="rounded-3xl bg-white p-9 flex flex-col justify-center gap-6 md:col-span-2 md:p-12">
			<h1 className="text-3xl font-bold md:text-5xl">規劃．執行．完成</h1>
			<p className="text-xl md:text-3xl">簡單易用的任務管理工具，幫助您完成生活與工作的目標</p>
			<Link href="/task" className="block rounded-full w-max py-3 px-6 bg-teal-700 text-white cursor-pointer hover:bg-teal-900 active:bg-teal-900 transition-colors duration-300">瀏覽任務</Link>
		</div>
	)
}

function MainFeature() {
	return (
		<div className="rounded-3xl w-full bg-white p-6 flex flex-col justify-center gap-3">
			<div className="flex gap-3 flex-wrap lg:gap-0 lg:justify-between">
				<div className="rounded-full w-max p-3 bg-gray-100">
					<AddIcon className="size-9 fill-gray-700" />
				</div>
				<div className="rounded-full w-max p-3 bg-gray-100">
					<GridViewIcon className="size-9 fill-gray-700" />
				</div>
				<div className="rounded-full w-max p-3 bg-gray-100">
					<EditSquareIcon className="size-9 fill-gray-700" />
				</div>
				<div className="rounded-full w-max p-3 bg-gray-100">
					<DeleteIcon className="size-9 fill-gray-700" />
				</div>
			</div>
			<div>
				<h3 className="mb-1.5 text-xl font-semibold">任務管理</h3>
				<p>實作完整 CRUD 功能的任務管理系統</p>
			</div>
		</div>
	)
}

function Features() {
	const featureData = [
		{
			icon: <CheckIcon className="size-9 fill-gray-700" />,
			title: "標記",
			description: "簡單標記已完成的任務",
		},
		{
			icon: <FilterAltIcon className="size-9 fill-gray-700" />,
			title: "篩選",
			description: "依照完成與否篩選任務",
		},
		{
			icon: <SortIcon className="size-9 fill-gray-700" />,
			title: "排序",
			description: "根據創建或更新時間排序",
		},
	];

	return featureData.map((feature, index) => (
		<div key={index} className="rounded-3xl w-full bg-white p-6 flex flex-col gap-3 lg:flex-row lg:items-center">
			<div className="rounded-full w-max p-3 bg-gray-100">{feature.icon}</div>
			<div>
				<h3 className="mb-1.5 text-xl font-semibold">{feature.title}</h3>
				<p>{feature.description}</p>
			</div>
		</div>
	))
}

export default function Home() {
	return (
		<main className="bg-gray-100 py-12 px-6">
			<section className="mx-auto w-full max-w-5xl grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
				<Slogan />
				<MainFeature />
				<Features />
			</section>
		</main>
	)
}