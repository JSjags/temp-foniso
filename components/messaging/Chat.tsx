"use client";

import React, { useState, useRef, ChangeEvent, useEffect } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { Button } from "../ui/button";
import { ImageIcon, Send, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSocket } from "@/context/SocketContext";
import dayjs from "dayjs";
import { GroupedMessages, TChatMessage } from "@/types";
import { useUserContext } from "@/context/UserContext";
import { useMutation } from "@tanstack/react-query";
import { uploadImage } from "@/services/api/chat";
import toast from "react-hot-toast";
import ErrorToast from "../reusable/toasts/ErrorToast";
import PageLoadingSpinner from "../Spinner/PageLoadingSpinner";
import ChatCard from "./ChatCard";
import { groupMessagesByTime } from "@/lib/utils";
import { Separator } from "../ui/separator";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import {
  Credenza,
  CredenzaBody,
  CredenzaContent,
  CredenzaTrigger,
} from "../ui/credenza";
import EmojiPicker, { Theme } from "emoji-picker-react";
import { useTheme } from "next-themes";
import Loading from "../reusable/Loading";
import { useInView } from "react-intersection-observer";
import FullScreenContent from "./FullScreenImageModal";
import Image from "next/image";
import { profileImageplaceholder } from "@/constants";

type props = {
  messages: TChatMessage[];
  setMessages: React.Dispatch<React.SetStateAction<TChatMessage[]>>;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  refetchConversations: () => void;
  refetchMessages: boolean;
  setRefetchMessages: React.Dispatch<React.SetStateAction<boolean>>;
};

