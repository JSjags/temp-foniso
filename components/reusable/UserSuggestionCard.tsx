import { profileImageplaceholder } from "@/constants";
import { useUserContext } from "@/context/UserContext";
import { followUserQuery, unfollowUserQuery } from "@/services/api/explore";
import { PostMeta, User } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import React, { useMemo } from "react";
import { Button } from "../ui/button";
import PageLoadingSpinner from "../Spinner/PageLoadingSpinner";
import { getFollowing } from "@/services/api/userService";
import { cn } from "@/lib/utils";

const UserSuggestionCard = ({ user }: { user: User }) => {
  const { userData } = useUserContext();

  const queryClient = useQueryClient();

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
    mutationFn: () => unfollowUserQuery({ followerId: user.id }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["suggested-follows"],
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
      <PageLoadingSpinner spinnerExtraClass="w-5 h-5" />
    </div>
  ) : (
    <div className="flex justify-between gap-4 gap-y-0 items-center flex-wrap">
      <div className="flex flex-1 gap-4 items-center overflow-hidden min-w-[200px]">
        <Image
          width={50}
          height={50}
          className="size-[50px] rounded-full object-cover border borer-border/50"
          alt="icon"
          src={
            user?.usermeta?.avatar !== null
              ? user?.usermeta?.avatar
              : profileImageplaceholder
          }
        />
        <div className="flex-1">
          <p className="font-bold text-foreground text-base w-full line-clamp-1 text-ellipsis">
            {user.usermeta.firstname} {user.usermeta.lastname}
          </p>
          <p className="text-sm text-foreground/50 font-normal w-full line-clamp-1 text-ellipsis">
            @{user.username}
          </p>
        </div>
      </div>
      <div className="flex justify-end mt-1">
        <Button
          onClick={() => {
            if (checkIfUserIsFollowed) {
              unfollowUser.mutate();
            } else {
              followUser.mutate();
            }
          }}
          disabled={followUser.isPending}
          className={cn(
            "flex-1 hover:bg-colorPrimary hover:scale-[1.01] transition-all hover:shadow-xl bg-foreground border hover:border-colorPrimary hover:text-white border-border text-background rounded-full flex justify-center items-center h-9 px-10 w-[129px]",
            checkIfUserIsFollowed && "bg-colorPrimary text-white"
          )}
        >
          {followUser.isPending ? (
            <PageLoadingSpinner spinnerExtraClass="w-5 h-5" />
          ) : (
            <span className="w-fit text-base font-medium block p-0 align-middle">
              {checkIfUserIsFollowed ? "Following" : "Follow"}
            </span>
          )}
        </Button>
      </div>
    </div>
  );
};

export default UserSuggestionCard;
