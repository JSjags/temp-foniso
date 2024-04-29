"use client";

import CommentCard from "@/components/reusable/CommentCard";
import Post from "@/components/reusable/Post";
import PostViewer from "@/components/reusable/PostViewer";
import SportIcon from "@/components/reusable/SportIcon";
import RightSideBar from "@/components/RightSideBar";
import PageLoadingSpinner from "@/components/Spinner/PageLoadingSpinner";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { placeholderComments, profileImageplaceholder } from "@/constants";
import {
  cn,
  formatDateTime,
  formatNumberCount,
  handlePostLikeIncrement,
} from "@/lib/utils";
import {
  getSinglePost,
  getSinglePostComments,
  likeOrUnlikePost,
} from "@/services/api/post";
import { CommentMeta } from "@/types";
import { Arrow } from "@radix-ui/react-popover";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Heart, MoreVertical } from "lucide-react";
import moment from "moment";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { IoArrowBack } from "react-icons/io5";

export default function Page({ params }: { params: any }) {
  const router = useRouter();
  const [showFullScreenPost, setShowFullScreenPost] = useState(false);
  const [isTruncated, setIsTruncated] = useState(false);
  const [isShowingMore, setIsShowingMore] = useState(false);

  const ref = useRef(null);

  const toggleIsShowingMore = () => setIsShowingMore((prev) => !prev);

  const post = useQuery({
    queryKey: ["single-post"],
    queryFn: () => getSinglePost(params.postId),
  });

  const comments = useQuery({
    queryKey: ["single-post-comments"],
    queryFn: () => getSinglePostComments(params.postId),
  });

  const [postLikedByMe, setPostLikedByMe] = useState<boolean>(
    post.data?.data.data?.likedByMe.length > 0
  );

  useEffect(() => {
    if (post.isSuccess) {
      setPostLikedByMe(post.data?.data.data?.likedByMe.length > 0);
    }
  }, [post.isSuccess, post.data?.data.data?.likedByMe.length]);

  console.log(post.data?.data.data?.likedByMe);

  const likeOrUnlikeMutation = useMutation({
    mutationKey: ["like or unlike post", setPostLikedByMe],
    mutationFn: (data: { postId: number; type: string }) =>
      likeOrUnlikePost(data.postId, data.type),
    onSuccess: (data) => console.log(data),
    onError: (error) => console.log(error),
  });

  const handlePostLikeRequest = () => {
    likeOrUnlikeMutation.mutate({
      postId: post.data?.data.data.id,
      type: "post",
    });
  };

  console.log(comments.data?.data.data);

  return (
    <div>
      <div className="flex gap-0 min-[480px]:gap-2">
        <div className="relative mt-2 min-[480px]:mt-0 flex-1 bg-background">
          <div className="p-4 flex gap-x-2 items-center bg-background/50 backdrop-blur-lg sticky top-0 z-[100]">
            <Button
              className="p-0 w-6 h-6 bg-transparent rounded-full text-foreground hover:bg-foreground/20"
              onClick={() => router.back()}
            >
              <IoArrowBack size={20} />
            </Button>
            <p className="font-bold text-2xl">Post</p>
          </div>
          <div className=" flex flex-col gap-y-2 bg-background sm:bg-inherit">
            {post.isLoading && (
              <div className="mt-10">
                <PageLoadingSpinner />
              </div>
            )}
            {Boolean(post.isSuccess && post.data?.data.data) && (
              // <Post post={post.data?.data.data} />
              <>
                <div className="p-4 border-b border-border">
                  <div className="flex gap-x-3">
                    <Image
                      width={45}
                      height={45}
                      className="size-[36px] sm:size-[45px] rounded-full object-cover"
                      alt="avatar"
                      src={post.data?.data.data?.user?.usermeta?.avatar ?? ""}
                    />
                    <div>
                      <div className="flex gap-x-2 items-center">
                        <p className="text-foreground font-semibold text-base line-clamp-1 text-ellipsis">
                          {post.data?.data.data?.user?.usermeta?.firstname}{" "}
                          {post.data?.data.data?.user?.usermeta?.lastname}
                        </p>
                        <div className="flex gap-x-1 items-center">
                          <Image
                            width={14}
                            height={14}
                            className="size-[16px] rounded-full object-cover"
                            alt="avatar"
                            src={"/assets/app-icons/verified-icon.svg"}
                          />
                          <SportIcon
                            category={
                              post.data?.data.data?.user?.usermeta
                                ?.favorite_sport
                            }
                          />
                        </div>
                      </div>
                      <p className="text-inactive">
                        @{post.data?.data.data?.user?.username}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <p
                      ref={ref}
                      dangerouslySetInnerHTML={{
                        __html: post.data?.data.data?.content,
                      }}
                      className={cn(
                        "text-foreground text-ellipsis",
                        !isShowingMore && "line-clamp-2"
                      )}
                    />
                    <div
                      className={cn(
                        "flex justify-end",
                        !isShowingMore ? "-translate-y-6" : "mb-2"
                      )}
                    >
                      {isTruncated && (
                        <button
                          onClick={toggleIsShowingMore}
                          className={cn(
                            "block bg-background text-foreground/50 text-start",
                            !isShowingMore ? "w-1/2" : ""
                          )}
                        >
                          {isShowingMore ? "Show less" : "...Show more"}
                        </button>
                      )}
                    </div>
                    {/* media box */}
                    <div className="mt-3 relative">
                      {Boolean(
                        post.data?.data.data?.media &&
                          post.data?.data.data?.media.length
                      ) && (
                        <PostViewer
                          post={post.data?.data.data}
                          setShowFullScreenPost={(value: boolean) =>
                            setShowFullScreenPost(value)
                          }
                          showFullScreenPost={showFullScreenPost}
                        />
                      )}
                    </div>

                    <p className="font-normal text-foreground/50 pt-2 text-sm">
                      {formatDateTime(post.data?.data.data?.created_at)}
                    </p>
                    <div className="">
                      <div className="flex gap-x-4 mt-4 items-center">
                        <div className="flex items-center text-inactive">
                          <p className="text-foreground pr-1 font-bold">
                            {formatNumberCount(
                              handlePostLikeIncrement(
                                post.data?.data.data.likesCount,
                                post.data?.data.data.likedByMe,
                                postLikedByMe
                              )
                            )}
                          </p>{" "}
                          Likes
                        </div>
                        <div className="flex items-center text-inactive">
                          <p className="text-foreground pr-1 font-bold ">
                            {post.data?.data.data?.commentsCount}
                          </p>{" "}
                          Comments
                        </div>
                        <div className="flex items-center cursor-pointer text-inactive">
                          {/* <Image
                            width={20}
                            height={20}
                            className="size-[20px] object-cover"
                            alt="icon"
                            src={"/assets/post-icons/views.svg"}
                          /> */}
                          <p className="pr-1 font-bold text-foreground">
                            {post.data?.data.data?.viewsCount}
                          </p>{" "}
                          Views
                        </div>
                      </div>
                      <div className="flex gap-x-4 mt-3">
                        <div
                          className="flex items-center cursor-pointer"
                          role="button"
                          onClick={() => {
                            handlePostLikeRequest();
                            setPostLikedByMe((prev) => !prev);
                          }}
                        >
                          <Heart
                            className={cn(
                              "size-[20px]",
                              postLikedByMe
                                ? "text-red-600 fill-red-600"
                                : "text-foreground/70"
                            )}
                          />
                        </div>
                        <Image
                          width={20}
                          height={20}
                          className="size-[20px] object-cover"
                          alt="icon"
                          src={"/assets/post-icons/comment.svg"}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <p className="py-2 border-b border-border font-bold text-foreground pl-4 sticky top-0 z-50 bg-background">
                  Comments
                </p>
                {comments.isLoading && (
                  <div className="mt-10">
                    <PageLoadingSpinner />
                  </div>
                )}
                {comments.isSuccess &&
                  Boolean(comments.data?.data.data.items.length) && (
                    <div className="p-4 pb-6 relative flex flex-col gap-y-6">
                      {comments.data?.data.data.items.map(
                        (comment: CommentMeta, i: number) => (
                          <CommentCard key={i} comment={comment} />
                        )
                      )}
                    </div>
                  )}
                {comments.isSuccess &&
                  Boolean(!comments.data?.data.data.items.length) && (
                    <div className="my-10 px-6 ">
                      <p className="font-bold text-foreground text-center">
                        No comments
                      </p>
                      <p className="text-foreground/50 mt-2 text-sm text-center">
                        Be the first to break the silence.
                      </p>
                    </div>
                  )}
                <div className="p-4 border-t border-border sticky bottom-0 w-full z-50 text-foreground bg-background">
                  <Image
                    width={25}
                    height={25}
                    className="size-[25px] rounded-full object-cover absolute top-6 left-6"
                    alt="icon"
                    src={profileImageplaceholder}
                  />
                  <Input
                    placeholder={`Reply to @${post.data?.data.data?.user?.username}`}
                    className="rounded-full bg-foreground/10 border-none pr-14 placeholder:text-foreground/80 pl-10"
                  />
                  <Button
                    variant={"ghost"}
                    className="text-colorPrimary absolute right-4 top-4"
                  >
                    Send
                  </Button>
                </div>
              </>
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
}
