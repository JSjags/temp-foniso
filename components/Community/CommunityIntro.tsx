"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Lock } from "lucide-react";
import { useTheme } from "next-themes";
import { formatNumber } from "@/utils";
import { Button } from "../ui/button";
import Link from "next/link";
import About from "./About";
import Feeds from "./Feeds";
import HeaderWithImage from "../reusable/HeaderWithImage";

const CommunityIntro = () => {
  const { push } = useRouter();
  const pathName = usePathname();
  const { get } = useSearchParams();
  const { resolvedTheme } = useTheme();

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
        push(`${pathName}?tab=invite-new`);
      },
    },
    {
      label: "Create buzz",
      callback: () => {
        push(`${pathName}?tab=buzz`);
      },
    },
    {
      label: "Manage community",
      callback: () => {
        push(`${pathName}?tab=manage`);
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
        name="  Manchester United FC"
        memberCount={5000}
        sideBtn={
          <Button className="border rounded-full flex justify-center items-center h-8 duo:h-[40px] px-3 w-max hover:bg-white hover:scale-[1.01] transition-all hover:shadow-xl bg-white border-border text-foreground dark:text-black">
            Request to join
          </Button>
        }
      />

      <div className="px-4">
        {/* <div className="flex items-end justify-between relative">
          <div className="">
            <p className="text-2xl duo:text-[26px] font-bold">
              Manchester United FC
            </p>
            <div className="flex gap-1 items-end mt-4">
              <Lock
                color={resolvedTheme === "dark" ? "#ffffff" : "#000000"}
                strokeWidth={1.5}
                height={18}
                width={18}
              />

              <p className="text-sm leading-none">
                {formatNumber(5000)} members
              </p>
            </div>
          </div>

          <Button className="border absolute bottom-0 right-0 rounded-full flex justify-center items-center h-8 duo:h-[40px] px-3 w-max hover:bg-white hover:scale-[1.01] transition-all hover:shadow-xl bg-white border-border text-foreground dark:text-black">
            Request to join
          </Button>
        </div> */}

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

        <div className="mt-5">
          {get("tab") === "about" ? <About /> : <Feeds />}
        </div>
      </div>
    </div>
  );
};

export default CommunityIntro;
