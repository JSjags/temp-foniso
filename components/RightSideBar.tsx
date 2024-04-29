"use client";

import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

import { WrapperProps } from "@/types";
import HomeSidebar from "./right-sidebar/HomeSidebar";

const RightSideBar = ({ children, className }: WrapperProps) => {
  const pathname = usePathname();

  return (
    <div
      className={cn(
        "hidden min-[860px]:block min-w-[280px] w-[40%] max-w-[480px] min-h-screen h-fit border-l border-border bg-background sticky",
        pathname === "/explore" ? "top-0" : "top-0",
        className
      )}
    >
      {children ? children : <HomeSidebar />}
    </div>
  );
};

export default RightSideBar;
