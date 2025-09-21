import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import { metadata } from "../models/data/metadata";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <title>{String(metadata.title ?? "Timorya | Time Tracking App")}</title>
        <meta
          name="description"
          content={String(
            metadata.description ?? "A simple time tracking app for developers",
          )}
        />
      </head>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
