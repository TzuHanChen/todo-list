import type { Metadata } from "next";
import { Noto_Sans_TC } from "next/font/google";
import "./globals.css";

const notoSansTc = Noto_Sans_TC({
  weight: ['400', '700'],
  subsets: ["latin"],
  fallback: ["sans-serif"],
  display: 'swap',
  variable: "--font-noto",
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
        {children}
      </body>
    </html>
  );
}
