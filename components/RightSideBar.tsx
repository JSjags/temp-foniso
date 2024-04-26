"use client";

import React from "react";
import { Input } from "./ui/input";
import { SearchIcon } from "lucide-react";
import Trending from "./reusable/Trending";
import PeopleSuggestions from "./reusable/PeopleSuggestions";
import SidebarFooter from "./reusable/SidebarFooter";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

type Props = { className?: string };

const RightSideBar = (props: Props) => {
  const pathname = usePathname();

  return (
    <div
      className={cn(
        "hidden min-[860px]:block min-w-[200px] w-[30%] max-w-[480px] min-h-screen h-fit border-l border-border bg-background sticky",
        pathname === "/explore" ? "top-0" : "-top-[642px]",
        props.className
      )}
    >
      <div className="pb-[30vh]">
        {pathname !== "/explore" ? (
          <>
            <div className="py-5 px-6 relative">
              <div className="relative">
                <SearchIcon
                  size={18}
                  color="#888888"
                  className="absolute left-4 top-[18px]"
                />
                <Input
                  id="search"
                  placeholder="Search"
                  className="bg-transparent mt-2 pl-10 text-foreground border-border h-[54px] text-base placeholder:text-foreground/40 rounded-xl"
                />
              </div>
            </div>
            <Trending />
          </>
        ) : null}
        <PeopleSuggestions />
        <div className="relative">
          <SidebarFooter />
        </div>
      </div>
    </div>
  );
};

export default RightSideBar;
