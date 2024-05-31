"use client";

import ReactionSuggestionCard from "@/components/reusable/ReactionSuggestionCard";
import UserSuggestionCard from "@/components/reusable/UserSuggestionCard";
import RightSideBar from "@/components/RightSideBar";
import PageLoadingSpinner from "@/components/Spinner/PageLoadingSpinner";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { reactionsList } from "@/constants";
import { cn } from "@/lib/utils";
import {
  fetchSinglePostEmojis,
  fetchSinglePostStat,
} from "@/services/api/post";
import { LikeMeta, User } from "@/types";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { ImSpinner2 } from "react-icons/im";
import { IoArrowBack } from "react-icons/io5";

type Props = {};

const Page = (props: Props) => {
  const router = useRouter();
  const params = useParams<{ postId: string }>();
  const searchParams = useSearchParams();
  const eId = searchParams.get("eid");

  const allStat = useQuery({
    queryKey: [`fetch-single-post-stats-${params.postId}`],
    queryFn: () => fetchSinglePostStat(parseInt(params.postId)),
  });

  const emojis = useQuery({
    queryKey: ["fetch-single-post-emojis"],
    queryFn: () => fetchSinglePostEmojis(parseInt(params.postId)),
  });

  console.log(allStat.data?.data.data.items);
  console.log(emojis.data?.data.data);

  return (
    <div className="min-h-screen">
      <div className="flex gap-0 min-[480px]:gap-2">
        <div className="relative mt-2 min-[480px]:mt-0 flex-1 bg-background">
          <div className="p-2 sm:p-4 flex gap-x-2 items-center bg-background/50 backdrop-blur-lg sticky top-0 z-[100] border-b border-border">
            <Button
              className="p-0 w-6 h-6 bg-transparent rounded-full text-foreground hover:bg-foreground/20"
              onClick={() => router.back()}
            >
              <IoArrowBack size={20} />
            </Button>
            <p className="font-bold text-lg sm:text-2xl">Reactions</p>
          </div>
          <div className=" flex flex-col gap-y-2 sm:bg-inherit">
            {Boolean(
              allStat.isSuccess && Boolean(emojis.data?.data.data.length)
            ) && (
              // <Post post={post.data?.data.data} />
              <div className="w-full border-b border-border">
                <ScrollArea>
                  <div className="flex w-max space-x-4 p-4">
                    {/* <Link href={`/`}> */}
                    <div
                      role="button"
                      onClick={() =>
                        router.push(`/posts/${params.postId}/stat`)
                      }
                      className={cn(
                        "flex justify-center items-center gap-x-2 relative text-foreground/60 hover:text-foreground",
                        (eId === null || parseInt(eId) > 6) &&
                          "text-colorPrimary"
                      )}
                    >
                      <p>All</p>
                      <p>{allStat.data?.data.data.items.length}</p>
                      {(eId === null || parseInt(eId) > 6) && (
                        <div className="absolute -bottom-4 left-0 rounded-t-full w-full h-[3px] bg-colorPrimary" />
                      )}
                    </div>
                    {/* </Link> */}
                    {emojis.data?.data.data
                      .filter(
                        (e: { id: number; caption: string; total: number }) =>
                          e.total !== 0
                      )
                      .map(
                        (
                          emoji: { id: number; caption: string; total: number },
                          i: number
                        ) => (
                          <div
                            onClick={() => router.push(`?eid=${emoji.id}`)}
                            key={i}
                            className={cn(
                              "flex justify-center items-center gap-x-2 relative text-foreground/60 hover:text-foreground cursor-pointer",
                              eId !== null &&
                                parseInt(eId) === emoji.id &&
                                "text-colorPrimary"
                            )}
                          >
                            <Image
                              width={20}
                              height={20}
                              alt="reaction"
                              src={reactionsList[emoji.id]}
                              className="size-5"
                            />
                            <p>{emoji.total}</p>
                            {eId !== null && parseInt(eId) === emoji.id && (
                              <div className="absolute -bottom-4 left-0 rounded-t-full w-full h-[3px] bg-colorPrimary" />
                            )}
                          </div>
                        )
                      )}
                  </div>

                  <ScrollBar orientation="horizontal" />
                </ScrollArea>
              </div>
            )}
          </div>
          {/* Render fetched data */}
          {/* all reactions */}
          <div className="flex flex-col gap-y-4 px-2 sm:px-4 mt-4">
            {allStat.isLoading &&
              (eId === null || parseInt(eId) === 0 || !(parseInt(eId) > 6)) && (
                <div className="mt-10 flex justify-center">
                  <ImSpinner2 className="size-10 animate-spin text-[#4ED17E]" />
                </div>
              )}
            {!eId &&
              allStat.isSuccess &&
              allStat.data &&
              Boolean(allStat.data?.data.data.items.length) &&
              allStat.data?.data.data.items.map(
                (item: LikeMeta & { user: User }, i: number) => (
                  <ReactionSuggestionCard
                    data={item}
                    user={item.user}
                    key={i}
                    type={"reaction"}
                  />
                )
              )}
            {eId &&
              allStat.isSuccess &&
              allStat.data &&
              Boolean(allStat.data?.data.data.items.length) &&
              allStat.data?.data.data.items
                .filter(
                  (data: LikeMeta & { user: User }) =>
                    data.emojiId === parseInt(eId)
                )
                .map((item: LikeMeta & { user: User }, i: number) => (
                  <ReactionSuggestionCard
                    data={item}
                    user={item.user}
                    key={i}
                    type={"reaction"}
                  />
                ))}
            {allStat.isSuccess &&
              allStat.data &&
              !Boolean(allStat.data?.data.data.items.length) && (
                <div className="my-10 px-6 min-h-[60vh]">
                  <p className="font-bold text-foreground text-center">
                    No reactions
                  </p>
                  <p className="text-foreground/50 mt-2 text-sm text-center">
                    Be the first to react to this post.
                  </p>
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
    </div>
  );
};

export default Page;
