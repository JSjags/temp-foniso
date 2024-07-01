"use client";

import { HighlightMeta, LikeMeta, PostMeta } from "@/types";
import { Heart, Play, X } from "lucide-react";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { Dialog, DialogHeader, DialogOverlay } from "../ui/dialog";
import { DialogContent } from "@radix-ui/react-dialog";
import VideoPlayer from "./VideoPlayer";
import { cn, formatNumberCount, handlePostLikeIncrement } from "@/lib/utils";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { useMutation } from "@tanstack/react-query";
import { likeOrUnlikePost } from "@/services/api/post";
import { profileImageplaceholder } from "@/constants";
import SportIcon from "./SportIcon";
import moment from "moment";
import { FaPlay } from "react-icons/fa6";
import { useUserContext } from "@/context/UserContext";
import ReactionButton from "../ReactionButton";
import {
  Credenza,
  CredenzaContent,
  CredenzaDescription,
  CredenzaFooter,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaTrigger,
} from "../ui/credenza";

type Props = {
  highlight: HighlightMeta;
  postData: PostMeta;
};

const HighlightCard = ({ highlight, postData }: Props) => {
  const router = useRouter();
  const [showVideo, setShowVideo] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [isTruncated, setIsTruncated] = useState(false);
  const [isShowingMore, setIsShowingMore] = useState(false);
  const [post, setPost] = useState<PostMeta>(postData);

  const [postLikedByMe, setPostLikedByMe] = useState<{
    status: boolean;
    emojiId: number;
  }>({
    status: post?.likedByMe.length > 0,
    emojiId: post?.likedByMe[0]?.emojiId ?? 0,
  });

  const ref = useRef(null);

  const { userData } = useUserContext();

  const likeOrUnlikeMutation = useMutation({
    mutationKey: ["like or unlike post", postLikedByMe],
    mutationFn: (data: { postId: number; type: string; emojiId: number }) =>
      likeOrUnlikePost(data.postId, data.type, data.emojiId),
    onSuccess: (data) => {
      console.log(data);
      let copiedPostLikes: LikeMeta[] = JSON.parse(JSON.stringify(post.likes));

      console.log(copiedPostLikes);
      console.log(userData?.user.id);
      console.log({ ...data.data.data, user: userData?.user });

      if (
        Boolean(
          copiedPostLikes.filter((like) => like.user.id === userData?.user.id)
            .length
        )
      ) {
        console.log(copiedPostLikes);
        copiedPostLikes.splice(
          copiedPostLikes.findIndex((obj) => obj.id === userData?.user.id),
          1
        );
      } else {
        copiedPostLikes = [
          ...copiedPostLikes,
          { ...data.data.data, user: userData?.user },
        ];
      }

      setPost((prev) => ({
        ...prev,
        likedByMe: [data.data.data],
        likes: copiedPostLikes,
        likesCount:
          data.data.data.emojiId !== null
            ? prev.likesCount + 1
            : prev.likesCount - 1,
      }));
    },
    onError: (error) => console.log(error),
  });

  const handlePostLikeRequest = (index: number) => {
    likeOrUnlikeMutation.mutate({
      postId: post.id,
      type: "post",
      emojiId: index,
    });
  };
  const toggleIsShowingMore = () => setIsShowingMore((prev) => !prev);

  return (
    <>
      <Credenza open={showVideo} onOpenChange={setShowVideo}>
        {/* <DialogOverlay className="flex justify-center items-center"> */}
        <CredenzaContent className="min-w-[240px] w-full min-[768px]:w-[95%] bg-background border-border rounded-3xl p-0 h-[90vh] min-[768px]:h-auto">
          <CredenzaDescription className="flex flex-col justify-between min-[768px]:flex-col h-full">
            <div className="w-[60%] pointer-events-none max-w-[339px] h-[50%] max-h-[288px] bg-[#164F34] absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-0 rounded-full blur-[70px]" />
            <div className="w-full mx-auto relative z-10 flex-1 flex justify-center items-center min-[768px]:flex-auto">
              <VideoPlayer
                src={highlight.media[0].media}
                poster={highlight.media[0].posterImage}
              />
            </div>
            <div className="p-4 items-center justify-between">
              <div>
                <div className="flex gap-x-3">
                  <Image
                    width={45}
                    height={45}
                    className="size-[36px] sm:size-[45px] rounded-full object-cover border border-border/50"
                    alt="avatar"
                    src={
                      highlight?.user?.usermeta?.avatar !== null
                        ? highlight?.user?.usermeta?.avatar
                        : profileImageplaceholder
                    }
                  />
                  <div>
                    <div className="flex gap-x-2 items-center">
                      <p className="text-foreground font-semibold text-base line-clamp-1 text-ellipsis">
                        {highlight?.user?.usermeta.firstname}{" "}
                        {highlight?.user?.usermeta.lastname}
                      </p>
                      <div className="flex gap-x-1 items-center">
                        {highlight.user.verified && (
                          <Image
                            width={14}
                            height={14}
                            className="size-[16px] rounded-full object-cover"
                            alt="avatar"
                            src={"/assets/app-icons/verified-icon.svg"}
                          />
                        )}
                        <SportIcon
                          category={highlight?.user?.usermeta?.favorite_sport}
                        />
                      </div>
                      <p className="text-sm text-inactive align-middle whitespace-nowrap">
                        {" "}
                        • {moment(highlight?.created_at).fromNow()}
                      </p>
                    </div>
                    <p className="text-inactive">
                      @{highlight?.user?.username}
                    </p>
                  </div>
                </div>
                <div className="mt-4">
                  <p
                    ref={ref}
                    dangerouslySetInnerHTML={{ __html: highlight.title }}
                    className={cn(
                      "text-foreground text-ellipsis hover:cursor-pointer",
                      !isShowingMore && "line-clamp-2"
                    )}
                    onClick={() => router.push(`/posts/${highlight.id}`)}
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
                  <div>
                    {Boolean(highlight.likes && highlight.likes.length) && (
                      <div className="text-colorWhite mt-2 text-base flex gap-x-2 item-center">
                        <Image
                          width={25}
                          height={25}
                          className="size-[25px] rounded-full object-cover"
                          alt="icon"
                          src={highlight.likes[0]?.user?.usermeta.avatar ?? ""}
                        />
                        <p className="text-foreground/70">
                          Liked by{" "}
                          <span className="font-bold text-foreground">
                            {highlight.likes[0]?.user?.username}
                          </span>{" "}
                          {Boolean(highlight.likesCount - 1 >= 1) && (
                            <span>
                              and{" "}
                              <span className="font-bold text-foreground">
                                {highlight.likesCount - 1}
                              </span>{" "}
                              {highlight.likesCount - 1 > 1
                                ? "others"
                                : "other"}
                            </span>
                          )}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex mt-4 items-center">
                <ReactionButton
                  handlePostLikeIncrement={handlePostLikeIncrement}
                  handlePostLikeRequest={handlePostLikeRequest}
                  post={post}
                  setPost={setPost}
                  likeData={post.likedByMe}
                  postLikedByMe={postLikedByMe}
                  setPostLikedByMe={setPostLikedByMe}
                />
                <div
                  className="flex items-center border-x border-border px-3 cursor-pointer"
                  onClick={() => router.push(`/posts/${highlight.id}`)}
                  role="button"
                >
                  <Image
                    width={20}
                    height={20}
                    className="size-[20px] object-cover"
                    alt="icon"
                    src={"/assets/post-icons/comment.svg"}
                  />
                  <p className="text-foreground/60 px-2 pr-0 font">
                    {formatNumberCount(highlight.commentsCount)}
                  </p>
                </div>
                {/* Views modal */}
                <Credenza
                  open={showViewModal}
                  onOpenChange={(val) => setShowViewModal(val)}
                >
                  <CredenzaTrigger>
                    <div className="flex items-center pl-3 cursor-pointer">
                      <Image
                        width={20}
                        height={20}
                        className="size-[20px] object-cover"
                        alt="icon"
                        src={"/assets/post-icons/views.svg"}
                      />
                      <p className="text-foreground/60 px-2 font">
                        {formatNumberCount(highlight.viewsCount)}
                      </p>
                    </div>
                  </CredenzaTrigger>
                  <CredenzaContent className="w-full min-[768px]:w-[95%] bg-background border-border rounded-3xl">
                    <div
                      onClick={() => setShowViewModal(false)}
                      className="absolute hidden min-[768px]:flex top-4 right-4 w-fit h-fit p-0 bg-transparent border-none hover:text-darkGrey"
                    >
                      <X className="text-foreground hover:text-darkGrey" />
                    </div>
                    <div className="w-full min-[768px]:max-w-[369px] mx-auto">
                      <CredenzaHeader>
                        <CredenzaTitle className="text-2xl text-start min-[768px]:text-center font-bold text-foreground mt-0 min-[768px]:mt-6 w-full min-[768px]:max-w-[369px]">
                          Views
                        </CredenzaTitle>
                        <CredenzaDescription className="nt-0 text-start min-[768px]:text-center min-[768px]:mt-8 text-foreground/60 w-full min-[768px]:max-w-[369px]">
                          The times this post was seen.
                        </CredenzaDescription>
                      </CredenzaHeader>
                      <CredenzaFooter className="my-8 mt-0 min-[768px]:mt-10 w-full min-[768px]:max-w-[369px]">
                        <div
                          onClick={() => setShowViewModal(false)}
                          className="flex justify-center items-center rounded-full w-full bg-transparent border border-white hover:bg-white pt-0 h-10 min-[768px]:h-10 min-[768px]:pt-0 min-[768px]:py-6 text-center text-foreground hover:text-textDark"
                        >
                          Close
                        </div>
                      </CredenzaFooter>
                    </div>
                  </CredenzaContent>
                </Credenza>
              </div>
            </div>
          </CredenzaDescription>
        </CredenzaContent>
        {/* </DialogOverlay> */}
      </Credenza>
      <div className="cursor-pointer snap-start w-full max-w-[300px] min-w-[270px] h-[349px] aspect-square bg-background rounded-lg relative overflow-hidden">
        <div className="w-full h-full" onClick={() => setShowVideo(true)}>
          <div className="w-full h-full absolute left-0 top-0 group flex justify-center items-center bg-colorPrimary/0 z-10 transition-all hover:bg-colorPrimary/20">
            <div className="w-11 h-10 rounded-full bg-white/40 group-hover:bg-colorPrimary flex items-center justify-center transition-all">
              <FaPlay
                size={18}
                className="text-black/50 group-hover:text-white relative left-[2px]transition-all"
              />
            </div>
          </div>
        </div>
        <Image
          // width={600}
          // height={900}
          alt="trending-highlight"
          src={highlight?.media[0].posterImage}
          className="w-full h-full object-cover scale-[1.4]"
          fill
        />
        <div className="flex flex-col justify-center w-full bg-gradient-to-l from-[#222623]/20 via-[#161616]/70 to-[#080908] absolute bottom-0 h-[25%] max-h-[85px]  left-0 z-[1] px-2">
          <div className="text-white">
            <p className="mt-1 font-bold text-lg line-clamp-1 text-ellipsis">
              {highlight?.title}
            </p>
            <p className="font-medium text-base mt-1">
              @{highlight.user.username} • {highlight?.commentsCount} comments
            </p>
          </div>
        </div>
        <div />
      </div>
    </>
  );
};

export default HighlightCard;
