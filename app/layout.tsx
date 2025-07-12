import { Metadata } from "next";
import { notoSansTc } from "./ui/fonts";
import "./globals.css";
import Header from "./ui/header";
import Footer from "./ui/footer";

export const metadata: Metadata = {
  title: { default: "Todo List", template: "%s | Todo List" },
  description: "實作完整 CRUD 功能的任務管理系統，可顯示或隱藏已完成的任務",
  icons: "/icon.svg",
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
      <body className={`text-gray-700 ${notoSansTc.variable} font-noto-sans-tc antialiased selection:bg-gray-700 selection:text-gray-200`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
