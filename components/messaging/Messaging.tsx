"use client";

import React from "react";
import HeaderWithBackBtn from "../reusable/HeaderWithBackBtn";
import HeaderWithSearch from "../reusable/HeaderWithSearch";
import { dummyUsers, uniqueConversations } from "@/constants";
import ConversationTile from "./ConversationTile";
import { useRouter, useSearchParams } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa6";
import ConversationSidebar from "./ConversationSidebar";
import Chat from "./Chat";
import ChatHeader from "./ChatHeader";
import { Input } from "../ui/input";
import { Search } from "lucide-react";
import { Separator } from "../ui/separator";
import UserSuggestionCard from "../reusable/UserSuggestionCard";
import { User } from "@/types";

type Props = {};

const Messaging = (props: Props) => {
  const searchParams = useSearchParams();
  const { back } = useRouter();

  console.log(searchParams.get("tab"));

  return (
    <div className="grid grid-cols-1 md:grid-cols-[0.8fr_1fr] lg:grid-cols-[0.6fr_1fr] items-stretch">
      <div className="bg-background">
        {searchParams.get("tab") !== "search" ? (
          <>
            <HeaderWithSearch title="Messaging" />

            <div className="mt-5 min-h-screen bg-background flex flex-col gap-y-2">
              {uniqueConversations.map((conversation) => (
                <ConversationTile
                  key={conversation.id}
                  conversation={conversation}
                />
              ))}
            </div>
          </>
        ) : (
          <>
            <HeaderWithBackBtn title="New chat" />

            <div className="mt-5 min-h-screen bg-background flex flex-col gap-y-2">
              <p className="text-foreground/50 px-4">
                Search for people by username to chat with them
              </p>
              <div className="mt-0 relative px-4">
                <div className="mt-0 relative">
                  <Input className="h-12 border border-border rounded-lg pl-10  bg-foreground/10 dark:bg-black" />
                  <Search className="absolute top-2.5 left-2" />
                </div>
              </div>
              <Separator className="mt-4" />
              <div className="p-4 pt-2">
                <p className="font-bold text-lg">Suggestions</p>
                <div className="mt-4 space-y-4">
                  {dummyUsers.map((user: User, i: number) => (
                    <UserSuggestionCard user={user} key={i} />
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {Boolean(searchParams.get("tab")) &&
        searchParams.get("tab") === "conversation" &&
        searchParams.get("cid") !== null && (
          <div className="flex flex-col h-screen">
            <ConversationSidebar className="border-l flex flex-col flex-1 h-[100dvh] overflow-y-auto hide-scrollbar border-[#D9D9D9] dark:border-[#222522]">
              <div className="flex items-center h-[54px] md:h-16 py-1 gap-[28px] border-b border-border px-2 sm:px-5">
                <FaArrowLeft className="text-2xl md:hidden" onClick={back} />

                <ChatHeader
                  conversation={
                    uniqueConversations.filter(
                      (conversation) =>
                        conversation.id.toString() === searchParams.get("cid")
                    )[0]
                  }
                />
              </div>
              {searchParams.get("tab") === "conversation" &&
                searchParams.get("cid") !== null && (
                  <div className="flex-1">
                    <Chat />
                  </div>
                )}
            </ConversationSidebar>
          </div>
        )}
    </div>
  );
};

export default Messaging;
