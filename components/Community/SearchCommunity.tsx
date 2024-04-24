"use client";

import RightSideBar from "@/components/RightSideBar";
import HeaderWithBackBtn from "@/components/reusable/HeaderWithBackBtn";
import { Input } from "@/components/ui/input";
import { CiSearch } from "react-icons/ci";
import { communities_list } from "@/constants";
import CommunityCard from "@/components/Community/CommunityCard";
import { ItemContext } from "@/types/community";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const Search = () => {
  return (
    <div className="relative flex items-center rounded-xl overflow-hidden ml-4 duo:ml-5">
      <CiSearch className="absolute left-2 text-2xl fill-[#656464] dark:fill-[#7C7C7C]" />
      <Input
        className="pl-9 bg-[#E0E5E2] ring-0 border-none outline-none h-[52px] duo:h-[60px] dark:bg-[#020302] dark:border-[#222623] placeholder:font-normal placeholder:dark:text-[#616161]"
        placeholder="Search community"
      />
    </div>
  );
};

const SearchCommunity = () => {
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
    <div className="flex duo:gap-3">
      <div className="w-full">
        <HeaderWithBackBtn title={<Search />} />
        <div className="px-4">
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
      </div>

      <RightSideBar className="min-w-[300px] lg:min-w-[380px]" />
    </div>
  );
};

export default SearchCommunity;
