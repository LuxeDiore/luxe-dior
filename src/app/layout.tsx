import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";
import { Toaster } from "@/components/ui/toaster";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/theme-provider";
import Footer from "@/components/Footer";
import { Analytics } from "@vercel/analytics/react";
import Head from "next/head";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Luxe Dior",
  icons: "logo.png",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/icon.png" />
      </Head>
      <ClerkProvider>
        <body className={inter.className}>
          {" "}
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <NavBar />
            <main className="flex flex-col min-h-[calc(100vh-3.5rem-1px)] ">
              <div className="flex-1 flex flex-col h-full">{children}</div>
              <Toaster />
            </main>
            <Footer />
          </ThemeProvider>
          <Analytics />
        </body>
      </ClerkProvider>
    </html>
  );
}
