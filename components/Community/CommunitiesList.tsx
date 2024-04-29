"use client";

import Link from "next/link";
import CommunityCard from "./CommunityCard";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { communities_list } from "@/constants";
import { ItemContext } from "@/types/community";

const CommunitiesList = () => {
  const router = useRouter();

  const btnOnClick = (arg: ItemContext) => {
    if (arg.hasJoined || arg.hasRequested) return;
    if (arg.isLocked) {
      toast.warning(
        "Your request to join this community has been sent to the community owner"
      );
    } else {
      router.push("/community/6787-56777-65676");
    }
  };
  return (
    <div className="mt-5">
      <div className="flex justify-between items-center">
        <p className="font-bold text-xl duo:text-2xl">For you</p>
        <Link
          href="/community"
          className="text-[#1FB356] font-medium text-sm duo:text-base"
        >
          See more
        </Link>
      </div>

      <div className="mt-6 space-y-5">
        {communities_list.map((item, index) => (
          <CommunityCard
            key={index}
            {...item}
            btnOnClick={() => btnOnClick(item)}
          />
        ))}
      </div>
    </div>
  );
};

export default CommunitiesList;
