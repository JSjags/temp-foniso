"use client";

import { cn } from "@/lib/utils";
import { SearchIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import React from "react";
import { Input } from "../ui/input";
import Trending from "../reusable/Trending";
import PeopleSuggestions from "../reusable/PeopleSuggestions";
import SidebarFooter from "../reusable/SidebarFooter";

type Props = {
  containerClassName?: string;
};

const HomeSidebar = (props: Props) => {
  const pathname = usePathname();
  return (
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
  );
};

export default HomeSidebar;
