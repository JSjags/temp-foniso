"use client";

import CreatePost from "@/components/Home/CreatePost";
import Loading from "@/components/reusable/Loading";
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
import {
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { RefreshCcw } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { Fragment, useEffect, useState } from "react";
import { ImSpinner2 } from "react-icons/im";
import { useInView } from "react-intersection-observer";
import { motion, AnimatePresence } from "framer-motion";

type Props = {};

const Home = (props: Props) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { ref, inView } = useInView();

  const { userData } = useUserContext();

  if (!userData) {
    router.replace("/login");
  }

  // https://stagingapi.foniso.team/api/v1/posts?page=1&limit=50&type=post

  const posts = useInfiniteQuery({
    queryKey: ["get-infinite-posts"],
    gcTime: Infinity,
    queryFn: getPosts,
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages, lastPageParam, allPageParams) => {
      console.log(lastPage, allPages, lastPageParam, allPageParams);
      if (lastPage.length === 0) {
        return undefined;
      }
      return lastPageParam + 1;
    },
  });

  useEffect(() => {
    if (inView) {
      posts.fetchNextPage();
    }
  }, [posts.fetchNextPage, inView]);

  return (
    <div className="flex gap-0 min-[480px]:gap-2">
      <div className="relative min-[480px]:mt-0 flex-1">
        <div className="">
          <CreatePost />
        </div>
        <div ref={ref} className="bg-background">
          <AnimatePresence>
            {posts.isRefetching && (
              <motion.div
                className="pt-2"
                initial={{ opacity: 0, y: 50, height: 0 }}
                animate={{ opacity: 1, y: 0, height: "auto" }}
                exit={{ opacity: 0, y: 50, height: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Loading
                  isLoading={posts.isFetchingNextPage}
                  className="w-full min-h-10 pb-5"
                  extraClass="size-4 sm:size-5"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className=" flex flex-col gap-y-2 sm:bg-background min-h-screen">
          {posts.isLoading && (
            <div className="mt-10 flex justify-center">
              {/* <PageLoadingSpinner /> */}
              <ImSpinner2 className="size-10 animate-spin text-[#4ED17E]" />
            </div>
          )}
          {Boolean(posts.isSuccess) &&
            posts.data?.pages.map((group, i) => (
              <Fragment key={i}>
                {group.data.data.items.map((post: PostMeta, i: number) => (
                  <Post key={i} postData={post} isFetching={posts.isFetching} />
                  // <div
                  //   onClick={() =>
                  //     router.push(`/profile/${post.user.username}`)
                  //   }
                  //   className="h-40 bg-foreground/10"
                  // >
                  //   <p>{post.likesCount}</p>
                  // </div>
                ))}
              </Fragment>
            ))}
          {/* {Boolean(posts.isSuccess && posts && Boolean(posts.data.length)) &&
            posts.data.map((post: PostMeta, i: number) => (
              <Post key={i} postData={post} />
            ))} */}

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
        <div ref={ref} className="bg-background h-10">
          {posts.isFetchingNextPage && (
            <Loading
              isLoading={posts.isFetchingNextPage}
              className="w-full min-h-10 pb-5"
            />
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
