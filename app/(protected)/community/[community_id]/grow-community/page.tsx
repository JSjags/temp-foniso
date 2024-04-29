"use client";

import CreatePost from "@/components/Community/CreatePost";
import HeaderWithImage from "@/components/reusable/HeaderWithImage";
import RightSideBar from "@/components/RightSideBar";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { IoClose } from "react-icons/io5";

const Page = () => {
  const pathName = usePathname();
  const { push, back } = useRouter();

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

  const items = [
    {
      label: "Review your rules",
      href: `${pathName}/review-rules`,
      done: false,
    },
    {
      label: "Invite new members",
      href: `${pathName}/invite-members`,
      done: false,
    },
    {
      label: "Post about your community",
      href: `${pathName}?post=new`,
      done: false,
    },
  ];

  return (
    <div className="flex duo:gap-3 duo:pr-2">
      <div className="w-full">
        <HeaderWithImage
          imgSrc="https://source.unsplash.com/random/1220x520/?ocean"
          dropDownOptions={moreOptions}
          name="Manchester United FC"
          memberCount={6000}
          sideBtn={
            <div className="center-item cursor-pointer size-[45px] rounded-full dark:border bg-[#676666] dark:bg-[#0d0f0e99]">
              <Image
                src="/assets/outline/upload.svg"
                alt="share"
                width={18}
                height={18}
              />
            </div>
          }
        />

        <div className="w-full max-w-[535px] mx-auto min-h-[346px] mt-14 rounded-lg md:rounded-xl overflow-hidden border">
          <div className="relative center-item h-14">
            <Image
              src="/assets/pattern-leaves.webp"
              fill
              alt="pattern-leaves"
            />

            <IoClose
              className="absolute right-4 text-3xl cursor-pointer"
              stroke="#F3F7F2"
            />
          </div>

          <div className="px-[14px] duo:px-5 mt-5">
            <p className="font-bold text-[20px] md:text-2xl">
              Grow your community
            </p>
            <p className="text-[#676666] dark:text-[#888888] leading-snug">
              Here are a couple of actions to ensure your community is
              well-prepared for its launch
            </p>

            <div className="mt-[28px] space-y-6">
              {items.map(({ label, done, href }) => (
                <Link
                  href={href}
                  className="flex justify-between gap-6"
                  key={label}
                >
                  <p className="flex-1">{label}</p>
                  <span className="w-6 h-6 rounded-full border border-[#C8C8C8] dark:border-[#888888] dark:bg-[#222623]"></span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <CreatePost />
      </div>

      <RightSideBar className="min-w-[300px] lg:min-w-[380px]" />
    </div>
  );
};

export default Page;