const Chat = ({
  messages,
  setMessages,
  page,
  setPage,
  refetchMessages,
  setRefetchMessages,
  refetchConversations,
}: props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [newMessage, setNewMessage] = useState<string>("");
  const [input, setInput] = useState<string>("");
  const [selectedReply, setSelectedReply] = useState<number | null>(null);
  const [filePreviews, setFilePreviews] = useState<
    { src: string; type: string; name: string }[]
  >([]);
  const [files, setFiles] = useState<FileList | null>(null);
  const [fullScreenMedia, setFullScreenMedia] = useState<{
    src: string;
    type: string;
  } | null>(null);
  const [scrollToBottom, setScrollToBottom] = useState(true);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const scrollToBottomRef = useRef<HTMLDivElement | null>(null);
  const { socketService, isConnected } = useSocket();
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const { ref: loadMoreChatRef, inView } = useInView();

  const myId = useUserContext().userData?.user.id;

  const uploadMedia = useMutation({
    mutationKey: ["upload-image"],
    mutationFn: (data: FormData) => uploadImage(data),
    onSuccess: (data) => {
      socketService.emitEvent("createMessage", {
        message: input,
        type: "image",
        receiverId: parseInt(receiverId!),
        sent_time: dayjs().unix(),
        media_url: data.data.data.result,
      });
      const newMessage: TChatMessage = {
        message: input,
        receiverId: parseInt(receiverId!),
        media_url: data.data.data.result,
        sent_time: dayjs().unix(),
        type: "image",
      };

      setMessages((prevMessages) => {
        const existingMessage = prevMessages.find(
          (msg) => msg.id === newMessage.id
        );
        if (existingMessage) {
          return prevMessages;
        }
        return [...prevMessages, newMessage];
      });
      setInput("");
      setFilePreviews([]);
      setSelectedReply(null);
      setFiles(null);
    },
    onError: (error) => {
      toast.custom((t) => (
        <ErrorToast t={t} message="Unable to send your message" />
      ));
    },
  });

  useEffect(() => {
    if (messages.length && page < 2) {
      let unreadMessages: number[] = [];

      for (const m of messages) {
        if (m.receiverId === myId && !m.isRead) {
          unreadMessages.push(m.id!);
        }
      }
      console.log(unreadMessages);
      if (unreadMessages.length) {
        socketService.emitEvent("updateMessage", {
          messageId: unreadMessages!,
        });
      }
    }
  }, [page, messages]);

  const renderFilePreview = (file: {
    src: string;
    type: string;
    name: string;
  }) => {
    if (file.type === "image") {
      return (
        <img src={file.src} alt="Preview" className="w-20 h-20 object-cover" />
      );
    } else if (file.type === "video") {
      return (
        <video className="w-20 h-20 object-cover">
          <source src={file.src} type="video/mp4" />
        </video>
      );
    } else if (file.type === "file") {
      return (
        <div className="flex flex-col items-center">
          <div className="text-xs mt-1">{file.name}</div>
        </div>
      );
    } else {
      return (
        <div className="flex flex-col items-center">
          <div className="w-10 h-10 bg-gray-400 flex items-center justify-center rounded">
            <span>{file.name.split(".").pop()}</span>
          </div>
          <div className="text-xs mt-1">{file.name}</div>
        </div>
      );
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    setFiles(files);
    if (files) {
      const allowedFileTypes = ["image", "video"];
      const newFilePreviews = Array.from(files)
        .slice(0, 4 - filePreviews.length)
        .map((file) => {
          if (file.size > 10 * 1024 * 1024) {
            alert("File size should not exceed 10MB");
            return null;
          }
          const fileType = file.type.split("/")[0];
          if (!allowedFileTypes.includes(fileType)) {
            alert("Only images and videos are allowed");
            return null;
          }
          const reader = new FileReader();
          reader.readAsDataURL(file);
          return new Promise<{
            src: string;
            type: string;
            name: string;
          } | null>((resolve) => {
            reader.onload = () => {
              resolve({
                src: reader.result as string,
                type: fileType,
                name: file.name,
              });
            };
          });
        });

      Promise.all(newFilePreviews).then((previews) => {
        setFilePreviews([
          ...filePreviews,
          ...(previews.filter(Boolean) as {
            src: string;
            type: string;
            name: string;
          }[]),
        ]);
      });
    }
  };

  const handleFileRemove = (index: number) => {
    setFilePreviews(filePreviews.filter((_, i) => i !== index));
  };

  // const handleMediaClick = (src: string, type: string) => {
  //   setFullScreenMedia([{ src, type }]);
  // };

  const receiverId = searchParams.get("cid");

  const sendMessage = async (receiverId: number, image_url?: string) => {
    if (files !== null) {
      socketService.emitEvent("createMessage", {
        message: input,
        type: image_url ? "text" : "image",
        receiverId: receiverId,
        sent_time: dayjs().unix(),
        ...(image_url ? { media_url: image_url } : {}),
        ...(selectedReply ? { parentId: selectedReply } : {}),
      });
      setNewMessage("");
    }
    if (input.trim() !== "") {
      socketService.emitEvent("createMessage", {
        message: input,
        type: image_url ? "text" : "image",
        receiverId: receiverId,
        sent_time: dayjs().unix(),
        ...(selectedReply ? { parentId: selectedReply } : {}),
      });
      setNewMessage("");
    }
  };

  const handleSendMessage = () => {
    if (input.trim() === "" && filePreviews.length === 0) return;

    const newMessage: TChatMessage = {
      message: input,
      receiverId: parseInt(receiverId!),
      sent_time: dayjs().unix(),
      type: "text",
      ...(selectedReply ? { parentId: selectedReply } : {}),
    };

    const handleSendMessageWithImage = () => {
      const formData = new FormData();

      formData.append("avatar", Array.from(files!)[0]);

      uploadMedia.mutate(formData);
    };

    if (files !== null) {
      return handleSendMessageWithImage();
    }

    setMessages((prevMessages) => {
      const existingMessage = prevMessages.find(
        (msg) => msg.id === newMessage.id
      );
      if (existingMessage) {
        return prevMessages;
      }
      return [...prevMessages, newMessage];
    });

    setInput("");
    setFilePreviews([]);
    setSelectedReply(null);

    if (receiverId) {
      sendMessage(parseInt(receiverId));
    }
  };

  useEffect(() => {
    const fetchMessages = async () => {
      if (isConnected) {
        try {
          const messages = await socketService.getMessages({
            page: page,
            pageSize: 20,
            receiverId: parseInt(receiverId!),
          });

          setMessages(messages as TChatMessage[]);
        } catch (error) {
          console.error("Failed to get conversations:", error);
        }
      }
    };

    fetchMessages();
  }, [isConnected, socketService, receiverId]);

  useEffect(() => {
    const fetchMessages = async () => {
      if (isConnected) {
        try {
          const messages = await socketService.getMessages({
            page: page,
            pageSize: 20,
            receiverId: parseInt(receiverId!),
          });

          setMessages(messages as TChatMessage[]);
        } catch (error) {
          console.error("Failed to get conversations:", error);
        }
      }
    };

    if (refetchMessages) {
      fetchMessages();
      setRefetchMessages(false);
    }
  }, [refetchMessages]);

  useEffect(() => {
    socketService.onEvent("receiveMessage", (message: TChatMessage) => {
      setScrollToBottom(true);
      setMessages((prevMessages) => {
        const existingMessage = prevMessages.find(
          (msg) => msg.id === message.id
        );
        if (existingMessage) {
          return prevMessages;
        }
        return [...prevMessages, message];
      });
    });
  }, [socketService]);

  useEffect(() => {
    if (scrollToBottomRef.current) {
      if (messages.length && scrollToBottom) {
        scrollToBottomRef.current.scrollIntoView({ behavior: "smooth" });
        setScrollToBottom(false);
      }
    }
    if (scrollToBottomRef.current && scrollToBottom) {
      if (messages.length && scrollToBottom) {
        scrollToBottomRef.current.scrollIntoView({ behavior: "smooth" });
        setScrollToBottom(false);
      }
    }
  }, [messages, scrollToBottom]);

  useEffect(() => {
    setPage(1);
  }, [receiverId]);

  console.log(messages);

  // useEffect(() => {

  //   socketService.onEvent("updateSenderMessage", (res) => {
  //     console.log(res);
  //     const mCopy = [...messages];
  //     res.forEach(
  //       (update: { id: number; senderId: number; receiverId: number }) => {
  //         const message = mCopy.find((m) => m.id === update.id);
  //         if (message) {
  //           message.isRead = true;
  //         }
  //       }
  //     );
  //     console.log(res);
  //     console.log(mCopy);

  //     setMessages(mCopy);
  //   });
  // }, [socketService]);

  useEffect(() => {
    const handleUpdateSenderMessage = (
      res: { id: number; senderId: number; receiverId: number }[]
    ) => {
      console.log("Received updateSenderMessage event:", res);

      const updatedMessages = messages.map((message) => {
        const update = res.find((u) => u.id === message.id);
        if (update) {
          return { ...message, isRead: true };
        }
        return message;
      });

      console.log("Updated messages:", updatedMessages);
      setMessages(updatedMessages);
      setRefetchMessages(true);
      refetchConversations();
    };

    socketService.onEvent("updateSenderMessage", handleUpdateSenderMessage);
  }, [messages, socketService]);

  useEffect(() => {
    if (inView && messages.length >= 20) {
      setPage((prev) => prev + 1);
      console.log(page);

      const fetchMoreMessages = async () => {
        if (isConnected) {
          try {
            setIsFetchingMore(true);
            const res = await socketService.getMoreMessages({
              page: page,
              pageSize: 20,
              receiverId: parseInt(receiverId!),
            });
            console.log(messages);

            setMessages((prev) => [...res, ...(messages as TChatMessage[])]);
          } catch (error) {
            console.error("Failed to get more messages:", error);
          } finally {
            setIsFetchingMore(false);
          }
        }
      };

      fetchMoreMessages();
    }
  }, [inView]);

  return (
    <div className="flex flex-col flex-1 h-full bg-background text-white p-4 px-0 pt-0 pb-0">
      {/* Image Modal */}
      {/* {fullScreenMedia && <FullScreenContent url={fullScreenMedia.src} />} */}
      <div ref={loadMoreChatRef} className="bg-background py-2">
        {isFetchingMore && (
          <PageLoadingSpinner
            spinnerExtraClass="sm:!size-5"
            // className="w-full min-h-4 pb-1"
            // extraClass="!size-4"
            // spinnerClass="!size-20"
          />
        )}
      </div>
      {messages.filter(
        (chat) =>
          // !chat.isMessageDeleted?.includes(87) && chat.senderId !== 87
          !chat?.isMessageDeleted?.includes(chat?.senderId!)
      ).length === 0 ? (
        <div className="pt-10 flex justify-center">
          <div className="h-screen">
            <div className="relative size-[120px] rounded-full bg-foreground/20 mx-auto">
              <Image
                alt="profile image"
                layout="fill"
                objectFit="cover"
                className="rounded-full object-cover"
                src={
                  searchParams.get("avatar") !== "null"
                    ? searchParams.get("avatar")!
                    : profileImageplaceholder
                }
              />
            </div>
            <div className="mt-2">
              <p className="text-foreground font-bold text-lg text-center">
                {searchParams.get("name")}
              </p>
              <p className="text-foreground/60 text-center">
                @{searchParams.get("username")}
              </p>
            </div>
            <div className="mt-4 flex justify-center">
              <Button
                variant={"ghost"}
                onClick={() =>
                  router.push(`/profile/${searchParams.get("username")}`)
                }
                className="bg-foreground/5 text-foreground font-bold rounded-full hover:bg-foreground hover:text-background"
              >
                View profile
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-grow overflow-y-auto pb-20 px-2 sm:px-3">
          {groupMessagesByTime(
            messages
              .filter(
                (chat) =>
                  // !chat.isMessageDeleted?.includes(87) && chat.senderId !== 87
                  !chat?.isMessageDeleted?.includes(chat?.senderId!)
              )
              .sort((a, b) => a.sent_time - b.sent_time)
          ).map((groupedMessages: GroupedMessages, i: number) => (
            <div key={i} className="relative">
              <div className="mt-5 sticky">
                <p className="bg-border mx-auto relative shadow-[0_0_0_8px_hsl(var(--background))] z-10 rounded-md w-fit text-center text-foreground/50 text-sm px-3 py-1">
                  {groupedMessages.timeFrame}
                </p>
                <Separator className="-translate-y-4 mx-auto w-[85%]" />
              </div>

              {groupedMessages.messages.map((msg, j) => (
                <ChatCard
                  msg={msg}
                  key={j}
                  setSelectedReply={setSelectedReply}
                  fullScreenMedia={fullScreenMedia}
                  setFullScreenMedia={setFullScreenMedia}
                />
              ))}
            </div>
          ))}
          {/* scroll component */}
          <div className="h-0" ref={scrollToBottomRef} />
        </div>
      )}
      <div className="sticky bottom-14 min-[480px]:bottom-0 py-2 px-2 sm:px-3 pt-2 bg-background border-t border-border">
        {selectedReply && (
          <div className="mb-2 flex justify-between items-center">
            <div>
              <p className="text-xs text-foreground/50">
                Replying to{" "}
                {messages.find((m) => m.id === selectedReply)?.senderId !== myId
                  ? `${
                      messages.find((m) => m.id === selectedReply)?.sender
                        ?.usermeta.firstname
                    } ${
                      messages.find((m) => m.id === selectedReply)?.sender
                        ?.usermeta.lastname
                    }`
                  : `${
                      messages.find((m) => m.id === selectedReply)?.receiver
                        ?.usermeta.firstname
                    } ${
                      messages.find((m) => m.id === selectedReply)?.receiver
                        ?.usermeta.lastname
                    }`}
              </p>
              <p className="text-xs mt-1">
                {messages.find((m) => m.id === selectedReply)?.message}
              </p>
            </div>
            <Button
              onClick={() => setSelectedReply(null)}
              className="p-0 size-4 rounded-full bg-foreground/50 hover:bg-foreground text-background"
            >
              <X />
            </Button>
          </div>
        )}
        <div className="flex flex-col mt-0 bg-foreground/5 rounded-3xl">
          {filePreviews.length > 0 && (
            <div className="flex flex-wrap mb-2 p-2">
              {filePreviews.map((file, index) => (
                <div
                  key={index}
                  className="relative mr-2 mb-2 rounded-2xl overflow-hidden"
                >
                  {renderFilePreview(file)}
                  <button
                    className="absolute top-2 right-2 text-red-500 text-xs"
                    onClick={() => handleFileRemove(index)}
                  >
                    <X className="size-[16px]" />
                  </button>
                </div>
              ))}
            </div>
          )}
          <div className="flex items-end ">
            <Credenza>
              <CredenzaTrigger asChild>
                <Button
                  variant={"ghost"}
                  className="hover:bg-transparent pr-0 pl-2"
                >
                  <MdOutlineEmojiEmotions className="text-foreground/70 size-7" />
                </Button>
              </CredenzaTrigger>
              <CredenzaContent className="!p-0">
                <CredenzaBody>
                  <div>
                    <EmojiPicker
                      className="!bg-background border-none w-full !font-sans"
                      onEmojiClick={(val) =>
                        setInput((prev) => prev + val.emoji)
                      }
                      theme={
                        (useTheme().theme === "system"
                          ? "auto"
                          : useTheme().theme) as Theme
                      }
                    />
                  </div>
                </CredenzaBody>
              </CredenzaContent>
            </Credenza>

            <Button
              variant={"ghost"}
              className="hover:bg-transparent pr-1 pl-2"
              onClick={() => fileInputRef.current?.click()}
            >
              <ImageIcon className="text-foreground/70" />
            </Button>
            <TextareaAutosize
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Message"
              className="flex-grow mr-2 ml-0 p-2 bg-transparent text-white rounded resize-none focus:outline-none caret-colorPrimary"
              minRows={1}
            />
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              multiple
            />
            <Button
              className="rounded-full bg-transparent hover:bg-transparent"
              onClick={handleSendMessage}
              disabled={!input.trim() && filePreviews.length === 0}
            >
              {uploadMedia.isPending ? (
                <PageLoadingSpinner spinnerExtraClass="sm:size-4" />
              ) : (
                <Button
                  variant={"ghost"}
                  className="text-colorPrimary hover:bg-transparent px-0"
                >
                  Send
                </Button>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
