"use client";

import CommunityCard from "@/components/Community/CommunityCard";
import PendingRequestHeader from "@/components/Community/PendingRequestHeader";
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
    <div>
      <PendingRequestHeader />

      <div className="mt-6 space-y-5">
        {communities_list.map((item, index) => (
          <CommunityCard
            key={index}
            {...item}
            btnOnClick={() => handleOnClick(item)}
          />
        ))}
      </div>

      <Dialog open={open_modal} onOpenChange={() => setOpenModal(false)}>
        <DialogContent className="duo:!max-w-[412px] h-[321px]">
          <div>
            <p className="text-center text-xl font-bold">Cancel request</p>
            <p className="mt-[10px] text-center">
              Are you sure you want to cancel your request to join{" "}
              <span className="font-semibold">{selected_community?.name}?</span>
            </p>

            <div className="mt-9 flex flex-col gap-4">
              <Button
                className="w-full rounded-full !bg-[#C60D25] !text-white h-14 font-bold"
                onClick={() => setOpenModal(false)}
              >
                Yes
              </Button>
              <Button
                className="w-full rounded-full !bg-transparent border border-[#DADADA] h-14 !text-white font-bold"
                onClick={() => setOpenModal(false)}
              >
                Back
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Page;
