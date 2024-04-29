import Image from "next/image";
import { IoMdNotifications } from "react-icons/io";
import { Button } from "../ui/button";

type Props = {
  type: string;
  data: {
    title?: string;
    category?: string;
    created_at?: string;
    body?: string;
    image?: string;
    type?: string;
    images?: string[];
    liked_by?: string;
    posted_by?: string;
    followed_by?: string;
    replied_by?: string;
    invited_by?: string;
    community_name?: string;
    extra?: string;
  };
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
  switch (type) {
    case "community_invite":
      return (
        <div className="border-b border-border flex items-start gap-3 py-5">
          <div className="size-[35px] sm:size-[45px] rounded-full relative">
            <Image
              src={data?.image ?? ""}
              width={45}
              height={45}
              alt="notification-image size rounded-full"
            />
            {getAsset(data.type ?? "")}
          </div>
          <div className="flex-1">
            <div className="flex justify-between text-sm sm:text-base gap-2 w-full ">
              <p className="flex-1 font-medium">
                {data.invited_by}{" "}
                <span className="text-foreground/50 dark:text-foreground/60">
                  invited you to join a community
                </span>{" "}
                “{data.community_name}”
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
              src={data?.image ?? ""}
              width={45}
              height={45}
              alt="notification-image size"
              className="rounded-full"
            />
            {getAsset(data.type ?? "")}
          </div>
          <div className="flex-1">
            <div className="flex justify-between text-sm sm:text-lg gap-2 w-full ">
              <p className="flex-1 font-medium">
                {data.liked_by} liked your post
              </p>
              <p className="text-foreground/50 dark:text-foreground/60 text-sm sm:text-base">
                {data.created_at}
              </p>
            </div>
            <p className="mt-2 text-base sm:text-lg font-medium text-foreground/50 dark:text-foreground/60">
              {data.body}
            </p>
          </div>
        </div>
      );
    case "reply_like":
      return (
        <div className="border-b border-border flex items-start gap-3 py-5">
          <div className="size-[35px] sm:size-[45px] rounded-full relative">
            <Image
              src={data?.image ?? ""}
              width={45}
              height={45}
              alt="notification-image size"
              className="rounded-full"
            />
            {getAsset(data.type ?? "")}
          </div>
          <div className="flex-1">
            <div className="flex justify-between text-sm sm:text-lg gap-2 w-full ">
              <p className="flex-1 font-medium">
                {data.liked_by} liked your reply
              </p>
              <p className="text-foreground/50 dark:text-foreground/60 text-sm sm:text-base">
                {data.created_at}
              </p>
            </div>
            <p className="mt-2 text-base sm:text-lg font-medium text-foreground/50 dark:text-foreground/60">
              {data.body}
            </p>
          </div>
        </div>
      );
    case "follow":
      return (
        <div className="border-b border-border flex items-start gap-3 py-5">
          <div className="size-[35px] sm:size-[45px] rounded-full relative">
            <Image
              src={data?.image ?? ""}
              width={45}
              height={45}
              alt="notification-image size"
              className="rounded-full"
            />
            {getAsset(data.type ?? "")}
          </div>
          <div className="flex-1">
            <div className="flex justify-between text-sm sm:text-lg gap-2 w-full ">
              <p className="flex-1 font-medium">
                {data.followed_by} followed you
              </p>
            </div>
            <div className="mt-2">
              <Button className="bg-foreground text-background rounded-full font-medium h-8">
                Follow back
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
              src={data?.image ?? ""}
              width={45}
              height={45}
              alt="notification-image size"
              className="rounded-full"
            />

            {getAsset(data.type ?? "")}
          </div>
          <div className="flex-1">
            <div className="flex justify-between text-sm sm:text-lg gap-2 w-full ">
              <p className="flex-1 font-medium">
                {data.replied_by} replied to you
              </p>
              <p className="text-foreground/50 dark:text-foreground/60 text-base">
                {data.created_at}
              </p>
            </div>
            <p className="mt-2 text-base sm:text-lg font-medium text-foreground/50 dark:text-foreground/60">
              {data.body}
            </p>
          </div>
        </div>
      );
    case "replied":
      return (
        <div className="border-b border-border flex items-start gap-3 py-5">
          <div className="size-[35px] sm:size-[45px] rounded-full relative">
            <Image
              src={data?.image ?? ""}
              width={45}
              height={45}
              alt="notification-image size"
              className="rounded-full"
            />

            {getAsset(data.type ?? "")}
          </div>
          <div className="flex-1">
            <div className="flex justify-between text-sm sm:text-lg gap-2 w-full ">
              <p className="flex-1 font-medium">
                {data.liked_by} replied to your post
              </p>
              <p className="text-foreground/50 dark:text-foreground/60 text-sm sm:text-base">
                {data.created_at}
              </p>
            </div>
            <p className="mt-2 text-base sm:text-lg font-medium text-foreground/50 dark:text-foreground/60">
              {data.body}
            </p>
          </div>
        </div>
      );
    case "recent_post":
      return (
        <div className="border-b border-border flex items-start gap-3 py-5">
          <div className="size-[35px] sm:size-[45px] rounded-full relative">
            <Image
              src={data?.image ?? ""}
              width={45}
              height={45}
              alt="notification-image size"
              className="rounded-full"
            />

            {getAsset(data.type ?? "")}
          </div>
          <div className="flex-1">
            <div className="flex justify-between text-sm sm:text-lg gap-2 w-full ">
              <p className="flex-1 font-medium">{data.posted_by} just posted</p>
              <p className="text-foreground/50 dark:text-foreground/60 text-sm sm:text-base">
                {data.created_at}
              </p>
            </div>
            <p className="mt-2 text-base sm:text-lg font-medium text-foreground/50 dark:text-foreground/60">
              {data.body}
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
              width={45}
              height={45}
              alt="notification-image size"
              className="rounded-full bg-background/5"
            />

            {getAsset(data.type ?? "")}
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-center gap-x-4 max-w-[280px]">
              <p className="mt-2 text-sm sm:text-lg font-medium line-clamp-2">
                {data.body}
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
              src={data?.image ?? ""}
              width={45}
              height={45}
              objectFit="cover"
              alt="notification-image w-full h-full object-cover"
              className="rounded-lg"
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
                {data.body}
              </p>

              <p className="text-foreground/50 dark:text-foreground/60 whitespace-nowrap text-sm sm:text-base">
                {data.created_at}
              </p>
            </div>
          </div>
        </div>
      );
    case "livescore":
      return (
        <div className="border-b border-border flex items-start gap-3 py-5 pb-4">
          <div className="size-[35px] sm:size-[45px] rounded-lg relative">
            {data.images && data.images.length ? (
              <div className="w-full h-full relative">
                <Image
                  src={data.images[0]}
                  width={32}
                  height={32}
                  alt="notification-image"
                  className="size-6 sm:size-8 absolute left-0 top-0 rounded-full border border-background"
                />
                <Image
                  src={data.images[1]}
                  width={32}
                  height={32}
                  alt="notification-image"
                  className="absolute right-0 bottom-0 rounded-full dark:border dark:bg-white dark:border-background"
                />
              </div>
            ) : (
              <IoMdNotifications />
            )}
          </div>
          <div className="flex-1">
            <div className="flex justify-between text-foreground/60 gap-2 w-full">
              <p className="flex-1 font-medium">{data.title}</p>
            </div>
            <p className="text-base sm:text-lg font-medium">{data.body}</p>
            {Boolean(data.extra) && (
              <p className="text-sm sm:text-lg font-normal text-foreground/60">
                {data.extra}
              </p>
            )}
          </div>
        </div>
      );
    default:
      break;
  }
};

export default AllNotificationCard;
