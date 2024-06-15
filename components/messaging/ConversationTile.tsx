import { cn, formatConversationCreatedAt } from "@/lib/utils";
import { DummyConversation } from "@/types";
import { ImageIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {
  conversation: DummyConversation;
};

const ConversationTile = ({ conversation }: Props) => {
  const router = useRouter();

  return (
    <div
      className="flex gap-x-2 cursor-pointer hover:bg-foreground/10 p-2"
      onClick={() =>
        router.push(`/message?tab=conversation&cid=${conversation.id}`)
      }
    >
      <div className="size-[40px] sm:size-[50px] bg-foreground/10 rounded-full relative">
        <Image
          alt="profile image"
          layout="fill"
          objectFit="cover"
          className="rounded-full object-cover"
          src={conversation.avatar}
        />
      </div>
      <div className="flex flex-col flex-1">
        <div className="flex justify-between items-end align-middle">
          <div className="font-medium text-lg flex-1 leading-6">
            {conversation.name}
          </div>
          <div className="text-sm text-foreground/50">
            {formatConversationCreatedAt(conversation.message.created_at)}
          </div>
        </div>
        <div className={cn("flex gap-x-2")}>
          <p
            className={cn(
              "flex-1 line-clamp-1 flex items-center gap-x-1",
              conversation.status === "unread"
                ? "text-foreground"
                : "text-foreground/50"
            )}
          >
            {Boolean(conversation.message.media.length) && (
              <ImageIcon
                className={cn(
                  "size-5",
                  conversation.status === "unread"
                    ? "fill-foreground text-background"
                    : "fill-foreground/50 text-background"
                )}
              />
            )}
            <span className="flex-1 line-clamp-1">
              {Boolean(conversation.message.content)
                ? conversation.message.content
                : conversation.message.media[0].type[0].toUpperCase() +
                  conversation.message.media[0].type.slice(1)}
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
