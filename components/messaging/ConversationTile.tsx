import { profileImageplaceholder } from "@/constants";
import { useUserContext } from "@/context/UserContext";
import { cn, formatConversationCreatedAt } from "@/lib/utils";
import { DummyConversation, TChatConversation } from "@/types";
import { ImageIcon } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

type Props = {
  conversation: TChatConversation;
};

const ConversationTile = ({ conversation }: Props) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const myId = useUserContext().userData?.user?.id;
  const cId = searchParams.get("conversationId");

  const user =
    conversation.receiver?.id === myId
      ? conversation.sender
      : conversation.receiver;

  return (
    <div
      className={cn(
        "flex gap-x-2 cursor-pointer hover:bg-foreground/5 p-2",
        conversation.conversationId === parseInt(cId!) && "bg-foreground/20"
      )}
      onClick={() =>
        router.push(
          `?tab=conversation&cid=${user.id}&name=${
            user.usermeta.firstname + "+" + user.usermeta.lastname
          }&username=${user.username}&avatar=${
            user.usermeta.avatar
          }&conversationId=${conversation.conversationId}`
        )
      }
    >
      <div className="size-[40px] sm:size-[50px] bg-foreground/10 rounded-full relative">
        <Image
          alt="profile image"
          layout="fill"
          objectFit="cover"
          className="rounded-full object-cover"
          src={user?.usermeta?.avatar ?? profileImageplaceholder}
        />
      </div>
      <div className="flex flex-col flex-1">
        <div className="flex justify-between items-end align-middle">
          <div className="font-medium text-lg flex-1 leading-6">
            {user?.usermeta.firstname} {user?.usermeta.lastname}
          </div>
          <div className="text-sm text-foreground/50">
            {formatConversationCreatedAt(conversation.created_at)}
          </div>
        </div>
        <div className={cn("flex gap-x-2")}>
          <p
            className={cn(
              "flex-1 line-clamp-1 flex items-center gap-x-1",
              conversation.unreadCount > 0
                ? "text-foreground"
                : "text-foreground/50"
            )}
          >
            {Boolean(conversation.media_url) && (
              <ImageIcon
                className={cn(
                  "size-5",
                  conversation.unreadCount > 0
                    ? "fill-foreground text-background"
                    : "fill-foreground/50 text-background"
                )}
              />
            )}
            <span className="flex-1 line-clamp-1">
              {Boolean(conversation.message)
                ? conversation.message
                : conversation.type[0].toUpperCase() +
                  conversation.type.slice(1)}
            </span>
          </p>
          {conversation.unreadCount > 0 && (
            <p className="bg-colorPrimary px-2 h-[18px] mt-1 rounded-full text-foreground font-bold text-xs flex justify-center items-center">
              {conversation.unreadCount}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConversationTile;
