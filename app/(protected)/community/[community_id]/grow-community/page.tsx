"use client";

import CreatePost from "@/components/Community/CreatePost";
import HeaderWithImage from "@/components/reusable/HeaderWithImage";
import ErrorToast from "@/components/reusable/toasts/ErrorToast";
import NoticeToast from "@/components/reusable/toasts/NoticeToast";
import RightSideBar from "@/components/RightSideBar";
import PageLoadingSpinner from "@/components/Spinner/PageLoadingSpinner";
import { defaultCommunityCover } from "@/constants";
import { getOneCommunity } from "@/services/api/community";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IoClose } from "react-icons/io5";

const Page = () => {
  const baseUrl = window.location.protocol + "//" + window.location.host + "/";
  const pathName = usePathname();
  const { push, back } = useRouter();
  const [items, setItems] = useState([
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
  ]);

  const { community_id } = useParams();
  const { data: community_info, isLoading } = useQuery({
    queryKey: ["one-community", community_id],
    queryFn: () => getOneCommunity(String(community_id)),
    gcTime: 60 * 60 * 24,
  });

  console.log(community_info);

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

  const handleShare = async (url: string, about: string) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Discover my community on Foniso",
          text:
            about.length <= 0
              ? "Hey, check out my community on Foniso! I've shared some great content that I think you'll enjoy. Follow the link below to see more."
              : about,
          url: url,
        });
        console.log("Community shared successfully");
      } catch (error) {
        console.error("Error sharing community:", error);
      }
    } else {
      try {
        await navigator.clipboard.writeText(url);
        toast.custom((t) => (
          <NoticeToast
            t={t}
            title="Browser not supported"
            message="Web Share API not supported in this browser. Your profile URL has been copied to your clipboard."
          />
        ));
      } catch (err) {
        toast.custom((t) => (
          <ErrorToast
            t={t}
            message="Web Share API not supported in this browser. Your profile URL could not be copied to your clipboard."
          />
        ));
      }
      // Alternatively, you could copy the URL to the clipboard
      // navigator.clipboard.writeText(profileUrl).then(() => {
      //   alert('Profile URL copied to clipboard');
      // });
    }
  };

  useEffect(() => {
    if (community_info?.data.data.id) {
    }
  }, [community_info]);

  return (
    <>
      {isLoading ? (
        <div className="mt-10 flex justify-center">
          <PageLoadingSpinner spinnerExtraClass="w-7 h-7" />
        </div>
      ) : community_info ? (
        <div className="flex duo:gap-3 duo:pr-2">
          <div className="w-full bg-background">
            <HeaderWithImage
              imgSrc={
                community_info?.data.data?.coverImage ?? defaultCommunityCover
              }
              dropDownOptions={moreOptions}
              name={community_info?.data.data.name}
              memberCount={community_info?.data.data.memberCount}
              sideBtn={
                <div
                  role="button"
                  onClick={() => {
                    handleShare(
                      baseUrl + "community/" + community_id,
                      community_info?.data?.data.description ?? ""
                    );
                  }}
                  className="center-item cursor-pointer size-[45px] rounded-full dark:border bg-[#676666] dark:bg-[#0d0f0e99]"
                >
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
      ) : (
        ""
      )}
    </>
  );
};

export default Page;
