import { userPlaceholderImage } from "@/constants";
import { CommentMeta, ReplyMeta, User } from "@/types";
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
import {
  Dispatch,
  Fragment,
  SetStateAction,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { cn, formatNumberCount, handlePostLikeIncrement } from "@/lib/utils";
import { Button } from "../ui/button";
import { useUserContext } from "@/context/UserContext";
import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
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
import { customRelativeTime } from "@/utils";
import { useInView } from "react-intersection-observer";
import Loading from "./Loading";

type Props = {
  comment: CommentMeta;
  setCommentType: Dispatch<SetStateAction<"comment" | "reply" | "nestedReply">>;
  setCurrentComment: Dispatch<SetStateAction<CommentMeta | null>>;
  setCurrentReply: Dispatch<SetStateAction<ReplyMeta | null>>;
};

const CommentCard = ({
  comment,
  setCommentType,
  setCurrentComment,
  setCurrentReply,
}: Props) => {
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

  const { ref: repliesRef, inView } = useInView();

  const likeOrUnlikeMutation = useMutation({
    mutationKey: ["like-or-unlike-comment", commentLikedByMe],
    mutationFn: (data: { commentId: number; type: string }) =>
      likeOrUnlikeComment(data.commentId, data.type),
    onSuccess: (data) => console.log(data),
    onError: (error) => console.log(error),
  });

  const getReplies = useInfiniteQuery({
    queryKey: [`get-replies-${comment.id}`, fetchReplies, comment.id],
    queryFn: ({ pageParam }: { pageParam: number }) =>
      fetchCommentReplies(comment.id, pageParam),
    enabled: fetchReplies === true,
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages, lastPageParam, allPageParams) => {
      console.log(lastPage, allPages, lastPageParam, allPageParams);
      if (lastPage.length === 0) {
        return undefined;
      }
      return lastPageParam + 1;
    },
  });

  // const comments = useInfiniteQuery({
  //   queryKey: ["single-post-comments"],
  //   queryFn: ({ pageParam }: { pageParam: number }) =>
  //     getSinglePostComments(params.postId, pageParam),
  //   initialPageParam: 0,
  //   getNextPageParam: (lastPage, allPages, lastPageParam, allPageParams) => {
  //     console.log(lastPage, allPages, lastPageParam, allPageParams);
  //     if (lastPage.length === 0) {
  //       return undefined;
  //     }
  //     return lastPageParam + 1;
  //   },
  // });

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

  useEffect(() => {
    if (inView && Boolean(getReplies.data?.pages[0].data.data.items.length)) {
      getReplies.fetchNextPage();
    }
  }, [getReplies.fetchNextPage, inView]);

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
              src={
                comment.user.usermeta.avatar ?? "/assets/placeholder-person.png"
              }
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
                  • {customRelativeTime(comment?.created_at)}
                </p>
              </div>
              <p className="text-inactive text-sm">@{comment.user.username}</p>
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
            <DropdownMenuContent className="w-[clamp(240px,80%,300px)] md:w-[300px] lg:w-[300px] absolute -translate-x-[105%] top-0 bg-contentBg border-contentBorder">
              <DropdownMenuGroup className="">
                <DropdownMenuItem className="p-4 text-base text-foreground font-semibold data-[highlighted]:text-black">
                  <Image
                    width={24}
                    height={24}
                    className="size-[24px] mr-4 object-cover"
                    alt="icon"
                    src={"/assets/post-icons/save-post.svg"}
                  />
                  <span>Follow @{comment.user.username}</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          {/* </Button> */}
        </div>
        <ContentText
          contentId={comment.id}
          type={"comment"}
          text={comment.comment}
        />
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
              className="flex items-center ml-2 px-1 cursor-pointer rounded-full hover:bg-foreground/5"
              onClick={() => {
                setCommentType("reply");
                setCurrentComment(comment);
              }}
              role="button"
            >
              <div className="flex items-center">
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
            </div>
            <div
              onClick={() => setShowViewModal(true)}
              className="flex items-center ml-2 pl-1 cursor-pointer rounded-full hover:bg-foreground/5"
            >
              <Image
                width={20}
                height={20}
                className="size-[20px] object-cover"
                alt="icon"
                src={"/assets/post-icons/views.svg"}
              />
              <p className="text-foreground/60 px-1 font">
                {formatNumberCount(comment.viewsCount)}
              </p>
            </div>
          </div>
          {Boolean(comment.replyCount > 0) &&
            !getReplies.isSuccess &&
            Boolean(!getReplies.data?.pages[0].data.data.items.length) && (
              <Button
                variant={"ghost"}
                onClick={() => setFetchReplies(true)}
                className="flex justify-start w-full px-4 font-normal bg-[#224731] text-white rounded-lg hover:bg-colorPrimary hover:text-foreground mt-2 mb-4"
              >
                <div className="flex items-center">
                  {getReplies.isLoading && (
                    <div className="bg-transparent transition-all flex justify-center items-center h-9 w-7">
                      <PageLoadingSpinner spinnerExtraClass="size-5 sm:size-5" />
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
          <div className="pl-4 mt-4 flex flex-col gap-y-3">
            {getReplies.isSuccess &&
              // Boolean(getReplies.data?.pages[0].data.data.items.length) &&
              getReplies.data?.pages.map((group, i) => (
                <Fragment key={i}>
                  {group.data.data.items.map((reply: ReplyMeta, i: number) => (
                    <ReplyCard
                      reply={reply}
                      key={reply.id}
                      updateCurrentComment={() => setCurrentComment(comment)}
                      setCurrentReply={setCurrentReply}
                      setCommentType={setCommentType}
                    />
                  ))}
                </Fragment>
              ))}
            <div ref={repliesRef} className="bg-background h-fit">
              {getReplies.isFetchingNextPage && (
                <Loading
                  isLoading={getReplies.isFetchingNextPage}
                  className="w-full min-h-10 pb-5"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CommentCard;

// import { userPlaceholderImage } from "@/constants";
// import { CommentMeta, ReplyMeta, User } from "@/types";
// import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
// import moment from "moment";
// import Image from "next/image";
// import {
//   DropdownMenuContent,
//   DropdownMenuGroup,
//   DropdownMenuItem,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "../ui/dropdown-menu";
// import { Heart, MoreVertical, X } from "lucide-react";
// import {
//   Dispatch,
//   SetStateAction,
//   useEffect,
//   useLayoutEffect,
//   useRef,
//   useState,
// } from "react";
// import { cn, formatNumberCount, handlePostLikeIncrement } from "@/lib/utils";
// import { Button } from "../ui/button";
// import { useUserContext } from "@/context/UserContext";
// import { useMutation, useQuery } from "@tanstack/react-query";
// import {
//   fetchCommentReplies,
//   likeOrUnlikeComment,
//   likeOrUnlikePost,
// } from "@/services/api/post";
// import {
//   AlertDialog,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
// } from "../ui/alert-dialog";
// import PageLoadingSpinner from "../Spinner/PageLoadingSpinner";
// import ReplyCard from "./ReplyCard";
// import ContentText from "./ContentText";
// import { customRelativeTime } from "@/utils";
// import CommentReactionButton from "../CommentReactionButton";

// type Props = {
//   comment: CommentMeta;
//   setCommentType: Dispatch<SetStateAction<"comment" | "reply" | "nestedReply">>;
//   setCurrentComment: Dispatch<SetStateAction<CommentMeta | null>>;
//   setCurrentReply: Dispatch<SetStateAction<ReplyMeta | null>>;
// };

// const CommentCard = ({
//   comment: commentData,
//   setCommentType,
//   setCurrentComment,
//   setCurrentReply,
// }: Props) => {
//   const [comment, setComment] = useState(commentData);
//   const { userData } = useUserContext();
//   const [isTruncated, setIsTruncated] = useState(false);
//   const [isShowingMore, setIsShowingMore] = useState(false);
//   const [showReportModal, setShowReportModal] = useState(false);
//   const [showViewModal, setShowViewModal] = useState(false);
//   const [showReplyDialog, setShowReplyDialog] = useState(false);

//   const [fetchReplies, setFetchReplies] = useState(false);

//   const [commentLikedByMe, setCommentLikedByMe] = useState<boolean>(
//     comment?.likes.filter((item) => item?.userId === userData?.user.id).length >
//       0
//   );
//   const likeOrUnlikeMutation = useMutation({
//     mutationKey: ["like-or-unlike-comment", commentLikedByMe],
//     mutationFn: (data: { commentId: number; type: string }) =>
//       likeOrUnlikeComment(data.commentId, data.type),
//     onSuccess: (data) => console.log(data),
//     onError: (error) => console.log(error),
//   });

//   const getReplies = useQuery({
//     queryKey: [`get-replies-${comment.id}`, fetchReplies, comment.id],
//     queryFn: () => fetchCommentReplies(comment.id),
//     enabled: fetchReplies === true,
//   });

//   useEffect(() => {
//     if (getReplies.isError) {
//       setFetchReplies(false);
//     }
//   }, [getReplies.isError]);

//   console.log(getReplies.data);

//   const handlePostLikeRequest = () => {
//     likeOrUnlikeMutation.mutate({ commentId: comment.id, type: "comment" });
//   };

//   const toggleIsShowingMore = () => setIsShowingMore((prev) => !prev);

//   const ref = useRef(null);

//   useLayoutEffect(() => {
//     const { offsetHeight, scrollHeight } = ref.current || {
//       offsetHeight: null,
//       scrollHeight: null,
//     };

//     if (offsetHeight && scrollHeight && offsetHeight < scrollHeight) {
//       setIsTruncated(true);
//     } else {
//       setIsTruncated(false);
//     }
//   }, [ref]);

//   return (
//     <>
//       {/* Views modal */}
//       <AlertDialog open={showViewModal}>
//         <AlertDialogContent className="w-[95%] bg-background border-border rounded-3xl">
//           <AlertDialogCancel
//             onClick={() => setShowViewModal(false)}
//             className="absolute top-4 right-4 w-fit h-fit p-0 bg-transparent border-none hover:text-darkGrey"
//           >
//             <X className="text-foreground hover:text-darkGrey" />
//           </AlertDialogCancel>
//           <div className="w-full sm:max-w-[369px] mx-auto">
//             <AlertDialogHeader>
//               <AlertDialogTitle className="text-2xl font-bold text-foreground mt-6 max-w-[369px]">
//                 Views
//               </AlertDialogTitle>
//               <AlertDialogDescription className="mt-8 text-foreground/60 max-w-[369px]">
//                 The times this post was seen.
//               </AlertDialogDescription>
//             </AlertDialogHeader>
//             <AlertDialogFooter className="my-8 mt-10 max-w-[369px]">
//               <AlertDialogCancel
//                 onClick={() => setShowViewModal(false)}
//                 className="rounded-full w-full bg-transparent border-border hover:bg-white py-6 text-center text-foreground hover:text-textDark"
//               >
//                 Close
//               </AlertDialogCancel>
//             </AlertDialogFooter>
//           </div>
//         </AlertDialogContent>
//       </AlertDialog>
//       <div className="">
//         <div className="flex items-start justify-between mb-2">
//           <div className="flex gap-x-3">
//             <Image
//               width={45}
//               height={45}
//               className="size-[36px] sm:size-[45px] rounded-full object-cover"
//               alt="avatar"
//               src={
//                 comment.user.usermeta.avatar ?? "/assets/placeholder-person.png"
//               }
//             />
//             <div>
//               <div className="flex gap-x-2 items-center">
//                 <p className="text-foreground hover:underline cursor-pointer font-semibold text-base line-clamp-1 text-ellipsis">
//                   {comment.user.usermeta.firstname}{" "}
//                   {comment.user.usermeta.lastname}
//                 </p>
//                 <div className="flex gap-x-1 items-center">
//                   {comment.user.verified && (
//                     <Image
//                       width={14}
//                       height={14}
//                       className="size-[16px] rounded-full object-cover"
//                       alt="avatar"
//                       src={"/assets/app-icons/verified-icon.svg"}
//                     />
//                   )}
//                 </div>
//                 <p className="text-sm text-inactive align-middle whitespace-nowrap">
//                   {" "}
//                   • {customRelativeTime(comment?.created_at)}
//                 </p>
//               </div>
//               <p className="text-inactive text-sm">@{comment.user.username}</p>
//             </div>
//           </div>
//           {/* <Button variant={"ghost"} className=" bg-transparent px-0"> */}

//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               {/* <Button
//                 variant={"ghost"}
//                 className="p-0 outline:none outline-none ring-0 hover:bg-transparent"
//               > */}
//               <MoreVertical
//                 className="text-colorGrey translate-x-3 cursor-pointer"
//                 role="button"
//               />
//               {/* </Button> */}
//             </DropdownMenuTrigger>
//             <DropdownMenuContent className="w-[clamp(240px,80%,300px)] md:w-[300px] lg:w-[300px] absolute -translate-x-[105%] top-0 bg-contentBg border-contentBorder">
//               <DropdownMenuGroup className="">
//                 <DropdownMenuItem className="p-4 text-base text-foreground font-semibold data-[highlighted]:text-black">
//                   <Image
//                     width={24}
//                     height={24}
//                     className="size-[24px] mr-4 object-cover"
//                     alt="icon"
//                     src={"/assets/post-icons/save-post.svg"}
//                   />
//                   <span>Follow @{comment.user.username}</span>
//                 </DropdownMenuItem>
//               </DropdownMenuGroup>
//             </DropdownMenuContent>
//           </DropdownMenu>
//           {/* </Button> */}
//         </div>
//         <ContentText
//           contentId={comment.id}
//           type={"comment"}
//           text={comment.comment}
//         />
//         <div>
//           <div className="flex mt-4 items-center">
//             {/* <CommentReactionButton
//             handlePostLikeIncrement={handlePostLikeIncrement}
//             handlePostLikeRequest={handlePostLikeRequest}
//             comment={comment}
//             setComment={setComment}
//             likeData={comment.likedByMe}
//             postLikedByMe={commentLikedByMe}
//             setPostLikedByMe={setCommentLikedByMe} /> */}
//             <div
//               className="flex items-center ml-2 px-1 cursor-pointer rounded-full hover:bg-foreground/5"
//               onClick={() => {
//                 setCommentType("reply");
//                 setCurrentComment(comment);
//               }}
//               role="button"
//             >
//               <div className="flex items-center">
//                 <Image
//                   width={20}
//                   height={20}
//                   className="size-[20px] object-cover"
//                   alt="icon"
//                   src={"/assets/post-icons/comment.svg"}
//                 />
//                 <p className="text-foreground/60 px-2 pr-0 font">
//                   {formatNumberCount(comment.replyCount)}
//                 </p>
//               </div>
//             </div>
//             <div
//               onClick={() => setShowViewModal(true)}
//               className="flex items-center ml-2 pl-1 cursor-pointer rounded-full hover:bg-foreground/5"
//             >
//               <Image
//                 width={20}
//                 height={20}
//                 className="size-[20px] object-cover"
//                 alt="icon"
//                 src={"/assets/post-icons/views.svg"}
//               />
//               <p className="text-foreground/60 px-1 font">
//                 {formatNumberCount(comment.viewsCount)}
//               </p>
//             </div>
//           </div>
//           {Boolean(comment.replyCount > 0) &&
//             !getReplies.isSuccess &&
//             Boolean(!getReplies.data?.data.data.items.length) && (
//               <Button
//                 variant={"ghost"}
//                 onClick={() => setFetchReplies(true)}
//                 className="flex justify-start w-full px-4 font-normal bg-[#224731] text-white rounded-lg hover:bg-colorPrimary hover:text-foreground mt-2 mb-4"
//               >
//                 <div className="flex items-center">
//                   {getReplies.isLoading && (
//                     <div className="bg-transparent transition-all flex justify-center items-center h-9 w-7">
//                       <PageLoadingSpinner spinnerExtraClass="w-5 h-5" />
//                     </div>
//                   )}
//                   {getReplies.isLoading ? (
//                     <span>
//                       Fetching {comment.replyCount > 1 ? "replies" : "reply"}
//                     </span>
//                   ) : (
//                     <span>
//                       See {comment.replyCount}{" "}
//                       {comment.replyCount > 1 ? "replies" : "reply"}
//                     </span>
//                   )}
//                 </div>
//               </Button>
//             )}
//           {/* container for replies */}
//           <div className="pl-4 mt-4 flex flex-col gap-y-3">
//             {getReplies.isSuccess &&
//               Boolean(getReplies.data?.data.data.items.length) &&
//               getReplies.data?.data.data.items.map((reply: ReplyMeta) => (
//                 <ReplyCard
//                   reply={reply}
//                   key={reply.id}
//                   updateCurrentComment={() => setCurrentComment(comment)}
//                   setCurrentReply={setCurrentReply}
//                   setCommentType={setCommentType}
//                 />
//               ))}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default CommentCard;
