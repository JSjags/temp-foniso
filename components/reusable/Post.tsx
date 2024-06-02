"use client";

import Image from "next/image";
import SportIcon from "./SportIcon";
import { Heart, MoreVertical, X } from "lucide-react";
import { Button } from "../ui/button";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { cn, formatNumberCount, handlePostLikeIncrement } from "@/lib/utils";
import { IoArrowBackCircle, IoArrowForwardCircle } from "react-icons/io5";
import { IoIosCheckmarkCircle } from "react-icons/io";
import {
  placeholderComments,
  profileImageplaceholder,
  reactionsList,
  reportReasons,
  userPlaceholderImage,
} from "@/constants";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { LikeMeta, PostMeta, PostProps } from "@/types";
import PostViewer from "./PostViewer";
import VideoPlayer from "./VideoPlayer";
import { image } from "@cloudinary/url-gen/qualifiers/source";
import moment from "moment";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { likeOrUnlikePost } from "@/services/api/post";
import SuccessToast from "./toasts/SuccessToast";
import PostReplyDialog from "./PostReplyDialog";
import { useRouter } from "next/navigation";
import EmbeddedPost from "./EmbeddedSinglePost";
import ContentText from "./ContentText";
import FullScreenPost from "./FullScreenPost";
import ViewsModal from "./ViewsModal";
import ReportUserDialog from "./ReportUserDialog";
import DefaultPostOptions from "../post/DefaultPostOptions";
import UserPostOptions from "../post/UserPostOptions";
import ReportUserSuccessModal from "./ReportUserSuccessModal";
import Poll from "./Poll";
import { canIReply, customRelativeTime } from "@/utils";
import ReactionButton from "../ReactionButton";
import { useUserContext } from "@/context/UserContext";
import Link from "next/link";
import { getUserFollowing } from "@/services/api/userService";

