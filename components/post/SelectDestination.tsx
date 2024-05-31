"use client";

import { Label } from "../ui/label";
import { CheckCircle2Icon, Globe, LucideIcon } from "lucide-react";
import { postReplyOptions } from "@/constants";
import { cn } from "@/lib/utils";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  DropdownMenuGroup,
  DropdownMenuSeparator,
} from "@radix-ui/react-dropdown-menu";
import { useQuery } from "@tanstack/react-query";
import { getUsersCommunities } from "@/services/api/userService";
import { CommunityMeta } from "@/types";
import Image from "next/image";
import { ImSpinner2 } from "react-icons/im";

export function SelectDestination({
  communityId,
  setCommunityId,
}: {
  communityId: number | null;
  setCommunityId: Dispatch<SetStateAction<number | null>>;
}) {
  const myCommunities = useQuery({
    queryKey: ["my-communities"],
    queryFn: getUsersCommunities,
  });

  const [currentOption, setCurrentOption] = useState<string>(
    communityId ? "Community" : "Public"
  );
  const [selectedCommunity, setSelectedCommunity] =
    useState<CommunityMeta | null>(
      communityId
        ? myCommunities?.data?.data.data.items.filter(
            (com: CommunityMeta) => com.id === communityId
          )[0]
        : null
    );

  useEffect(() => {
    if (communityId) {
      setSelectedCommunity(
        myCommunities?.data?.data.data.items.filter(
          (com: CommunityMeta) => com.id === communityId
        )[0]
      );
    }
  }, [
    myCommunities.isSuccess,
    communityId,
    myCommunities?.data?.data.data.items,
  ]);

  return (
    <div className="flex items-center">
      <DropdownMenu>
        <DropdownMenuTrigger className='w-fit data-[state="closed"]:ring-0 data-[state="closed"]:shadow-none data-[state="closed"]:border-none data-[state="closed"]:ring-offset-0 data-[state="closed"]:ring-offset-transparent ring-0 ring-offset-0 ring-offset-transparent focus:ring-0 active:ring-0 border-none px-0 text-foreground/60 bg-transparent h-[35px] font-normal flex gap-3 items-center'>
          {currentOption === "Public" ? (
            <div className="bg-colorPrimary size-[35px] flex gap-x-4 justify-center items-center rounded-md">
              <Globe color="white" size={20} />
            </div>
          ) : (
            <div className="bg-colorPrimary size-[35px] flex gap-x-4 justify-center items-center rounded-md">
              <div className="relative size-[35px] overflow-hidden rounded-md">
                {myCommunities.isPending ? (
                  <div className="flex justify-center">
                    <ImSpinner2 className="size-5 animate-spin text-white" />
                  </div>
                ) : (
                  <Image
                    alt="community image"
                    src={selectedCommunity?.coverImage ?? ""}
                    layout="fill"
                    objectFit="cover"
                    className={cn("size-[35px] h-auto rounded-md")}
                  />
                )}
              </div>
            </div>
          )}
          {currentOption === "Public" ? "Public" : selectedCommunity?.name}
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-56 sm:w-[320px] bg-background border-border pb-8 flex flex-col z-[1000]"
          side="bottom"
        >
          <DropdownMenuLabel className="text-lg font-bold px-3">
            Choose Destination
          </DropdownMenuLabel>
          <DropdownMenuItem
            className={cn(
              "flex justify-between items-center rounded-md hover:bg-colorPrimary/20 cursor-pointer p-2 px-5"
            )}
            onClick={() => {
              setCurrentOption("Public");
              setCommunityId(null);
              setSelectedCommunity(null);
            }}
          >
            <div className={cn("flex gap-x-2 items-center text-foreground/60")}>
              <div className="bg-colorPrimary size-[35px] flex gap-x-4 justify-center items-center rounded-md">
                <Globe color="white" size={20} />
              </div>
              Public
            </div>
          </DropdownMenuItem>
          {myCommunities.isLoading && (
            <div className="w-full py-4 flex justify-center items-center">
              <ImSpinner2 className="size-4 animate-spin text-[#4ED17E]" />
            </div>
          )}
          {myCommunities.data?.data.data.items.length >= 1 && (
            <>
              <DropdownMenuSeparator className="bg-border border-border h-[1px] my-2 text-border" />
              <DropdownMenuGroup className="px-3">
                <DropdownMenuLabel className="text-base font-semibold">
                  Communities
                </DropdownMenuLabel>
                {myCommunities.data?.data.data.items.map(
                  (community: CommunityMeta) => (
                    <DropdownMenuItem
                      key={community.id}
                      className={cn(
                        "flex justify-between items-center rounded-md hover:bg-colorPrimary/20 cursor-pointer p-2"
                      )}
                      onClick={() => {
                        setCurrentOption("Community");
                        setSelectedCommunity(community);
                        setCommunityId(community?.id ?? null);
                      }}
                    >
                      <p
                        className={cn(
                          "flex gap-x-2 items-center text-foreground/60"
                        )}
                      >
                        <div className="size-[35px] relative">
                          <Image
                            alt="community image"
                            src={community.coverImage}
                            width={0}
                            height={0}
                            layout="fill"
                            objectFit="cover"
                            className={cn("size-[35px] rounded-sm")}
                          />
                        </div>
                        <span
                          className={cn(
                            selectedCommunity?.id === community.id
                              ? "text-white font-bold"
                              : "text-foreground/60"
                          )}
                        >
                          {community.name}
                        </span>
                      </p>
                      {selectedCommunity?.id === community.id && (
                        <IoMdCheckmarkCircle className="text-foreground text-lg" />
                      )}
                    </DropdownMenuItem>
                  )
                )}
              </DropdownMenuGroup>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      {/* <Select defaultValue="public" value="public">
        <SelectTrigger className="w-fit border-none bg-red-500 px-0 text-textNav bg-transparent h-[35px] font-semibold flex gap-3 items-center">
          <div className="bg-colorPrimary size-[35px] flex gap-x-4 justify-center items-center rounded-md">
            <Globe color="white" size={20} />
          </div>
          <SelectValue
            //   placeholder="Who can view tweet"
            className="text-white text-base text-semibold placeholder:text-textNav font-semibold"
            color="white"
          />
        </SelectTrigger>
        <Select
        <SelectContent className="bg-darkGrey border-border">
          <SelectItem
            className="text-sm text-textNav font-semibold data-[highlighted]:text-black data-[highlighted]:bg-white"
            value="public"
          >
            Public
          </SelectItem>
          <SelectItem
            className="text-sm text-textNav font-semibold data-[highlighted]:text-black data-[highlighted]:bg-white"
            value="only_followers"
          >
            Only followers
          </SelectItem>
        </SelectContent>
      </Select> */}
    </div>
  );
}
