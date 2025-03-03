import type { Metadata } from "next";
import { Noto_Sans_TC } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const notoSansTc = Noto_Sans_TC({
  variable: "--font-noto",
  subsets: ["latin"],
  fallback: ["sans-serif"]
});

export const metadata: Metadata = {
  title: "Todo List",
  description: "實作完整 CRUD 功能的任務管理系統，可顯示或隱藏已完成的任務",
  openGraph: {
    type: "website",
    url: "https://todo-list-tzuhanchen.vercel.app",
    title: "ToDo List",
    description: "實作完整 CRUD 功能的任務管理系統，可顯示或隱藏已完成的任務",
    siteName: "ToDo List",
    images: "https://todo-list-tzuhanchen.vercel.app/opengraph-image.jpg"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-TW">
      <body className={`px-6 text-gray-700 ${notoSansTc.variable} font-noto antialiased selection:bg-gray-700 selection:text-gray-200`}>
        <div className="my-12 mx-auto shadow-md rounded-2xl border border-gray-200 w-full max-w-5xl">
          <header className="rounded-t-2xl bg-gray-600">
            <Link href="/" className="block w-max py-4.5 px-6">
              <h1 className="text-3xl text-white font-bold">ToDo List</h1>
            </Link>
          </header>
          {children}
          <footer className="rounded-b-2xl bg-gray-100 py-3 px-6 text-center">
            <p>© 2025 陳子涵</p>
          </footer>
        </div>
      </body>
    </html>
  );
}
