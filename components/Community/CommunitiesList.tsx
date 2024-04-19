"use client";

import Link from "next/link";
import CommunityCard from "./CommunityCard";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

type ItemContext = {
  name: string;
  desc: string;
  membersCount: number;
  isLocked: boolean;
  hasJoined: boolean;
  hasRequested: boolean;
};

const communities_list = [
  {
    name: "Manchester United FC",
    desc: `Welcome to the Red Devils&apos; Haven! Join our passionate community of Manchester United fans`,
    membersCount: 3800,
    isLocked: false,
    hasJoined: false,
    hasRequested: false,
  },
  {
    name: "Cr7 goat",
    desc: `Welcome to the Red Devils&apos; Haven! Join our passionate community of Manchester United fans`,
    membersCount: 5000,
    isLocked: false,
    hasJoined: true,
    hasRequested: true,
  },
  {
    name: "UFC",
    desc: `Welcome to the Red Devils&apos; Haven! Join our passionate community of Manchester United fans`,
    membersCount: 500000,
    isLocked: true,
    hasJoined: false,
    hasRequested: false,
  },
  {
    name: "Boy from akron",
    desc: `Welcome to the Red Devils&apos; Haven! Join our passionate community of Manchester United fans`,
    membersCount: 350000,
    isLocked: false,
    hasJoined: false,
    hasRequested: true,
  },
];

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
