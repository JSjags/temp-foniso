import SportIcon from "@/components/reusable/SportIcon";
import PageLoadingSpinner from "@/components/Spinner/PageLoadingSpinner";
import { profileImageplaceholder } from "@/constants";
import { searchExplore } from "@/services/api/explore";
import { User } from "@/types";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useParams, useSearchParams } from "next/navigation";
import React from "react";

type Props = {};

const SearchPeople = (props: Props) => {
  const searchParams = useSearchParams();

  const searchPeople = useQuery({
    queryKey: ["search-users", searchParams.get("search")],
    queryFn: () => searchExplore(searchParams.get("search") ?? "", "user"),
    enabled: searchParams.get("search") !== "", // Only fetch suggestions when query is not empty
    refetchOnWindowFocus: false, // Disable automatic refetching on window focus
    refetchOnMount: false, // Disable automatic refetching on component mount
  });

  if (
    searchParams.get("search") === "" ||
    searchParams.get("search") === null
  ) {
    return (
      <div className="mt-10 px-6 ">
        <p className="font-bold text-foreground text-center">
          Enter a value to get results
        </p>
        <p className="text-foreground/50 mt-2 text-sm text-center">
          Start typing in the search bar above to see results
        </p>
      </div>
    );
  }

  if (searchPeople.isLoading) {
    return (
      <div className="w-full pt-10 flex justify-center">
        <PageLoadingSpinner />
      </div>
    );
  }
  console.log(searchPeople.data);

  if (Boolean(searchPeople.data?.data?.data?.items.length)) {
    return (
      <div className="mt-2">
        {searchPeople.data?.data.data.items.map(
          (suggestion: User, i: number) => (
            <div
              key={i}
              className="flex gap-x-3 rounded-md p-4 cursor-pointer"
              role="button"
              onClick={() => {}}
            >
              <Image
                width={36}
                height={36}
                className="size-[36px] sm:size-[36px] rounded-full object-cover"
                alt="avatar"
                src={
                  suggestion?.usermeta?.avatar !== null
                    ? suggestion?.usermeta?.avatar
                    : profileImageplaceholder
                }
              />
              <div>
                <div className="flex gap-x-2 items-center">
                  <p className="text-foreground hover:underline font-semibold text-sm line-clamp-1 text-ellipsis">
                    {suggestion?.usermeta.firstname}{" "}
                    {suggestion?.usermeta.lastname}
                  </p>
                  <div className="flex gap-x-1 items-center">
                    {suggestion?.verified && (
                      <Image
                        width={14}
                        height={14}
                        className="size-[16px] rounded-full object-cover"
                        alt="avatar"
                        src={"/assets/app-icons/verified-icon.svg"}
                      />
                    )}
                    <SportIcon
                      category={suggestion?.usermeta?.favorite_sport}
                    />
                  </div>
                </div>
                <p className="text-inactive text-xs">@{suggestion?.username}</p>
              </div>
            </div>
          )
        )}
      </div>
    );
  }
  if (
    searchPeople.isSuccess &&
    !Boolean(searchPeople.data?.data?.data?.items.length)
  ) {
    return (
      <div className="mt-10 px-6 ">
        <p className="font-bold text-foreground text-center">
          No result for &quot;{searchParams.get("search")}&quot;
        </p>
        <p className="text-foreground/50 mt-2 text-sm text-center">
          Try searching for something else
        </p>
      </div>
    );
  }
};

export default SearchPeople;
