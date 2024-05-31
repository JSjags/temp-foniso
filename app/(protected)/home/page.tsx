"use client";

import CreatePost from "@/components/Home/CreatePost";
import Post from "@/components/reusable/Post";
import RightSideBar from "@/components/RightSideBar";
import PageLoadingSpinner from "@/components/Spinner/PageLoadingSpinner";
import { Button } from "@/components/ui/button";
import { placeholderPosts } from "@/constants";
import { useUserContext } from "@/context/UserContext";
import { cn } from "@/lib/utils";
import axiosInstance from "@/services/api/axiosInstance";
import { getPosts, getSavedPosts } from "@/services/api/post";
import { getBlockedUsers, getFollowing } from "@/services/api/userService";
import { PostMeta } from "@/types";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { RefreshCcw } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { ImSpinner2 } from "react-icons/im";

type Props = {};

const Home = (props: Props) => {
  const router = useRouter();

  const { userData } = useUserContext();

  if (!userData) {
    router.replace("/login");
  }

  // https://stagingapi.foniso.team/api/v1/posts?page=1&limit=50&type=post

  const posts = useQuery({
    queryKey: ["get-posts"],
    queryFn: () => getPosts(),
    select(data) {
      return data.data.data.items;
    },
  });

  const following = useQuery({
    queryKey: ["following"],
    queryFn: getFollowing,
  });

  const blockedUsers = useQuery({
    queryKey: ["blocked-users"],
    queryFn: getBlockedUsers,
  });

  const savedPosts = useQuery({
    queryKey: ["get-saved-posts"],
    queryFn: () => getSavedPosts(),
    // select(data) {
    //   return data.data.data.items;
    // },
  });

  const [page, setPage] = useState(1); // Initial page number
  // const { data, isLoading, isError, isFetching, hasNextPage, fetchNextPage } =
  //   useInfiniteQuery({
  //     queryKey: ["posts"],
  //     queryFn: () => fetchPosts,
  //     initialPageParam: 1,
  //     getNextPageParam: (lastPage) => {
  //       return lastPage;
  //     }, // Determine next page// Query key
  //   });

  console.log(posts.data);

  return (
    <div className="flex gap-0 min-[480px]:gap-2">
      <div className="relative min-[480px]:mt-0 flex-1">
        <div className="">
          <CreatePost />
        </div>
        <div className=" flex flex-col gap-y-2 sm:bg-background min-h-screen">
          {console.log(posts)}
          {posts.isLoading && (
            <div className="mt-10 flex justify-center">
              {/* <PageLoadingSpinner /> */}
              <ImSpinner2 className="size-10 animate-spin text-[#4ED17E]" />
            </div>
          )}
          {Boolean(posts.isSuccess && posts && Boolean(posts.data.length)) &&
            posts.data.map((post: PostMeta, i: number) => (
              <Post key={i} postData={post} />
            ))}

          {/* Network error */}
          {Boolean(
            posts.failureCount >= 1 &&
              posts.failureReason?.message === "Network Error"
          ) && (
            <div className="flex justify-center items-center">
              <div className="my-10 px-6">
                <p className="font-bold text-foreground text-center">
                  Network Error
                </p>
                <p className="text-foreground/50 mt-2 text-sm text-center">
                  Please check your network and try again.
                </p>
                <div className="flex justify-center items-center">
                  <Button
                    onClick={() => {
                      posts.refetch();
                      console.log(posts.fetchStatus);
                    }}
                    className="h-12 mt-5 px-5 pl-5 bg-gradient-to-br w-fit from-[#0B953B] to-[#0F4E25] hover:bg-colorPrimary hover:brightness-90 rounded-full flex gap-2 items-center justify-start"
                  >
                    <RefreshCcw
                      color="white"
                      size={25}
                      className={cn(
                        "size-[22px]",
                        posts.isFetching && "animate-spin"
                      )}
                    />
                    <span className={cn("text-white text-lg font-semibold")}>
                      Retry
                    </span>
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <RightSideBar
        className={
          "min-w-[200px] w-[40%] max-w-[480px] gap-0 min-[480px]:gap-2"
        }
      />
    </div>
  );
};

export default Home;
