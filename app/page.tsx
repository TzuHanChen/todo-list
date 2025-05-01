import Link from "next/link"
import { CheckIcon, SortIcon, TaskIcon } from "@/app/ui/icons"

function HeroSection() {
	return (
		<section className="mx-auto rounded-3xl w-full max-w-240 bg-white p-9 flex flex-col items-center justify-center text-center md:p-18">
			<h1 className="mb-6 text-3xl font-bold md: md:mb-12 md:text-5xl">高效管理您的任務</h1>
			<p className="mb-6 text-xl md:mb-12 md:text-3xl">簡單易用的待辦事項管理工具，幫助您組織生活和工作</p>
			<Link href="/login" className="rounded-full py-3 px-6 bg-teal-700 text-white cursor-pointer hover:bg-teal-800 active:bg-teal-800 transition-colors duration-300">登入</Link>
		</section>
	)
}

function FeatureSection() {
	const featureData = [
		{
			icon: <CheckIcon className="w-8 h-8" />,
			title: "輕鬆追蹤",
			description: "簡單標記已完成的任務，一目了然地查看您的進度",
		},
		{
			icon: <SortIcon className="w-8 h-8" />,
			title: "分類排序",
			description: "依照不同類別排序您的任務，讓工作和生活更有條理",
		},
		{
			icon: <TaskIcon className="w-8 h-8" />,
			title: "切換檢視",
			description: "自由切換卡片或清單檢視模式",
		},
	];

	const features = featureData.map((feature, index) => (
		<div key={index} className="shadow-md rounded-xl w-full bg-white p-6 flex flex-col gap-3 hover:shadow-lg transition-shadow duration-300">
			<div className="rounded-full w-max p-3 bg-gray-100">{feature.icon}</div>
			<h3 className="text-xl font-semibold">{feature.title}</h3>
			<p>{feature.description}</p>
		</div>
	))

	return (
		<section>
			<h2 className="mb-6 text-2xl font-bold text-center">功能介紹</h2>
			<div className="w-full grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
				{features}
			</div>
		</section>
	)
}

export default function Home() {
	return (
		<main className="bg-gray-100 py-12 px-6 flex flex-col items-center justify-center gap-12 md:gap-18">
			<HeroSection />
			<FeatureSection />
		</main>
	)
}