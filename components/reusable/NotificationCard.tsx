import Image from "next/image";
import { IoMdNotifications } from "react-icons/io";

type Props = {
  type: string;
  data: {
    title: string;
    category: string;
    created_at: string;
    body: string;
    image?: string;
    type: string;
    images?: string[];
    extra?: string;
  };
};

const NotificationCard = ({ type, data }: Props) => {
  switch (type) {
    case "news":
      return (
        <div className="border-b border-border flex items-start gap-3 py-5">
          <div className="size-[35px] sm:size-[45px] rounded-lg overflow-hidden">
            <Image
              src={data?.image ?? ""}
              width={45}
              height={45}
              alt="notification-image size"
              className="size-9 sm:size-[45px]"
            />
          </div>
          <div className="flex-1">
            <div className="flex justify-between text-foreground/60 gap-2 w-full ">
              <p className="flex-1 line-clamp-1 text-ellipsis font-medium text-sm sm:text-base">
                {data.title} • {data.category}
              </p>
              <p className="text-sm sm:text-base">{data.created_at}</p>
            </div>
            <p className="mt-2 text-base sm:text-lg font-medium">{data.body}</p>
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
                  className="size-6 sm:size-8 absolute right-0 bottom-0 rounded-full dark:border dark:bg-white dark:border-background"
                />
              </div>
            ) : (
              <IoMdNotifications />
            )}
          </div>
          <div className="flex-1">
            <div className="flex justify-between text-foreground/60 gap-2 w-full ">
              <p className="flex-1 line-clamp-1 text-ellipsis font-medium text-sm sm:text-base">
                {data.title}
              </p>
            </div>
            <p className="text-base sm:text-lg font-medium">{data.body}</p>
            {Boolean(data.extra) && (
              <p className="text-base sm:text-lg font-normal text-foreground/60">
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

export default NotificationCard;
