"use client";
import Loading from "@/components/reusable/Loading";
import Post from "@/components/reusable/Post";
import SportIcon from "@/components/reusable/SportIcon";
import ErrorToast from "@/components/reusable/toasts/ErrorToast";
import NoticeToast from "@/components/reusable/toasts/NoticeToast";
import SuccessToast from "@/components/reusable/toasts/SuccessToast";
import RightSideBar from "@/components/RightSideBar";
import PageLoadingSpinner from "@/components/Spinner/PageLoadingSpinner";
import { Button } from "@/components/ui/button";
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
  unblockUserQuery,
} from "@/services/api/post";
import {
  fetchUsersPosts,
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
import { useRouter } from "next/navigation";
import React, { Fragment, useEffect, useMemo } from "react";
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

  const { ref: userPostsRef, inView: usersPostsInView } = useInView();

  console.log(params.username);

  console.log(profileData);

  const followUser = useMutation({
    mutationKey: ["follow-user"],
    mutationFn: () =>
      followUserQuery({ followerId: profileData.data?.data.data?.user?.id }),
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
        (data: any) => data.followerId === profileData.data?.data.data?.user?.id
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

  const copyToClipboard = async (val: string) => {
    try {
      await navigator.clipboard.writeText(val);
      toast.custom((t) => (
        <SuccessToast
          t={t}
          title="Copied to clipboard"
          message="Profile link copied to clipboard successfully."
        />
      ));
    } catch (err) {
      toast.custom((t) => (
        <SuccessToast
          t={t}
          message="Profile URL could not be copied to clipboard."
        />
      ));
    }
  };

  const handleShare = async (url: string, about: string) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Discover my profile on Foniso",
          text:
            about.length <= 0
              ? "Hey, check out my profile on Example.com! I've shared some great content that I think you'll enjoy. Follow the link below to see more."
              : about,
          url: url,
        });
        console.log("Profile shared successfully");
      } catch (error) {
        console.error("Error sharing profile:", error);
      }
    } else {
      try {
        await navigator.clipboard.writeText(url);
        toast.custom((t) => (
          <NoticeToast
            t={t}
            title="Browser not supported"
            message="Web Share API not supported in this browser. Your profile URL has been copied to your clipboard."
          />
        ));
      } catch (err) {
        toast.custom((t) => (
          <ErrorToast
            t={t}
            message="Web Share API not supported in this browser. Your profile URL could not be copied to your clipboard."
          />
        ));
      }
      // Alternatively, you could copy the URL to the clipboard
      // navigator.clipboard.writeText(profileUrl).then(() => {
      //   alert('Profile URL copied to clipboard');
      // });
    }
  };

  const following = useQuery({
    queryKey: ["following"],
    queryFn: getFollowing,
  });

  const blockedUsers = useQuery({
    queryKey: ["blocked-users"],
    queryFn: getBlockedUsers,
  });

  const blockUser = useMutation({
    mutationKey: ["block-user"],
    mutationFn: () => blockUserQuery(profileData.data?.data.data?.user?.id),
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
        (data: any) => data.followerId === profileData.data?.data.data?.user?.id
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
      return item.followerId === profileData.data?.data.data?.user?.id;
    });

    if (filteredArray.length) return true;
    return false;
  }, [
    following.isError,
    following.isSuccess,
    following.data?.data.data,
    profileData.data?.data.data?.user?.id,
  ]);

  const checkIfUserIsBlocked = useMemo(() => {
    if (blockedUsers.isError || !blockedUsers.isSuccess) {
      return false;
    }
    const filteredArray = blockedUsers.data?.data.data.filter((item: any) => {
      return item.followerId === profileData.data?.data.data?.user?.id;
    });

    if (filteredArray.length) return true;
    return false;
  }, [
    blockedUsers.isError,
    blockedUsers.isSuccess,
    blockedUsers.data?.data.data,
    profileData.data?.data.data?.user?.id,
  ]);

  console.log(profileData.data);

  const usersPosts = useInfiniteQuery({
    queryKey: [
      `fetch-public-users-posts-${profileData.data?.data.data?.user?.id}`,
    ],
    queryFn: ({ pageParam }: { pageParam: number }) =>
      fetchUsersPosts(profileData.data?.data.data?.user?.id!, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages, lastPageParam, allPageParams) => {
      console.log(lastPage, allPages, lastPageParam, allPageParams);
      if (lastPage.length === 0) {
        return undefined;
      }
      return lastPageParam + 1;
    },
  });

  const baseUrl = window.location.protocol + "//" + window.location.host + "/";

  console.log(usersPosts);

  useEffect(() => {
    if (usersPostsInView) {
      usersPosts.fetchNextPage();
    }
  }, [usersPosts.fetchNextPage, usersPostsInView]);

  return (
    <>
      {profileData.isSuccess && (
        <div className="flex gap-0 min-[480px]:gap-2">
          <div className="relative mt-0 min-[480px]:mt-0 flex-1 bg-background">
            {/* profile cover photo and profile image */}
            <div className="relative">
              {/* cover photo */}
              <div className="w-full h-[140px] sm:h-[200px]">
                <Image
                  alt="cover image"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-b-lg w-full h-full object-cover"
                  src={
                    profileData.data?.data.data?.user.usermeta?.coverImage ??
                    "/assets/default-cover-image.png"
                  }
                />
              </div>
              {/* profile image */}
              <div className="size-[100px] sm:size-[150px] rounded-full border-4 border-background absolute bottom-0 left-2 sm:left-6 translate-y-1/2 bg-background overflow-hidden">
                <Image
                  alt="profile image"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-full"
                  src={
                    profileData.data?.data.data?.user.usermeta?.avatar ??
                    profileImageplaceholder
                  }
                />
              </div>
              {/* back btn */}
              <Button
                onClick={() => router.back()}
                className="size-8 p-1 flex justify-center items-center bg-background/70 hover:bg-colorPrimary rounded-full absolute top-4 left-2 sm:left-4"
              >
                <IoArrowBack className="text-foreground size-6" />
              </Button>
              {/* more actions */}
              <DropdownMenu>
                <DropdownMenuTrigger
                  asChild
                  className="absolute hover:bg-colorPrimary top-4 right-4 sm:right-6 size-8 p-1 bg-background/70 flex justify-center items-center rounded-full"
                >
                  {/* <Button
                variant={"ghost"}
                className="p-0 outline:none outline-none ring-0 hover:bg-transparent"
              > */}
                  <MoreVertical
                    size={"20px"}
                    className="text-foreground translate-x-3 cursor-pointer size-6"
                    role="button"
                  />
                  {/* </Button> */}
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-[clamp(240px,40%,300px)] md:w-[300px] lg:w-[300px] absolute -translate-x-[105%] top-0 bg-background border-border">
                  <DropdownMenuGroup className="">
                    <DropdownMenuItem
                      onClick={() =>
                        handleShare(
                          baseUrl +
                            "profile/" +
                            profileData.data?.data.data?.user.username,
                          profileData.data?.data.data?.user.usermeta.about ?? ""
                        )
                      }
                      className="p-2 sm:p-4 text-sm sm:text-base text-foreground font-medium data-[highlighted]:text-foreground data-[highlighted]:bg-colorPrimary/30"
                    >
                      <span>Share profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => {
                        copyToClipboard(
                          baseUrl +
                            "profile/" +
                            profileData.data?.data.data?.user.username
                        );
                      }}
                      className="p-2 sm:p-4 text-sm sm:text-base text-foreground font-medium data-[highlighted]:text-foreground data-[highlighted]:bg-colorPrimary/30"
                    >
                      <span>Copy link to profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => {
                        if (checkIfUserIsFollowed) {
                          unfollowUser.mutate();
                        } else {
                          followUser.mutate();
                        }
                      }}
                      className="p-2 sm:p-4 text-sm sm:text-base text-foreground font-medium data-[highlighted]:text-foreground data-[highlighted]:bg-colorPrimary/30"
                    >
                      <span>
                        {checkIfUserIsFollowed ? "Unfollow" : "Follow"} user
                      </span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => {
                        if (checkIfUserIsBlocked) {
                          unblockUser.mutate();
                        } else {
                          blockUser.mutate();
                        }
                      }}
                      className="p-2 sm:p-4 text-sm sm:text-base text-foreground font-medium data-[highlighted]:text-foreground data-[highlighted]:bg-colorPrimary/30"
                    >
                      <span>
                        {checkIfUserIsFollowed ? "Unblock" : "Block"} user
                      </span>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            {/* profile actions and details*/}
            <div>
              <div className="flex justify-end p-2 sm:p-6">
                <div className="flex gap-x-3 items-center">
                  <div
                    className="border-foreground/50 border rounded-full size-7 sm:size-9 flex justify-center items-center cursor-pointer"
                    role="button"
                  >
                    <Image
                      alt="message-user"
                      src="/assets/app-icons/message-text.svg"
                      width={20}
                      height={20}
                      className={cn(
                        "size-4 sm:size-4",
                        theme === "light" ? "invert" : "brightness-200"
                      )}
                    />
                  </div>
                  <div
                    className="border-foreground/50 border rounded-full size-7 sm:size-9 flex justify-center items-center cursor-pointer"
                    role="button"
                  >
                    <Image
                      alt="notification"
                      src="/assets/app-icons/notification-inactive.svg"
                      width={24}
                      height={24}
                      className={cn(
                        "size-4 sm:size-4",
                        theme === "light" ? "invert" : "brightness-200"
                      )}
                    />
                  </div>
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
                      "flex-1 hover:bg-foreground/10 bg-transparent hover:scale-[1.01] transition-all hover:shadow-xl border hover:border-foreground hover:text-foreground border-foreground/50 text-foreground rounded-full flex justify-center items-center h-7 sm:h-9 px-4 sm:px-10 w-[100px] sm:w-[129px]",
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
            </div>
            {/* account details */}
            <div className="mt-4 min-[480px]:mt-2 px-2 min-[480px]:px-6">
              <div>
                <div className="flex gap-x-2 items-center">
                  <p className="text-foreground cursor-pointer font-bold line-clamp-1 text-ellipsis text-lg sm:text-xl">
                    {profileData.data?.data.data?.user.usermeta.firstname}{" "}
                    {profileData.data?.data.data?.user.usermeta.lastname}
                  </p>
                  <div className="flex gap-x-1 items-center">
                    {/* {userData?.user.verified && (
                  <Image
                    width={14}
                    height={14}
                    className="size-[16px] rounded-full object-cover"
                    alt="avatar"
                    src={"/assets/app-icons/verified-icon.svg"}
                  />
                )} */}
                    <SportIcon
                      category={
                        profileData.data?.data.data?.user.usermeta
                          ?.favorite_sport!
                      }
                      size={20}
                    />
                  </div>
                </div>
                <p className="text-inactive text-sm min-[480px]:text-base">
                  @{(profileData.data?.data.data?.user as User).username}
                </p>
              </div>
              <div className="mt-2 text-foreground/100 text-sm min-[480px]:text-base">
                {(profileData.data?.data.data?.user as User).usermeta.about}
              </div>
              <div className="mt-2 min-[480px]:mt-4 flex gap-x-4">
                <p className="font-bold text-sm min-[480px]:text-base">
                  <span
                    onClick={() =>
                      router.push(
                        `/profile/${profileData.data?.data.data?.user?.username}/stats?tab=following`
                      )
                    }
                    className="cursor-pointer"
                  >
                    {formatNumberCount(
                      profileData.data?.data?.data?.followingCount
                    )}{" "}
                  </span>
                  <span className="font-normal text-foreground/70">
                    Following
                  </span>
                </p>
                <p className="font-bold text-sm min-[480px]:text-base">
                  <span
                    onClick={() =>
                      router.push(
                        `/profile/${profileData.data?.data.data?.user?.username}/stats?tab=followers`
                      )
                    }
                    className="cursor-pointer"
                  >
                    {formatNumberCount(
                      profileData.data?.data?.data?.followerCount
                    )}{" "}
                  </span>
                  <span className="font-normal text-foreground/70">
                    Followers
                  </span>
                </p>
                <p className="font-bold text-sm min-[480px]:text-base">
                  <span
                    className="cursor-pointer"
                    // onClick={() => router.push("/profile/stats?tab=followers")}
                  >
                    {formatNumberCount(
                      profileData.data?.data.data?.viewsCount ?? "0"
                    )}{" "}
                  </span>
                  <span className="font-normal text-foreground/70">Views</span>
                </p>
              </div>
              <div className="mt-4 flex items-center gap-x-2">
                <CalendarDays className="text-foreground/70 size-[14px] min-[480px]:size-[18px]" />
                <span className="text-foreground/70 text-xs min-[480px]:text-base">
                  Joined April 17, 2023
                </span>
              </div>
            </div>
            {/* Posts header */}
            <div className="py-[8px] min-[480px]:py-[14px] px-2 min-[480px]:px-6 border-t border-b border-border mt-6 font-bold text-lg sm:text-2xl text-foreground">
              Posts
            </div>
            {/* Posts */}
            <div className=" flex flex-col gap-y-2 bg-background sm:bg-inherit min-h-screen">
              {usersPosts.isLoading && (
                <div className="mt-10 flex justify-center">
                  <ImSpinner2 className="size-10 animate-spin text-[#4ED17E]" />
                </div>
              )}
              {Boolean(
                usersPosts.isSuccess &&
                  usersPosts.data?.pages[0].data.data.items.length
              ) && (
                <>
                  {usersPosts.data?.pages.map((group, i) => (
                    <Fragment key={i}>
                      {group.data.data.items.map(
                        (post: PostMeta, i: number) => (
                          <Post
                            key={post.updated_at}
                            postData={post}
                            optionsType="user"
                          />
                        )
                      )}
                    </Fragment>
                  ))}
                  <div ref={userPostsRef} className="bg-background h-fit">
                    {usersPosts.isFetchingNextPage && (
                      <Loading
                        isLoading={usersPosts.isFetchingNextPage}
                        className="w-full min-h-10 pb-5"
                      />
                    )}
                  </div>
                </>
              )}
              {Boolean(
                usersPosts.isSuccess && usersPosts.data?.pages[0].length <= 0
              ) && (
                <div className="flex justify-center items-center">
                  <div className="my-10 px-6">
                    <p className="font-bold text-foreground text-center">
                      No posts
                    </p>
                    <p className="text-foreground/50 mt-2 text-sm text-center">
                      It&apos;s empty in here. There are no posts to see.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
          <RightSideBar
            className={
              "min-w-[200px] w-[40%] max-w-[480px] gap-0 min-[480px]:gap-2"
            }
          />
        </div>
      )}
    </>
  );
};

export default Page;
