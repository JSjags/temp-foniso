import { cn } from "@/lib/utils";
import { PostProps } from "@/types";
import React, { useState } from "react";
import { IoArrowBackCircle, IoArrowForwardCircle } from "react-icons/io5";
import { Carousel } from "react-responsive-carousel";
import VideoPlayer from "./VideoPlayer";

type PostViewerProps = PostProps & {
  setShowFullScreenPost: (state: boolean) => void;
  showFullScreenPost: boolean;
};

const PostViewer = ({
  post,
  setShowFullScreenPost,
  showFullScreenPost,
}: PostViewerProps) => {
  return (
    <div
      className="w-full aspect-video bg-background rounded overflow-hidden cursor-pointer"
      onClick={() => setShowFullScreenPost(true)}
    >
      <Carousel
        dynamicHeight={true}
        showThumbs={false}
        emulateTouch={true}
        useKeyboardArrows={true}
        renderIndicator={(onClickHandler, isSelected, index, label) => {
          return (
            <div
              onClick={onClickHandler}
              onKeyDown={onClickHandler}
              key={index}
              // value={index}
              tabIndex={0}
              className={cn(
                "pointer-events-auto size-[10px] translate-y-2 sm:size-[17px] inline-flex align-middle border-[10px] sm:border-[7px] border-black justify-center items-center bg-black",
                //   isSelected ? "bg-white size-[30px]" : "bg-inactive",
                index !== 0 &&
                  index !== post.media.length - 1 &&
                  "border-x-[1px] sm:border-x-[1px] w-[11px] sm:w-[13px]",
                index === 0 &&
                  "rounded-l-full border-r-[1px] sm:border-r-[2px]",
                index === post.media.length - 1 &&
                  "rounded-r-full border-l-[1px] sm:border-l-[2px]"
              )}
              role="button"
              aria-label={`${label} ${index + 1}`}
            >
              <div
                className={cn(
                  "size-[4px] sm:size-[6px] inline-flex align-middle rounded-full justify-center items-center",
                  isSelected
                    ? "bg-white size-[5px] sm:size-[7px]"
                    : "bg-inactive"
                )}
              />
            </div>
          );
        }}
        renderArrowPrev={(clickHandler, hasPrev) => (
          <div
            className={cn(
              "pointer-events-none min-w-[50px] absolute z-10 left-0 top-0 h-full flex items-center px-2"
            )}
          >
            <div className="pointer-events-auto group h-1/2 min-w-[50px] flex justify-center items-center">
              {hasPrev && (
                <IoArrowBackCircle
                  color="white"
                  className="text-[40px] hidden group-hover:block relative z-20"
                  onClick={clickHandler}
                />
              )}
            </div>
          </div>
        )}
        renderArrowNext={(clickHandler, hasNext) => (
          <div
            className={cn(
              "pointer-events-none min-w-[50px] absolute z-10 right-0 top-0 h-full flex items-center px-2"
            )}
          >
            <div className="pointer-events-auto group h-1/2 min-w-[50px] flex justify-center items-center">
              {hasNext && (
                <IoArrowForwardCircle
                  color="white"
                  className="text-[40px] hidden group-hover:block relative z-20"
                  onClick={clickHandler}
                />
              )}
            </div>
          </div>
        )}
        className="rounded h-fit"
      >
        {post.media.map((media, i) => (
          <div key={i}>
            {media.type === "video" ? (
              <VideoPlayer src={media.url} />
            ) : (
              <img src={media.url} />
            )}
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default PostViewer;
