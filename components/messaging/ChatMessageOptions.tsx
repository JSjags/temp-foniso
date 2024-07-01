import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { ChevronDown, MoreVertical } from "lucide-react";
import Image from "next/image";
import DeletePostModal from "../Modal/DeletePostModal";
import { PostMeta } from "@/types";
import { useUserContext } from "@/context/UserContext";
import { postReplyOptions } from "@/constants";
import { cn } from "@/lib/utils";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePostQuery } from "@/services/api/userService";
import toast from "react-hot-toast";
import SuccessToast from "../reusable/toasts/SuccessToast";
import ErrorToast from "../reusable/toasts/ErrorToast";
import { useSocket } from "@/context/SocketContext";
import { useSearchParams } from "next/navigation";

type Props = { id: string };

const ChatMessageOptions = ({ id }: Props) => {
  const searchParams = useSearchParams();

  const [viewPortWidth, setViewPortWidth] = useState(window.innerWidth);
  const { socketService, isConnected } = useSocket();

  useEffect(() => {
    window.addEventListener("resize", () => {
      setViewPortWidth(window.innerWidth);
    });

    return () => {
      window.addEventListener("resize", () => {
        setViewPortWidth(window.innerWidth);
      });
    };
  }, []);

  const convoId = searchParams.get("conversationId");
  console.log(convoId);

  const handleDelete = async () => {
    if (isConnected) {
      const res = await socketService.deleteConversation(convoId!);

      if (res === "message deleted") {
        toast.custom(
          (t) => <SuccessToast t={t} message="Conversation deleted" />,
          { id: "conversation-deleted" }
        );
      }
    }
  };

  return (
    <>
      <DropdownMenu modal={true}>
        <DropdownMenuTrigger
          asChild
          onClick={(e) => {
            // e.stopPropagation();
          }}
        >
          {/* <Button
                variant={"ghost"}
                className="p-0 outline:none outline-none ring-0 hover:bg-transparent"
              > */}
          <ChevronDown
            className="text-colorGrey cursor-pointer"
            role="button"
          />
          {/* </Button> */}
        </DropdownMenuTrigger>
        <DropdownMenuContent
          onClick={(e) => {
            // e.stopPropagation();
            handleDelete();
          }}
          className="w-[200px] absolute -translate-x-[105%] top-0 bg-background border-border"
        >
          <DropdownMenuGroup
            onClick={(e) => {
              //   e.stopPropagation();
            }}
            className=""
          >
            <DropdownMenuItem
              onClick={(e) => {
                // e.stopPropagation();
              }}
              className="p-2 sm:p-4 text-sm h-8 text-foreground font-semibold data-[highlighted]:text-foreground"
            >
              <span>Delete Conversation</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default ChatMessageOptions;
