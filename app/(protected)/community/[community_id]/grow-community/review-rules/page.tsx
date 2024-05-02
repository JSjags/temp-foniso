"use client";

import CreateRule from "@/components/Community/CreateRule";
import ReviewRules from "@/components/Community/ReviewRules";
import HeaderWithBackBtn from "@/components/reusable/HeaderWithBackBtn";
import RightSideBar from "@/components/RightSideBar";

const Page = () => {
  return (
    <div className="flex duo:gap-3 duo:pr-2">
      <div className="w-full">
        <HeaderWithBackBtn title="Rules" />

        <ReviewRules />

        <CreateRule />
      </div>

      <RightSideBar className="min-w-[300px] lg:min-w-[380px]" />
    </div>
  );
};

export default Page;
