import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Providers from "@/providers/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GIPHY",
  description: "For AlphaBI - By Bhagya",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Providers>
        <body className={`${inter.className} bg-gray-200 px-5 md:px-[15%]`}>
          {children}
        </body>
      </Providers>
    </html>
  );
}
