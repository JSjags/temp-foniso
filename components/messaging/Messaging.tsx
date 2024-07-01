"use client";

import React, { useEffect, useRef, useState } from "react";
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
import { TChatConversation, TChatMessage, User } from "@/types";
import Loading from "../reusable/Loading";
import { useUserContext } from "@/context/UserContext";
import EmptyInbox from "./EmptyInbox";
import { useSocket } from "@/context/SocketContext";
import MessageSearch from "./MessageSearch";
import { ScrollArea } from "../ui/scroll-area";

type Props = {};

const Messaging = (props: Props) => {
  const searchParams = useSearchParams();
  const { back } = useRouter();
  const { socketService, isConnected, connect } = useSocket();
  // Load the notification sound
  const notificationSound = useRef<HTMLAudioElement | null>(null);

  const [refetchMessages, setRefetchMessages] = useState<boolean>(false);
  const [conversations, setConversations] = useState<TChatConversation[]>([]);
  const [messages, setMessages] = useState<TChatMessage[]>([]);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    connect();
  }, [connect]);

  useEffect(() => {
    const fetchConversations = async () => {
      if (isConnected) {
        try {
          const convos = await socketService.getConversations();
          setConversations(convos as TChatConversation[]);
          console.log("Conversations:", convos);
        } catch (error) {
          console.error("Failed to get conversations:", error);
        }
        // socketService.emitEvent("getConversations",)
      }
    };

    fetchConversations();

    socketService.onEvent("receiveMessage", () => {
      fetchConversations();
      if (notificationSound.current) {
        notificationSound.current.play().catch((error) => {
          console.error("Error playing notification sound:", error);
        });
      } else {
        console.error("Notification sound not loaded.");
      }
    });
  }, [isConnected, socketService]);

  const refetchConversations = () => {
    const fetchConversations = async () => {
      if (isConnected) {
        try {
          const convos = await socketService.getConversations();
          setConversations(convos as TChatConversation[]);
          console.log("Conversations:", convos);
        } catch (error) {
          console.error("Failed to get conversations:", error);
        }
        // socketService.emitEvent("getConversations",)
      }
    };

    fetchConversations();
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-[0.8fr_1fr] lg:grid-cols-[0.6fr_1fr] items-stretch h-screen">
      <div className="bg-background h-screen">
        {searchParams.get("tab") !== "search" ? (
          <div className="h-full flex flex-col">
            <HeaderWithSearch title="Messaging" />
            <audio
              src="/assets/notification.mp3"
              ref={notificationSound}
              controls
              className="hidden"
            ></audio>
            {!isConnected ? (
              <div className="mt-4 items-start h-screen flex justify-center">
                <Loading isLoading />
              </div>
            ) : (
              <div className="justify-stretch flex-1">
                <ScrollArea className="">
                  <div className="mt-5 bg-background flex flex-col gap-y-2">
                    {Boolean(conversations.length === 0) && <EmptyInbox />}
                    {Boolean(conversations.length >= 1) &&
                      conversations.map((conversation) => (
                        <ConversationTile
                          key={conversation.id}
                          conversation={conversation}
                        />
                      ))}
                  </div>
                </ScrollArea>
              </div>
            )}
          </div>
        ) : (
          <>
            <HeaderWithBackBtn title="New chat" />

            <MessageSearch />
          </>
        )}
      </div>

      {Boolean(searchParams.get("tab")) &&
      searchParams.get("tab") === "conversation" &&
      searchParams.get("cid") !== null ? (
        <div className="flex flex-col h-screen sticky inset-0">
          <ConversationSidebar className="border-l min-[480px]:pl-[68px] md:pl-0 flex flex-col flex-1 h-[100dvh] overflow-y-auto hide-scrollbar border-[#D9D9D9] dark:border-[#222522]">
            <div className="sticky top-12 min-[480px]:top-0 z-20 bg-background flex items-center h-[54px] md:h-16 py-1 gap-[0px] border-b border-border px-2 sm:px-5">
              <FaArrowLeft className="text-2xl md:hidden" onClick={back} />

              <ChatHeader
                refetchConversations={refetchConversations}
                conversation={
                  uniqueConversations.filter(
                    (conversation) =>
                      conversation.id.toString() === searchParams.get("cid")
                  )[0]
                }
                refetchMessages={refetchMessages}
                setRefetchMessages={setRefetchMessages}
              />
            </div>
            {searchParams.get("tab") === "conversation" &&
              searchParams.get("cid") !== null && (
                <div className="flex-1">
                  <Chat
                    refetchMessages={refetchMessages}
                    setRefetchMessages={setRefetchMessages}
                    messages={messages}
                    setMessages={setMessages}
                    page={page}
                    setPage={setPage}
                    refetchConversations={refetchConversations}
                  />
                </div>
              )}
          </ConversationSidebar>
        </div>
      ) : (
        <ConversationSidebar className="border-l min-[480px]:pl-[68px] md:pl-0 flex flex-col flex-1 h-[100dvh] overflow-y-auto hide-scrollbar border-[#D9D9D9] dark:border-[#222522]">
          <div className="h-screen w-full flex justify-center items-center bg-background border-l border-border px-10">
            <p className="max-w-[309px] text-foreground/50 text-center">
              Your conversation with people will appear here
            </p>
          </div>
        </ConversationSidebar>
      )}
    </div>
  );
};

export default Messaging;
