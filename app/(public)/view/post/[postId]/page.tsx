"use client";
import PublicSidebar from "@/components/PublicSidebar";
import ReactionButton from "@/components/ReactionButton";
import EmbeddedPost from "@/components/reusable/EmbeddedSinglePost";
import FollowUnfollowTile from "@/components/reusable/FollowUnfollowTile";
import Loading from "@/components/reusable/Loading";
import Post from "@/components/reusable/Post";
import PostViewer from "@/components/reusable/PostViewer";
import SportIcon from "@/components/reusable/SportIcon";
import ErrorToast from "@/components/reusable/toasts/ErrorToast";
import NoticeToast from "@/components/reusable/toasts/NoticeToast";
import SuccessToast from "@/components/reusable/toasts/SuccessToast";
import RightSideBar from "@/components/RightSideBar";
import PageLoadingSpinner from "@/components/Spinner/PageLoadingSpinner";
import { Button } from "@/components/ui/button";
import { Credenza, CredenzaContent } from "@/components/ui/credenza";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { profileImageplaceholder } from "@/constants";
import { cn, formatNumberCount } from "@/lib/utils";
import { followUserQuery, unfollowUserQuery } from "@/services/api/explore";
import {
  blockUserQuery,
  getSinglePost,
  getSinglePostPublic,
  unblockUserQuery,
} from "@/services/api/post";
import {
  fetchUsersPosts,
  fetchUsersPostsPublic,
  getBlockedUsers,
  getFollowing,
  getPublicUserProfile,
} from "@/services/api/userService";
import { PostMeta, User } from "@/types";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { CalendarDays, MoreVertical } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { Fragment, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { ImSpinner2 } from "react-icons/im";
import { IoArrowBack } from "react-icons/io5";
import { useInView } from "react-intersection-observer";

const Page = ({ params }: { params: any }) => {
  const router = useRouter();
  const { theme } = useTheme();
  const queryClient = useQueryClient();
  const profileData = useQuery({
    queryKey: ["public-profile-page"],
    queryFn: () => getPublicUserProfile(params.username),
  });

  const [showFullScreenPost, setshowFullScreenPost] = useState(true);

  const { ref: userPostsRef, inView: usersPostsInView } = useInView();

  console.log(params.postId);

  const postData = useQuery({
    queryKey: ["single-post-data"],
    queryFn: () => getSinglePostPublic(params.postId),
  });

  const baseUrl = window.location.protocol + "//" + window.location.host + "/";

  return (
    postData.isSuccess && (
      <Credenza
        open={true}
        onOpenChange={(v) => {
          if (!v) {
            router.back();
          }
        }}
      >
        <CredenzaContent
          closeBtnClass="left-4 w-fit"
          className="w-full h-full min-[768px]:min-w-[95%] min-[1080px]:min-w-[85%] min-[768px]:h-[85dvh] min-[768px]:max-h-[85dvh] p-0 bg-background border-border min-[768px]:rounded-3xl overflow-hidden"
        >
          <></>
          <div className="w-full mx-auto flex">
            <div className="w-full min-[768px]:w-3/5 min-[768px]:h-[85dvh] min-[768px]:max-h-[85dvh] bg-background border-r border-border h-[80vh] flex justify-center items-center">
              <PostViewer
                postData={postData?.data.data.data}
                setShowFullScreenPost={() => setshowFullScreenPost(true)}
                showFullScreenPost={showFullScreenPost}
              />
            </div>
            <div className="flex w-full flex-col gap-x-4 mt-3 items-center min-[768px]:hidden absolute bottom-2">
              <div className="w-full">
                <FollowUnfollowTile
                  user={postData?.data.data.data.user}
                  hideBorder={true}
                />
              </div>
              <div className="flex justify-start w-full px-2 pl-4">
                {/* <ReactionButton
                handlePostLikeIncrement={handlePostLikeIncrement}
                handlePostLikeRequest={handlePostLikeRequest}
                post={postData}
                setPost={setPost}
                likeData={postData?.likedByMe ?? []}
                postLikedByMe={postLikedByMe}
                setPostLikedByMe={setPostLikedByMe}
              />
              {post.tagedUsers}
              <Link href={`/posts/${post.id}`}>
                <div
                  className="flex items-center border-x border-border px-3 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    // router.replace(`/posts/${postData.id}`);
                    // setShowReplyDialog(true);
                  }}
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
                    {formatNumberCount(postData.commentsCount)}
                  </p>
                </div>
              </Link>
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  // setShowViewModal(true);
                }}
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
                  {formatNumberCount(postData.viewsCount)}
                </p>
              </div> */}
              </div>
            </div>
            <div className="hidden min-[768px]:block w-2/5 h-full min-[768px]:h-[85dvh] min-[768px]:max-h-[85dvh] relative overflow-y-scroll">
              <EmbeddedPost
                postId={postData?.data.data.data.id}
                hideHeader={true}
                hideMedia={true}
                isPublic
              />
            </div>
          </div>
        </CredenzaContent>
      </Credenza>
    )
  );
};

export default Page;
