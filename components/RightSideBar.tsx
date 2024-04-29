"use client";

import React, { ReactNode } from "react";
import { Input } from "./ui/input";
import { SearchIcon } from "lucide-react";
import Trending from "./reusable/Trending";
import PeopleSuggestions from "./reusable/PeopleSuggestions";
import SidebarFooter from "./reusable/SidebarFooter";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  containerClassName?: string;
  component?: ReactNode;
};

const RightSideBar = (props: Props) => {
  const pathname = usePathname();

  return (
    <div
      className={cn(
        "hidden min-[860px]:block min-w-[280px] w-[40%] max-w-[480px] min-h-screen h-fit border-l border-border bg-background sticky",
        pathname === "/explore" ? "top-0" : "top-0",
        // pathname === "/explore" ? "top-0" : "-top-[642px]",
        props.containerClassName
      )}
    >
      {props.component}
    </div>
  );
};

export default RightSideBar;
