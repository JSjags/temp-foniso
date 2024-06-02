import Image from "next/image";
import { IoMdNotifications } from "react-icons/io";
import { Button } from "../ui/button";
import { NotificationMeta } from "@/types";
import { customRelativeTime } from "@/utils";
import ContentText from "./ContentText";
import { useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getFollowing } from "@/services/api/userService";
import { followUserQuery, unfollowUserQuery } from "@/services/api/explore";
import { useMemo } from "react";
import PageLoadingSpinner from "../Spinner/PageLoadingSpinner";
import { cn } from "@/lib/utils";
import { profileImageplaceholder } from "@/constants";

type Props = {
  type: string;
  data: NotificationMeta;
};

const getAsset = (type: string) => {
  switch (type) {
    case "community_invite":
      return (
        <Image
          width={24}
          height={24}
          alt="icon"
          src={"/assets/app-icons/notifications/community.svg"}
          className="absolute size-4 sm:size-6 bottom-0 right-0 border border-background rounded-full bg-background"
        />
      );
    case "liked_post":
      return (
        <Image
          width={24}
          height={24}
          alt="icon"
          src={"/assets/app-icons/notifications/liked.svg"}
          className="absolute size-4 sm:size-6 bottom-0 right-0 border border-background rounded-full bg-background"
        />
      );
    case "follow":
      return (
        <Image
          width={24}
          height={24}
          alt="icon"
          src={"/assets/app-icons/notifications/followed.svg"}
          className="absolute size-4 sm:size-6 bottom-0 right-0 border border-background rounded-full bg-background"
        />
      );
    case "reply_like":
      return (
        <Image
          width={24}
          height={24}
          alt="icon"
          src={"/assets/app-icons/notifications/liked.svg"}
          className="absolute size-4 sm:size-6 bottom-0 right-0 border border-background rounded-full bg-background"
        />
      );
    case "reply_you":
      return (
        <Image
          width={24}
          height={24}
          alt="icon"
          src={"/assets/app-icons/notifications/replied.svg"}
          className="absolute size-4 sm:size-6 bottom-0 right-0 border border-background rounded-full bg-background"
        />
      );
    case "replied":
      return (
        <Image
          width={24}
          height={24}
          alt="icon"
          src={"/assets/app-icons/notifications/replied.svg"}
          className="absolute size-4 sm:size-6 bottom-0 right-0 border border-background rounded-full bg-background"
        />
      );
    case "recent_post":
      return (
        <Image
          width={24}
          height={24}
          alt="icon"
          src={"/assets/app-icons/notifications/posted.svg"}
          className="absolute size-4 sm:size-6 bottom-0 right-0 border border-background rounded-full bg-background"
        />
      );
    case "milestone":
      return (
        <Image
          width={24}
          height={24}
          alt="icon"
          src={"/assets/app-icons/notifications/milestone.svg"}
          className="absolute size-4 sm:size-6 bottom-0 right-0 border border-background rounded-full bg-background"
        />
      );
    case "news":
      return (
        <Image
          width={24}
          height={24}
          alt="icon"
          src={"/assets/app-icons/notifications/news.svg"}
          className="absolute size-4 sm:size-6 bottom-0 right-0 border border-background rounded-full bg-background"
        />
      );
    default:
      break;
  }
};

