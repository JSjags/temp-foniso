"use client";

import RightSideBar from "@/components/RightSideBar";
import HeaderWithBackBtn from "@/components/reusable/HeaderWithBackBtn";
import { Input } from "@/components/ui/input";
import { CiSearch } from "react-icons/ci";
import CommunityCard from "@/components/Community/CommunityCard";

import { allCommunities } from "@/services/api/community";
import { useQuery } from "@tanstack/react-query";
import { Dispatch, SetStateAction, useState } from "react";
import PageLoadingSpinner from "../Spinner/PageLoadingSpinner";

const Search = ({
  setParam,
}: {
  setParam: Dispatch<SetStateAction<string>>;
}) => {
  return (
    <div className="relative flex items-center rounded-xl overflow-hidden ml-4 duo:ml-5">
      <CiSearch className="absolute left-2 text-2xl fill-[#656464] dark:fill-[#7C7C7C]" />
      <Input
        onChange={(e) => setParam(e.target.value)}
        className="pl-9 bg-[#E0E5E2] ring-0 border-none outline-none h-[52px] duo:h-[60px] dark:bg-[#020302] dark:border-[#222623] placeholder:font-normal placeholder:dark:text-[#616161]"
        placeholder="Search community"
      />
    </div>
  );
};

const SearchCommunity = () => {
  const [param, setParam] = useState("");

  const { data: communities, isFetching } = useQuery({
    queryKey: ["all-communities", param],
    queryFn: () => allCommunities(undefined, undefined, param),
  });

  return (
    <div className="flex duo:gap-2">
      <div className="w-full bg-background">
        <HeaderWithBackBtn title={<Search setParam={setParam} />} />
        {isFetching && (
          <div className="my-4">
            <PageLoadingSpinner spinnerExtraClass="w-7 h-7" />
          </div>
        )}
        <div className="px-4">
          <div className="mt-6 space-y-5">
            {Boolean(communities?.data?.data?.items.length) &&
              param &&
              communities?.data?.data?.items?.map((item, index) => (
                <CommunityCard key={index} {...item} />
              ))}
            {!isFetching && !Boolean(communities?.data?.data?.items.length) && (
              <div className="px-4 w-full justify-center pt-10">
                <div className="text-center text-lg font-bold">
                  No Result Found
                </div>
                <div className="text-center text-sm text-foreground/70">
                  No search results for "{param}".
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <RightSideBar className="min-w-[300px] lg:min-w-[380px]" />
    </div>
  );
};

export default SearchCommunity;
