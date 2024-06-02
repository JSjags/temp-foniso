"use client";

import ExploreSearch from "@/components/reusable/ExploreSearch";
import FavoritePosts from "@/components/reusable/FavoritePosts";
import Highlights from "@/components/reusable/Highlights";
import PeopleSuggestions from "@/components/reusable/PeopleSuggestions";
import Post from "@/components/reusable/Post";
import SubTabs from "@/components/reusable/SubTabs";
import Trending from "@/components/reusable/Trending";
import RightSideBar from "@/components/RightSideBar";
import PageLoadingSpinner from "@/components/Spinner/PageLoadingSpinner";
import {
  SearchCommunities,
  SearchPeople,
  SearchPost,
} from "@/components/sub-pages/explore";
import { Input } from "@/components/ui/input";
import { exploreTabs, notificationTabs, placeholderPosts } from "@/constants";
import { getExploreSuggestions, searchExplore } from "@/services/api/explore";
import { useQuery } from "@tanstack/react-query";
import { SearchIcon } from "lucide-react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

type Props = {};

const Explore = (props: Props) => {
  const searchParams = useSearchParams();

  const searchQuery = searchParams.get("search");
  const tab = searchParams.get("tab");

  const handleCurrentView = () => {
    switch (tab) {
      case "posts":
        return <SearchPost />;
      case "people":
        return <SearchPeople />;
      case "communities":
        return <SearchCommunities />;
      default:
        return (
          <div className="min-h-screen">
            <div className="min-[860px]:hidden">
              <PeopleSuggestions />
            </div>
            <Highlights />
            <FavoritePosts />
          </div>
        );
    }
  };

  return (
    <div className="flex gap-0 min-[480px]:gap-2">
      {/* max-w-[740px] */}
      <div className="relative w-full flex-1">
        {/* <Trending /> */}
        <div className="w-full flex gap-0 min-[480px]:gap-2 ">
          <div className="flex-1 bg-background">
            <div className="py-5 px-2 sm:px-6 relative">
              <ExploreSearch />
            </div>
            <div className="border-b border-border">
              {tab !== null && <SubTabs tabs={exploreTabs} />}
            </div>
            {handleCurrentView()}
          </div>
          <RightSideBar
            className={
              "min-w-[200px] w-[40%] max-w-[480px] gap-0 min-[480px]:gap-2"
            }
          />
        </div>
        {/* Favorite posts */}
        {/* <p className="text-foreground font-bold px-2 sm:px-6 text-2xl py-6 flex gap-x-2 items-center">
          <Image
            width={30}
            height={30}
            className="size-[30px] rounded-full object-cover"
            alt="icon"
            src={"/assets/app-icons/explore-category-icon.svg"}
          />
          <span>Formula 1</span>
        </p> */}
        {/* <div className="flex flex-col gap-y-2 ">
          {placeholderPosts.map((post, i) => (
            <Post key={i} post={post} />
          ))}
        </div> */}
      </div>
    </div>
  );
};

export default Explore;
