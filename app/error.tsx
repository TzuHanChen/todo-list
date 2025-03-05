'use client';

import Link from "next/link";
import { ArrowBackIcon, ErrorIcon } from "./icons";

export default function Error() {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="rounded-2xl border border-gray-300 min-w-72 min-h-72 p-9 flex flex-col justify-center items-center gap-3 group hover:shadow-lg transition-shadow duration-700">
        <div className="rounded-full size-16 bg-gray-100 flex justify-center items-center">
          <ErrorIcon className="size-9 fill-gray-700" />
        </div>
        <p className="text-2xl text-center">500 Internal Server Error</p>
        <p className="mb-6 text-center">網站出現錯誤，請稍後再試一次</p>
        <Link href="/" className="rounded-full border border-gray-300 h-10 bg-white py-1.5 pr-6 pl-4 flex items-center gap-2 text-gray-700 cursor-pointer hover:bg-gray-100 active:bg-gray-100 transition-colors duration-300">
          <ArrowBackIcon className="fill-gray-700" />
          <span>返回首頁</span>
        </Link>
      </div>
    </div>
  )
}