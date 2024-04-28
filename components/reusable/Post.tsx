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
  reportReasons,
  userPlaceholderImage,
} from "@/constants";
import { useLayoutEffect, useRef, useState } from "react";
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
import { PostProps } from "@/types";
import PostViewer from "./PostViewer";
import VideoPlayer from "./VideoPlayer";
import { image } from "@cloudinary/url-gen/qualifiers/source";
import moment from "moment";
import { useMutation } from "@tanstack/react-query";
import { likeOrUnlikePost } from "@/services/api/post";
import SuccessToast from "./toasts/SuccessToast";
import PostReplyDialog from "./PostReplyDialog";
import { useRouter } from "next/navigation";
import EmbeddedPost from "./EmbeddedSinglePost";
import ContentText from "./ContentText";
import FullScreenPost from "./FullScreenPost";
import ViewsModal from "./ViewsModal";
import ReportUserDialog from "./ReportUserDialog";

const Post = ({ post }: PostProps) => {
  const router = useRouter();
  const [showViewModal, setShowViewModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showReplyDialog, setShowReplyDialog] = useState(false);
  const [showReportSuccessModal, setShowReportSuccessModal] = useState(false);
  const [showFullScreenPost, setShowFullScreenPost] = useState(false);
  const [isTruncated, setIsTruncated] = useState(false);
  const [isShowingMore, setIsShowingMore] = useState(false);

  const [postLikedByMe, setPostLikedByMe] = useState<boolean>(
    post?.likedByMe.length > 0
  );

  const ref = useRef(null);

  const likeOrUnlikeMutation = useMutation({
    mutationKey: ["like or unlike post", postLikedByMe],
    mutationFn: (data: { postId: number; type: string }) =>
      likeOrUnlikePost(data.postId, data.type),
    onSuccess: (data) => console.log(data),
    onError: (error) => console.log(error),
  });
  const handlePostLikeRequest = () => {
    likeOrUnlikeMutation.mutate({ postId: post.id, type: "post" });
  };

  useLayoutEffect(() => {
    const { offsetHeight, scrollHeight } = ref.current || {
      offsetHeight: null,
      scrollHeight: null,
    };

    if (offsetHeight && scrollHeight && offsetHeight < scrollHeight) {
      setIsTruncated(true);
    } else {
      setIsTruncated(false);
    }
  }, [ref]);

  const toggleIsShowingMore = () => setIsShowingMore((prev) => !prev);

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
      />
      {/* Report success modal */}

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
      />
      <div>
        <div className="flex items-start justify-between">
          <div className="flex gap-x-3">
            <Image
              width={45}
              height={45}
              className="size-[36px] sm:size-[45px] rounded-full object-cover"
              alt="avatar"
              src={
                post?.user?.usermeta?.avatar !== null
                  ? post?.user?.usermeta?.avatar
                  : profileImageplaceholder
              }
            />
            <div>
              <div className="flex gap-x-2 items-center">
                <p className="text-foreground hover:underline cursor-pointer font-semibold text-base line-clamp-1 text-ellipsis">
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
                  • {moment(post?.created_at).fromNow()}
                </p>
              </div>
              <p className="text-inactive">@{post?.user?.username}</p>
            </div>
          </div>
          {/* <Button variant={"ghost"} className=" bg-transparent px-0"> */}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              {/* <Button
                variant={"ghost"}
                className="p-0 outline:none outline-none ring-0 hover:bg-transparent"
              > */}
              <MoreVertical
                className="text-colorGrey translate-x-3 cursor-pointer"
                role="button"
              />
              {/* </Button> */}
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[clamp(240px,80%,424px)] md:w-[324px] lg:w-[420px] absolute -translate-x-[105%] top-0 bg-background border-border">
              <DropdownMenuGroup className="">
                <DropdownMenuItem className="p-4 text-base text-foreground font-semibold data-[highlighted]:text-black">
                  <Image
                    width={24}
                    height={24}
                    className="size-[24px] mr-4 object-cover"
                    alt="icon"
                    src={"/assets/post-icons/save-post.svg"}
                  />
                  <span>Save Post</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="p-4 text-base text-foreground font-semibold data-[highlighted]:text-black">
                  <Image
                    width={24}
                    height={24}
                    className="size-[24px] mr-4 object-cover"
                    alt="icon"
                    src={"/assets/post-icons/not-interested.svg"}
                  />
                  <span>Not interested in this post</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="p-4 text-base text-foreground font-semibold data-[highlighted]:text-black">
                  <Image
                    width={24}
                    height={24}
                    className="size-[24px] mr-4 object-cover"
                    alt="icon"
                    src={"/assets/post-icons/follow.svg"}
                  />
                  <span>Follow @Fightnight</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator className="mx-2 bg-border" />
              <DropdownMenuGroup>
                <DropdownMenuItem className="p-4 text-base text-foreground font-semibold data-[highlighted]:text-black">
                  <Image
                    width={24}
                    height={24}
                    className="size-[24px] mr-4 object-cover"
                    alt="icon"
                    src={"/assets/post-icons/mute.svg"}
                  />
                  <span>Mute @Fightnight</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="p-4 text-base text-foreground font-semibold data-[highlighted]:text-black">
                  <Image
                    width={24}
                    height={24}
                    className="size-[24px] mr-4 object-cover"
                    alt="icon"
                    src={"/assets/post-icons/block.svg"}
                  />
                  <span>Block @Fightnight</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setShowReportModal(true)}
                  className="p-4 text-base text-foreground font-semibold data-[highlighted]:text-black"
                >
                  <Image
                    width={24}
                    height={24}
                    className="size-[24px] mr-4 object-cover"
                    alt="icon"
                    src={"/assets/post-icons/report.svg"}
                  />
                  <span>Report post</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          {/* </Button> */}
        </div>

        {/* content */}
        <div className="mt-4">
          <ContentText
            text={post.content}
            textRef={ref}
            contentId={post.id}
            isShowingMore={isShowingMore}
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
                  "block bg-background text-foreground/60 text-start",
                  !isShowingMore ? "w-fit" : ""
                )}
              >
                {isShowingMore ? "Show less" : "...Show more"}
              </button>
            )}
          </div>
          {/* media box */}
          <div className="mt-3">
            {Boolean(post.media && post.media.length) && (
              <PostViewer
                post={post}
                setShowFullScreenPost={(value: boolean) =>
                  setShowFullScreenPost(value)
                }
                showFullScreenPost={showFullScreenPost}
              />
            )}
          </div>
          <div>
            {Boolean(post.likes && post.likes.length) && (
              <div className="text-colorWhite mt-2 text-base flex gap-x-2 item-center">
                <Image
                  width={25}
                  height={25}
                  className="size-[25px] rounded-full object-cover"
                  alt="icon"
                  src={post.likes[0]?.user?.usermeta.avatar ?? ""}
                />
                <p className="text-foreground/70">
                  Liked by{" "}
                  <span className="font-bold hover:underline cursor-pointer text-foreground">
                    {post.likes[0]?.user?.username}
                  </span>{" "}
                  {Boolean(post.likesCount - 1 >= 1) && (
                    <span>
                      and{" "}
                      <span className="font-bold hover:underline cursor-pointer text-foreground">
                        {post.likesCount - 1}
                      </span>{" "}
                      {post.likesCount - 1 > 1 ? "others" : "other"}
                    </span>
                  )}
                </p>
              </div>
            )}
            <div className="flex mt-4 items-center">
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
                <p
                  className={cn(
                    "text-red-600 px-2 font-medium",
                    postLikedByMe
                      ? "text-red-600 fill-red-600"
                      : "text-foreground/70"
                  )}
                >
                  {formatNumberCount(
                    handlePostLikeIncrement(
                      post.likesCount,
                      post.likedByMe,
                      postLikedByMe
                    )
                  )}
                </p>
              </div>
              <div
                className="flex items-center border-x border-border px-3 cursor-pointer"
                onClick={() => setShowReplyDialog(true)}
                role="button"
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
              </div>
              <div
                onClick={() => setShowViewModal(true)}
                className="flex items-center pl-3 cursor-pointer"
              >
                <Image
                  width={20}
                  height={20}
                  className="size-[20px] object-cover"
                  alt="icon"
                  src={"/assets/post-icons/views.svg"}
                />
                <p className="text-foreground/60 px-2 font">
                  {formatNumberCount(post.viewsCount)}
                </p>
              </div>
            </div>
            {Boolean(post.commentsCount > 0) && (
              <Button
                variant={"ghost"}
                className="text-inactive p-0 hover:bg-transparent hover:text-foreground"
                onClick={() => router.push(`/posts/${post.id}`)}
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
