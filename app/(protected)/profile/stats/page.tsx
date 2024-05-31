"use client";

import SportIcon from "@/components/reusable/SportIcon";
import SubTabs from "@/components/reusable/SubTabs";
import RightSideBar from "@/components/RightSideBar";
import {
  SearchCommunities,
  SearchPeople,
  SearchPost,
} from "@/components/sub-pages/explore";
import { Button } from "@/components/ui/button";
import { profileStatsTab } from "@/constants";
import { useUserContext } from "@/context/UserContext";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { IoArrowBack } from "react-icons/io5";

type Props = {};

const Page = (props: Props) => {
  const router = useRouter();
  const { userData } = useUserContext();
  const searchParams = useSearchParams();

  const tab = searchParams.get("tab");

  const handleCurrentView = () => {
    switch (tab) {
      case "followers":
        return <SearchPost />;
      case "following":
        return <SearchPeople />;
      case "verified-followers":
        return <SearchCommunities />;
      default:
        return <SearchPost />;
    }
  };
  return (
    <div className="flex gap-0 min-[480px]:gap-2">
      <div className="relative mt-2 min-[480px]:mt-0 flex-1 bg-background">
        <div className="flex gap-x-4 items-center p-4">
          <Button
            onClick={() => router.back()}
            className="size-8 p-1 flex justify-center items-center bg-black/50 rounded-full"
          >
            <IoArrowBack className="text-foreground size-6" />
          </Button>
          <div className="">
            <div className="flex gap-x-2 items-center">
              <p className="text-foreground hover:underline cursor-pointer font-bold line-clamp-1 text-ellipsis text-xl">
                {userData?.user?.usermeta.firstname}{" "}
                {userData?.user?.usermeta.lastname}
              </p>
              <div className="flex gap-x-1 items-center">
                {/* {userData?.user.verified && (
                  <Image
                    width={14}
                    height={14}
                    className="size-[16px] rounded-full object-cover"
                    alt="avatar"
                    src={"/assets/app-icons/verified-icon.svg"}
                  />
                )} */}
                <SportIcon
                  category={userData?.user?.usermeta?.favorite_sport!}
                  size={20}
                />
              </div>
            </div>
            <p className="text-inactive">@{userData?.user?.username}</p>
          </div>
        </div>
        <div>
          <SubTabs tabs={profileStatsTab} />
          {handleCurrentView()}
        </div>
      </div>
      <RightSideBar
        className={
          "min-w-[200px] w-[40%] max-w-[480px] gap-0 min-[480px]:gap-2"
        }
      />
    </div>
  );
};

export default Page;
