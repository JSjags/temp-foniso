"use client";

import Image from "next/image";
import { IoMdMore } from "react-icons/io";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Lock } from "lucide-react";
import { useTheme } from "next-themes";
import { formatNumber } from "@/utils";
import { Button } from "../ui/button";
import Link from "next/link";
import About from "./About";
import Feeds from "./Feeds";
import { cn } from "@/lib/utils";

const CommunityIntro = () => {
  const { back, push } = useRouter();
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
    <>
      <div className="h-[140px] duo:h-[231px] relative w-full">
        <Image
          src="https://source.unsplash.com/random/1220x520/?ocean"
          alt="community"
          fill
          className=" object-cover object-center"
        />

        <div className="absolute top-[11px] w-full px-4 flex justify-between items-center">
          <button
            type="button"
            className="size-[45px] center-item rounded-full appearance-none bg-[#22262399] cursor-pointer"
            onClick={() => back()}
          >
            <FaArrowLeftLong className="fill-white text-xl" />
          </button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="size-[45px] center-item rounded-full appearance-none bg-[#22262399]"
              >
                <IoMdMore className="fill-white text-3xl" />
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="duo:w-[220px]">
              {moreOptionsAdmin.map(({ label, callback, color }) => (
                <DropdownMenuItem
                  key={label}
                  className={cn(color, "py-3 cursor-pointer")}
                  onClick={callback}
                >
                  <span className="">{label}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="mt-5 px-4 ">
        <div className="flex items-end justify-between relative">
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
        </div>

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
    </>
  );
};

export default CommunityIntro;
