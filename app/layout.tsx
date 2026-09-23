import type { Metadata } from "next";
import { Anton, Inter } from "next/font/google";
import "./globals.css";

const anton = Anton({ subsets: ["latin"], weight: "400", variable: "--font-display" });
const inter = Inter({ subsets: ["latin"], variable: "--font-body" });

export const metadata: Metadata = {
  title: "V1 Streets | 1 vs 1 Football Competition",
  description: "Step into the cage. Register for V1 Streets, Jamaica's monthly 1 vs 1 football competition for Under 13, Under 16 and Open players.",
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${anton.variable} ${inter.variable}`}>{children}</body>
    </html>
  );
}
