import React, { Dispatch, SetStateAction, useMemo } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { MoreVertical } from "lucide-react";
import Image from "next/image";
import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "@tanstack/react-query";
import {
  blacklistPostQuery,
  blockUserQuery,
  getSavedPosts,
  muteUserQuery,
  saveOrUnsavePost,
  unblockUserQuery,
} from "@/services/api/post";
import { PostMeta } from "@/types";
import toast from "react-hot-toast";
import SuccessToast from "../reusable/toasts/SuccessToast";
import ErrorToast from "../reusable/toasts/ErrorToast";
import NoticeToast from "../reusable/toasts/NoticeToast";
import { getBlockedUsers, getFollowing } from "@/services/api/userService";
import { followUserQuery, unfollowUserQuery } from "@/services/api/explore";

type Props = {
  post: PostMeta;
  setShowReportModal: Dispatch<SetStateAction<boolean>>;
};

const DefaultPostOptions = ({ post, setShowReportModal }: Props) => {
  const queryClient = useQueryClient();

  const savedPosts = useQuery({
    queryKey: ["get-saved-posts"],
    queryFn: () => getSavedPosts(),
    // select(data) {
    //   return data.data.data.items;
    // },
  });

  const following = useQuery({
    queryKey: ["following"],
    queryFn: getFollowing,
  });

  const blockedUsers = useQuery({
    queryKey: ["blocked-users"],
    queryFn: getBlockedUsers,
  });

  console.log(blockedUsers.data);

  const saveUnsavePost = useMutation({
    mutationKey: ["save-unsave-post"],
    mutationFn: (id: number) => saveOrUnsavePost(id),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["get-saved-posts"],
      });
      toast.custom(
        (t) => (
          <SuccessToast
            t={t}
            // title={data.data.data === null ? "Post removed" : "Post saved"}
            message={
              data.data.data === null
                ? "Post removed from your saved posts"
                : "Post added to your saved posts"
            }
          />
        ),
        { id: "saved-post" }
      );
    },
    onError: (error) => console.log(error),
  });

  const followUser = useMutation({
    mutationKey: ["follow-user"],
    mutationFn: () => followUserQuery({ followerId: post.user.id }),
    onSuccess: () => {
      toast.custom(
        (t) => <SuccessToast t={t} message="User followed successfully" />,
        { id: "follow/unfollow user" }
      );
      queryClient.invalidateQueries({ queryKey: ["following"] });
      queryClient.invalidateQueries({ queryKey: ["user-following"] });
      queryClient.invalidateQueries({ queryKey: ["suggested-follows"] });
      queryClient.invalidateQueries({ type: "all" });
    },
  });

  const unfollowUser = useMutation({
    mutationKey: ["unfollow-user"],
    mutationFn: () => {
      const followId = following.data?.data.data.filter(
        (data: any) => data.followerId === post.user.id
      )[0].id;

      return unfollowUserQuery({
        followerId: followId,
      });
    },
    onSuccess: (data) => {
      toast.custom(
        (t) => <SuccessToast t={t} message="User unfollowed successfully" />,
        { id: "follow/unfollow user" }
      );
      queryClient.invalidateQueries({
        queryKey: ["following"],
      });
    },
  });

  const blacklistPost = useMutation({
    mutationKey: ["blacklist-post"],
    mutationFn: (id: number) => blacklistPostQuery(post.id),
    onSuccess: () => {
      toast.custom(
        (t) => <SuccessToast t={t} message="Post muted successfully" />,
        { id: "mute post" }
      );
      // queryClient.invalidateQueries({ queryKey: ["blocked-users"] });
      // queryClient.invalidateQueries({ queryKey: ["user-following"] });
      // queryClient.invalidateQueries({ queryKey: ["suggested-follows"] });
      // queryClient.invalidateQueries({ type: "all" });
    },
    onError: () => {
      toast.custom((t) => <ErrorToast t={t} message="Error muting post" />, {
        id: "mute post",
      });
      // queryClient.invalidateQueries({ queryKey: ["blocked-users"] });
      // queryClient.invalidateQueries({ queryKey: ["user-following"] });
      // queryClient.invalidateQueries({ queryKey: ["suggested-follows"] });
      // queryClient.invalidateQueries({ type: "all" });
    },
  });

  const muteUser = useMutation({
    mutationKey: ["mute-user"],
    mutationFn: (id: number) => muteUserQuery(post.user.id),
    onSuccess: () => {
      toast.custom(
        (t) => <SuccessToast t={t} message="User muted successfully" />,
        { id: "mute user" }
      );
      // queryClient.invalidateQueries({ queryKey: ["blocked-users"] });
      // queryClient.invalidateQueries({ queryKey: ["user-following"] });
      // queryClient.invalidateQueries({ queryKey: ["suggested-follows"] });
      // queryClient.invalidateQueries({ type: "all" });
    },
    onError: () => {
      toast.custom((t) => <ErrorToast t={t} message="Error muting user" />, {
        id: "mute user",
      });
      // queryClient.invalidateQueries({ queryKey: ["blocked-users"] });
      // queryClient.invalidateQueries({ queryKey: ["user-following"] });
      // queryClient.invalidateQueries({ queryKey: ["suggested-follows"] });
      // queryClient.invalidateQueries({ type: "all" });
    },
  });

  const blockUser = useMutation({
    mutationKey: ["block-user"],
    mutationFn: () => blockUserQuery(post.user.id),
    onSuccess: () => {
      toast.custom(
        (t) => <SuccessToast t={t} message="User blocked successfully" />,
        { id: "block/unblock user" }
      );
      queryClient.invalidateQueries({ queryKey: ["blocked-users"] });
      // queryClient.invalidateQueries({ queryKey: ["user-following"] });
      // queryClient.invalidateQueries({ queryKey: ["suggested-follows"] });
      // queryClient.invalidateQueries({ type: "all" });
    },
  });

  const unblockUser = useMutation({
    mutationKey: ["unblock-user"],
    mutationFn: () => {
      const blockId = blockedUsers.data?.data.data.filter(
        (data: any) => data.followerId === post.user.id
      )[0].id;

      return unblockUserQuery({
        userId: blockId,
      });
    },
    onSuccess: (data) => {
      toast.custom(
        (t) => <SuccessToast t={t} message="User unblocked successfully" />,
        { id: "block/unblock user" }
      );
      queryClient.invalidateQueries({
        queryKey: ["blocked-users"],
      });
    },
  });

  const checkIfUserIsFollowed = useMemo(() => {
    if (following.isError || !following.isSuccess) {
      return false;
    }
    const filteredArray = following.data?.data.data.filter((item: any) => {
      return item.followerId === post.user.id;
    });

    if (filteredArray.length) return true;
    return false;
  }, [
    following.isError,
    following.isSuccess,
    following.data?.data.data,
    post.user.id,
  ]);

  const checkIfUserIsBlocked = useMemo(() => {
    if (blockedUsers.isError || !blockedUsers.isSuccess) {
      return false;
    }
    const filteredArray = blockedUsers.data?.data.data.filter((item: any) => {
      return item.followerId === post.user.id;
    });

    if (filteredArray.length) return true;
    return false;
  }, [
    blockedUsers.isError,
    blockedUsers.isSuccess,
    blockedUsers.data?.data.data,
    post.user.id,
  ]);

  const handlePostSave = (id: number) => {
    saveUnsavePost.mutate(id);
  };

  console.log(savedPosts);
  console.log(following);

  return (
    <DropdownMenu modal={true}>
      <DropdownMenuTrigger
        asChild
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
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
      <DropdownMenuContent className="w-[clamp(240px,80%,300px)] md:w-[300px] lg:w-[300px] absolute -translate-x-[105%] top-0 bg-background border-border">
        <DropdownMenuGroup className="">
          <DropdownMenuItem
            onClick={(e) => {
              e.stopPropagation();
              handlePostSave(post.id);
            }}
            // disabled={!savedPosts?.data.success}
            className="cursor-pointer p-2 py-3 min-[480px]:p-4 text-base text-foreground font-semibold data-[highlighted]:text-foreground"
          >
            <Image
              width={24}
              height={24}
              className="size-5 min-[480px]:size-6 mr-4 object-cover"
              alt="icon"
              src={"/assets/post-icons/save-post.svg"}
            />
            <span className="text-sm min-[480px]:text-base">
              {Boolean(
                savedPosts.data?.data.data.items.filter(
                  (savedPost: PostMeta) => savedPost.id === post.id
                ).length
              )
                ? "Unsave Post"
                : "Save Post"}
            </span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={(e) => {
              e.stopPropagation();
              blacklistPost.mutate(post.id);
            }}
            className="cursor-pointer p-2 py-3 min-[480px]:p-4 text-base text-foreground font-semibold data-[highlighted]:text-foreground"
          >
            <Image
              width={24}
              height={24}
              className="size-5 min-[480px]:size-6 mr-4 object-cover"
              alt="icon"
              src={"/assets/post-icons/not-interested.svg"}
            />
            <span className="text-sm min-[480px]:text-base">
              Not interested in this post
            </span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={(e) => {
              e.stopPropagation();
              if (checkIfUserIsFollowed) {
                unfollowUser.mutate();
              } else {
                followUser.mutate();
              }
            }}
            className="cursor-pointer p-2 py-3 min-[480px]:p-4 text-base text-foreground font-semibold data-[highlighted]:text-foreground"
          >
            <Image
              width={24}
              height={24}
              className="size-5 min-[480px]:size-6 mr-4 object-cover"
              alt="icon"
              src={"/assets/post-icons/follow.svg"}
            />
            <span className="text-sm min-[480px]:text-base">
              {checkIfUserIsFollowed ? "Unfollow" : "Follow"} @
              {post.user.username}
            </span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator className="mx-2 bg-border" />
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={(e) => {
              e.stopPropagation();
              muteUser.mutate(post.user.id);
            }}
            className="cursor-pointer p-2 py-3 min-[480px]:p-4 text-base text-foreground font-semibold data-[highlighted]:text-foreground"
          >
            <Image
              width={24}
              height={24}
              className="size-5 min-[480px]:size-6 mr-4 object-cover"
              alt="icon"
              src={"/assets/post-icons/mute.svg"}
            />
            <span className="text-sm min-[480px]:text-base">
              Mute @{post.user.username}
            </span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={(e) => {
              e.stopPropagation();
              if (checkIfUserIsBlocked) {
                unblockUser.mutate();
              } else {
                blockUser.mutate();
              }
            }}
            className="cursor-pointer p-2 py-3 min-[480px]:p-4 text-base text-foreground font-semibold data-[highlighted]:text-foreground"
          >
            <Image
              width={24}
              height={24}
              className="size-5 min-[480px]:size-6 mr-4 object-cover"
              alt="icon"
              src={"/assets/post-icons/block.svg"}
            />
            <span className="text-sm min-[480px]:text-base">
              {checkIfUserIsBlocked ? "Unblock" : "Block"} @{post.user.username}
            </span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={(e) => {
              e.stopPropagation();
              setShowReportModal(true);
            }}
            className="cursor-pointer p-2 py-3 min-[480px]:p-4 text-base text-foreground font-semibold data-[highlighted]:text-foreground"
          >
            <Image
              width={24}
              height={24}
              className="size-5 min-[480px]:size-6 mr-4 object-cover"
              alt="icon"
              src={"/assets/post-icons/report.svg"}
            />
            <span className="text-sm min-[480px]:text-base">Report post</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DefaultPostOptions;
