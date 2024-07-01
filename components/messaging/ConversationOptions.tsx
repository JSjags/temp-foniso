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
import { BellOffIcon, MoreVertical, SquareX, Trash2 } from "lucide-react";
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
import {
  Credenza,
  CredenzaBody,
  CredenzaContent,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaTrigger,
} from "../ui/credenza";
import { Button } from "../ui/button";

type Props = {
  id: string;
  refetchConversations: () => void;
  refetchMessages: boolean;
  setRefetchMessages: React.Dispatch<React.SetStateAction<boolean>>;
};

const ConversationOptions = ({
  id,
  refetchConversations,
  setRefetchMessages,
}: Props) => {
  const searchParams = useSearchParams();
  const [showDeleteConversationModal, setShowDeleteConversationModal] =
    useState(false);
  const [showMuteConversationModal, setShowMuteConversationModal] =
    useState(false);
  const [showBlockUserModal, setShowBlockUserModal] = useState(false);

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
        refetchConversations();
        setRefetchMessages(true);
        setShowDeleteConversationModal(false);
        toast.custom(
          (t) => <SuccessToast t={t} message="Conversation deleted" />,
          { id: "conversation-deleted" }
        );
      }
    }
  };

  const handleBlock = async () => {
    setShowBlockUserModal(false);
    // if (isConnected) {
    //   const res = await socketService.deleteConversation(convoId!);

    //   if (res === "message deleted") {
    //     toast.custom(
    //       (t) => <SuccessToast t={t} message="Conversation deleted" />,
    //       { id: "conversation-deleted" }
    //     );
    //   }
    // }
  };

  return (
    <>
      {/* Delete conversation modal */}
      <Credenza
        open={showDeleteConversationModal}
        onOpenChange={setShowDeleteConversationModal}
      >
        <CredenzaContent className="">
          <CredenzaHeader>
            <CredenzaTitle className="text-lg sm:text-xl text-center">
              Delete Conversation?
            </CredenzaTitle>
          </CredenzaHeader>
          <CredenzaBody className="pb-10 sm:pb-0">
            <p className="text-center text-foreground/60 font-normal">
              All messages with this user will be deleted and cannot be
              retrieved back
            </p>
            <div className="mt-6 flex flex-col gap-4">
              <Button
                variant={"ghost"}
                onClick={handleDelete}
                className="bg-red-400 hover:bg-red-500 !text-white font-bold rounded-full w-full"
              >
                Delete
              </Button>
              <Button
                variant={"ghost"}
                onClick={() => setShowDeleteConversationModal(false)}
                className="bg-transparent hover:bg-foreground/20 border border-foreground !text-white font-bold rounded-full w-full"
              >
                Cancel
              </Button>
            </div>
          </CredenzaBody>
        </CredenzaContent>
      </Credenza>
      {/* Block user */}
      <Credenza open={showBlockUserModal} onOpenChange={setShowBlockUserModal}>
        <CredenzaContent className="">
          <CredenzaHeader>
            <div className="relative size-14 sm:size-20 rounded-full bg-foreground/20 mx-auto">
              <Image
                alt="profile image"
                layout="fill"
                objectFit="cover"
                className="rounded-full object-cover"
                src={
                  searchParams.get("avatar") ?? "/assets/placeholder-person.png"
                }
              />
            </div>
            <CredenzaTitle className="text-lg sm:text-xl text-center">
              Block @{searchParams.get("username")} ?
            </CredenzaTitle>
          </CredenzaHeader>
          <CredenzaBody className="pb-10 sm:pb-0">
            <p className="text-center text-foreground/60 font-normal">
              They won’t be able to message you or see your profile on Foniso
            </p>
            <div className="mt-6 flex flex-col gap-4">
              <Button
                variant={"ghost"}
                onClick={handleBlock}
                className="bg-red-400 hover:bg-red-500 !text-white font-bold rounded-full w-full"
              >
                Block
              </Button>
              <Button
                variant={"ghost"}
                onClick={() => setShowBlockUserModal(false)}
                className="bg-transparent hover:bg-foreground/20 border border-foreground !text-white font-bold rounded-full w-full"
              >
                Cancel
              </Button>
            </div>
          </CredenzaBody>
        </CredenzaContent>
      </Credenza>
      {/* mute conversation */}
      <Credenza
        open={showMuteConversationModal}
        onOpenChange={setShowMuteConversationModal}
      >
        <CredenzaContent className="">
          <CredenzaHeader>
            {/* <div className="relative size-14 sm:size-20 rounded-full bg-foreground/20 mx-auto">
              <Image
                alt="profile image"
                layout="fill"
                objectFit="cover"
                className="rounded-full object-cover"
                src={
                  searchParams.get("avatar") ?? "/assets/placeholder-person.png"
                }
              />
            </div> */}
            <CredenzaTitle className="text-lg sm:text-xl text-center">
              Mute Conversation?
            </CredenzaTitle>
          </CredenzaHeader>
          <CredenzaBody className="pb-10 sm:pb-0">
            <p className="text-center text-foreground/60 font-normal">
              They won’t be able to message you or see your profile on Foniso
            </p>
            <div className="mt-6 flex flex-col gap-4">
              <Button
                variant={"ghost"}
                onClick={handleBlock}
                className="bg-yellow-400 hover:bg-yellow-500 !text-white font-bold rounded-full w-full"
              >
                Mute
              </Button>
              <Button
                variant={"ghost"}
                onClick={() => setShowBlockUserModal(false)}
                className="bg-transparent hover:bg-foreground/20 border border-foreground !text-white font-bold rounded-full w-full"
              >
                Cancel
              </Button>
            </div>
          </CredenzaBody>
        </CredenzaContent>
      </Credenza>

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
          <MoreVertical
            className="text-colorGrey translate-x-3 cursor-pointer"
            role="button"
          />
          {/* </Button> */}
        </DropdownMenuTrigger>
        <DropdownMenuContent
          onClick={(e) => {
            // e.stopPropagation();
            // handleDelete();
          }}
          className="w-[240px] absolute -translate-x-[105%] top-0 bg-background border-border"
        >
          <DropdownMenuGroup
            onClick={(e) => {
              //   e.stopPropagation();
            }}
            className=""
          >
            <DropdownMenuItem
              onClick={(e) => {
                setShowMuteConversationModal(true);
              }}
              className="cursor-pointer flex items-center gap-x-2 p-2 text-sm h-8 text-foreground font-semibold data-[highlighted]:text-foreground"
            >
              <BellOffIcon className="size-5" />
              <span>Mute Conversation</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={(e) => {
                setShowBlockUserModal(true);
              }}
              className="cursor-pointer flex items-center gap-x-2 p-2 text-sm h-8 text-foreground font-semibold data-[highlighted]:text-foreground"
            >
              <SquareX className="size-5" />
              <span>Block User</span>
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={(e) => {
                setShowDeleteConversationModal(true);
              }}
              className="cursor-pointer flex items-center gap-x-2 p-2 text-sm h-8 text-foreground font-semibold data-[highlighted]:text-white data-[highlighted]:bg-red-500 text-red-500"
            >
              <Trash2 className="size-5" />
              <span>Delete Conversation</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default ConversationOptions;
