"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import { CiGlobe } from "react-icons/ci";
import { RxLockClosed } from "react-icons/rx";
import { cn } from "@/lib/utils";
import { formatNumber } from "@/utils";
import { useRouter } from "next/navigation";
import { CommunityContext } from "@/types/community";
import useCustomMutation from "@/hooks/useCustomMutation";
import { toast } from "react-toastify";
import { useState } from "react";

const CommunityCard = (props: CommunityContext) => {
  const [isRequested, setIsRequested] = useState(false);
  const { push } = useRouter();
  const hasJoined = Boolean(
    props?.isMember?.length && props.isMember[0].status === "joined"
  );
  const hasRequested = Boolean(
    props?.isMember?.length && props.isMember[0].status === "requested"
  );
  const isLocked = props.type === "private";

  const handleClick = (community_id: number) => {
    let url = hasJoined
      ? `/community/${community_id}`
      : `/community/${community_id}/view-community`;

    push(url);
  };

  const { mutateAsync: joinCommunity, isPending } = useCustomMutation<{
    communityId: number;
  }>("/community-member", "POST");

  const btnOnClick = () => {
    if (hasJoined) {
      push(`/community/${props.id}`);
    } else if (
      (isLocked && hasRequested) ||
      (isLocked && props?.isMember === undefined)
    ) {
      toast.warning(
        "Your request to join this community has been sent to the community owner"
      );
    } else {
      joinCommunity({ communityId: props.id }).then(() => {
        if (isLocked) {
          setIsRequested(true);
        } else {
          push(`/community/${props.id}`);
        }
      });
    }
  };

  return (
    <div className="rounded-xl border border-border p-[10px] duo:p-5">
      <div className="flex justify-between gap-[18px]">
        <div
          className="flex-1 flex gap-[9px] cursor-pointer"
          onClick={() => handleClick(props.id)}
        >
          <Image
            src={props.coverImage}
            alt={props.name}
            width={60}
            height={60}
            className="size-[60px] text-xs text-white dark:text-black bg-slate-200 dark:bg-[#0c0c0c] duo:size-[80px] md:size-[100px] rounded-lg object-cover"
          />
          <div className="">
            <p className="text-base duo:text-[20px] font-bold">{props.name}</p>
            <div className="mt-[10px] flex items-center">
              {isLocked ? (
                <RxLockClosed className="text-base stroke-[0.5px]" />
              ) : (
                <CiGlobe className="text-base text-black dark:text-white" />
              )}
              <span className="duo:text-base ml-1 text-sm dark:text-[#C8C8C8] text-black">
                {formatNumber(props.memberCount)}{" "}
                {props.memberCount > 1 ? "members" : "member"}
              </span>
            </div>
          </div>
        </div>
        <Button
          className={cn(
            hasJoined ||
              hasRequested ||
              isRequested ||
              (isLocked && props?.isMember === undefined)
              ? "border-[#4ED17E] text-[#4ED17E] bg-transparent"
              : "hover:bg-white hover:scale-[1.01] transition-all hover:shadow-xl bg-white border-border text-foreground dark:text-black",
            "border rounded-full flex justify-center items-center h-8 duo:h-[40px] px-3 w-[90px] duo:w-[110px]"
          )}
          disabled={isPending}
          onClick={btnOnClick}
        >
          <span className="text-sm duo:text-base font-medium block p-0 align-middle">
            {isPending
              ? "Hang on..."
              : hasJoined
              ? "Joined"
              : hasRequested ||
                isRequested ||
                (isLocked && props?.isMember === undefined)
              ? "Requested"
              : isLocked
              ? "Request"
              : "Join"}
          </span>
        </Button>
      </div>
      <p className="mt-[12px] text-sm duo:text-base dark:text-[#7C7C7C] duo:dark:text-[#E6E6E6] text-black">
        {props.description}
      </p>
    </div>
  );
};

export default CommunityCard;
