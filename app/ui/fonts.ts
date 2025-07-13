import { Noto_Sans_TC, Fira_Code } from "next/font/google";

export const notoSansTc = Noto_Sans_TC({
	weight: ['400', '500', '700'],
	subsets: ["latin"],
	fallback: ["sans-serif"],
	display: 'swap',
	variable: "--font-noto-sans-tc",
});
export const firaCode = Fira_Code({
	weight: ['400', '700'],
	subsets: ["latin"],
	fallback: ["monospace"],
	display: 'swap',
	variable: "--font-fira-code",
});