"use client";

import AllNotificationCard from "@/components/reusable/AllNotificationCard";
import Loading from "@/components/reusable/Loading";
import NotificationCard from "@/components/reusable/NotificationCard";
import NotificationEmptyState from "@/components/reusable/NotificationEmptyState";
import SubTabs from "@/components/reusable/SubTabs";
import ErrorToast from "@/components/reusable/toasts/ErrorToast";
import SuccessToast from "@/components/reusable/toasts/SuccessToast";
import RightSideBar from "@/components/RightSideBar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
} from "@/components/ui/dialog";
import {
  allNotification,
  livescoreNotification,
  notificationTabs,
  placeholderNewsNotification,
} from "@/constants";
import { cn } from "@/lib/utils";
import {
  getNotifications,
  markAllAsReadQuery,
} from "@/services/api/notification";
import { NotificationMeta } from "@/types";
import { DialogContent, DialogTitle } from "@radix-ui/react-dialog";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { Settings, X } from "lucide-react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Fragment, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IoMdDoneAll } from "react-icons/io";
import { useInView } from "react-intersection-observer";

type Props = {};

const Page = (props: Props) => {
  const queryClient = useQueryClient();
  const [showPushNotificationDialog, setShowPushNotificationDialog] =
    useState(false);
  const searchParams = useSearchParams();

  const { ref, inView } = useInView();

  const notifications = useInfiniteQuery({
    queryKey: ["get-infinite-notifications"],
    queryFn: getNotifications,
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages, lastPageParam, allPageParams) => {
      console.log(lastPage, allPages, lastPageParam, allPageParams);
      if (lastPage.length === 0) {
        return undefined;
      }
      return lastPageParam + 1;
    },
  });

  useEffect(() => {
    if (inView) {
      notifications.fetchNextPage();
    }
  }, [notifications.fetchNextPage, inView]);

  // const notifications = useQuery({
  //   queryKey: ["get-notifications"],
  //   queryFn: () => getNotifications(),
  // });

  const markAllAsRead = useMutation({
    mutationKey: ["mark-all-as-read"],
    mutationFn: (arr: number[]) => {
      return markAllAsReadQuery(arr);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["get-infinite-notifications"],
      });
      toast.custom((t) => (
        <SuccessToast
          t={t}
          message="All notifications marked as read successfully."
        />
      ));
    },
    onError: () => {
      toast.custom((t) => (
        <ErrorToast t={t} message="Unable to mark all notifications as read." />
      ));
    },
  });

  // console.log(notifications.data?.data.data.items);

  const tab = searchParams.get("tab");

  const identifyTab = () => {
    switch (tab) {
      case null:
        return (
          // <NotificationEmptyState message="You haven’t gotten any notification yet" />
          <div className="">
            {notifications.isSuccess &&
              notifications.data?.pages.map((group, i) => (
                <Fragment key={i}>
                  {group.data.data.items.map(
                    (notification: NotificationMeta, i: number) => (
                      <div
                        className={cn(
                          notification.status === "unread" &&
                            "bg-colorPrimary/25"
                        )}
                      >
                        <AllNotificationCard
                          key={i}
                          data={notification}
                          type={notification.type}
                        />
                      </div>
                    )
                  )}
                </Fragment>
              ))}

            {/* (notifications.data?.data.data.items as NotificationMeta[]).map(
                (notification, i) => (
                  <AllNotificationCard
                    key={i}
                    data={notification}
                    type={notification.type}
                  />
                )
              )} */}
          </div>
        );
      case "all":
        return (
          // <NotificationEmptyState message="You haven’t gotten any notification yet" />
          <div className="px-5">
            {/* {notifications.isSuccess &&
              Boolean(notifications.data?.data.data.items.length) &&
              (notifications.data?.data.data.items as NotificationMeta[]).map(
                (notification, i) => (
                  <AllNotificationCard
                    key={i}
                    data={notification as NotificationMeta}
                    type={notification.type}
                  />
                )
              )} */}
            {notifications.isSuccess &&
              notifications.data?.pages.map((group, i) => (
                <Fragment key={i}>
                  {group.data.data.items.map(
                    (notification: NotificationMeta, i: number) => (
                      <AllNotificationCard
                        key={i}
                        data={notification}
                        type={notification.type}
                      />
                    )
                  )}
                </Fragment>
              ))}
          </div>
        );
      case "news":
        return (
          <div className="px-5">
            {/* {placeholderNewsNotification.map((news, i) => (
              <NotificationCard key={i} data={news} type={news.type} />
            ))} */}
            {notifications.isSuccess &&
              notifications.data?.pages.map((group, i) => (
                <Fragment key={i}>
                  {group.data.data.items.map(
                    (notification: NotificationMeta, i: number) => (
                      <div
                        className={cn(
                          notification.status === "unread" &&
                            "bg-colorPrimary/25"
                        )}
                      >
                        <AllNotificationCard
                          key={i}
                          data={notification}
                          type={notification.type}
                        />
                      </div>
                    )
                  )}
                </Fragment>
              ))}
          </div>
        );
      case "livescore":
        return (
          <div className="px-5">
            {livescoreNotification.map((livescore, i) => (
              <NotificationCard
                key={i}
                data={livescore}
                type={livescore.type}
              />
            ))}
          </div>
        );
      case "default":
        return (
          // <NotificationEmptyState message="You have no notifications for this tab" />

          // <NotificationEmptyState message="You haven’t gotten any notification yet" />
          <div className="px-5">
            {notifications.isSuccess &&
              notifications.data?.pages.map((group, i) => (
                <Fragment key={i}>
                  {group.data.data.items.map(
                    (notification: NotificationMeta, i: number) => (
                      <div
                        className={cn(
                          notification.status === "unread" &&
                            "bg-colorPrimary/25"
                        )}
                      >
                        <AllNotificationCard
                          key={i}
                          data={notification}
                          type={notification.type}
                        />
                      </div>
                    )
                  )}
                </Fragment>
              ))}
          </div>
        );
    }
  };

  const handleMarkAllAsRead = () => {
    let arr: number[] = [];
    notifications.data?.pages.forEach((p) => {
      console.log(p);
      arr = [...arr, p.data?.data.items.map((item: { id: number }) => item.id)];
    });

    markAllAsRead.mutate(arr);
  };

  return (
    <div className="flex gap-0 min-[480px]:gap-2">
      <div className="min-h-screen bg-background relative w-full flex-1">
        {/* Push notification dialog */}
        <Dialog
          open={showPushNotificationDialog}
          onOpenChange={() => setShowPushNotificationDialog(false)}
        >
          <DialogOverlay className="flex justify-center items-center">
            <DialogContent className="relative w-[95%] max-w-[494px] p-5 bg-gradient-to-b from-[#0E2017] via-[#0C1E15] to-[#01160C] border-border rounded-3xl">
              <div className="w-[60%] pointer-events-none max-w-[339px] h-[50%] max-h-[288px] bg-[#164F34] absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-0 rounded-full blur-[70px]" />
              <div className="w-full mx-auto relative z-10">
                <DialogHeader>
                  <DialogTitle className="text-xl sm:text-2xl py-3 font-bold text-foreground mt-0">
                    <p className="text-center max-w-[409px] mx-auto mt-2 sm:px-10">
                      Allow push notification
                    </p>
                  </DialogTitle>
                  <DialogDescription className="mt-2 sm:text-lg text-foreground/60 px-2 mb-6 sm:mb-6">
                    <div className="flex justify-center max-w-[409px] mx-auto pb-4">
                      <p className="text-center text-foreground/80 mx-auto mt-2 sm:px-4">
                        Enable push notifications to get instant news,
                        livescores and post engagement reminders.
                      </p>
                    </div>
                    <div className="mt-6">
                      <div className="flex flex-col items-center gap-y-6">
                        <Image
                          src={"/assets/push-notification-left.svg"}
                          alt="push notification"
                          width={255}
                          height={101}
                          className="-translate-x-[10%] rounded-lg bg-background/60"
                        />
                        <Image
                          src={"/assets/push-notification-right.svg"}
                          alt="push notification"
                          width={255}
                          height={101}
                          className="translate-x-[10%] rounded-lg bg-background/60"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col font-bold items-center gap-y-6 my-6 mb-0">
                      <Button
                        onClick={() => setShowPushNotificationDialog(false)}
                        className="bg-white font-bold h-12 text-textDark hover:scale-[1.01] transition-all w-full rounded-full md:min-w-[454px]"
                      >
                        Allow
                      </Button>
                      <Button
                        onClick={() => setShowPushNotificationDialog(false)}
                        variant={"outline"}
                        className="hover:bg-white border-white h-12 font-bold bg-transparent text-foreground/70 hover:text-foreground w-full rounded-full md:min-w-[454px]"
                      >
                        Maybe later
                      </Button>
                    </div>
                  </DialogDescription>
                </DialogHeader>
              </div>
              <DialogClose
                asChild={true}
                onClick={() => setShowPushNotificationDialog(false)}
                className="group size-[25px] sm:size-[35px] rounded-full absolute right-4 top-4 z-50 cursor-pointer hover:bg-white bg-gray-700 p-1 w-fit h-fit border-none hover:text-darkGrey"
              >
                <X className="text-sm sm:text-base text-foreground group-hover:text-darkGrey" />
              </DialogClose>
            </DialogContent>
          </DialogOverlay>
        </Dialog>
        {/* Page header */}
        <div className="pt-5 pb-0 sticky top-0 bg-background z-10">
          <div className="flex justify-between items-center px-5">
            <p className="text-foreground font-bold text-xl sm:text-2xl">
              Notification
            </p>
            <div className="flex gap-x-3 items-center justify-between text-sm">
              <div
                role="button"
                onClick={handleMarkAllAsRead}
                className="flex gap-x-1 items-center justify-center cursor-pointer group"
              >
                <p className="text-foreground group-hover:text-colorPrimary">
                  Mark all as read
                </p>
                <IoMdDoneAll className="group-hover:text-colorPrimary" />
              </div>
              <Settings
                className="text-foreground cursor-pointer"
                role="button"
                onClick={() => setShowPushNotificationDialog(true)}
              />
            </div>
          </div>
          <div className="border-b border-border mt-6 px-5">
            {/* <SubTabs tabs={notificationTabs} /> */}
          </div>
        </div>
        {/* Notifications section */}
        <div>
          <div className="">{identifyTab()}</div>
          <div ref={ref} className="bg-background h-10">
            {notifications.isFetchingNextPage && (
              <Loading
                isLoading={notifications.isFetchingNextPage}
                className="w-full min-h-10 pb-5"
              />
            )}
          </div>
        </div>
      </div>
      <RightSideBar
        className={
          "min-w-[200px] w-[40%] max-w-[480px] gap-0 min-[480px]:gap-2"
        }
      />
    </div>
  );
};

export default Page;
