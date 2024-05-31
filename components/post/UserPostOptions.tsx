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
import { MoreVertical } from "lucide-react";
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

type Props = { post: PostMeta };

const UserPostOptions = ({ post }: Props) => {
  const queryClient = useQueryClient();
  const { setCurrentPost, setShowCreatePost } = useUserContext();
  const [showDeletePostModal, setShowDeletePostModal] = useState(false);

  const [viewPortWidth, setViewPortWidth] = useState(window.innerWidth);

  const changeWhoCanReply = useMutation({
    mutationKey: ["change-who-can-reply"],
    mutationFn: (data: FormData) => updatePostQuery(data, post?.id!),
    onSuccess: () => {
      queryClient.invalidateQueries({
        // queryKey: ["fetch-users-posts", "get-posts"],
        type: "all",
      });
      toast.custom((t) => (
        <SuccessToast t={t} message={"Who can reply updated successfully."} />
      ));
      setShowCreatePost(false);
    },
    onError: (error) => {
      toast.custom((t) => (
        <ErrorToast
          t={t}
          message={error?.message ?? "Couldn't change who can reply."}
        />
      ));
    },
  });

  const handleChangeWhoCanReply = (replyOption: string) => {
    const formData = new FormData();
    formData.append("canReply", replyOption);

    changeWhoCanReply.mutate(formData);
  };

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

  return (
    <>
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
            className="text-colorGrey translate-x-3 cursor-pointer"
            role="button"
          />
          {/* </Button> */}
        </DropdownMenuTrigger>
        <DropdownMenuContent
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="w-[clamp(240px,80%,424px)] md:w-[324px] lg:w-[420px] absolute -translate-x-[105%] top-0 bg-background border-border"
        >
          <DropdownMenuGroup
            onClick={(e) => {
              e.stopPropagation();
            }}
            className=""
          >
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation();
                setShowDeletePostModal(true);
              }}
              className="p-2 sm:p-4 text-sm sm:text-base text-foreground font-semibold data-[highlighted]:text-foreground data-[highlighted]:bg-colorPrimary/30"
            >
              <Image
                width={30}
                height={30}
                className="size-5 sm:size-[24px] mr-4 object-cover"
                alt="icon"
                src={"/assets/post-icons/delete-post.svg"}
              />
              <span>Delete post</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation();
                setCurrentPost(post);
                setShowCreatePost(true);
              }}
              className="p-2 sm:p-4 text-sm sm:text-base text-foreground font-semibold data-[highlighted]:text-foreground data-[highlighted]:bg-colorPrimary/30"
            >
              <Image
                width={24}
                height={24}
                className="size-5 sm:size-[24px] mr-4 object-cover"
                alt="icon"
                src={"/assets/post-icons/edit-post.svg"}
              />
              <span>Edit post</span>
            </DropdownMenuItem>

            <DropdownMenuSub>
              <DropdownMenuSubTrigger className="p-2 sm:p-4 text-sm sm:text-base text-foreground font-semibold data-[highlighted]:text-foreground data-[state='open']:bg-colorPrimary/50 data-[state=highlighted]:bg-colorPrimary/30">
                <Image
                  width={24}
                  height={24}
                  className="size-5 sm:size-[24px] mr-4 object-cover"
                  alt="icon"
                  src={"/assets/post-icons/who-can-reply.svg"}
                />
                <span>Change who can reply</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  sideOffset={viewPortWidth < 480 ? -200 : 20}
                  alignOffset={viewPortWidth < 480 ? 24 : 0}
                  collisionPadding={100}
                  className="bg-border z-50 px-2 py-2 rounded-lg"
                >
                  {postReplyOptions.map((option) => (
                    <DropdownMenuItem
                      key={option.title}
                      className={cn(
                        "flex justify-between items-center rounded-md hover:bg-colorPrimary/20 cursor-pointer p-2"
                      )}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleChangeWhoCanReply(option.title);
                      }}
                    >
                      <div
                        className={cn(
                          "flex gap-x-2 items-center text-foreground/60"
                        )}
                      >
                        <option.icon
                          className={cn(
                            post.canReply.toLowerCase() ===
                              option.title.toLowerCase()
                              ? "text-white font-bold"
                              : "text-foreground/60"
                          )}
                        />
                        <span
                          className={cn(
                            "text-sm sm:text-base",
                            post.canReply.toLowerCase() ===
                              option.title.toLowerCase()
                              ? "text-white font-bold"
                              : "text-foreground/60"
                          )}
                        >
                          {option.title}
                        </span>
                      </div>
                      {post.canReply.toLowerCase() ===
                        option.title.toLowerCase() && (
                        <IoMdCheckmarkCircle className="text-foreground text-lg" />
                      )}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      {showDeletePostModal && (
        <DeletePostModal
          postId={post.id}
          setShowDeletePostModal={setShowDeletePostModal}
          showDeletePostModal={showDeletePostModal}
        />
      )}
    </>
  );
};

export default UserPostOptions;
