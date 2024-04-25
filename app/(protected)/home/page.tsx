"use client";

import CreatePost from "@/components/Home/CreatePost";
import Post from "@/components/reusable/Post";
import HomeSidebar from "@/components/right-sidebar/HomeSidebar";
import RightSideBar from "@/components/RightSideBar";
import { placeholderPosts } from "@/constants";
import { useUserContext } from "@/context/UserContext";
import axiosInstance from "@/services/api/axiosInstance";
import { PostMeta } from "@/types";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { RotateSpinner } from "react-spinners-kit";

type Props = {};

const Home = (props: Props) => {
  const router = useRouter();

  const { userData } = useUserContext();

  if (!userData) {
    router.replace("/login");
  }

  // https://stagingapi.foniso.team/api/v1/posts?page=1&limit=50&type=post

  console.log("Homepage: ", userData);
  const [posts, setPosts] = useState<PostMeta[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchPosts = async () => {
    try {
      setIsLoading(true);
      const res = await axiosInstance.get("/posts?page=1&limit=50&type=post");
      setPosts(res.data.data.items);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

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

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="flex gap-0 min-[480px]:gap-2">
      <div className="relative mt-2 min-[480px]:mt-0 flex-1 bg-background">
        <div className="sticky -top-[194px] z-20">
          <CreatePost />
        </div>
        <div className=" flex flex-col gap-y-2 bg-background sm:bg-inherit">
          {isLoading && (
            <div className="mt-10 flex justify-center">
              <RotateSpinner size={30} color="#188C43" loading={isLoading} />
            </div>
          )}
          {Boolean(posts && posts.length) &&
            posts.map((post, i) => <Post key={i} post={post} />)}
        </div>
      </div>
      <RightSideBar
        containerClassName={
          "min-w-[200px] w-[40%] max-w-[480px] gap-0 min-[480px]:gap-2"
        }
        component={<HomeSidebar />}
      />
    </div>
  );
};

export default Home;
