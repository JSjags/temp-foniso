import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { AppProvider } from "../../context";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { DownloadModal } from "@/components/Modal/downloadModal";
import Analytics from "@/components/gAnalytics";
import LeftSideBar from "@/components/LeftSideBar";
import RightSideBar from "@/components/RightSideBar";
import { headers } from "next/headers";
import Titlebar from "@/components/Titlebar";
import { ThemeProvider } from "@/components/ThemeProvider";

const global_font = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Foniso",
  description: "Your All-in-One Sports App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = headers();
  // const pathname = headersList.get("next-url") || "";

  // console.log(pathname);

  return (
    // <html lang="en">
    //   <link
    //     rel="icon"
    //     href="/icon?<generated>"
    //     type="image/<generated>"
    //     sizes="<generated>"
    //   />
    <div className={global_font.className}>
      <Analytics />
      <AppProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="mx-auto w-full flex justify-center gap-0 min-[480px]:gap-2 bg-[##E0E5E2] dark:bg-bgEffect max-w-[1560px] h-screen overflow-y-scroll">
            <LeftSideBar />
            {/* max-w-[740px] */}
            <div className="flex-1 min-w-[240px] h-fit bg-background sm:bg-transparent pb-20 sm:pb-4">
              {/* Titlebar is only for mobile devices */}
              <Titlebar />
              {children}
            </div>
          </div>
          <ToastContainer />
        </ThemeProvider>
      </AppProvider>
    </div>
    // </html>
  );
}
