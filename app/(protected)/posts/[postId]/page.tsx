"use client";

import ReactionButton from "@/components/ReactionButton";
import CommentCard from "@/components/reusable/CommentCard";
import ContentText from "@/components/reusable/ContentText";
import Loading from "@/components/reusable/Loading";
import MessageBox from "@/components/reusable/MessageBox";
import Poll from "@/components/reusable/Poll";
import Post from "@/components/reusable/Post";
import PostViewer from "@/components/reusable/PostViewer";
import SportIcon from "@/components/reusable/SportIcon";
import ErrorToast from "@/components/reusable/toasts/ErrorToast";
import SuccessToast from "@/components/reusable/toasts/SuccessToast";
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
import { useUserContext } from "@/context/UserContext";
import {
  cn,
  formatDateTime,
  formatNumberCount,
  handlePostLikeIncrement,
} from "@/lib/utils";
import {
  getPosts,
  getSinglePost,
  getSinglePostComments,
  likeOrUnlikePost,
  nestedReplyQuery,
  postCommentQuery,
  replyCommentQuery,
} from "@/services/api/post";
import { CommentMeta, LikeMeta, PostMeta, ReplyMeta, User } from "@/types";
import { Arrow } from "@radix-ui/react-popover";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { Heart, MoreVertical } from "lucide-react";
import moment from "moment";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Fragment, RefObject, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { ImSpinner2 } from "react-icons/im";
import { IoArrowBack } from "react-icons/io5";
import {
  MentionsInputComponent,
  MentionsInputComponentUnrwapped,
} from "react-mentions";
import { useInView } from "react-intersection-observer";

