"use client";

import {
  useRouter,
  usePathname,
  useSearchParams,
  useParams,
} from "next/navigation";
import { RxLockClosed } from "react-icons/rx";
import { Button } from "../ui/button";
import Link from "next/link";
import About from "./About";
import Feeds from "./Feeds";
import HeaderWithImage from "../reusable/HeaderWithImage";
import CreateBuzz from "./CreateBuzz";
import { BsSoundwave } from "react-icons/bs";
import UsersAvatar from "../reusable/UsersAvatar";
import JoinBuzz, { Buzz } from "./JoinBuzz";
import { RxCaretDown } from "react-icons/rx";
import { useQuery } from "@tanstack/react-query";
import { getOneCommunity } from "@/services/api/community";
import PageLoadingSpinner from "../Spinner/PageLoadingSpinner";
import useCustomMutation from "@/hooks/useCustomMutation";
import { useEffect, useState } from "react";

const CommunityIntro = () => {
  const { push, replace } = useRouter();
  const pathName = usePathname();
  const { community_id } = useParams();
  const { get } = useSearchParams();
  const [isRequested, setIsRequested] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const moreOptions = [
    {
      label: "Join community",
      callback: () => {
        console.log("object join");
      },
    },
    {
      label: "About community",
      callback: () => {
        push(`${pathName}?tab=about`);
      },
    },
    {
      label: "Report community",
      callback: () => {
        push(`${pathName}?tab=report`);
      },
    },
  ];

  const moreOptionsAdmin = [
    {
      label: "Invite new member",
      callback: () => {
        push(`/community/${community_id}/grow-community/invite-members`);
      },
    },
    {
      label: "Create buzz",
      callback: () => {
        push(`/community/${community_id}/view-community?tab=create-buzz`);
      },
    },
    {
      label: "Manage community",
      callback: () => {
        push(`/community/${community_id}/manage-community`);
      },
    },
    {
      label: "Share via",
      callback: () => {
        push(`${pathName}?tab=share`);
      },
    },
    {
      label: "About community",
      callback: () => {
        push(`${pathName}?tab=about`);
      },
    },
    {
      label: "Delete community",
      color: "text-red-500",
      callback: () => {
        push(`${pathName}?tab=delete`);
      },
    },
  ];

  const { data: community_info, isFetching } = useQuery({
    queryKey: ["one-community", community_id],
    queryFn: () => getOneCommunity(String(community_id)),
  });

  const { mutateAsync: joinCommunity, isPending } = useCustomMutation<{
    communityId: number;
  }>("/community-member", "POST");

  const handleJoin = () => {
    joinCommunity({ communityId: Number(community_id) }).then(() => {
      if (community_info?.data.data?.type === "private") {
        setIsRequested(true);
      } else {
        replace(`/community/${community_id}`);
      }
    });
  };

  useEffect(() => {
    if (community_info?.data.data.id) {
      const user = JSON.parse(localStorage.getItem("userData") ?? "");
      const isAdmin = community_info?.data.data.moderators.some(
        (itm) => itm.userId === user.user.id
      );

      setIsAdmin(isAdmin);
    }
  }, [community_info]);

  return (
    <>
      {isFetching ? (
        <div className="mt-10 flex justify-center">
          <PageLoadingSpinner spinnerExtraClass="w-7 h-7" />
        </div>
      ) : community_info ? (
        <div className="bg-background">
          <HeaderWithImage
            imgSrc={community_info?.data.data.coverImage}
            dropDownOptions={isAdmin ? moreOptionsAdmin : moreOptions}
            name={community_info?.data.data?.name}
            memberCount={community_info?.data.data?.memberCount}
            isPrivate={community_info?.data.data?.type === "private"}
            sideBtn={
              <Button
                className="border rounded-full flex justify-center md:min-w-[90px] items-center h-8 duo:h-[40px] px-3 w-max hover:bg-white hover:scale-[1.01] transition-all hover:shadow-xl bg-white border-border text-foreground dark:text-black"
                disabled={
                  isPending ||
                  Boolean(community_info?.data.data.isMember.length) ||
                  isRequested
                }
                onClick={handleJoin}
              >
                {isPending
                  ? "Hang on..."
                  : community_info?.data.data?.type === "private"
                  ? "Request to join"
                  : "Join"}
              </Button>
            }
          />

          <div className="">
            {!get("tab") && (
              <div className="px-4">
                <p className="text-sm text-black dark:text-[#AFAFAF] mt-[14px]">
                  {community_info?.data.data.description}
                </p>
                <Link
                  href={{ query: { tab: "about" } }}
                  className="text-[#4ED17E] text-sm font-semibold"
                >
                  More about this community &gt;{" "}
                </Link>
              </div>
            )}

            {/* Ongoing buzz */}
            {/* <div className="h-[110px] flex flex-col bg-[#C8C8C8] -translate-x-4 px-4 w-[calc(100%+2rem)] dark:bg-[#222623] mt-5 py-2 md:py-[0.875rem]">
              <div className="flex items-center gap-1 w-[calc(100%-2rem)] mx-auto">
                <BsSoundwave className="text-xl text-[#1A1A1A] dark:text-[#AFAFAF]" />
                <span className="text-[#1A1A1A] dark:text-[#A0A0A0] text-sm font-medium">
                  Ongoing buzz
                </span>
              </div>

              <div className="flex justify-between gap-8 my-[10px] w-[calc(100%-2rem)] mx-auto">
                <div className="truncate">
                  <p className="flex items-center gap-1 text-[#22C55E]">
                    <RxLockClosed className="text-base stroke-[0.6px]" />
                    <span className="font-semibold text-sm">
                      Who is the Goat. Cr7 or Messi?
                    </span>
                  </p>

                  <UsersAvatar
                    items={["0", "1", "2"]}
                    wrapperClass="mt-2"
                    avatarClass="size-[1.375rem]"
                    totalCount="+350"
                  />
                </div>

                <Link
                  href={{
                    query: { tab: "buzz", buzz: "8687-8989-876876-7687" },
                  }}
                  className="w-max h-max"
                >
                  <Button className="w-[101px] h-[35px] md:h-11 rounded-full bg-[#1A1A1A] dark:bg-[#FAFAFA] text-white dark:text-[#090D09] font-semibold">
                    Join buzz
                  </Button>
                </Link>
              </div>
            </div> */}

            {/* buzz sidebar */}
            {get("live-buzz") && (
              <div className="fixed top-12 right-6 px-5 pb-4 w-[429px] bg-[#111413] rounded-xl border border-border shadow-[0px_5px_10px_5px_rgba(235,232,232,0.06)] z-[400]">
                <RxCaretDown
                  className="block text-3xl cursor-pointer ml-auto translate-y-3"
                  onClick={() => replace(pathName)}
                />
                <Buzz />
              </div>
            )}

            <div className="mt-5">
              {get("tab") === "about" ? (
                <div className="px-4">
                  <About info={community_info?.data.data} />
                </div>
              ) : (
                <Feeds />
              )}
            </div>
          </div>

          <CreateBuzz />
          <JoinBuzz />
        </div>
      ) : (
        "" // NOTE: show an error screen here
      )}
    </>
  );
};

export default CommunityIntro;
