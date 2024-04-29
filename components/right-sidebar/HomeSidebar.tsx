"use client";

import { cn } from "@/lib/utils";
import { SearchIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { Input } from "../ui/input";
import Trending from "../reusable/Trending";
import PeopleSuggestions from "../reusable/PeopleSuggestions";
import SidebarFooter from "../reusable/SidebarFooter";
import axiosInstance from "@/services/api/axiosInstance";
import ExploreSearch from "../reusable/ExploreSearch";

type Props = {
  containerClassName?: string;
};

const HomeSidebar = (props: Props) => {
  const pathname = usePathname();
  return (
    <div className="pb-[30vh]">
      {/* hide for now */}
      {pathname !== "/explore" ? (
        <>
          <div className="py-5 px-6 relative">
            <ExploreSearch inputStyle="bg-transparent mt-2 pl-10 text-foreground border-border h-[54px] text-base placeholder:text-foreground/40 rounded-xl" />
          </div>
          {/* <Trending /> */}
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
