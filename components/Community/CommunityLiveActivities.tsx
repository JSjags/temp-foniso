"use client";

import Image from "next/image";
import RightSideBar from "../RightSideBar";
import Titlebar from "@/components/Community/Titlebar";
import Link from "next/link";
import { RxCaretRight } from "react-icons/rx";
import PendingRequests from "./PendingRequests";
import { BsSoundwave } from "react-icons/bs";
import UsersAvatar from "../reusable/UsersAvatar";
import Feeds from "./Feeds";
import { useQuery } from "@tanstack/react-query";
import {
  allCommunities,
  getOneCommunity,
  userCommunities,
} from "@/services/api/community";
import { useParams, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useUserContext } from "@/context/UserContext";
import { CommunityMeta } from "@/types";
import { useEffect } from "react";
import { Button } from "../ui/button";

const CommunityLiveActivities = () => {
  const router = useRouter();
  const { community_id } = useParams();

  const { userData } = useUserContext();

  const { data: communities } = useQuery({
    queryKey: ["user-communities"],
    queryFn: () => userCommunities(),
  });

  const { data: communityInfo } = useQuery({
    queryKey: ["get-community-data"],
    queryFn: () => getOneCommunity(community_id as string),
  });

  console.log(communityInfo?.data?.data);
  console.log(communityInfo?.data);

  useEffect(() => {
    if (communityInfo?.data?.data) {
      if (communityInfo?.data?.data?.isMember.length) {
        return;
      } else {
        router.push(`/community/${community_id}/view-community`);
      }
    }
  }, [communityInfo?.data?.data]);

  return (
    <div className="flex duo:gap-2">
      <div className="w-full overflow-hidden bg-background">
        <Titlebar title="Community" />
        <div className="">
          <div className="flex px-4 flex-nowrap overflow-x-auto gap-[10px] duo:gap-5 mt-[10px] snap-x snap-mandatory scroll-p-2 sm:scroll-p-6 hide-scrollbar">
            {communities?.data.data.items?.map(({ coverImage, name, id }) => (
              <div
                key={id}
                onClick={() => router.push(`/community/${id}`)}
                className={cn(
                  "min-w-[120px] cursor-pointer snap-start  overflow-hidden flex flex-col duo:min-w-[150px] h-[100px] duo:h-[130px] rounded-lg border-[0.5px]",
                  id ===
                    parseInt(
                      Array.isArray(community_id)
                        ? community_id[0]
                        : community_id
                    ) && "border-2 border-colorPrimary"
                )}
              >
                <div className="relative flex-1">
                  <Image
                    src={coverImage}
                    alt={name}
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="flex items-center h-8 text-sm px-1 truncate bg-[#000000cd]">
                  {name}
                </p>
              </div>
            ))}
          </div>
          {/* <div className="flex px-4 gap-[10px] mt-6 items-center">
            <div className="flex-1 h-14 flex gap-[10px] flex-nowrap overflow-x-auto snap-x snap-mandatory scroll-p-2 sm:scroll-p-6 hide-scrollbar">
              {[0, 1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="h-full flex px-[10px] gap-[10px] items-center snap-start min-w-[305px] rounded-full bg-[linear-gradient(103deg,#2A6032_-1.72%,rgba(4,77,24,0.69)101.27%)] cursor-pointer"
                >
                  <div className="size-10 rounded-full overflow-hidden relative">
                    <Image
                      src={`https://source.unsplash.com/random/350x230/?listen`}
                      alt="host"
                      fill
                      className="bg-green-100"
                    />
                  </div>
                  <div className="flex-1 truncate">
                    <div className="flex gap-1 text-white font-medium">
                      <p className="truncate text-sm">
                        Who is the Goat? Come lets discuss
                      </p>
                    </div>
                    <UsersAvatar
                      items={["0", "1", "2"]}
                      wrapperClass="mt-[5px]"
                      totalCount="+350"
                    />
                  </div>
                  <BsSoundwave className="text-3xl text-white" />
                </div>
              ))}
            </div>

            <Link
              href="/community/5879-66878-78798/live-buzz"
              className="flex gap-[2px] text-sm text-[#22C55E] items-center"
            >
              See all
              <RxCaretRight className="" />
            </Link>
          </div> */}

          {communityInfo?.data?.data && (
            // Boolean(
            //   communityInfo?.data?.data.moderators.filter(
            //     (m: { userId: number }) => m.userId === userData?.user.id
            //   ).length
            // ) &&
            <div className="px-4">
              <div className="flex justify-end">
                <Button
                  variant={"ghost"}
                  onClick={() => {
                    router.push(`${community_id}/view-community`);
                  }}
                  className="text-colorPrimary hover:text-colorPrimary hover:underline p-0 hover:bg-transparent"
                >
                  View community
                </Button>
              </div>
              <PendingRequests />
            </div>
          )}
          <Feeds />
        </div>
      </div>

      <RightSideBar className="min-w-[300px] lg:min-w-[380px]" />
    </div>
  );
};

export default CommunityLiveActivities;
