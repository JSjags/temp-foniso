"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { CiSearch } from "react-icons/ci";
import { VscVerifiedFilled } from "react-icons/vsc";
import { cn } from "@/lib/utils";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getUsers } from "@/services/api/community";
import useCustomMutation from "@/hooks/useCustomMutation";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";
import axiosInstance from "@/services/api/axiosInstance";

const MembersList = () => {
  const { community_id } = useParams();

  const { data: community_members } = useQuery({
    queryKey: ["community-members"],
    queryFn: getUsers,
  });

  const { mutateAsync: inviteUser } = useCustomMutation(
    "/community-member/invite",
    "POST"
  );

  const onInvite = (userId: number) => {
    inviteUser({ communityId: Number(community_id), userId }).then((data) => {
      if (data) toast.success("Invite sent");
    });
  };

  return (
    <div className="mt-5 px-4">
      <div className="relative flex items-center">
        <CiSearch className="absolute left-2 text-2xl fill-[#656464] dark:fill-[#7C7C7C]" />
        <Input className="pl-9 bg-[#E0E5E2] dark:bg-[#020302] dark:border-[#222623]" />
      </div>

      <div className="mt-5">
        {community_members?.data.data?.map(({ usermeta, username, id }) => (
          <div
            className="flex justify-between gap-6 py-4 border-b border-border"
            key={id}
          >
            <div className="flex gap-3">
              <Image
                src={
                  usermeta?.coverImage ??
                  "https://source.unsplash.com/random/100x100/?man"
                }
                alt="User"
                width={40}
                height={40}
                className="size-10 rounded-full object-cover"
              />
              <div className="">
                <p className="text-lg font-medium">
                  {usermeta?.firstname} {usermeta?.lastname}{" "}
                  <VscVerifiedFilled className="inline-block fill-[#22C55E]" />
                </p>
                <p className="text-sm text-[#7C7C7C]">@{username}</p>
              </div>
            </div>
            <Button
              className={cn(
                false
                  ? "bg-[#1a1a1a67] dark:bg-[#FAFAFA67] text-white dark:text-black"
                  : "bg-[#1A1A1A] dark:bg-white text-white dark:text-black",
                "rounded-full font-bold w-[101px]"
              )}
              onClick={() => onInvite(id)}
            >
              Invite
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MembersList;
