"use client";

import { profileImageplaceholder } from "@/constants";
import { useUserContext } from "@/context/UserContext";
import { cn, formatTimestamp } from "@/lib/utils";
import { TChatMessage } from "@/types";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import ChatMessageOptions from "./ChatMessageOptions";
import { Check, Copy } from "lucide-react";
import { PiArrowBendUpLeftBold } from "react-icons/pi";
import toast from "react-hot-toast";
import SuccessToast from "../reusable/toasts/SuccessToast";
import ErrorToast from "../reusable/toasts/ErrorToast";
import useIntersectionObserver from "@/hooks/useIntersectionObserver"; // Import the custom hook
import { useSocket } from "@/context/SocketContext";
import { FullScreen, useFullScreenHandle } from "react-full-screen";

type Props = {
  msg: TChatMessage;
  setSelectedReply: React.Dispatch<React.SetStateAction<number | null>>;
  fullScreenMedia: {
    src: string;
    type: string;
  } | null;
  setFullScreenMedia: React.Dispatch<
    React.SetStateAction<{
      src: string;
      type: string;
    } | null>
  >;
};

const ChatCard = ({ msg, setSelectedReply, setFullScreenMedia }: Props) => {
  const searchParams = useSearchParams();
  const receiverId = searchParams.get("cid");

  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const myId = useUserContext().userData?.user.id;
  const { socketService } = useSocket();
  const handle = useFullScreenHandle();

  const handleReply = (id: number) => {
    setSelectedReply(id);
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.custom((t) => (
        <SuccessToast
          t={t}
          message={"Message copied to clipboard successfully."}
          title="Message copied"
        />
      ));
    } catch (err) {
      toast.custom((t) => (
        <ErrorToast t={t} message={"Error copying message to clipboard."} />
      ));
    }
  };

  useEffect(() => {
    // Detect if the device supports touch
    const touchSupport =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;
    setIsTouchDevice(touchSupport);
  }, []);

  // Use the Intersection Observer hook
  const ref = useIntersectionObserver(
    (isIntersecting) => {
      if (isIntersecting) {
      }
    },
    { threshold: 1.0 } // Adjust threshold as needed
  );

  //   console.log(msg);

  const scrollIntoView = (id: number) => {
    const messageId = `m_id-${id}`;
    const messageElement = document.getElementById(messageId);

    if (messageElement) {
      messageElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div ref={ref}>
      <div id={`m_id-${msg.id}`}>
        {/* {handle.active && ( */}
        <FullScreen handle={handle}>
          {handle.active && (
            <img
              src={msg.media_url}
              alt="File"
              onClick={handle.enter}
              className="w-full object-cover"
            />
          )}
        </FullScreen>
        {/* )} */}
        <div
          key={msg.sent_time}
          className={`flex gap-x-1 mt-6 relative group ${
            msg.receiverId !== myId
              ? "justify-start flex-row-reverse"
              : "justify-start"
          }`}
        >
          {msg.receiverId === myId && (
            <div className={cn("flex items-start !size-10 shrink-0")}>
              <Image
                src={
                  msg.receiverId === myId
                    ? searchParams.get("avatar") === "null"
                      ? profileImageplaceholder
                      : searchParams.get("avatar")!
                    : "https://via.placeholder.com/40"
                }
                alt={receiverId ?? "Id"}
                width={40}
                height={40}
                className="rounded-full size-10 shrink-0"
              />
            </div>
          )}
          <div
            className={`flex flex-col px-2 max-w-[80%] ${
              msg.receiverId !== myId
                ? "bg-gradient-to-br from-[hsla(137,29%,39%,1)] via-[hsla(137,35%,24%,1)] to-[hsla(137,47%,21%,1)] rounded-xl rounded-tr-none"
                : "bg-foreground/20 rounded-xl rounded-tl-none"
            }`}
          >
            <div
              className={cn(
                "p-4 pb-2 pt-0 px-0 rounded-lg mt-2 text-foreground/80",
                msg.receiverId === myId && "text-foreground"
              )}
            >
              {msg.receiverId === myId && (
                <div className="mb-2 text-foreground">
                  <div className="font-bold text-base">
                    {searchParams.get("name")}
                  </div>
                </div>
              )}
              {/* parent message */}
              {msg.parentMessage && (
                <div
                  onClick={() => scrollIntoView(msg.parentMessage?.id ?? 0)}
                  className="p-2 rounded-lg bg-background cursor-pointer"
                >
                  <p className="text-colorPrimary text-xs">
                    {msg.parentMessage.senderId === myId
                      ? "You"
                      : searchParams.get("name")}
                  </p>
                  <p className="text-foreground text-xs">
                    {msg.parentMessage.message}
                  </p>
                </div>
              )}

              <p className="text-base text-white">{msg.message}</p>
              {msg.media_url && msg.media_url.length > 0 && (
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {[msg.media_url].map((file, index) => (
                    <div
                      key={index}
                      className={`${index === 0 ? "col-span-2" : ""} relative`}
                    >
                      <img
                        src={file}
                        alt="File"
                        onClick={handle.enter}
                        className="w-full h-32 object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}

              <div
                className={cn(
                  "text-xs",
                  msg.receiverId !== myId
                    ? "flex justify-end text-foreground translate-x-1"
                    : "flex justify-start text-foreground/80"
                )}
              >
                {formatTimestamp(msg.sent_time)}
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-end">
            {!isTouchDevice && (
              <div className="group-hover:flex px-2 gap-3 text-foreground hidden">
                <PiArrowBendUpLeftBold
                  onClick={() => handleReply(msg.id!)}
                  className="cursor-pointer size-4"
                />
                <Copy
                  className="cursor-pointer size-4"
                  onClick={() => copyToClipboard(msg.message)}
                />
              </div>
            )}
          </div>
        </div>
        {msg.receiverId !== myId && (
          <div className="flex justify-end items-center mt-1 h-4">
            <div
              className={cn(
                "size-4 rounded-full flex justify-center items-center",
                msg.isRead
                  ? "border-colorPrimary bg-colorPrimary text-white"
                  : "border border-foreground/20 text-foreground/20"
              )}
            >
              <Check />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatCard;
