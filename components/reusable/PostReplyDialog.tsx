import { PostMeta } from "@/types";
import React, { Dispatch, SetStateAction, useRef, useState } from "react";
import { SquarePlus, X } from "lucide-react";
import Image from "next/image";
import { profileImageplaceholder, userPlaceholderImage } from "@/constants";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import useAutosizeTextArea from "@/hooks/useAutoSizeTextArea";
import { useUserContext } from "@/context/UserContext";
import { AlertDialogOverlay } from "@radix-ui/react-alert-dialog";
import { cn } from "@/lib/utils";
import SportIcon from "./SportIcon";
import moment from "moment";
import Link from "next/link";
import { Dialog, DialogContent } from "../ui/dialog";
import { DialogDescription } from "@radix-ui/react-dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postCommentQuery } from "@/services/api/post";
import { ImSpinner2 } from "react-icons/im";
import toast from "react-hot-toast";
import SuccessToast from "./toasts/SuccessToast";
import ErrorToast from "./toasts/ErrorToast";
import MessageBox from "./MessageBox";

type Props = {
  post: PostMeta;
  isOpen: boolean;
  setShowReplyDialog: Dispatch<SetStateAction<boolean>>;
  buttonText?: string;
};

const PostReplyDialog = ({
  isOpen,
  setShowReplyDialog,
  post,
  buttonText,
}: Props) => {
  const queryClient = useQueryClient();
  const ref = useRef(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const [value, setValue] = useState("");
  const [isTruncated, setIsTruncated] = useState(false);
  const [isShowingMore, setIsShowingMore] = useState(false);

  const comment = useMutation({
    mutationKey: ["comment"],
    mutationFn: (data: { postId: number; commentValue: string }) =>
      postCommentQuery(data.postId, data.commentValue),
    onSuccess: (data) => {
      console.log(data);
      setValue("");
      toast.custom((t) => (
        <SuccessToast t={t} message={"Comment made successfully."} />
      ));
      setShowReplyDialog(false);

      queryClient.invalidateQueries({
        type: "all",
      });
    },
    onError: (error) => {
      toast.custom((t) => (
        <ErrorToast
          t={t}
          message={error?.message ?? "Couldn't make your comment."}
        />
      ));
    },
  });

  const handleAction = (data: { postId: number; commentValue: string }) => {
    comment.mutate(data);
  };

  useAutosizeTextArea(textAreaRef.current, value);

  const { userData } = useUserContext();

  const handleChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = evt.target?.value;

    setValue(val);
  };

  const toggleIsShowingMore = () => setIsShowingMore((prev) => !prev);

  return (
    <Dialog open={isOpen} onOpenChange={() => setShowReplyDialog(false)}>
      <DialogContent className="min-w-[240px] w-[95%] bg-background border-border rounded-3xl p-0">
        <DialogDescription className="mt-14 text-inactive px-4 pb-6 pt-3">
          <div className="w-full mx-auto">
            <div>
              <div className="flex items-start justify-between">
                <div className="flex gap-x-3">
                  <Image
                    width={45}
                    height={45}
                    className="size-[36px] sm:size-[45px] rounded-full object-cover"
                    alt="avatar"
                    src={
                      post?.user?.usermeta?.avatar !== null
                        ? post?.user?.usermeta?.avatar
                        : profileImageplaceholder
                    }
                  />
                  <div>
                    <div className="flex gap-x-2 items-center">
                      <p className="text-foreground font-semibold text-base line-clamp-1 text-ellipsis">
                        {post?.user?.username}
                      </p>
                      <div className="flex gap-x-1 items-center">
                        <Image
                          width={14}
                          height={14}
                          className="size-[16px] rounded-full object-cover"
                          alt="avatar"
                          src={"/assets/app-icons/verified-icon.svg"}
                        />
                        <SportIcon
                          category={post?.user?.usermeta?.favorite_sport}
                        />
                      </div>
                      <p className="text-sm text-inactive align-middle whitespace-nowrap">
                        {" "}
                        • {moment(post?.created_at).fromNow()}
                      </p>
                    </div>
                    <p className="text-inactive">@{post?.user?.username}</p>
                  </div>
                </div>
                {/* </Button> */}
              </div>

              {/* content */}
              <div className="mt-4">
                <p
                  ref={ref}
                  dangerouslySetInnerHTML={{ __html: post.content }}
                  className={cn(
                    "text-foreground text-ellipsis",
                    !isShowingMore && "line-clamp-2"
                  )}
                />
                <div
                  className={cn(
                    "flex justify-end",
                    !isShowingMore ? "-translate-y-6" : "mb-2"
                  )}
                >
                  {isTruncated && (
                    <button
                      onClick={toggleIsShowingMore}
                      className={cn(
                        "block bg-background text-foreground/60 text-start",
                        !isShowingMore ? "w-fit" : ""
                      )}
                    >
                      {isShowingMore ? "Show less" : "...Show more"}
                    </button>
                  )}
                </div>
              </div>
            </div>
            <div className="mt-2">
              <p>
                <span>Replying to </span>
                <Link href={""} className="text-colorPrimary">
                  @{post.user.username}
                </Link>
              </p>
            </div>
            <div className="flex mt-4 gap-x-1 sm:gap-x-1 items-start">
              <Image
                width={45}
                height={45}
                className="size-[30px] sm:size-[45px] rounded-full object-cover"
                alt="icon"
                src={
                  userData?.user?.usermeta?.avatar ?? profileImageplaceholder
                }
              />
              {/* <Textarea
                ref={textAreaRef}
                onChange={handleChange}
                placeholder="Post your reply"
                className="text-white focus:ring-transparent focus-visible:ring-transparent ring-transparent ring-offset-transparent focus-visible:ring-offset-transparent focus:ring-offset-transparent focus-visible:ring-contentBg ring-offset-0 placeholder:text-inactive border-none flex-1 text-base sm:text-xl font-normal bg-transparent py-4 pt-2 resize-none"
              /> */}
              <MessageBox
                // readOnly={currentPost?.type == "poll"}
                value={value}
                placeholder={"Post your reply"}
                handleChange={(e, newValue, newPlainTextValue, mentions) => {
                  setValue(newPlainTextValue);
                  // if (currentPost) {
                  //   setPostContent(newPlainTextValue);
                  // }
                  // setMentions(mentions);
                  // setTags

                  return {
                    e,
                    newValue,
                    newPlainTextValue,
                    mentions,
                  };
                }}
              />
            </div>
            <div className="mt-10 flex justify-end items-center">
              <Button
                disabled={value.trim().length <= 0 || comment.isPending}
                onClick={() =>
                  handleAction({ postId: post.id, commentValue: value })
                }
                className="flex-1 hover:scale-105 transition-all hover:shadow-xl hover:bg-colorPrimary bg-colorPrimary border border-colorPrimary text-white rounded-full flex justify-center items-center h-[36px] px-10 w-full max-w-[120px]"
              >
                {comment.isPending ? (
                  <div className="flex justify-center">
                    <ImSpinner2 className="size-6 animate-spin text-white" />
                  </div>
                ) : (
                  <span className="w-fit font-medium block p-0 align-middle">
                    {buttonText ?? "Reply"}
                  </span>
                )}
              </Button>
            </div>
          </div>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default PostReplyDialog;
