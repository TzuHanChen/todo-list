import type { Metadata } from "next";
import { Noto_Sans_TC } from "next/font/google";
import "./globals.css";

const notoSansTc = Noto_Sans_TC({
  variable: "--font-noto-sans-tc",
  subsets: ["latin"],
  fallback: ["sans-serif"]
});

export const metadata: Metadata = {
  title: "Todo List",
  description: "A todo list made by TzuHan Chen",
  openGraph: {
    type: "website",
    url: "https://todo-list-tzuhanchen.vercel.app",
    title: "ToDo List",
    description: "A todo list made by TzuHan Chen",
    siteName: "ToDo List",
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-TW">
      <body className={`relative bg-gray-100 text-gray-700 ${notoSansTc.variable} antialiased selection:bg-gray-800 selection:text-gray-300`}>
        <header className="absolute top-0 right-0 left-0">
          <div className="mx-auto w-full max-w-5xl bg-gray-200 py-3 px-6">
            <h1 className="text-2xl">ToDo List</h1>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
