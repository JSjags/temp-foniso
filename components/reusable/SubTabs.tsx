"use client";

import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { Button } from "../ui/button";

type Props = { tabs: string[] };

const SubTabs = ({ tabs }: Props) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const tab = searchParams.get("tab");
  const searchQuery = searchParams.get("search");

  const styleActiveTab = (currentTab: string) => {
    if (tab === currentTab) {
      return "text-colorPrimary";
    }
    if (tab === null && currentTab.toLowerCase() === "all") {
      return "text-colorPrimary";
    }
  };
  const activeTabStyling = (currentTab: string) => {
    if (tab === currentTab) {
      return "bg-colorPrimary";
    }
    if (tab === null && currentTab.toLowerCase() === "all") {
      return "bg-colorPrimary";
    }
  };

  return (
    <div className="w-full flex justify-between overflow-x-scroll hide-scrollbar">
      {tabs.map((tab, i) => (
        <div key={i} className="relative flex flex-col items-center w-fit">
          <Button
            onClick={() => {
              if (searchQuery !== null) {
                return router.push(
                  `?search=${searchQuery}&tab=${tab.toLowerCase()}`
                );
              }

              return router.push(`?tab=${tab.toLowerCase()}`);
            }}
            className={cn(
              "rounded-none min-w-20 bg-background hover:bg-background text-foreground/70 text-base sm:text-lg font-medium",
              styleActiveTab(tab.toLowerCase())
            )}
          >
            {tab}
          </Button>
          <div
            className={cn(
              "h-[3px] w-[80px] rounded-t-full",
              activeTabStyling(tab.toLowerCase())
            )}
          />
        </div>
      ))}
    </div>
  );
};

export default SubTabs;
