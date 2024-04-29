import Post from "@/components/reusable/Post";
import SportIcon from "@/components/reusable/SportIcon";
import PageLoadingSpinner from "@/components/Spinner/PageLoadingSpinner";
import { profileImageplaceholder } from "@/constants";
import { searchExplore } from "@/services/api/explore";
import { PostMeta, User } from "@/types";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useParams, useSearchParams } from "next/navigation";
import React from "react";

type Props = {};

const SearchPost = (props: Props) => {
  const searchParams = useSearchParams();

  const searchPost = useQuery({
    queryKey: ["search-post", searchParams.get("search")],
    queryFn: () => searchExplore(searchParams.get("search") ?? "", "post"),
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

  if (searchPost.isLoading) {
    return (
      <div className="w-full pt-10 flex justify-center">
        <PageLoadingSpinner />
      </div>
    );
  }

  if (
    searchPost.isSuccess &&
    Boolean(searchPost.data?.data?.data?.items.length)
  ) {
    return (
      <div className="mt-2">
        {searchPost.data?.data.data.items.map((post: PostMeta, i: number) => (
          <Post key={i} post={post} />
        ))}
      </div>
    );
  }

  if (
    searchPost.isSuccess &&
    !Boolean(searchPost.data?.data?.data?.items.length)
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

export default SearchPost;
