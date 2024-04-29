import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { DM_Sans as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/ThemeProvider";
import { TanstackProvider } from "@/providers/TanstackProvider";
import { Toaster } from "react-hot-toast";
import NextAuthProvider from "@/providers/NextAuthProvider";
import { UserProvider } from "@/context/UserContext";

// const fontSans = FontSans({
//   subsets: ["latin"],
//   variable: "--font-sans",
//   display: "swap",
//   adjustFontFallback: false,
// });

export const metadata: Metadata = {
  title: "Foniso",
  description: "Your all",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link
        rel="icon"
        href="/icon?<generated>"
        type="image/<generated>"
        sizes="<generated>"
      />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased"
          // fontSans.variable
        )}
      >
        <UserProvider>
          <NextAuthProvider>
            <TanstackProvider>
              <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
              >
                {children}
              </ThemeProvider>
            </TanstackProvider>
          </NextAuthProvider>
        </UserProvider>

        <Toaster />
      </body>
    </html>
  );
}
