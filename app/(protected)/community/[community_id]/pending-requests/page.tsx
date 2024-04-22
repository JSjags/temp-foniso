"use client";

import CommunityCard from "@/components/Community/CommunityCard";
import HeaderWithBackBtn from "@/components/reusable/HeaderWithBackBtn";
import CancelRequestModal from "@/components/Modal/CancelRequestModal";
import RightSideBar from "@/components/RightSideBar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useState } from "react";

type CommunityList = {
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
    desc: `Welcome to the Red Devils' Haven! Join our passionate community of Manchester United fans`,
    membersCount: 3800,
    isLocked: true,
    hasJoined: false,
    hasRequested: true,
  },
  {
    name: "Cr7 goat",
    desc: `Welcome to the Red Devils' Haven! Join our passionate community of Manchester United fans`,
    membersCount: 5000,
    isLocked: true,
    hasJoined: false,
    hasRequested: true,
  },
  {
    name: "UFC",
    desc: `Welcome to the Red Devils' Haven! Join our passionate community of Manchester United fans`,
    membersCount: 500000,
    isLocked: true,
    hasJoined: false,
    hasRequested: true,
  },
  {
    name: "Boy from akron",
    desc: `Welcome to the Red Devils' Haven! Join our passionate community of Manchester United fans`,
    membersCount: 350000,
    isLocked: true,
    hasJoined: false,
    hasRequested: true,
  },
];

const Page = () => {
  const [open_modal, setOpenModal] = useState(false);
  const [selected_community, setSelectedCommunity] =
    useState<CommunityList | null>(null);

  const handleOnClick = (arg: CommunityList) => {
    setSelectedCommunity(arg);
    setOpenModal(true);
  };

  return (
    <div className="flex duo:gap-3">
      <div className="w-full">
        <HeaderWithBackBtn title="Pending requests" />

        <div className="mt-6 space-y-5">
          {communities_list.map((item, index) => (
            <CommunityCard
              key={index}
              {...item}
              btnOnClick={() => handleOnClick(item)}
            />
          ))}
        </div>
      </div>

      <RightSideBar className="min-w-[300px] lg:min-w-[380px]" />

      <CancelRequestModal
        name={selected_community?.name}
        open={open_modal}
        handleClose={() => setOpenModal(false)}
      />
    </div>
  );
};

export default Page;
