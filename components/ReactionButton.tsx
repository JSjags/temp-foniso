"use client";

import { useClickOutside } from "@/hooks/useClickOutside";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { LikeMeta, PostMeta } from "@/types";
import Image from "next/image";
import React, { Dispatch, SetStateAction, useRef, useState } from "react";
import { reactionsList } from "@/constants";

type Props = {
  post: PostMeta;
  setPost: Dispatch<SetStateAction<PostMeta>>;
  likeData: LikeMeta[];
  handlePostLikeRequest: (index: number) => void;
  handlePostLikeIncrement: (
    likesCount: number,
    initialLikedByMe: object[],
    likedByMe: boolean
  ) => number;
  postLikedByMe: {
    status: boolean;
    emojiId: number;
  };
  setPostLikedByMe: (
    value: SetStateAction<{
      status: boolean;
      emojiId: number;
    }>
  ) => void;
};

const spring = {
  type: "spring",
  stiffness: 300,
  damping: 20,
};

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  hover: {
    scale: 1.3,
    rotate: 15,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
    },
  },
};

const ReactionButton = ({
  post,
  setPost,
  likeData,
  handlePostLikeRequest,
  handlePostLikeIncrement,
  setPostLikedByMe,
  postLikedByMe,
}: Props) => {
  const reactionsRef = useRef<HTMLDivElement>(null);
  const [showReactions, setShowReactions] = useState(false);

  useClickOutside(reactionsRef, showReactions, setShowReactions);

  console.log(post?.likes);
  console.log(likeData);

  return (
    <div
      ref={reactionsRef}
      className="flex items-center cursor-pointer relative hover:bg-foreground/5 rounded-full mr-1 pl-1 h-7"
      role="button"
      onClick={(e) => {
        e.stopPropagation();
        setShowReactions(!showReactions);
        // handlePostLikeRequest();
        // setPostLikedByMe((prev) => !prev);
      }}
    >
      {/* show reactions */}
      <AnimatePresence>
        {showReactions && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={containerVariants}
            className="h-[60px] w-[clamp(240px,90vw,343px)] bg-border -top-20 rounded-3xl flex justify-around items-center absolute"
          >
            {reactionsList.slice(1).map((reaction: string, index: number) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={"hover"}
                className={cn(
                  "rounded-full p-1 hover:bg-foreground/20 cursor-pointer",
                  postLikedByMe.emojiId === index + 1 && "bg-foreground"
                )}
                role="button"
                onClick={() => {
                  handlePostLikeRequest(index + 1);
                  setShowReactions(false);
                  if (postLikedByMe.emojiId === index + 1) {
                    // setPost((prev) => ({
                    //   ...prev,
                    //   likesCount: prev.likesCount - 1,
                    // }));
                    setPostLikedByMe({ status: false, emojiId: 0 });
                  } else {
                    // setPost((prev) => ({
                    //   ...prev,
                    //   likesCount: prev.likesCount + 1,
                    // }));
                    setPostLikedByMe({ status: true, emojiId: index + 1 });
                  }
                }}
              >
                <Image
                  width={30}
                  height={30}
                  alt="reaction"
                  src={reaction}
                  className="size-7"
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {postLikedByMe.status ? (
        <Image
          width={20}
          height={20}
          alt="reaction"
          src={reactionsList[postLikedByMe.emojiId]}
          className="size-5"
        />
      ) : (
        <Image
          width={20}
          height={20}
          alt="reaction"
          src={reactionsList[0]}
          className="size-5"
        />
      )}
      <p
        className={cn(
          "text-foreground/70 px-2 font-medium",
          postLikedByMe.status && postLikedByMe.emojiId === 1 && "text-red-600",
          postLikedByMe.status && postLikedByMe.emojiId > 1 && "text-[#EEC239]"
        )}
      >
        {/* {formatNumberCount(
          handlePostLikeIncrement(
            post.likesCount,
            post.likedByMe,
            postLikedByMe
          )
        )} */}
        {!postLikedByMe.status && "Like"}
        {postLikedByMe.status && postLikedByMe.emojiId === 1 && "Liked"}
        {postLikedByMe.status && postLikedByMe.emojiId > 1 && "Reacted"}
      </p>
    </div>
  );
};

export default ReactionButton;
