import { profileImageplaceholder, reactionsList } from "@/constants";
import { useUserContext } from "@/context/UserContext";
import { followUserQuery, unfollowUserQuery } from "@/services/api/explore";
import { LikeMeta, PostMeta, User } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import React, { useMemo } from "react";
import { Button } from "../ui/button";
import PageLoadingSpinner from "../Spinner/PageLoadingSpinner";
import { getFollowing } from "@/services/api/userService";
import { cn } from "@/lib/utils";
import { ImSpinner2 } from "react-icons/im";

const ReactionSuggestionCard = ({
  data,
  user,
  type,
}: {
  data: LikeMeta & { user: User };
  user: User;
  type?: string;
}) => {
  //   const { userData } = useUserContext();

  const queryClient = useQueryClient();

  const following = useQuery({
    queryKey: ["following"],
    queryFn: getFollowing,
  });

  const followUser = useMutation({
    mutationKey: ["follow-user"],
    mutationFn: () => followUserQuery({ followerId: user.id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-following"] });
      queryClient.invalidateQueries({ queryKey: ["suggested-follows"] });
      queryClient.invalidateQueries({ type: "all" });
    },
  });

  const unfollowUser = useMutation({
    mutationKey: ["unfollow-user"],
    mutationFn: () => {
      const followId = following.data?.data.data.filter(
        (data: any) => data.followerId === user.id
      )[0].id;

      return unfollowUserQuery({
        followerId: followId,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["following"],
      });
    },
  });

  const checkIfUserIsFollowed = useMemo(() => {
    if (following.isError || !following.isSuccess) {
      return false;
    }
    const filteredArray = following.data?.data.data.filter((item: any) => {
      return item.followerId === user.id;
    });

    if (filteredArray.length) return true;
    return false;
  }, [
    following.isError,
    following.isSuccess,
    following.data?.data.data,
    user.id,
  ]);

  return following.isLoading ? (
    <div className="flex-1 bg-transparent transition-all flex justify-center items-center h-9 px-10 w-[129px]">
      <ImSpinner2 className="size-4 my-2 animate-spin text-[#4ED17E]" />
    </div>
  ) : (
    <div className="flex justify-between gap-4 gap-y-0 items-center overflow-x-hidden">
      <div className="flex flex-1 gap-2 sm:gap-4 items-center overflow-hidden min-w-[200px]">
        <div className="relative">
          <Image
            width={50}
            height={50}
            className="size-[30px] sm:size-[50px] rounded-full object-cover"
            alt="icon"
            src={
              user?.usermeta?.avatar !== null
                ? user?.usermeta?.avatar
                : profileImageplaceholder
            }
          />
          <Image
            width={16}
            height={16}
            className="size-[16px] rounded-full object-cover bg-background absolute bottom-0 right-0"
            alt="icon"
            src={reactionsList[data?.emojiId]}
          />
        </div>
        <div className="flex-1">
          <p className="font-bold text-foreground text-sm sm:text-base w-full line-clamp-1 text-ellipsis">
            {user.usermeta.firstname} {user.usermeta.lastname}
          </p>
          <p className="text-xs sm:text-sm text-foreground/50 font-normal w-full line-clamp-1 text-ellipsis">
            @{user.username}
          </p>
        </div>
      </div>
      <div className="flex flex-1 justify-end mt-1">
        <Button
          onClick={() => {
            if (checkIfUserIsFollowed) {
              unfollowUser.mutate();
            } else {
              followUser.mutate();
            }
          }}
          disabled={followUser.isPending || unfollowUser.isPending}
          className={cn(
            "flex-1 hover:bg-foreground/20 bg-background hover:scale-[1.01] transition-all hover:shadow-xl border hover:border-foreground hover:text-foreground border-foreground text-foreground rounded-full flex justify-center items-center h-9 px-10 w-[80px] max-w-[129px]",
            checkIfUserIsFollowed && "bg-foreground text-background"
          )}
        >
          {followUser.isPending || unfollowUser.isPending ? (
            <PageLoadingSpinner spinnerExtraClass="w-5 h-5" />
          ) : (
            <span className="w-fit text-sm sm:text-base font-medium block p-0 align-middle">
              {checkIfUserIsFollowed ? "Following" : "Follow"}
            </span>
          )}
        </Button>
      </div>
    </div>
  );
};

export default ReactionSuggestionCard;
