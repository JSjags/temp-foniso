import React, { useMemo, useState } from "react";
import { Dialog, DialogContent } from "../ui/dialog";
import { LikeMeta, PostMeta } from "@/types";
import PostViewer from "./PostViewer";
import EmbeddedPost from "./EmbeddedSinglePost";
import ReactionButton from "../ReactionButton";
import Image from "next/image";
import { cn, formatNumberCount, handlePostLikeIncrement } from "@/lib/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { likeOrUnlikePost } from "@/services/api/post";
import { useUserContext } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import SportIcon from "./SportIcon";
import { Button } from "../ui/button";
import { followUserQuery, unfollowUserQuery } from "@/services/api/explore";
import { getFollowing } from "@/services/api/userService";
import PageLoadingSpinner from "../Spinner/PageLoadingSpinner";
import FollowUnfollowTile from "./FollowUnfollowTile";

type Props = {
  showFullScreenPost: boolean;
  setShowFullScreenPost: (value: boolean) => void;
  post: PostMeta;
};

const FullScreenPost = ({
  showFullScreenPost,
  setShowFullScreenPost,
  post,
}: Props) => {
  const router = useRouter();
  const { userData } = useUserContext();
  const queryClient = useQueryClient();

  const [postData, setPost] = useState<PostMeta>(post);
  const [postLikedByMe, setPostLikedByMe] = useState<{
    status: boolean;
    emojiId: number;
  }>({
    status: postData?.likedByMe.length > 0,
    emojiId: postData?.likedByMe[0]?.emojiId ?? 0,
  });

  const likeOrUnlikeMutation = useMutation({
    mutationKey: ["like or unlike post", postLikedByMe],
    mutationFn: (data: { postId: number; type: string; emojiId: number }) =>
      likeOrUnlikePost(data.postId, data.type, data.emojiId),
    onSuccess: (data) => {
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

  const handlePostLikeRequest = (index: number) => {
    likeOrUnlikeMutation.mutate({
      postId: postData.id,
      type: "post",
      emojiId: index,
    });
  };

  const followUser = useMutation({
    mutationKey: ["follow-user"],
    mutationFn: () =>
      followUserQuery({
        followerId: (postData as PostMeta)?.user.id,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["suggested-follows"] });
    },
  });

  const unfollowUser = useMutation({
    mutationKey: ["unfollow-user"],
    mutationFn: () =>
      unfollowUserQuery({
        followerId: (postData as PostMeta)?.user.id,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["suggested-follows"],
        refetchType: "all",
      });
    },
  });

  const following = useQuery({
    queryKey: ["following"],
    queryFn: getFollowing,
  });

  const checkIfUserIsFollowed = useMemo(() => {
    if (following.isError || !following.isSuccess) {
      return false;
    }
    const filteredArray = following.data?.data.data.filter((item: any) => {
      return item.followerId === (postData as PostMeta)?.user.id;
    });

    if (filteredArray.length) return true;
    return false;
  }, [
    following.isError,
    following.isSuccess,
    following.data?.data.data,
    postData,
    // post.data?.data.data?.user.id,
  ]);

  return (
    <Dialog
      open={showFullScreenPost}
      onOpenChange={() => setShowFullScreenPost(false)}
    >
      <DialogContent className="w-full h-full sm:min-w-[85%] sm:h-[85dvh] sm:max-h-[85dvh] p-0 bg-background border-border sm:rounded-3xl overflow-hidden">
        <div className="w-full mx-auto flex">
          <div className="w-full sm:w-3/5 h-full sm:h-[85dvh] sm:max-h-[85dvh] bg-background border-r border-border flex justify-center items-center">
            <PostViewer
              postData={postData}
              setShowFullScreenPost={(value: boolean) =>
                setShowFullScreenPost(value)
              }
              showFullScreenPost={showFullScreenPost}
            />
          </div>
          <div className="flex flex-col gap-x-4 mt-3 items-center min-[480px]:hidden absolute bottom-2">
            <div className="">
              <FollowUnfollowTile user={postData.user} hideBorder={true} />
            </div>
            <div className="flex justify-start w-full px-2 pl-4">
              <ReactionButton
                handlePostLikeIncrement={handlePostLikeIncrement}
                handlePostLikeRequest={handlePostLikeRequest}
                post={postData}
                setPost={setPost}
                likeData={postData?.likedByMe ?? []}
                postLikedByMe={postLikedByMe}
                setPostLikedByMe={setPostLikedByMe}
              />
              {post.tagedUsers}
              <div
                className="flex items-center border-x border-border px-3 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  router.push(`/posts/${postData.id}`);
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
              </div>
            </div>
          </div>
          <div className="hidden sm:block w-2/5 h-full sm:h-[85dvh] sm:max-h-[85dvh] relative overflow-y-scroll">
            <EmbeddedPost postId={post.id} hideHeader={true} hideMedia={true} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FullScreenPost;
