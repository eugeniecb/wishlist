import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { WishlistProvider } from "@/lib/context";
import Nav from "@/components/Nav";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Wishlist",
  description: "Save things you love from anywhere on the internet.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geist.className} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-zinc-950">
        <WishlistProvider>
          <Nav />
          {children}
        </WishlistProvider>
      </body>
    </html>
  );
}
