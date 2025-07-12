import Link from "next/link";
import { CheckIcon, GridViewIcon, SortIcon } from "@/app/ui/icons";

export default function Home() {
	const featureData = [
		{
			icon: <CheckIcon className="size-9 fill-gray-700" />,
			title: "輕鬆追蹤",
			description: "簡單標記已完成的任務",
		},
		{
			icon: <SortIcon className="size-9 fill-gray-700" />,
			title: "篩選排序",
			description: "依照不同類別排序任務",
		},
		{
			icon: <GridViewIcon className="size-9 fill-gray-700" />,
			title: "切換檢視",
			description: "自由切換卡片或清單檢視模式",
		},
	];


	const features = featureData.map((feature, index) => (
		<div key={index} className="rounded-3xl w-full h-1/3 bg-white p-6 flex flex-col gap-3 md:flex-row md:items-center">
			<div className="rounded-full w-max p-3 bg-gray-100">{feature.icon}</div>
			<div className="">
				<h3 className="mb-1.5 text-xl font-semibold">{feature.title}</h3>
				<p>{feature.description}</p>
			</div>
		</div>
	))

	return (
		<main className="bg-gray-100 py-12 px-6">
			<section className="mx-auto w-full max-w-5xl flex flex-col gap-6 lg:flex-row">
				<div className="rounded-3xl bg-white py-18 px-9 flex flex-col justify-center gap-6 md:py-24 md:px-12 md:gap-9">
					<h1 className="text-3xl font-bold md:text-5xl">規劃．執行．完成</h1>
					<p className="text-xl md:text-3xl">簡單易用的待辦事項管理工具，幫助您完成生活與工作的目標</p>
					<Link href="/task" className="block rounded-full w-max py-3 px-6 bg-teal-700 text-white cursor-pointer hover:bg-teal-900 active:bg-teal-900 transition-colors duration-300">瀏覽待辦事項</Link>
				</div>
				<div className="shrink-0 flex flex-col gap-6">
					{features}
				</div>
			</section>
		</main>
	)
}