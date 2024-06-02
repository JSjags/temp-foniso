import { profileImageplaceholder } from "@/constants";
import { User } from "@/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useMemo } from "react";
import SportIcon from "./SportIcon";
import { Button } from "../ui/button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getFollowing } from "@/services/api/userService";
import { followUserQuery, unfollowUserQuery } from "@/services/api/explore";
import PageLoadingSpinner from "../Spinner/PageLoadingSpinner";
import { cn } from "@/lib/utils";

type Props = {
  user: User;
  hideBorder?: boolean;
};

const FollowUnfollowTile = ({ user, hideBorder }: Props) => {
  const router = useRouter();

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

  return (
    <div
      className={cn(
        "flex justify-between items-center",
        !hideBorder && "border-b border-border"
      )}
    >
      <div
        className="flex gap-x-3 rounded-md p-4 cursor-pointer"
        role="button"
        onClick={() => {
          router.push(`/profile/${user.username}`);
        }}
      >
        <Image
          width={36}
          height={36}
          className="size-[36px] sm:size-[36px] rounded-full object-cover"
          alt="avatar"
          src={
            user?.usermeta?.avatar !== null
              ? user?.usermeta?.avatar
              : profileImageplaceholder
          }
        />
        <div>
          <div className="flex gap-x-2 items-center">
            <p className="text-foreground hover:underline font-semibold text-sm line-clamp-1 text-ellipsis">
              {user?.usermeta?.firstname} {user?.usermeta?.lastname}
            </p>
            <div className="flex gap-x-1 items-center">
              {user?.verified && (
                <Image
                  width={14}
                  height={14}
                  className="size-[16px] rounded-full object-cover"
                  alt="avatar"
                  src={"/assets/app-icons/verified-icon.svg"}
                />
              )}
              <SportIcon category={user?.usermeta?.favorite_sport} />
            </div>
          </div>
          <p className="text-inactive text-xs">@{user?.username}</p>
        </div>
      </div>
      <div className="flex flex-1 justify-end mt-1 pr-2 sm:pr-4">
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

export default FollowUnfollowTile;
