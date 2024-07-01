// "use client";

// import { cn } from "@/lib/utils";
// import { PostProps } from "@/types";
// import React, { useLayoutEffect, useState } from "react";
// import { IoArrowBackCircle, IoArrowForwardCircle } from "react-icons/io5";
// import { Carousel } from "react-responsive-carousel";
// import VideoPlayer from "./VideoPlayer";
// import Image from "next/image";
// import { useRouter } from "next/navigation";

// type PostViewerProps = PostProps & {
//   setShowFullScreenPost: (state: boolean) => void;
//   showFullScreenPost: boolean;
//   autoPlay?: false;
// };

// const PostViewer = ({
//   postData: post,
//   setShowFullScreenPost,
//   showFullScreenPost,
//   autoPlay,
// }: PostViewerProps) => {
//   const router = useRouter();

//   return (
//     <div
//       onClick={(e) => {
//         e.stopPropagation();
//         // setShowFullScreenPost(true);
//         router.push(`?postid=${post.id}&view=fullscreen`, { scroll: false });
//       }}
//       className="w-full aspect-video bg-background rounded overflow-[visible_!important] cursor-pointer relative"
//     >
//       <Carousel
//         dynamicHeight={true}
//         showThumbs={false}
//         emulateTouch={true}
//         useKeyboardArrows={true}
//         renderIndicator={(onClickHandler, isSelected, index, label) => {
//           return (
//             <div
//               onClick={onClickHandler}
//               onKeyDown={onClickHandler}
//               key={index}
//               // value={index}
//               tabIndex={0}
//               className={cn(
//                 "pointer-events-auto size-[10px] translate-y-2 sm:size-[17px] inline-flex align-middle border-[10px] sm:border-[7px] border-black justify-center items-center bg-black",
//                 //   isSelected ? "bg-white size-[30px]" : "bg-inactive",
//                 index !== 0 &&
//                   index !== post.media.length - 1 &&
//                   "border-x-[1px] sm:border-x-[1px] w-[11px] sm:w-[13px]",
//                 index === 0 &&
//                   "rounded-l-full border-r-[1px] sm:border-r-[2px]",
//                 index === post.media.length - 1 &&
//                   "rounded-r-full border-l-[1px] sm:border-l-[2px]"
//               )}
//               role="button"
//               aria-label={`${label} ${index + 1}`}
//             >
//               <div
//                 className={cn(
//                   "size-[4px] sm:size-[6px] inline-flex align-middle rounded-full justify-center items-center",
//                   isSelected
//                     ? "bg-white size-[5px] sm:size-[7px]"
//                     : "bg-inactive"
//                 )}
//               />
//             </div>
//           );
//         }}
//         renderArrowPrev={(clickHandler, hasPrev) => (
//           <div
//             onClick={(e) => e.stopPropagation()}
//             className={cn(
//               "pointer-events-none min-w-[50px] absolute z-10 left-0 top-0 h-full flex items-center px-2"
//             )}
//           >
//             <div className="pointer-events-auto group h-1/2 min-w-[50px] flex justify-center items-center">
//               {hasPrev && (
//                 <IoArrowBackCircle
//                   color="white"
//                   className="text-[40px] hidden group-hover:block relative z-20"
//                   onClick={clickHandler}
//                 />
//               )}
//             </div>
//           </div>
//         )}
//         renderArrowNext={(clickHandler, hasNext) => (
//           <div
//             onClick={(e) => e.stopPropagation()}
//             className={cn(
//               "pointer-events-none min-w-[50px] absolute z-10 right-0 top-0 h-full flex items-center px-2"
//             )}
//           >
//             <div className="pointer-events-auto group h-1/2 min-w-[50px] flex justify-center items-center">
//               {hasNext && (
//                 <IoArrowForwardCircle
//                   color="white"
//                   className="text-[40px] hidden group-hover:block relative z-20"
//                   onClick={clickHandler}
//                 />
//               )}
//             </div>
//           </div>
//         )}
//         className="rounded min-h-fit max-h-[80vh] flex items-center relative"
//       >
//         {post?.media.map((media, i) => (
//           <div key={i} className={cn(media.mediatype === "video" ? "" : "")}>
//             {media.mediaType === "video" ? (
//               <VideoPlayer
//                 src={media.media}
//                 poster={media.posterImage}
//                 autoPlay={true}
//                 stopOuterPlay={true}
//               />
//             ) : (
//               // <p>Video</p>
//               <Image
//                 width={1240}
//                 height={1080}
//                 layout="responsive"
//                 src={media.media}
//                 className="rounded-md max-h-[80vh] object-contain object-center"
//                 onClick={() => setShowFullScreenPost(true)}
//                 alt=""
//               />
//             )}
//           </div>
//         ))}
//       </Carousel>
//     </div>
//   );
// };

// export default PostViewer;

"use client";

import { cn } from "@/lib/utils";
import { PostProps } from "@/types";
import React, { useEffect, memo, useState } from "react";
import { IoArrowBackCircle, IoArrowForwardCircle } from "react-icons/io5";
import { Carousel } from "react-responsive-carousel";
import VideoPlayer from "./VideoPlayer";
import Image from "next/image";
import { useRouter } from "next/navigation";
import "react-responsive-carousel/lib/styles/carousel.min.css";

type PostViewerProps = PostProps & {
  setShowFullScreenPost: (state: boolean) => void;
  showFullScreenPost: boolean;
  autoPlay?: false;
};

const PostViewer = ({
  postData: post,
  setShowFullScreenPost,
  showFullScreenPost,
  autoPlay,
}: PostViewerProps) => {
  const router = useRouter();

  const [showMedia, setShowMedia] = useState();

  useEffect(() => {
    // Ensuring client-side logic runs only after component has been mounted
  }, []);

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        router.push(`?postid=${post.id}&view=fullscreen`, { scroll: false });
      }}
      className="w-full aspect-video bg-background rounded overflow-visible cursor-pointer relative"
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
              tabIndex={0}
              className={cn(
                "pointer-events-auto size-[10px] translate-y-2 sm:size-[17px] inline-flex align-middle border-[10px] sm:border-[7px] border-black justify-center items-center bg-black",
                index !== 0 &&
                  index !== post.media.length - 1 &&
                  "border-x-[1px] sm:border-x-[1px] w-[11px] sm:w-[13px]",
                index === 0 &&
                  "rounded-l-full border-y-[1px] border-r-[1px] sm:border-r-[2px]",
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
            onClick={(e) => e.stopPropagation()}
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
            onClick={(e) => e.stopPropagation()}
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
        className="rounded min-h-fit max-h-[80vh] flex items-center relative"
        key={post.id} // Adding a key to ensure Carousel resets correctly
      >
        {post?.media.map((media, i) => (
          <div
            key={i}
            className={cn(
              "w-full h-auto",
              media.mediatype === "video" ? "" : ""
            )}
          >
            {media.mediaType === "video" ? (
              <VideoPlayer
                src={media.media}
                poster={media.posterImage}
                autoPlay={true}
                stopOuterPlay={true}
              />
            ) : (
              <Image
                width={1240}
                height={1080}
                // layout="responsive"
                priority
                src={media.media}
                className="rounded-md max-h-[80vh] object-contain object-center"
                onClick={() => setShowFullScreenPost(true)}
                draggable={false}
                alt=""
              />
            )}
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default memo(PostViewer);
