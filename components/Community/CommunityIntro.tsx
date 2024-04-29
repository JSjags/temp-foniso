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

const CommunityIntro = () => {
  const { push, replace } = useRouter();
  const pathName = usePathname();
  const { community_id } = useParams();
  const { get } = useSearchParams();

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

  return (
    <div>
      <HeaderWithImage
        imgSrc="https://source.unsplash.com/random/1220x520/?ocean"
        dropDownOptions={moreOptionsAdmin}
        name="Manchester United FC"
        memberCount={5000}
        sideBtn={
          <Button className="border rounded-full flex justify-center items-center h-8 duo:h-[40px] px-3 w-max hover:bg-white hover:scale-[1.01] transition-all hover:shadow-xl bg-white border-border text-foreground dark:text-black">
            Request to join
          </Button>
        }
      />

      <div className="px-4">
        {!get("tab") && (
          <>
            <p className="text-sm text-black dark:text-[#AFAFAF] mt-[14px]">
              Welcome to the Red Devils&apos; Haven! Join our passionate
              community of Manchester United fans...
            </p>
            <Link
              href={{ query: { tab: "about" } }}
              className="text-[#4ED17E] text-sm font-semibold"
            >
              More about this community &gt;{" "}
            </Link>
          </>
        )}

        {/* Ongoing buzz */}
        <div className="h-[110px] flex flex-col bg-[#C8C8C8] -translate-x-4 px-0 w-[calc(100%+2rem)] dark:bg-[#222623] mt-5 py-2 md:py-[0.875rem]">
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
              href={{ query: { tab: "buzz", buzz: "8687-8989-876876-7687" } }}
              className="w-max h-max"
            >
              <Button className="w-[101px] h-[35px] md:h-11 rounded-full bg-[#1A1A1A] dark:bg-[#FAFAFA] text-white dark:text-[#090D09] font-semibold">
                Join buzz
              </Button>
            </Link>
          </div>
        </div>

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
          {get("tab") === "about" ? <About /> : <Feeds />}
        </div>
      </div>

      <CreateBuzz />
      <JoinBuzz />
    </div>
  );
};

export default CommunityIntro;
