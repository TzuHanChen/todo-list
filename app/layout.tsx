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
  description: "A todo list made by TzuHan Chen",
  openGraph: {
    type: "website",
    url: "https://todo-list-tzuhanchen.vercel.app",
    title: "ToDo List",
    description: "A todo list made by TzuHan Chen",
    siteName: "ToDo List",
    images: "https://todo-list-tzuhanchen.vercel.app/opengraph-image.jpg"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-TW">
      <body className={`relative bg-gray-50 text-gray-700 ${notoSansTc.variable} font-noto antialiased selection:bg-gray-700 selection:text-gray-200`}>
        <header className="absolute top-0 right-0 left-0">
          <div className="block mx-auto w-full max-w-5xl bg-gray-100">
            <Link href="/" className="block w-max py-3 px-6">
              <h1 className="text-2xl">ToDo List</h1>
            </Link>
          </div>
        </header>
        {children}
        <footer className="mx-auto w-full max-w-5xl bg-gray-100 py-3 px-6 text-center">
          <p>© 2025 陳子涵</p>
        </footer>
      </body>
    </html>
  );
}
