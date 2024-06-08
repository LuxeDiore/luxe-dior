import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";
import { Toaster } from "@/components/ui/toaster";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/theme-provider";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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
            </main>
            <Toaster />
          </ThemeProvider>
        </body>
      </ClerkProvider>
    </html>
  );
}
