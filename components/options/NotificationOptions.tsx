"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { MoreVertical } from "lucide-react";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import Image from "next/image";
import { NotificationMeta } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  deleteNotificationQuery,
  markAllAsReadQuery,
} from "@/services/api/notification";
import toast from "react-hot-toast";
import SuccessToast from "../reusable/toasts/SuccessToast";
import ErrorToast from "../reusable/toasts/ErrorToast";

type Props = {
  notification: NotificationMeta;
};

const NotificationOptions = ({ notification }: Props) => {
  const queryClient = useQueryClient();

  const markAsRead = useMutation({
    mutationKey: ["mark as read"],
    mutationFn: (id: number) => markAllAsReadQuery([id]),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["get-infinite-notifications"],
      });
      toast.custom((t) => (
        <SuccessToast t={t} message="Notification marked as read" />
      ));
    },
    onError: () => {
      toast.custom((t) => (
        <ErrorToast t={t} message="Unable to mark notification as read." />
      ));
    },
  });

  const deleteNotification = useMutation({
    mutationKey: ["delete notification"],
    mutationFn: (id: number) => deleteNotificationQuery(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["get-infinite-notifications"],
      });
      toast.custom((t) => (
        <SuccessToast t={t} message="Notification deleted successfully" />
      ));
    },
    onError: () => {
      toast.custom((t) => (
        <ErrorToast t={t} message="Unable to delete notification" />
      ));
    },
  });

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
          className="text-colorGrey/70 translate-x-3 cursor-pointer"
          role="button"
        />
        {/* </Button> */}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="w-[clamp(240px,80%,280px)] md:w-[280px] lg:w-[280px] absolute -translate-x-[105%] top-0 bg-background border-border"
      >
        <DropdownMenuGroup
          onClick={(e) => {
            e.stopPropagation();
          }}
          className=""
        >
          {notification.status === "unread" && (
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation();
                markAsRead.mutate(notification.id);
              }}
              className="flex p-2 sm:p-4 text-sm sm:text-base text-foreground font-semibold data-[highlighted]:text-foreground hover:outline-none hover:bg-foreground/10 rounded-md cursor-pointer"
            >
              <Image
                width={24}
                height={24}
                className="size-5 sm:size-[24px] mr-4 object-cover"
                alt="icon"
                src={"/assets/post-icons/edit-post.svg"}
              />
              <span>Mark as read</span>
            </DropdownMenuItem>
          )}

          <DropdownMenuItem
            onClick={(e) => {
              e.stopPropagation();
              deleteNotification.mutate(notification.id);
            }}
            className="flex p-2 sm:p-4 text-sm sm:text-base text-foreground font-semibold data-[highlighted]:text-foreground hover:outline-none hover:bg-foreground/10 rounded-md cursor-pointer"
          >
            <Image
              width={30}
              height={30}
              className="size-5 sm:size-[24px] mr-4 object-cover"
              alt="icon"
              src={"/assets/post-icons/delete-post.svg"}
            />
            <span>Delete notification</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationOptions;