const AllNotificationCard = ({ type, data }: Props) => {
  const router = useRouter();

  const queryClient = useQueryClient();

  const following = useQuery({
    queryKey: ["following"],
    queryFn: getFollowing,
  });

  const followUser = useMutation({
    mutationKey: ["follow-user"],
    mutationFn: () => followUserQuery({ followerId: data.senderId }),
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
        (fData: any) => fData.followerId === data.senderId
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
      return item.followerId === data.senderId;
    });

    if (filteredArray.length) return true;
    return false;
  }, [
    following.isError,
    following.isSuccess,
    following.data?.data.data,
    data.senderId,
  ]);

  switch (type) {
    case "community_invite":
      return (
        <div className="border-b border-border flex items-start gap-3 py-5">
          <div className="size-[35px] sm:size-[45px] rounded-full relative">
            <Image
              src={data?.sender.usermeta.avatar ?? ""}
              alt="notification-image size rounded-full"
              layout="fill"
              objectFit="cover"
              className="w-full h-full rounded-full object-cover"
            />
            {getAsset(data.type ?? "")}
          </div>
          <div className="flex-1">
            <div className="flex justify-between text-sm sm:text-base gap-2 w-full ">
              <p className="flex-1 font-medium">
                {/* {data.invited_by}{" "}
                <span className="text-foreground/50 dark:text-foreground/60">
                  invited you to join a community
                </span>{" "}
                “{data.community_name}” */}
                {data.title}
              </p>
            </div>
          </div>
        </div>
      );
    case "liked_post":
      return (
        <div className="border-b border-border flex items-start gap-3 py-5">
          <div className="size-[35px] sm:size-[45px] rounded-full relative">
            <Image
              src={data?.sender.usermeta.avatar ?? ""}
              alt="notification-image size"
              layout="fill"
              objectFit="cover"
              className="w-full h-full rounded-full object-cover"
            />
            {getAsset(data.type ?? "")}
          </div>
          <div className="flex-1">
            <div className="flex justify-between text-sm sm:text-lg gap-2 w-full ">
              {/* <p className="flex-1 font-medium">
                {data.liked_by} liked your post
              </p>
              <p className="text-foreground/50 dark:text-foreground/60 text-sm sm:text-base">
                {customRelativeTime(data.created_at)}
              </p> */}
              {data.title}
            </div>
            <p className="mt-2 text-base sm:text-lg font-medium text-foreground/50 dark:text-foreground/60">
              {data.content}
            </p>
          </div>
        </div>
      );
    case "reply_like":
      return (
        <div className="border-b border-border flex items-start gap-3 py-5">
          <div className="size-[35px] sm:size-[45px] rounded-full relative">
            <Image
              src={data?.sender.usermeta.avatar ?? ""}
              alt="notification-image size"
              layout="fill"
              objectFit="cover"
              className="w-full h-full rounded-full object-cover"
            />
            {getAsset(data.type ?? "")}
          </div>
          <div className="flex-1">
            <div className="flex justify-between text-sm sm:text-lg gap-2 w-full ">
              {/* <p className="flex-1 font-medium">
                {data.liked_by} liked your reply
              </p>
              <p className="text-foreground/50 dark:text-foreground/60 text-sm sm:text-base">
                {customRelativeTime(data.created_at)}
              </p> */}
              {data.title}
            </div>
            <p className="mt-2 text-base sm:text-lg font-medium text-foreground/50 dark:text-foreground/60">
              {data.content}
            </p>
          </div>
        </div>
      );
    case "follow":
      return (
        <div className="border-b border-border flex items-start gap-3 py-5">
          <div className="size-[35px] sm:size-[45px] rounded-full relative">
            <Image
              src={data?.sender.usermeta.avatar ?? profileImageplaceholder}
              alt="notification-image size"
              layout="fill"
              objectFit="cover"
              className="w-full h-full rounded-full object-cover"
            />
            {getAsset(data.type ?? "")}
          </div>
          <div className="flex-1">
            <div className="flex justify-between text-sm sm:text-lg gap-2 w-full ">
              {/* <p className="flex-1 font-medium">
                {data.followed_by} followed you
              </p> */}
              <ContentText text={data.title} contentId={data.id} />
            </div>
            <div className="mt-2">
              {/* <Button className="bg-foreground text-background rounded-full font-medium h-8">
                Follow back
              </Button> */}
              <Button
                onClick={() => {
                  if (checkIfUserIsFollowed) {
                    // alert(checkIfUserIsFollowed);
                    unfollowUser.mutate();
                  } else {
                    // alert(checkIfUserIsFollowed);
                    followUser.mutate();
                  }
                }}
                disabled={followUser.isPending || unfollowUser.isPending}
                className={cn(
                  "flex-1 hover:bg-foreground/20 bg-background hover:scale-[1.01] transition-all hover:shadow-xl border hover:border-foreground hover:text-foreground border-foreground text-foreground rounded-full flex justify-center items-center h-7 px-10 w-[80px] max-w-[129px]",
                  checkIfUserIsFollowed && "bg-foreground text-background"
                )}
              >
                {followUser.isPending || unfollowUser.isPending ? (
                  <PageLoadingSpinner spinnerExtraClass="w-5 h-5" />
                ) : (
                  <span className="w-fit text-xs font-medium block p-0 align-middle">
                    {checkIfUserIsFollowed ? "Following" : "Follow back"}
                  </span>
                )}
              </Button>
            </div>
          </div>
        </div>
      );
    case "reply_you":
      return (
        <div className="border-b border-border flex items-start gap-3 py-5">
          <div className="size-[35px] sm:size-[45px] rounded-full relative">
            <Image
              src={data?.sender.usermeta.avatar ?? ""}
              alt="notification-image size"
              layout="fill"
              objectFit="cover"
              className="w-full h-full rounded-full object-cover"
            />

            {getAsset(data.type ?? "")}
          </div>
          <div className="flex-1">
            <div className="flex justify-between text-sm sm:text-lg gap-2 w-full ">
              <p className="flex-1 font-medium">
                {/* {data.replied_by} replied to you */}
                {data.title}
              </p>
              <p className="text-foreground/50 dark:text-foreground/60 text-base">
                {customRelativeTime(data.created_at)}
              </p>
            </div>
            <p className="mt-2 text-base sm:text-lg font-medium text-foreground/50 dark:text-foreground/60">
              {data.content}
            </p>
          </div>
        </div>
      );
    case "replied":
      return (
        <div className="border-b border-border flex items-start gap-3 py-5">
          <div className="size-[35px] sm:size-[45px] rounded-full relative">
            <Image
              src={data?.sender.usermeta.avatar ?? ""}
              layout="fill"
              objectFit="cover"
              className="w-full h-full rounded-full object-cover"
              alt="notification-image size"
            />

            {getAsset(data.type ?? "")}
          </div>
          <div className="flex-1">
            <div className="flex justify-between text-sm sm:text-lg gap-2 w-full ">
              <p className="flex-1 font-medium">
                {/* {data.liked_by} replied to your post */}
                {data.title}
              </p>
              <p className="text-foreground/50 dark:text-foreground/60 text-sm sm:text-base">
                {customRelativeTime(data.created_at)}
              </p>
            </div>
            <p className="mt-2 text-base sm:text-lg font-medium text-foreground/50 dark:text-foreground/60">
              {data.content}
            </p>
          </div>
        </div>
      );
    case "recent_post":
      return (
        <div className="border-b border-border flex items-start gap-3 py-5">
          <div className="size-[35px] sm:size-[45px] rounded-full relative">
            <Image
              src={data?.sender.usermeta.avatar ?? ""}
              alt="notification-image size"
              layout="fill"
              objectFit="cover"
              className="w-full h-full rounded-full object-cover"
            />

            {getAsset(data.type ?? "")}
          </div>
          <div className="flex-1">
            <div className="flex justify-between text-sm sm:text-lg gap-2 w-full ">
              <p className="flex-1 font-medium">
                {/* {data.posted_by} just posted */}
                {data.title}
              </p>
              <p className="text-foreground/50 dark:text-foreground/60 text-sm sm:text-base">
                {customRelativeTime(data.created_at)}
              </p>
            </div>
            <p className="mt-2 text-base sm:text-lg font-medium text-foreground/50 dark:text-foreground/60">
              {data.content}
            </p>
          </div>
        </div>
      );
    case "milestone":
      return (
        <div className="border-b border-border flex items-start gap-3 py-5">
          <div className="size-[35px] sm:size-[45px] rounded-full relative">
            <Image
              src={"/assets/app-icons/notifications/milestone.svg"}
              alt="notification-image size"
              layout="fill"
              objectFit="cover"
              className="w-full h-full rounded-full object-cover bg-background/5"
            />

            {getAsset(data.type ?? "")}
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-center gap-x-4 max-w-[280px]">
              <p className="mt-2 text-sm sm:text-lg font-medium line-clamp-2">
                {data.content}
              </p>
            </div>
          </div>
        </div>
      );
    case "news":
      return (
        <div className="border-b border-border flex items-start gap-3 py-5">
          <div className="size-[35px] sm:size-[45px] rounded-lg overflow-hidden relative">
            <Image
              src={data?.sender.usermeta.avatar ?? ""}
              alt="notification-image w-full h-full object-cover"
              layout="fill"
              objectFit="cover"
              className="w-full h-full rounded-full object-cover"
            />
            {getAsset(data.type ?? "")}
          </div>
          <div className="flex-1">
            <div className="flex justify-between text-foreground/50 dark:text-foreground/60 gap-2 w-full ">
              <p className="flex-1 font-medium text-xs sm:text-sm">
                {data.title}
              </p>
            </div>
            <div className="flex justify-between items-start gap-x-4 mt-2">
              <p className="text-base sm:text-lg font-medium line-clamp-2">
                {data.content}
              </p>

              <p className="text-foreground/50 dark:text-foreground/60 whitespace-nowrap text-sm sm:text-base">
                {customRelativeTime(data.created_at)}
              </p>
            </div>
          </div>
        </div>
      );
    case "livescore":
      return (
        // <div className="border-b border-border flex items-start gap-3 py-5 pb-4">
        //   <div className="size-[35px] sm:size-[45px] rounded-lg relative">
        //     {data.images && data.images.length ? (
        //       <div className="w-full h-full relative">
        //         <Image
        //           src={data.images[0]}
        //           width={32}
        //           height={32}
        //           alt="notification-image"
        //           className="size-6 sm:size-8 absolute left-0 top-0 rounded-full border border-background"
        //         />
        //         <Image
        //           src={data.images[1]}
        //           width={32}
        //           height={32}
        //           alt="notification-image"
        //           className="absolute right-0 bottom-0 rounded-full dark:border dark:bg-white dark:border-background"
        //         />
        //       </div>
        //     ) : (
        //       <IoMdNotifications />
        //     )}
        //   </div>
        //   <div className="flex-1">
        //     <div className="flex justify-between text-foreground/60 gap-2 w-full">
        //       <p className="flex-1 font-medium">{data.title}</p>
        //     </div>
        //     <p className="text-base sm:text-lg font-medium">{data.body}</p>
        //     {Boolean(data.extra) && (
        //       <p className="text-sm sm:text-lg font-normal text-foreground/60">
        //         {data.extra}
        //       </p>
        //     )}
        //   </div>
        // </div>
        <></>
      );
    default:
      break;
  }
};

export default AllNotificationCard;
