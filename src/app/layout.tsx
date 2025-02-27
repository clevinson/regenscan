import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Head from "next/head";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Regen Dataset Explorer",
  description:
    "Regenscan is an ecological data explorer for credits and claims registered on the Regen Network blockchain.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <link rel="stylesheet" href="/fontawesome/css/all.min.css" />
      </Head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
