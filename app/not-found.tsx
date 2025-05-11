import { Metadata } from "next";
import Link from "next/link";
import { ArrowBackIcon, NotListedLocationIcon } from "./ui/icons";

export const metadata: Metadata = {
	title: "404 Not Found",
};

export default function NotFound() {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="rounded-2xl border border-gray-300 min-w-72 min-h-72 p-9 flex flex-col justify-center items-center gap-3 group hover:shadow-lg transition-shadow duration-700">
        <div className="rounded-full size-16 bg-gray-100 flex justify-center items-center">
          <NotListedLocationIcon className="size-9 fill-gray-700" />
        </div>
        <p className="text-2xl text-center">404 Not Found</p>
        <p className="mb-6 text-center">您所尋找的頁面不存在或已被刪除</p>
        <Link href="/" className="rounded-full border border-gray-300 h-10 bg-white py-1.5 pr-6 pl-4 flex items-center gap-2 text-gray-700 cursor-pointer hover:bg-gray-100 active:bg-gray-100 transition-colors duration-300">
          <ArrowBackIcon className="fill-gray-700" />
          <span>返回首頁</span>
        </Link>
      </div>
    </div>
  )
}