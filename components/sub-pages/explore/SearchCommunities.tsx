import Post from "@/components/reusable/Post";
import SportIcon from "@/components/reusable/SportIcon";
import PageLoadingSpinner from "@/components/Spinner/PageLoadingSpinner";
import { Button } from "@/components/ui/button";
import { profileImageplaceholder } from "@/constants";
import { useUserContext } from "@/context/UserContext";
import { searchExplore } from "@/services/api/explore";
import { CommunityMeta, PostMeta, User } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { Globe } from "lucide-react";
import Image from "next/image";
import { useParams, useSearchParams } from "next/navigation";
import React from "react";

type Props = {};

const SearchCommunities = (props: Props) => {
  const { userData } = useUserContext();

  const searchParams = useSearchParams();

  const searchCommunity = useQuery({
    queryKey: ["search-community", searchParams.get("search")],
    queryFn: () => searchExplore(searchParams.get("search") ?? "", "community"),
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

  if (searchCommunity.isLoading) {
    return (
      <div className="w-full pt-10 flex justify-center">
        <PageLoadingSpinner />
      </div>
    );
  }

  if (
    searchCommunity.isSuccess &&
    Boolean(searchCommunity.data?.data?.data?.items.length)
  ) {
    return (
      <div>
        <div className="">
          {searchCommunity.data?.data.data.items.map(
            (community: CommunityMeta, i: number) => (
              <div key={i} className="border-b border-border mx-4">
                <div className=" flex justify-between">
                  <div
                    className="flex flex-1 gap-x-3 rounded-md py-4"
                    role="button"
                    onClick={() => {}}
                  >
                    <Image
                      width={45}
                      height={45}
                      className="size-[36px] sm:size-[45px] rounded-full object-cover border border-border/50"
                      alt="avatar"
                      src={
                        community.coverImage !== null
                          ? community.coverImage
                          : profileImageplaceholder
                      }
                    />
                    <div>
                      <div className="flex gap-x-2 items-center">
                        <p className="text-foreground hover:underline font-semibold text-sm line-clamp-1 text-ellipsis">
                          {community.name}{" "}
                        </p>
                        <div className="flex gap-x-1 items-center">
                          <Image
                            width={14}
                            height={14}
                            className="size-[16px] rounded-full object-cover"
                            alt="avatar"
                            src={"/assets/app-icons/verified-icon.svg"}
                          />
                        </div>
                      </div>
                      <p className="text-foreground/70 text-sm mt-1 flex gap-x-1 items-center">
                        <Globe size={14} />{" "}
                        <span>
                          {community?.memberCount}{" "}
                          {community?.memberCount > 1 ? "members" : "member"}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="w-fit">
                    {Boolean(
                      community.isMember.filter(
                        (item) => item.userId === userData?.user.id
                      ).length
                    ) ? (
                      <Button className="rounded-full bg-colorPrimary text-white w-[129px] h-9 mt-4 font-medium">
                        Joined
                      </Button>
                    ) : (
                      <Button className="rounded-full w-[129px] h-9 mt-4 font-medium">
                        Join
                      </Button>
                    )}
                  </div>
                </div>
                <div className="mb-2">
                  <p
                    className="text-foreground/50"
                    dangerouslySetInnerHTML={{ __html: community.description }}
                  ></p>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    );
  }

  if (
    searchCommunity.isSuccess &&
    !Boolean(searchCommunity.data?.data?.data?.items.length)
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

export default SearchCommunities;