const Post = ({ postData, optionsType, isFetching }: PostProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [post, setPost] = useState<PostMeta>(postData);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showReplyDialog, setShowReplyDialog] = useState(false);
  const [showReportSuccessModal, setShowReportSuccessModal] = useState(false);
  const [showFullScreenPost, setShowFullScreenPost] = useState(false);

  const [postLikedByMe, setPostLikedByMe] = useState<{
    status: boolean;
    emojiId: number;
  }>({
    status: postData?.likedByMe.length > 0,
    emojiId: postData?.likedByMe[0]?.emojiId ?? 0,
  });

  const { userData } = useUserContext();

  const likeOrUnlikeMutation = useMutation({
    mutationKey: ["like or unlike post", postLikedByMe],
    mutationFn: (data: { postId: number; type: string; emojiId: number }) =>
      likeOrUnlikePost(data.postId, data.type, data.emojiId),
    onSuccess: (data) => {
      // queryClient.invalidateQueries({
      //   queryKey: ["get-infinite-posts"],
      // });
      console.log(data);
      let copiedPostLikes: LikeMeta[] = JSON.parse(JSON.stringify(post.likes));

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

      setPost((prev) => ({
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

  const accountFollowing = useQuery({
    queryKey: [`account-following-${post.user.username}`],
    queryFn: () => getUserFollowing(post.user.id),
    enabled: post.canReply.toLowerCase().includes("follow"),
  });

  const handlePostLikeRequest = (index: number) => {
    likeOrUnlikeMutation.mutate({
      postId: post.id,
      type: "post",
      emojiId: index,
    });
  };

  useEffect(() => {
    if (postData.likedByMe.length > 0) {
      setPostLikedByMe({
        status: true,
        emojiId: postData?.likedByMe[0]?.emojiId,
      });
    } else {
      setPostLikedByMe({
        status: false,
        emojiId: 0,
      });
    }
    setPost(postData);
  }, [postData.likedByMe]);

  return (
    <div className="py-4 pb-2 px-2 sm:px-5 relative z-10 overflow-x-hidden border-none bg-background sm:bg-inherit border-border">
      {/* Views modal */}
      <ViewsModal
        showViewModal={showViewModal}
        setShowViewModal={setShowViewModal}
      />
      {/* Report modal */}
      <ReportUserDialog
        setShowReportModal={setShowReportModal}
        setShowReportSuccessModal={setShowReportSuccessModal}
        showReportModal={showReportModal}
        post={post}
      />
      {/* Report success modal */}
      <ReportUserSuccessModal
        post={post}
        showReportSuccessModal={showReportSuccessModal}
        setShowReportSuccessModal={setShowReportSuccessModal}
      />
      {/* Fullscreen post modal */}
      <FullScreenPost
        post={post}
        setShowFullScreenPost={setShowFullScreenPost}
        showFullScreenPost={showFullScreenPost}
      />
      {/* Show reply dialog */}
      <PostReplyDialog
        post={post}
        isOpen={showReplyDialog}
        setShowReplyDialog={setShowReplyDialog}
        buttonText="Comment"
      />
      <div
        className=""
        onClick={(e) => {
          e.stopPropagation();
          router.push(`/posts/${post.id}`);
        }}
      >
        <div className="flex items-start justify-between">
          <div className="flex gap-x-3">
            <Image
              width={45}
              height={45}
              className="size-[36px] sm:size-[45px] rounded-full object-cover cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                if (post.user.id === userData?.user.id) {
                  router.push(`/profile`);
                } else {
                  router.push(`/profile/${post.user.username}`);
                }
              }}
              alt="avatar"
              src={
                post?.user?.usermeta?.avatar !== null
                  ? post?.user?.usermeta?.avatar
                  : profileImageplaceholder
              }
            />
            <div>
              <div className="flex gap-x-2 items-center">
                <p
                  onClick={(e) => {
                    if (post.user.id === userData?.user.id) {
                      router.push(`/profile`);
                    } else {
                      router.push(`/profile/${post.user.username}`);
                    }
                    e.stopPropagation();
                  }}
                  className="text-foreground hover:underline cursor-pointer font-semibold text-base line-clamp-1 text-ellipsis whitespace-nowrap text-wrap break-words"
                >
                  {post?.user?.usermeta.firstname}{" "}
                  {post?.user?.usermeta.lastname}
                </p>
                <div className="flex gap-x-1 items-center">
                  {post.user.verified && (
                    <Image
                      width={14}
                      height={14}
                      className="size-[16px] rounded-full object-cover"
                      alt="avatar"
                      src={"/assets/app-icons/verified-icon.svg"}
                    />
                  )}
                  <SportIcon category={post?.user?.usermeta?.favorite_sport} />
                </div>
                <p className="text-sm text-inactive align-middle whitespace-nowrap">
                  {" "}
                  • {customRelativeTime(post?.created_at)}
                </p>
              </div>
              <p
                className="text-inactive text-sm min-[480px]:text-base hover:cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  if (post.user.id === userData?.user.id) {
                    router.push(`/profile`);
                  } else {
                    router.push(`/profile/${post.user.username}`);
                  }
                }}
              >
                @{post?.user?.username}
              </p>
            </div>
          </div>
          {/* <Button variant={"ghost"} className=" bg-transparent px-0"> */}

          {/* Post action btn options */}
          {!optionsType && post.user.id !== userData?.user.id && (
            <DefaultPostOptions
              post={post}
              setShowReportModal={setShowReportModal}
            />
          )}
          {(optionsType === "user" || post.user.id === userData?.user.id) && (
            <UserPostOptions post={post} />
          )}
          {/* </Button> */}
        </div>

        {/* content */}
        <div className="mt-4">
          <div
            // onClick={() => router.push(`/posts/${post.id}`)}
            className="w-full"
          >
            <ContentText
              text={post.content}
              // textRef={ref}
              contentId={post.id}
              // isShowingMore={isShowingMore}
            />
          </div>

          {/* media box */}
          <div className="mt-3">
            {Boolean(post.media && post.media.length) && (
              <PostViewer
                postData={post}
                setShowFullScreenPost={(value: boolean) =>
                  setShowFullScreenPost(value)
                }
                showFullScreenPost={showFullScreenPost}
              />
            )}
          </div>

          {/* poll */}
          <div className="my-4">
            {post.type === "poll" && <Poll post={post} setPost={setPost} />}
          </div>

          <div>
            {Boolean(post.likes && post.likes.length) && (
              <div className="text-colorWhite mt-2 text-base flex gap-x-2 item-center">
                {/* <Image
                  width={25}
                  height={25}
                  className="size-5 min-[480px]:size-[25px] rounded-full object-cover"
                  alt="icon"
                  src={
                    post.likes[0]?.user?.usermeta.avatar ??
                    "/assets/placeholder-person.png"
                  }
                /> */}
                {post.likes.length !== 1 &&
                  post.likes[0].user.id !== userData?.user.id && (
                    <div className="inline-flex items-center gap-x-[6px] text-foreground/70 text-sm min-[480px]:text-base">
                      <div className="inline-flex w-fit px-1 h-[22px] justify-around items-center bg-foreground/10 rounded-full">
                        {[
                          ...new Map(
                            post.likes.map((like) => [like.emojiId, like])
                          ).values(),
                        ]
                          .slice(0, 2)
                          .map((reaction, i) => (
                            <Image
                              key={i}
                              width={16}
                              height={16}
                              alt="reaction"
                              src={
                                reactionsList[reaction.emojiId] ??
                                reactionsList[1]
                              }
                              className="size-4"
                            />
                          ))}
                      </div>{" "}
                      <Link
                        onClick={(e) => e.stopPropagation()}
                        href={`/profile/${post.likes[0]?.user?.username}`}
                      >
                        <span className="font-bold hover:underline cursor-pointer text-foreground">
                          {post.likes[0]?.user?.username}
                        </span>
                      </Link>{" "}
                      {Boolean(post.likesCount - 1 >= 1) && (
                        <span>
                          and{" "}
                          <Link
                            onClick={(e) => e.stopPropagation()}
                            href={`/posts/${post.id}/stat`}
                          >
                            <span className="font-bold hover:underline cursor-pointer text-foreground">
                              {post.likesCount - 1}
                            </span>{" "}
                          </Link>
                          {post.likesCount - 1 > 1 ? "others" : "other"}
                        </span>
                      )}{" "}
                      reacted
                    </div>
                  )}
              </div>
            )}
            <div className="flex mt-4 items-center">
              <ReactionButton
                handlePostLikeIncrement={handlePostLikeIncrement}
                handlePostLikeRequest={handlePostLikeRequest}
                post={post}
                setPost={setPost}
                likeData={post.likedByMe}
                postLikedByMe={postLikedByMe}
                setPostLikedByMe={setPostLikedByMe}
              />
              {/* <div className="h-fit border-x border-border"> */}
              <Button
                variant={"ghost"}
                className="flex items-center mx-1 px-2 cursor-pointer py-0 h-7 hover:bg-foreground/5 rounded-full"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowReplyDialog(true);
                }}
                disabled={canIReply(
                  userData?.user!,
                  post,
                  accountFollowing.data?.data.data
                )}
              >
                <Image
                  width={20}
                  height={20}
                  className="size-[20px] object-cover"
                  alt="icon"
                  src={"/assets/post-icons/comment.svg"}
                />
                <p className="text-foreground/60 px-2 pr-0 font">
                  {formatNumberCount(post.commentsCount)}
                </p>
              </Button>
              {/* </div> */}
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowViewModal(true);
                }}
                variant={"ghost"}
                className="flex items-center mx-1 px-2 cursor-pointer py-0 h-7 hover:bg-foreground/5 rounded-full"
              >
                <Image
                  width={20}
                  height={20}
                  className="size-[20px] object-cover"
                  alt="icon"
                  src={"/assets/post-icons/views.svg"}
                />
                <p className="text-foreground/60 pl-2 font">
                  {formatNumberCount(post.viewsCount)}
                </p>
              </Button>
            </div>
            {Boolean(post.commentsCount > 0) && (
              <Button
                variant={"ghost"}
                className="text-inactive p-0 hover:bg-transparent hover:text-foreground"
                onClick={(e) => {
                  e.stopPropagation();
                  router.push(`/posts/${post.id}`);
                }}
              >
                View all comments
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
