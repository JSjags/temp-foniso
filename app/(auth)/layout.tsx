import type { Metadata } from "next";
import "./globals.css";
import { AppProvider } from "../../context";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { DownloadModal } from "@/components/Modal/downloadModal";
import { DM_Sans } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import { cn } from "@/lib/utils";

// const global_font = DM_Sans({ subsets: ["latin"] });

const fontSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Foniso",
  description: "Your All-in-One Sports App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // <html lang="en">
    //   <link
    //     rel="icon"
    //     href="/icon?<generated>"
    //     type="image/<generated>"
    //     sizes="<generated>"
    //   />
    <div className={cn(fontSans.variable)}>
      <AppProvider>
        <body className={global_font.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <ToastContainer />
          </ThemeProvider>
        </body>
      </AppProvider>
    </html>
  );
}
