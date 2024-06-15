"use client";

import Link from "next/link";
import CommunityCard from "./CommunityCard";
import { useQuery } from "@tanstack/react-query";
import { allCommunities } from "@/services/api/community";
import PageLoadingSpinner from "../Spinner/PageLoadingSpinner";
import { CommunityContext } from "@/types/community";

const CommunitiesList = () => {
  const communities = useQuery({
    queryKey: ["all-communities"],
    queryFn: () => allCommunities(),
  });

  console.log(communities);

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

      {communities.isFetching ? (
        <div className="mt-10 flex justify-center">
          <PageLoadingSpinner spinnerExtraClass="w-7 h-7" />
        </div>
      ) : (
        <div className="mt-6 space-y-5">
          {}
          {communities.data?.data.data.items?.map(
            (item: CommunityContext, index: number) => (
              <CommunityCard key={index} {...item} />
            )
          )}
        </div>
      )}
    </div>
  );
};

export default CommunitiesList;
