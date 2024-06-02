import { Heart, MoreVertical, X } from "lucide-react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import {
  Dispatch,
  SetStateAction,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { useUserContext } from "@/context/UserContext";
import { ReplyMeta } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  fetchCommentReplies,
  likeOrUnlikeComment,
  likeOrUnlikeReply,
} from "@/services/api/post";
import Image from "next/image";
import { profileImageplaceholder, userPlaceholderImage } from "@/constants";
import moment from "moment";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { cn, formatNumberCount, handlePostLikeIncrement } from "@/lib/utils";
import { Button } from "../ui/button";
import PageLoadingSpinner from "../Spinner/PageLoadingSpinner";
import ContentText from "./ContentText";

type Props = {
  reply: ReplyMeta;
  setCurrentReply: Dispatch<SetStateAction<ReplyMeta | null>>;
  setCommentType: Dispatch<SetStateAction<"comment" | "reply" | "nestedReply">>;
  updateCurrentComment: () => void;
};

const ReplyCard = ({
  reply,
  setCurrentReply,
  setCommentType,
  updateCurrentComment,
}: Props) => {
  const queryClient = useQueryClient();

  const { userData } = useUserContext();
  const [isTruncated, setIsTruncated] = useState(false);
  const [isShowingMore, setIsShowingMore] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showReplyDialog, setShowReplyDialog] = useState(false);

  const [fetchReplies, setFetchReplies] = useState(false);

  const [replyLikedByMe, setReplyLikedByMe] = useState<boolean>(
    reply?.likes.filter((item) => item?.userId === userData?.user.id).length > 0
  );
  const likeOrUnlikeMutation = useMutation({
    mutationKey: [`like-or-unlike-reply-${reply.id}`, replyLikedByMe],
    mutationFn: (data: { replyId: number; type: string }) =>
      likeOrUnlikeReply(data.replyId, data.type),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        // queryKey: ["get-replies", "single-post"],
      });
    },
    onError: (error) => console.log(error),
  });

  const getReplies = useQuery({
    queryKey: ["get-replies", fetchReplies],
    queryFn: () => fetchCommentReplies(reply.id),
    enabled: fetchReplies === true,
  });

  useEffect(() => {
    if (getReplies.isError) {
      setFetchReplies(false);
    }
  }, [getReplies.isError]);

  console.log(getReplies.data);

  const handlePostLikeRequest = () => {
    likeOrUnlikeMutation.mutate({ replyId: reply.id, type: "reply" });
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
              src={reply.user.usermeta.avatar ?? profileImageplaceholder}
            />
            <div>
              <div className="flex gap-x-2 items-center">
                <p className="text-foreground hover:underline cursor-pointer font-semibold text-base line-clamp-1 text-ellipsis">
                  {reply.user.usermeta.firstname} {reply.user.usermeta.lastname}
                </p>
                <div className="flex gap-x-1 items-center">
                  {reply.user.verified && (
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
                  • {moment(reply?.created_at).fromNow()}
                </p>
              </div>
              <p className="text-inactive">@{reply.user.username}</p>
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
                  <span>Follow @{reply.user.username}</span>
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
                  <span>Mute @{reply.user.username}</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="p-4 text-base text-foreground font-semibold data-[highlighted]:text-black">
                  <Image
                    width={24}
                    height={24}
                    className="size-[24px] mr-4 object-cover"
                    alt="icon"
                    src={"/assets/post-icons/block.svg"}
                  />
                  <span>Block @{reply.user.username}</span>
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
          contentId={reply.id}
          type={"comment"}
          text={reply.message}
        />
        <div>
          <div className="flex mt-4 items-center">
            <div
              className="flex items-center cursor-pointer"
              role="button"
              onClick={() => {
                handlePostLikeRequest();
                setReplyLikedByMe((prev) => !prev);
              }}
            >
              <Heart
                className={cn(
                  "size-[20px]",
                  replyLikedByMe
                    ? "text-red-600 fill-red-600"
                    : "text-foreground/70"
                )}
              />
              <p
                className={cn(
                  "text-red-600 px-2 font-medium",
                  replyLikedByMe
                    ? "text-red-600 fill-red-600"
                    : "text-foreground/70"
                )}
              >
                {formatNumberCount(
                  handlePostLikeIncrement(
                    reply.likesCount,
                    reply?.likes.filter(
                      (item) => item?.userId === userData?.user.id
                    ),
                    replyLikedByMe
                  )
                )}
              </p>
            </div>
            <div
              className="flex items-center ml-2 pl-1 cursor-pointer rounded-full hover:bg-foreground/5"
              onClick={() => {
                setShowViewModal(true);
              }}
              role="button"
            >
              <Image
                width={20}
                height={20}
                className="size-[20px] object-cover"
                alt="icon"
                src={"/assets/post-icons/views.svg"}
              />
              <p className="text-foreground/60 px-2 pr-1 font">
                {formatNumberCount(reply.viewsCount)}
              </p>
            </div>
            {/* Hide nested reply button for replying a reply  */}
            {/* <div
              onClick={() => {
                setCurrentReply(reply);
                updateCurrentComment();
                setCommentType("nestedReply");
              }}
              className="flex items-center pl-3 cursor-pointer"
            >
              <p className="text-foreground/60 px-2 pr-0 font text-colorPrimary">
                Reply
              </p>
            </div> */}
          </div>
          {/* container for replies */}
          <div className="pl-4">
            {getReplies.isSuccess &&
              Boolean(getReplies.data?.data.data.items.length) &&
              getReplies.data?.data.data.items.map(
                (reply: ReplyMeta, i: number) => (
                  <ReplyCard
                    reply={reply}
                    key={i}
                    updateCurrentComment={updateCurrentComment}
                    setCurrentReply={setCurrentReply}
                    setCommentType={setCommentType}
                  />
                )
              )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ReplyCard;