export default function Page({ params }: { params: any }) {
  const queryClient = useQueryClient();
  const inputRef = useRef<HTMLInputElement>(null);

  const post = useQuery({
    queryKey: ["single-post-data"],
    queryFn: () => getSinglePost(params.postId),
  });

  const router = useRouter();
  const [value, setValue] = useState("");
  const [commentType, setCommentType] = useState<
    "comment" | "reply" | "nestedReply"
  >("comment");
  const [currentComment, setCurrentComment] = useState<CommentMeta | null>(
    null
  );
  const [currentReply, setCurrentReply] = useState<ReplyMeta | null>(null);
  const [showFullScreenPost, setShowFullScreenPost] = useState(false);
  const [isTruncated, setIsTruncated] = useState(false);
  const [isShowingMore, setIsShowingMore] = useState(false);
  const [postData, setPostData] = useState<PostMeta>(post.data?.data?.data);
  const [postLikedByMe, setPostLikedByMe] = useState<{
    status: boolean;
    emojiId: number;
  }>({
    status: postData?.likedByMe.length > 0,
    emojiId: postData?.likedByMe[0]?.emojiId ?? 0,
  });

  const { ref: loadMoreRef, inView } = useInView();

  // const [postData, setPost] = useState<PostMeta>(postData);

  const ref = useRef(null);

  const toggleIsShowingMore = () => setIsShowingMore((prev) => !prev);

  const comments = useInfiniteQuery({
    queryKey: ["single-post-comments"],
    queryFn: ({ pageParam }: { pageParam: number }) =>
      getSinglePostComments(params.postId, pageParam),
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
    if (post.isSuccess) {
      setPostData(post.data?.data.data);
      setPostLikedByMe({
        status: post?.data.data.data.likedByMe.length > 0,
        emojiId: post?.data.data.data.likedByMe[0]?.emojiId ?? 0,
      });
    }
  }, [
    post.isSuccess,
    post.data?.data.data?.likedByMe.length,
    post.data?.data.data?.likedByMe,
    post.data?.data.data?.emojiId,
  ]);

  useEffect(() => {
    if (post.isSuccess) {
      setPostData(post.data?.data.data);
    }
  }, [post.isSuccess, post.data?.data.data]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [commentType]);

  console.log(post.data?.data.data);
  console.log(post.data?.data.data?.likedByMe);

  const likeOrUnlikeMutation = useMutation({
    mutationKey: ["like or unlike post", postLikedByMe],
    mutationFn: (data: { postId: number; type: string; emojiId: number }) =>
      likeOrUnlikePost(data.postId, data.type, data.emojiId),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        type: "all",
      });
      console.log(data);
      let copiedPostLikes: LikeMeta[] = JSON.parse(
        JSON.stringify(postData.likes)
      );

      console.log(copiedPostLikes);
      console.log(userData?.user.id);
      console.log({ ...data.data.data, user: userData?.user });

      if (
        Boolean(
          copiedPostLikes.filter((like) => like.user.id === userData?.user.id)
            .length
        )
      ) {
        console.log(copiedPostLikes);
        copiedPostLikes.splice(
          copiedPostLikes.findIndex((obj) => obj.id === userData?.user.id),
          1
        );
      } else {
        copiedPostLikes = [
          ...copiedPostLikes,
          { ...data.data.data, user: userData?.user },
        ];
      }

      setPostData((prev) => ({
        ...prev,
        likedByMe: [data.data.data],
        likes: copiedPostLikes,
        likesCount:
          data.data.data.emojiId !== null
            ? prev.likesCount + 1
            : prev.likesCount - 1,
      }));
    },
    onError: (error) => console.log(error),
  });
  const handlePostLikeRequest = (index: number) => {
    likeOrUnlikeMutation.mutate({
      postId: post.data?.data.data.id,
      type: "post",
      emojiId: index,
    });
  };

  const { userData } = useUserContext();

  const comment = useMutation({
    mutationKey: ["comment"],
    mutationFn: (data: { postId: number; commentValue: string }) =>
      postCommentQuery(data.postId, data.commentValue),
    onSuccess: (data) => {
      console.log(data);
      setValue("");
      toast.custom((t) => (
        <SuccessToast t={t} message={"Comment made successfully."} />
      ));

      queryClient.invalidateQueries({
        queryKey: ["single-post-comments"],
        // type: "all",
      });
      queryClient.invalidateQueries({
        queryKey: ["single-post-data"],
        // type: "all",
      });
    },
    onError: (error) => {
      toast.custom((t) => (
        <ErrorToast
          t={t}
          message={error?.message ?? "Couldn't make your comment."}
        />
      ));
    },
  });
  const reply = useMutation({
    mutationKey: ["reply"],
    mutationFn: (data: { commentId: number; replyValue: string }) =>
      replyCommentQuery(data.commentId, data.replyValue),
    onSuccess: (data) => {
      console.log(data);
      setValue("");
      toast.custom((t) => (
        <SuccessToast t={t} message={"Reply sent successfully."} />
      ));

      queryClient.invalidateQueries({
        queryKey: ["single-post-comments", "single-post-data"],
        // type: "all",
      });
    },
    onError: (error) => {
      toast.custom((t) => (
        <ErrorToast
          t={t}
          message={error?.message ?? "Couldn't send your reply."}
        />
      ));
    },
  });

  const nestedReply = useMutation({
    mutationKey: ["nested-reply"],
    mutationFn: (data: {
      commentId: number;
      replyId: number;
      replyValue: string;
    }) => nestedReplyQuery(data.commentId, data.replyId, data.replyValue),
    onSuccess: (data) => {
      console.log(data);
      setValue("");
      toast.custom((t) => (
        <SuccessToast t={t} message={"Reply sent successfully."} />
      ));

      queryClient.invalidateQueries({
        queryKey: ["single-post-comments"],
        // type: "all",
      });
    },
    onError: (error) => {
      toast.custom((t) => (
        <ErrorToast
          t={t}
          message={error?.message ?? "Couldn't send your reply."}
        />
      ));
    },
  });

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const val = evt.target?.value;

    setValue(val);
  };

  const handleCommentAction = (data: {
    postId: number;
    commentValue: string;
  }) => {
    comment.mutate(data);
  };
  const handleReplyAction = (data: {
    commentId: number;
    replyValue: string;
  }) => {
    reply.mutate(data);
  };
  const handleNestedReplyAction = (data: {
    commentId: number;
    replyId: number;
    replyValue: string;
  }) => {
    nestedReply.mutate(data);
  };

  useEffect(() => {
    if (inView) {
      comments.fetchNextPage();
    }
  }, [comments.fetchNextPage, inView]);

  return (
    <div className="">
      <div className="flex gap-0 min-[480px]:gap-2">
        <div className="relative mt-0 min-[480px]:mt-0 flex-1 bg-background">
          <div className="p-2 sm:p-4 flex gap-x-2 items-center bg-background/50 backdrop-blur-lg sticky top-12 min-[480px]:top-0 z-[100]">
            <Button
              className="p-0 w-6 h-6 bg-transparent rounded-full text-foreground hover:bg-foreground/20"
              onClick={() => router.back()}
            >
              <IoArrowBack size={20} />
            </Button>
            <p className="font-bold text-xl sm:text-2xl">Post</p>
          </div>
          <div className="flex flex-col gap-y-2 sm:bg-inherit">
            {post.isLoading && (
              <div className="mt-10">
                <PageLoadingSpinner />
              </div>
            )}
            {/* {Boolean(postData && post.data?.data.data) && ( */}
            {Boolean(postData) && (
              // <Post post={post.data?.data.data} />
              <>
                <div className="p-4 border-b border-border">
                  <div className="flex gap-x-3">
                    <Image
                      width={45}
                      height={45}
                      className="size-[36px] sm:size-[45px] rounded-full object-cover"
                      alt="avatar"
                      src={
                        post.data?.data.data?.user?.usermeta?.avatar ??
                        "/assets/placeholder-person.png"
                      }
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
                      <p className="text-inactive text-sm">
                        @{post.data?.data.data?.user?.username}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <ContentText
                      text={post.data?.data.data?.content}
                      // textRef={ref}
                      contentId={post.data?.data.data?.id}
                      // isShowingMore={isShowingMore}
                    />

                    {/* media box */}
                    <div className="mt-3 overflow-hidden">
                      {Boolean(
                        post.data?.data.data?.media &&
                          post.data?.data.data?.media.length
                      ) && (
                        <PostViewer
                          postData={post.data?.data.data}
                          setShowFullScreenPost={(value: boolean) =>
                            setShowFullScreenPost(value)
                          }
                          showFullScreenPost={showFullScreenPost}
                        />
                      )}
                    </div>

                    {/* poll */}
                    <div className="my-4">
                      {postData.type === "poll" && (
                        <Poll post={postData} setPost={setPostData} />
                      )}
                    </div>

                    <p className="font-normal text-foreground/50 pt-2 text-sm">
                      {formatDateTime(post.data?.data.data?.created_at)}
                    </p>
                    <div className="">
                      <div className="flex gap-x-4 mt-4 items-center">
                        <div className="flex items-center text-inactive">
                          <p className="text-foreground pr-1 font-bold">
                            {formatNumberCount(postData?.likesCount ?? "0")}
                          </p>{" "}
                          Reactions
                        </div>
                        <div className="flex items-center text-inactive">
                          <p className="text-foreground pr-1 font-bold ">
                            {formatNumberCount(postData?.commentsCount ?? "0")}
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
                            {formatNumberCount(postData?.viewsCount ?? "0")}
                          </p>{" "}
                          Views
                        </div>
                      </div>
                      <div className="flex gap-x-0 mt-3 items-center">
                        <ReactionButton
                          handlePostLikeIncrement={handlePostLikeIncrement}
                          handlePostLikeRequest={handlePostLikeRequest}
                          post={postData}
                          setPost={setPostData}
                          likeData={postData?.likedByMe}
                          postLikedByMe={postLikedByMe}
                          setPostLikedByMe={setPostLikedByMe}
                        />
                        <Button
                          onClick={() => {
                            setCommentType("comment");
                            setCurrentComment(null);
                            setCurrentReply(null);
                          }}
                          variant={"ghost"}
                          className="hover:bg-foreground/5 rounded-full py-1 h-7 px-2"
                        >
                          <Image
                            width={20}
                            height={20}
                            className="size-[20px] object-cover"
                            alt="icon"
                            src={"/assets/post-icons/comment.svg"}
                          />
                        </Button>
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
                  Boolean(comments.data?.pages[0].data.data.items.length) && (
                    <>
                      <div className="p-4 pb-6 relative flex flex-col gap-y-6 min-h-screen">
                        {comments.data?.pages.map((group, i) => (
                          <Fragment key={i}>
                            {group.data.data.items.map(
                              (comment: CommentMeta, i: number) => (
                                <CommentCard
                                  key={i}
                                  comment={comment}
                                  setCommentType={setCommentType}
                                  setCurrentComment={setCurrentComment}
                                  setCurrentReply={setCurrentReply}
                                />
                              )
                            )}
                          </Fragment>
                        ))}
                      </div>

                      <div ref={loadMoreRef} className="bg-background h-10">
                        {comments.isFetchingNextPage && (
                          <Loading
                            isLoading={comments.isFetchingNextPage}
                            className="w-full min-h-10 pb-5"
                          />
                        )}
                      </div>
                    </>
                  )}

                {comments.isSuccess &&
                  Boolean(comments.data?.pages.length <= 1) &&
                  Boolean(!comments.data?.pages[0].data.data.items.length) && (
                    <div className="my-10 px-6 min-h-[60vh]">
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
                    src={
                      userData?.user.usermeta.avatar ?? profileImageplaceholder
                    }
                  />
                  <div className="rounded-3xl bg-foreground/10 border-none min-h-10 pr-14 placeholder:text-foreground/80 pl-10">
                    <MessageBox
                      inputRef={inputRef}
                      commentType={commentType}
                      paddingTop={8}
                      fontSize={15}
                      height={40}
                      // readOnly={currentPost?.type == "poll"}
                      value={value}
                      placeholder={
                        commentType === "comment"
                          ? `Comment on @${post.data?.data.data?.user?.username}'s post`
                          : commentType === "reply"
                          ? `Reply @${currentComment?.user?.username}'s comment`
                          : `Reply @${currentReply?.user?.username}'s reply`
                      }
                      handleChange={(
                        e,
                        newValue,
                        newPlainTextValue,
                        mentions
                      ) => {
                        setValue(newPlainTextValue);
                        // if (currentPost) {
                        //   setPostContent(newPlainTextValue);
                        // }
                        // setMentions(mentions);
                        // setTags

                        return {
                          e,
                          newValue,
                          newPlainTextValue,
                          mentions,
                        };
                      }}
                    />
                  </div>
                  <div className="flex items-end absolute right-4 bottom-4 w-fit h-max min-h-11">
                    <Button
                      disabled={
                        value.trim().length <= 0 ||
                        comment.isPending ||
                        reply.isPending ||
                        nestedReply.isPending
                      }
                      onClick={() => {
                        if (commentType === "comment") {
                          handleCommentAction({
                            postId: post?.data.data.data.id,
                            commentValue: value,
                          });
                        } else if (commentType === "reply") {
                          handleReplyAction({
                            commentId: currentComment?.id!,
                            replyValue: value,
                          });
                        } else {
                          handleNestedReplyAction({
                            commentId: currentComment?.id!,
                            replyId: currentReply?.id!,
                            replyValue: value,
                          });
                        }
                      }}
                      variant={"ghost"}
                      className="text-colorPrimary hover:bg-colorPrimary rounded-full min-h-11"
                    >
                      {comment.isPending ||
                      reply.isPending ||
                      nestedReply.isPending ? (
                        <div className="flex justify-center">
                          <ImSpinner2 className="size-6 animate-spin text-white" />
                        </div>
                      ) : (
                        <span className="w-fit text-base font-bold block p-0 align-middle">
                          Send
                        </span>
                      )}
                    </Button>
                  </div>
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
