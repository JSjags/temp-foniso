"use client";

import SidebarFooter from "@/components/reusable/SidebarFooter";
import SportIcon from "@/components/reusable/SportIcon";
import SubTabs from "@/components/reusable/SubTabs";
import RightSideBar from "@/components/RightSideBar";
import {
  SearchCommunities,
  SearchPeople,
  SearchPost,
} from "@/components/sub-pages/explore";
import Organization from "@/components/sub-pages/verification/Organization";
import Professional from "@/components/sub-pages/verification/Professional";
import { Button } from "@/components/ui/button";
import { profileStatsTab } from "@/constants";
import { useUserContext } from "@/context/UserContext";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { IoArrowBack } from "react-icons/io5";

type Props = {};

const Page = (props: Props) => {
  const searchParams = useSearchParams();

  const tab = searchParams.get("type");

  const handleCurrentView = () => {
    switch (tab) {
      case "professional":
        return <Professional />;
      case "organization":
        return <Organization />;
      default:
        return <Professional />;
    }
  };
  return (
    <div className="flex gap-0 min-[480px]:gap-2">
      <div className="relative mt-2 min-[480px]:mt-0 flex-1 bg-background">
        <div>{handleCurrentView()}</div>
      </div>
      <div
        className={
          "hidden min-[860px]:block min-w-[200px] w-[40%] max-w-[480px] gap-0 min-[480px]:gap-2 bg-background"
        }
      >
        <div
          className={cn(
            "hidden min-[860px]:block min-w-[280px] max-w-[480px] min-h-screen h-fit border-l border-border bg-background sticky pt-16"
          )}
        >
          <div className="">
            <Image
              src={
                tab === "professional"
                  ? "/assets/graphics/profile-embed.svg"
                  : "/assets/graphics/org-profile-embed.svg"
              }
              alt="profile embed"
              width={351}
              height={282}
              className="w-3/4 max-w-3/4 rounded-lg"
            />
            <Image
              src={
                tab === "professional"
                  ? "/assets/graphics/post-embed.svg"
                  : "/assets/graphics/org-post-embed.svg"
              }
              alt="post embed"
              width={351}
              height={282}
              className="w-3/4 max-w-3/4 rounded-lg translate-x-16 -translate-y-36"
            />
          </div>
          <div className="relative -translate-y-20">
            <SidebarFooter />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
