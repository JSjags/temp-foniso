import { userPlaceholderImage } from "@/constants";
import { CommentMeta, ReplyMeta } from "@/types";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import moment from "moment";
import Image from "next/image";
import {
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Heart, MoreVertical, X } from "lucide-react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { cn, formatNumberCount, handlePostLikeIncrement } from "@/lib/utils";
import { Button } from "../ui/button";
import { useUserContext } from "@/context/UserContext";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  fetchCommentReplies,
  likeOrUnlikeComment,
  likeOrUnlikePost,
} from "@/services/api/post";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import PageLoadingSpinner from "../Spinner/PageLoadingSpinner";
import ReplyCard from "./ReplyCard";
import ContentText from "./ContentText";

type Props = { comment: CommentMeta };

const CommentCard = ({ comment }: Props) => {
  const { userData } = useUserContext();
  const [isTruncated, setIsTruncated] = useState(false);
  const [isShowingMore, setIsShowingMore] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showReplyDialog, setShowReplyDialog] = useState(false);

  const [fetchReplies, setFetchReplies] = useState(false);

  const [commentLikedByMe, setCommentLikedByMe] = useState<boolean>(
    comment?.likes.filter((item) => item?.userId === userData?.user.id).length >
      0
  );
  const likeOrUnlikeMutation = useMutation({
    mutationKey: ["like-or-unlike-comment", commentLikedByMe],
    mutationFn: (data: { commentId: number; type: string }) =>
      likeOrUnlikeComment(data.commentId, data.type),
    onSuccess: (data) => console.log(data),
    onError: (error) => console.log(error),
  });

  const getReplies = useQuery({
    queryKey: [`get-replies-${comment.id}`, fetchReplies, comment.id],
    queryFn: () => fetchCommentReplies(comment.id),
    enabled: fetchReplies === true,
  });

  useEffect(() => {
    if (getReplies.isError) {
      setFetchReplies(false);
    }
  }, [getReplies.isError]);

  console.log(getReplies.data);

  const handlePostLikeRequest = () => {
    likeOrUnlikeMutation.mutate({ commentId: comment.id, type: "comment" });
  };

  const toggleIsShowingMore = () => setIsShowingMore((prev) => !prev);

  const ref = useRef(null);

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

  return (
    <>
      {/* Views modal */}
      <AlertDialog open={showViewModal}>
        <AlertDialogContent className="w-[95%] bg-background border-border rounded-3xl">
          <AlertDialogCancel
            onClick={() => setShowViewModal(false)}
            className="absolute top-4 right-4 w-fit h-fit p-0 bg-transparent border-none hover:text-darkGrey"
          >
            <X className="text-foreground hover:text-darkGrey" />
          </AlertDialogCancel>
          <div className="w-full sm:max-w-[369px] mx-auto">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-2xl font-bold text-foreground mt-6 max-w-[369px]">
                Views
              </AlertDialogTitle>
              <AlertDialogDescription className="mt-8 text-foreground/60 max-w-[369px]">
                The times this post was seen.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="my-8 mt-10 max-w-[369px]">
              <AlertDialogCancel
                onClick={() => setShowViewModal(false)}
                className="rounded-full w-full bg-transparent border-border hover:bg-white py-6 text-center text-foreground hover:text-textDark"
              >
                Close
              </AlertDialogCancel>
            </AlertDialogFooter>
          </div>
        </AlertDialogContent>
      </AlertDialog>
      <div className="">
        <div className="flex items-start justify-between mb-2">
          <div className="flex gap-x-3">
            <Image
              width={45}
              height={45}
              className="size-[36px] sm:size-[45px] rounded-full object-cover"
              alt="avatar"
              src={comment.user.usermeta.avatar ?? userPlaceholderImage}
            />
            <div>
              <div className="flex gap-x-2 items-center">
                <p className="text-foreground hover:underline cursor-pointer font-semibold text-base line-clamp-1 text-ellipsis">
                  {comment.user.usermeta.firstname}{" "}
                  {comment.user.usermeta.lastname}
                </p>
                <div className="flex gap-x-1 items-center">
                  {comment.user.verified && (
                    <Image
                      width={14}
                      height={14}
                      className="size-[16px] rounded-full object-cover"
                      alt="avatar"
                      src={"/assets/app-icons/verified-icon.svg"}
                    />
                  )}
                </div>
                <p className="text-sm text-inactive align-middle whitespace-nowrap">
                  {" "}
                  • {moment(comment?.created_at).fromNow()}
                </p>
              </div>
              <p className="text-inactive">@{comment.user.username}</p>
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
            <DropdownMenuContent className="w-[clamp(240px,80%,424px)] md:w-[324px] lg:w-[420px] absolute -translate-x-[105%] top-0 bg-contentBg border-contentBorder">
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
                  <span>Follow @{comment.user.username}</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator className="mx-2 bg-contentBorder" />
              <DropdownMenuGroup>
                <DropdownMenuItem className="p-4 text-base text-foreground font-semibold data-[highlighted]:text-black">
                  <Image
                    width={24}
                    height={24}
                    className="size-[24px] mr-4 object-cover"
                    alt="icon"
                    src={"/assets/post-icons/mute.svg"}
                  />
                  <span>Mute @{comment.user.username}</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="p-4 text-base text-foreground font-semibold data-[highlighted]:text-black">
                  <Image
                    width={24}
                    height={24}
                    className="size-[24px] mr-4 object-cover"
                    alt="icon"
                    src={"/assets/post-icons/block.svg"}
                  />
                  <span>Block @{comment.user.username}</span>
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
                  <span>Report comment</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          {/* </Button> */}
        </div>
        <ContentText
          isShowingMore={isShowingMore}
          contentId={comment.id}
          type={"comment"}
          text={comment.comment}
          textRef={ref}
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
                "block bg-background text-inactive text-start",
                !isShowingMore ? "w-fit" : ""
              )}
            >
              {isShowingMore ? "Show less" : "...Show more"}
            </button>
          )}
        </div>
        <div>
          <div className="flex mt-4 items-center">
            <div
              className="flex items-center cursor-pointer"
              role="button"
              onClick={() => {
                handlePostLikeRequest();
                setCommentLikedByMe((prev) => !prev);
              }}
            >
              <Heart
                className={cn(
                  "size-[20px]",
                  commentLikedByMe
                    ? "text-red-600 fill-red-600"
                    : "text-foreground/70"
                )}
              />
              <p
                className={cn(
                  "text-red-600 px-2 font-medium",
                  commentLikedByMe
                    ? "text-red-600 fill-red-600"
                    : "text-foreground/70"
                )}
              >
                {formatNumberCount(
                  handlePostLikeIncrement(
                    comment.likesCount,
                    comment?.likes.filter(
                      (item) => item?.userId === userData?.user.id
                    ),
                    commentLikedByMe
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
                {formatNumberCount(comment.replyCount)}
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
                {formatNumberCount(comment.viewsCount)}
              </p>
            </div>
          </div>
          {Boolean(comment.replyCount > 0) &&
            !getReplies.isSuccess &&
            Boolean(!getReplies.data?.data.data.items.length) && (
              <Button
                variant={"ghost"}
                onClick={() => setFetchReplies(true)}
                className="flex justify-start w-full px-4 font-normal bg-[#224731] text-white rounded-lg hover:bg-colorPrimary hover:text-foreground mt-2 mb-4"
              >
                <div className="flex items-center">
                  {getReplies.isLoading && (
                    <div className="bg-transparent transition-all flex justify-center items-center h-9 w-7">
                      <PageLoadingSpinner spinnerExtraClass="w-5 h-5" />
                    </div>
                  )}
                  {getReplies.isLoading ? (
                    <span>
                      Fetching {comment.replyCount > 1 ? "replies" : "reply"}
                    </span>
                  ) : (
                    <span>
                      See {comment.replyCount}{" "}
                      {comment.replyCount > 1 ? "replies" : "reply"}
                    </span>
                  )}
                </div>
              </Button>
            )}
          {/* container for replies */}
          <div className="pl-4 mt-4">
            {getReplies.isSuccess &&
              Boolean(getReplies.data?.data.data.items.length) &&
              getReplies.data?.data.data.items.map((reply: ReplyMeta) => (
                <ReplyCard reply={reply} key={reply.id} />
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default CommentCard;
