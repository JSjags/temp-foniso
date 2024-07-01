import { cn, formatConversationCreatedAt } from "@/lib/utils";
import { DummyConversation } from "@/types";
import { ImageIcon, MoreVertical } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { Button } from "../ui/button";
import { useQuery } from "@tanstack/react-query";
import { profileImageplaceholder } from "@/constants";
import UserPostOptions from "../post/UserPostOptions";
import ConversationOptions from "./ConversationOptions";

type Props = {
  conversation: DummyConversation;
  refetchConversations: () => void;
  refetchMessages: boolean;
  setRefetchMessages: React.Dispatch<React.SetStateAction<boolean>>;
};

const ChatHeader = ({
  conversation,
  refetchConversations,
  setRefetchMessages,
  refetchMessages,
}: Props) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const receiverId = searchParams.get("cid");

  return (
    <div className="flex gap-x-6 justify-between items-center w-full sticky top-0">
      <div
        className="flex gap-x-2 cursor-pointer hover:bg-foreground/10 p-2"
        onClick={() =>
          router.push(`/message?tab=conversation&cid=${conversation.id}`)
        }
      >
        <div className="size-[32px] sm:size-[40px] bg-foreground/10 rounded-full relative">
          <Image
            alt="profile image"
            layout="fill"
            objectFit="cover"
            className="rounded-full object-cover"
            src={
              searchParams.get("avatar") === "null"
                ? profileImageplaceholder
                : searchParams.get("avatar")!
            }
          />
        </div>
        <div className="flex flex-col flex-1 justify-center">
          <div className="flex flex-1 justify-between items-center">
            <div className="font-bold text-lg flex-1 leading-6 line-clamp-1">
              {searchParams.get("name")?.split("+").join(" ")}
            </div>
          </div>
        </div>
      </div>
      <Button variant={"ghost"} className="p-0 hover:bg-transparent">
        <ConversationOptions
          id={receiverId!}
          refetchConversations={refetchConversations}
          setRefetchMessages={setRefetchMessages}
          refetchMessages={refetchMessages}
        />
      </Button>
    </div>
  );
};

export default ChatHeader;
