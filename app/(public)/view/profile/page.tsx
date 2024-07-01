"use client";

import EditProfileDialog from "@/components/Modal/EditProfileDialog";
import VerificationDialog from "@/components/Modal/VerificationDialog";
import PublicSidebar from "@/components/PublicSidebar";
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
import { useUserContext } from "@/context/UserContext";
import { cn, formatNumberCount } from "@/lib/utils";
import { followUserQuery, unfollowUserQuery } from "@/services/api/explore";
import {
  fetchSavedPosts,
  fetchUsersPosts,
  getFollowers,
  getFollowing,
  getPublicUserProfile,
} from "@/services/api/userService";
import { PostMeta } from "@/types";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { format } from "date-fns";
import { CalendarDays, EditIcon, MoreVertical } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import { Fragment, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { ImSpinner2 } from "react-icons/im";
import { IoArrowBack } from "react-icons/io5";
import { TbEdit } from "react-icons/tb";
import { useInView } from "react-intersection-observer";

type Props = {};

const Profile = (props: Props) => {
  const router = useRouter();
  const { theme } = useTheme();
  const queryClient = useQueryClient();
  const { userData, setShowCreatePost } = useUserContext();

  const { ref: userPostsRef, inView: usersPostsInView } = useInView();
  // const { ref: savedPostsRef, savedPostsInView } = useInView();

  const baseUrl = window.location.protocol + "//" + window.location.host + "/";

  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [showEditProfileDialog, setShowEditProfileDialog] = useState(false);

  const followUser = useMutation({
    mutationKey: ["follow-user"],
    mutationFn: () => followUserQuery({ followerId: userData?.user.id! }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["suggested-follows"] });
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
              ? "Hey, check out my profile on Foniso! I've shared some great content that I think you'll enjoy. Follow the link below to see more."
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

  const unfollowUser = useMutation({
    mutationKey: ["unfollow-user"],
    mutationFn: () => unfollowUserQuery({ followerId: userData?.user.id! }),
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

  const followers = useQuery({
    queryKey: ["followers"],
    queryFn: getFollowers,
  });

  const checkIfUserIsFollowed = useMemo(() => {
    if (following.isError || !following.isSuccess) {
      return false;
    }
    const filteredArray = following.data?.data.data.filter((item: any) => {
      return item.followerId === userData?.user.id;
    });

    if (filteredArray.length) return true;
    return false;
  }, [
    following.isError,
    following.isSuccess,
    following.data?.data.data,
    userData?.user.id,
  ]);

  const usersPosts = useInfiniteQuery({
    queryKey: ["fetch-users-posts"],
    queryFn: ({ pageParam }: { pageParam: number }) =>
      fetchUsersPosts(userData?.user.id!, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages, lastPageParam, allPageParams) => {
      console.log(lastPage, allPages, lastPageParam, allPageParams);
      if (lastPage.length === 0) {
        return undefined;
      }
      return lastPageParam + 1;
    },
  });

  const savedPosts = useQuery({
    queryKey: ["get-saved-posts"],
    queryFn: fetchSavedPosts,
    select(data) {
      return data.data.data.items;
    },
  });

  const publicProfile = useQuery({
    queryKey: ["users-public-profile"],
    queryFn: () => getPublicUserProfile(userData?.user.username!),
    select(data) {
      return data.data.data;
    },
  });

  console.log(publicProfile);

  // https://stagingapi.foniso.team/api/v1/posts/user/:userId?page=1&limit=200

  // Inside your component
  const searchParams = useSearchParams();
  const selectType = searchParams.get("select-type");
  const tab = searchParams.get("tab");

  console.log(selectType);

  useEffect(() => {
    if (selectType) {
      setShowVerificationModal(true);
    }
  }, [selectType]);

  useEffect(() => {
    if (usersPostsInView) {
      usersPosts.fetchNextPage();
    }
  }, [usersPosts.fetchNextPage, usersPostsInView]);

  // useEffect(() => {
  //   if (savedPostsInView) {
  //     savedPosts.fetchNextPage();
  //   }
  // }, [savedPosts.fetchNextPage, savedPostsInView]);

  return (
    <>
      <div className="flex gap-0 min-[480px]:gap-2 bg-background">
        <div className="relative mt-0 min-[480px]:mt-2 flex-1 bg-background">
          {/* profile cover photo and profile image */}
          <div className="relative">
            {/* cover photo */}
            <div className="w-full h-[140px] sm:h-[200px]">
              <Image
                alt="cover image"
                layout="fill"
                objectFit="cover"
                className="w-full h-full object-cover"
                src={
                  userData?.user?.usermeta?.coverImage ??
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
                className="rounded-full object-cover"
                src={
                  userData?.user.usermeta?.avatar ??
                  "/assets/placeholder-person.png"
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
                className="absolute hover:bg-colorPrimary top-4 right-6 sm:right-6 size-8 p-1 bg-background/70 flex justify-center items-center rounded-full"
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
                    className="p-4 flex items-center gap-x-2 text-base text-foreground font-semibold data-[highlighted]:text-foreground"
                    onClick={() => setShowVerificationModal(true)}
                  >
                    <span>Verify account</span>
                    <Image
                      alt="verified"
                      width={20}
                      height={20}
                      src={"/assets/app-icons/verified-icon.svg"}
                    />
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      copyToClipboard(
                        baseUrl + "view/profile/" + userData?.user.username
                      );
                    }}
                    className="p-4 text-base text-foreground font-semibold data-[highlighted]:text-foreground"
                  >
                    <span>Copy link to profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() =>
                      handleShare(
                        baseUrl + "view/profile/" + userData?.user.username,
                        userData?.user.usermeta.about ?? ""
                      )
                    }
                    className="p-4 text-base text-foreground font-semibold data-[highlighted]:text-foreground"
                  >
                    <span>Share profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => router.push("/settings")}
                    className="p-4 text-base text-foreground font-semibold data-[highlighted]:text-foreground"
                  >
                    <span>Settings</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          {/* profile actions and details*/}
          <div>
            <div className="flex justify-end px-2 py-6 min-[480px]:p-6 ">
              <div className="flex gap-x-3 items-center">
                <Button
                  onClick={() => setShowEditProfileDialog(true)}
                  variant={"outline"}
                  disabled={followUser.isPending}
                  className={cn(
                    "flex-1 hover:bg-foreground hidden  hover:text-background hover:scale-[1.01] transition-all hover:shadow-xl border bg-transparent rounded-full min-[480px]:flex justify-center items-center h-9 min-[480px]:px-10 w-[129px] border-foreground text-foreground "
                  )}
                >
                  Edit Profile
                </Button>
                <Button
                  onClick={() => setShowEditProfileDialog(true)}
                  variant={"outline"}
                  disabled={followUser.isPending}
                  className={cn(
                    "flex-1 hover:bg-foreground min-[480px]:hidden hover:text-background hover:scale-[1.01] transition-all hover:shadow-xl border bg-transparent rounded-full flex justify-center items-center h-7 px-0 min-[480px]:px-10 w-12 border-foreground text-foreground "
                  )}
                >
                  <TbEdit size={20} />
                </Button>
              </div>
            </div>
          </div>
          {/* account details */}
          <div className="min-[480px]:mt-2 px-2 min-[480px]:px-6">
            <div>
              <div className="flex gap-x-2 items-center">
                <p className="text-foreground hover:underline cursor-pointer font-bold line-clamp-1 text-ellipsis text-lg sm:text-xl">
                  {userData?.user?.usermeta.firstname}{" "}
                  {userData?.user?.usermeta.lastname}
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
                    category={userData?.user?.usermeta?.favorite_sport!}
                    size={20}
                  />
                </div>
              </div>
              <p className="text-inactive text-sm min-[480px]:text-base">
                @{userData?.user?.username}
              </p>
            </div>
            <div className="mt-2 text-foreground/100 text-sm min-[480px]:text-base">
              {userData?.user.usermeta.about}
            </div>
            <div className="mt-2 min-[480px]:mt-4 flex gap-x-4">
              <p
                onClick={() => router.push("/profile/stats?tab=following")}
                className="font-bold text-sm min-[480px]:text-base cursor-pointer"
              >
                <span className="cursor-pointer">
                  {formatNumberCount(publicProfile.data?.followingCount ?? "0")}{" "}
                </span>
                <span className="font-normal text-foreground/70">
                  Following
                </span>
              </p>
              <p
                onClick={() => router.push("/profile/stats?tab=followers")}
                className="font-bold text-sm min-[480px]:text-base cursor-pointer"
              >
                <span className="cursor-pointer">
                  {formatNumberCount(publicProfile.data?.followerCount ?? "0")}{" "}
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
                  {formatNumberCount(publicProfile.data?.viewsCount ?? "0")}{" "}
                </span>
                <span className="font-normal text-foreground/70">Views</span>
              </p>
            </div>
            <div className="mt-4 flex items-center gap-x-2">
              <CalendarDays className="text-foreground/70 size-[14px] min-[480px]:size-[18px]" />
              {userData?.user?.created_at && (
                <span className="text-foreground/70 text-xs min-[480px]:text-base">
                  Joined {format(userData?.user?.created_at ?? "", "PPP")}
                </span>
              )}
            </div>
          </div>
          {/* Posts and saved posts tab header */}
          <div className="py-[8px] min-[480px]:py-[14px] px-2 min-[480px]:px-6 border-t border-b border-border mt-6 font-bold text-base sm:text-lg text-foreground flex ">
            <div
              className={cn(
                "flex flex-1 items-center justify-center cursor-pointer relative",
                (!tab || tab !== "saved-posts") && "text-colorPrimary"
              )}
              onClick={() => router.push(`?tab=posts`)}
            >
              Posts
              {(!tab || tab !== "saved-posts") && (
                <div className="absolute -bottom-2 min-[480px]:-bottom-[14px] w-full h-[3px] rounded-t-full left-0 bg-colorPrimary" />
              )}
            </div>
            <div
              className={cn(
                "flex flex-1 items-center justify-center cursor-pointer relative",
                tab === "saved-posts" && "text-colorPrimary"
              )}
              onClick={() => router.push(`?tab=saved-posts`)}
            >
              Saved
              {tab === "saved-posts" && (
                <div className="absolute -bottom-2 min-[480px]:-bottom-[14px] w-full h-[3px] rounded-t-full left-0 bg-colorPrimary" />
              )}
            </div>
          </div>
          {/* Posts */}
          {(!tab || tab !== "saved-posts") && (
            <div className=" flex flex-col gap-y-2 bg-background sm:bg-inherit mb-0">
              {/* posts */}
              {usersPosts.isLoading && (
                <div className="mt-10 flex justify-center">
                  {/* <PageLoadingSpinner /> */}
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
                      It&apos;s empty in here. Create your first post.
                    </p>
                    <div className="flex justify-center items-center">
                      <Button
                        onClick={() => setShowCreatePost(true)}
                        className="h-12 mt-5 px-5 pl-5 bg-gradient-to-br w-fit from-[#0B953B] to-[#0F4E25] hover:bg-colorPrimary hover:brightness-90 rounded-full flex gap-2 items-center justify-start"
                      >
                        <EditIcon
                          color="white"
                          size={25}
                          className="size-[25px]"
                        />
                        <span
                          className={cn("text-white text-lg font-semibold")}
                        >
                          Create post
                        </span>
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Saved Posts */}
          {tab === "saved-posts" && (
            <div className=" flex flex-col gap-y-2 bg-background sm:bg-inherit mb-0 min-h-screen">
              {/* saved posts */}
              {savedPosts.isLoading && (
                <div className="mt-10 flex justify-center">
                  {/* <PageLoadingSpinner /> */}
                  <ImSpinner2 className="size-10 animate-spin text-[#4ED17E]" />
                </div>
              )}
              {Boolean(
                savedPosts.isSuccess &&
                  savedPosts.data &&
                  savedPosts.data.length
              ) &&
                savedPosts.data.map((post: PostMeta, i: number) => (
                  <Post key={post.updated_at} postData={post} />
                ))}

              {Boolean(savedPosts.isSuccess && savedPosts.data.length <= 0) && (
                <div className="flex justify-center items-center">
                  <div className="my-10 px-6">
                    <p className="font-bold text-foreground text-center">
                      No posts
                    </p>
                    <p className="text-foreground/50 mt-2 text-sm text-center">
                      It&apos;s empty in here. You don&apos;t have any saved
                      posts.
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        <PublicSidebar
          className={
            "min-w-[200px] w-[40%] max-w-[480px] gap-0 min-[480px]:gap-2"
          }
        />
      </div>
      <VerificationDialog
        showVerificationDialog={showVerificationModal}
        setShowVerificationDialog={setShowVerificationModal}
      />
      <EditProfileDialog
        showEditProfileDialog={showEditProfileDialog}
        setShowEditProfileDialog={setShowEditProfileDialog}
      />
    </>
  );
};

export default Profile;
