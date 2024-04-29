"use client";

import Image from "next/image";
import SportIcon from "./SportIcon";
import { MoreVertical, X } from "lucide-react";
import { Button } from "../ui/button";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { cn } from "@/lib/utils";
import { IoArrowBackCircle, IoArrowForwardCircle } from "react-icons/io5";
import { IoIosCheckmarkCircle } from "react-icons/io";
import {
  placeholderComments,
  reportReasons,
  userPlaceholderImage,
} from "@/constants";
import { useLayoutEffect, useRef, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { PostProps } from "@/types";
import PostViewer from "./PostViewer";
import VideoPlayer from "./VideoPlayer";
import { image } from "@cloudinary/url-gen/qualifiers/source";

const DummyPost = ({ post }: PostProps) => {
  const [showViewModal, setShowViewModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showReportSuccessModal, setShowReportSuccessModal] = useState(false);
  const [showFullScreenPost, setShowFullScreenPost] = useState(false);
  const [isTruncated, setIsTruncated] = useState(false);
  const [isShowingMore, setIsShowingMore] = useState(false);

  const ref = useRef(null);

  useLayoutEffect(() => {
    const { offsetHeight, scrollHeight } = ref.current || {
      offsetHeight: null,
      scrollHeight: null,
    };

    if (offsetHeight && scrollHeight && offsetHeight < scrollHeight) {
      setIsTruncated(true);
    } else {
      setIsTruncated(false);
    }
  }, [ref]);

  const toggleIsShowingMore = () => setIsShowingMore((prev) => !prev);

  return (
    <div className="py-4 px-2 sm:px-5 relative z-10 overflow-x-hidden border-none bg-background sm:bg-inherit border-border">
      {/* Views modal */}
      <AlertDialog open={showViewModal}>
        <AlertDialogContent className="w-[95%] bg-background border-border rounded-3xl">
          <AlertDialogCancel
            onClick={() => setShowViewModal(false)}
            className="absolute top-4 right-4 w-fit h-fit p-0 bg-transparent border-none hover:text-darkGrey"
          >
            <X className="text-foreground hover:text-darkGrey" />
          </AlertDialogCancel>
          <div className="w-full sm:max-w-[369px] mx-auto">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-2xl font-bold text-foreground mt-6 max-w-[369px]">
                Views
              </AlertDialogTitle>
              <AlertDialogDescription className="mt-8 text-foreground/60 max-w-[369px]">
                The times this post was seen.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="my-8 mt-10 max-w-[369px]">
              <AlertDialogCancel
                onClick={() => setShowViewModal(false)}
                className="rounded-full w-full bg-transparent border-border hover:bg-white py-6 text-center text-foreground hover:text-textDark"
              >
                Close
              </AlertDialogCancel>
            </AlertDialogFooter>
          </div>
        </AlertDialogContent>
      </AlertDialog>
      {/* Report modal */}
      <AlertDialog open={showReportModal}>
        <AlertDialogContent className="w-[95%] p-0 bg-background border-border rounded-3xl">
          <div className="w-full mx-auto">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-xl sm:text-2xl py-3 font-bold text-foreground mt-0 border-b border-border">
                <p className="text-center">Report post</p>
                <p className="font-normal text-base text-inactive text-center">
                  Why are you reporting this post
                </p>
              </AlertDialogTitle>
              <AlertDialogDescription className="mt-8 text-inactive px-2 sm:px-6">
                <div className="w-full">
                  <RadioGroup defaultValue="comfortable">
                    {reportReasons.map((reason, id) => (
                      <div
                        key={id}
                        className="flex items-center space-x-2 py-2 pb-4 justify-between border-b border-border"
                      >
                        <Label
                          htmlFor={String(id)}
                          className="text-foreground text-base"
                        >
                          {reason.reason}
                        </Label>
                        <RadioGroupItem
                          value={reason.reason}
                          id={reason.reason}
                          className="text-brand-primary border-border"
                        />
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="my-8 mt-10 px-2 sm:px-6 flex justify-end">
              <AlertDialogCancel
                onClick={() => {
                  setShowReportSuccessModal(true);
                  setShowReportModal(false);
                }}
                className="rounded-full w-[180px] bg-transparent border-border hover:bg-white py-4 px-6 text-center text-foreground hover:text-textDark"
              >
                Submit
              </AlertDialogCancel>
            </AlertDialogFooter>
          </div>
        </AlertDialogContent>
      </AlertDialog>
      {/* Report success modal */}
      <Dialog
        open={showReportSuccessModal}
        onOpenChange={() => setShowReportSuccessModal(false)}
      >
        <DialogContent className="w-[95%] p-0 bg-background border-border rounded-3xl">
          <div className="w-full mx-auto">
            <DialogHeader>
              <DialogTitle className="text-xl sm:text-2xl py-3 font-bold text-foreground mt-0">
                <div className="flex justify-center mt-10 sm:mt-20">
                  <IoIosCheckmarkCircle className="text-colorPrimary size-10 sm:size-14" />
                </div>
                <p className="text-center max-w-[400px] mx-auto mt-2 sm:px-10">
                  Thank you for letting us know
                </p>
              </DialogTitle>
              <DialogDescription className="mt-2 text-inactive px-2 mb-10 sm:mb-20">
                <div className="flex justify-center max-w-[360px] mx-auto pb-4 border-b border-contentBorder">
                  <p className="text-center text-foreground/80 mx-auto mt-2 sm:px-4">
                    We received your report. We’ll hide the reported post from
                    your timeline in the meantime.
                  </p>
                </div>
                <div className="flex flex-col items-center gap-y-4 my-6 mb-6 sm:mb-20">
                  <Button
                    variant={"ghost"}
                    className="hover:bg-white text-foreground/70 hover:text-foreground w-[200px] rounded-full"
                  >
                    Mute @Fightnight
                  </Button>
                  <Button
                    variant={"ghost"}
                    className="hover:bg-white text-foreground/70 hover:text-foreground w-[200px] rounded-full"
                  >
                    Block @Fightnight
                  </Button>
                </div>
              </DialogDescription>
            </DialogHeader>
          </div>
          <DialogClose
            asChild={true}
            onClick={() => setShowReportSuccessModal(false)}
            className="group absolute right-4 top-4 z-50 cursor-pointer hover:bg-white bg-background rounded w-fit h-fit p-0 border-none hover:text-darkGrey"
          >
            <X className="text-foreground group-hover:text-darkGrey" />
          </DialogClose>
        </DialogContent>
      </Dialog>
      {/* Fullscreen post modal */}
      <Dialog
        open={showFullScreenPost}
        onOpenChange={() => setShowFullScreenPost(false)}
      >
        <DialogContent className="w-full h-full sm:min-w-[85%] sm:h-[85dvh] sm:max-h-[85dvh] p-0 bg-background border-border rounded-3xl overflow-hidden">
          <div className="w-full mx-auto flex">
            <div className="w-3/5 h-full sm:h-[85dvh] sm:max-h-[85dvh] bg-background border-r border-border flex justify-center items-center">
              <PostViewer
                post={post}
                setShowFullScreenPost={(value: boolean) =>
                  setShowFullScreenPost(value)
                }
                showFullScreenPost={showFullScreenPost}
              />
            </div>
            <div className="w-2/5 h-full sm:h-[85dvh] sm:max-h-[85dvh] relative overflow-y-scroll">
              <div className="p-4 border-b border-border">
                <div className="flex gap-x-3">
                  <Image
                    width={45}
                    height={45}
                    className="size-[36px] sm:size-[45px] rounded-full object-cover"
                    alt="avatar"
                    src={post.avatar}
                  />
                  <div>
                    <div className="flex gap-x-2 items-center">
                      <p className="text-foreground font-semibold text-base line-clamp-1 text-ellipsis">
                        {post.displayName}
                      </p>
                      <div className="flex gap-x-1 items-center">
                        <Image
                          width={14}
                          height={14}
                          className="size-[16px] rounded-full object-cover"
                          alt="avatar"
                          src={"/assets/app-icons/verified-icon.svg"}
                        />
                        <SportIcon category={post.favorite_sport} />
                      </div>
                    </div>
                    <p className="text-inactive">@{post.username}</p>
                  </div>
                </div>
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
                          "block bg-background text-foreground/50 text-start",
                          !isShowingMore ? "w-1/2" : ""
                        )}
                      >
                        {isShowingMore ? "Show less" : "...Show more"}
                      </button>
                    )}
                  </div>
                  <p className="font-normal text-foreground/50 pt-2 text-sm">
                    5:15PM, 15 Oct 2024
                  </p>
                  <div className="">
                    <div className="flex gap-x-4 mt-4 items-center">
                      <div className="flex items-center text-inactive">
                        <p className="text-foreground pr-1 font-bold">
                          {post.likes_count}
                        </p>{" "}
                        Likes
                      </div>
                      <div className="flex items-center text-inactive">
                        <p className="text-foreground pr-1 font-bold ">
                          {post.comment_count}
                        </p>{" "}
                        Comments
                      </div>
                      <div
                        onClick={() => setShowViewModal(true)}
                        className="flex items-center cursor-pointer text-inactive"
                      >
                        <Image
                          width={20}
                          height={20}
                          className="size-[20px] object-cover"
                          alt="icon"
                          src={"/assets/post-icons/views.svg"}
                        />
                        <p className="pr-1 font-bold text-foreground">
                          {post.views_count}
                        </p>{" "}
                        Views
                      </div>
                    </div>
                    <div className="flex gap-x-4 mt-3">
                      <Image
                        width={20}
                        height={20}
                        className="size-[20px] object-cover"
                        alt="icon"
                        src={"/assets/post-icons/like.svg"}
                      />
                      <Image
                        width={20}
                        height={20}
                        className="size-[20px] object-cover"
                        alt="icon"
                        src={"/assets/post-icons/comment.svg"}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <p className="py-2 border-b border-border font-bold text-foreground pl-4 sticky top-0 z-50 bg-background">
                Comments
              </p>
              <div className="p-4 pb-6 relative">
                {placeholderComments.map((comment, i) => (
                  <div className="" key={i}>
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex gap-x-3">
                        <Image
                          width={45}
                          height={45}
                          className="size-[36px] sm:size-[45px] rounded-full object-cover"
                          alt="avatar"
                          src={comment.avatar}
                        />
                        <div>
                          <div className="flex gap-x-2 items-center">
                            <p className="text-foreground font-semibold text-base line-clamp-1 text-ellipsis">
                              {comment.displayName}
                            </p>
                            <div className="flex gap-x-1 items-center">
                              <Image
                                width={14}
                                height={14}
                                className="size-[16px] rounded-full object-cover"
                                alt="avatar"
                                src={"/assets/app-icons/verified-icon.svg"}
                              />
                            </div>
                            <p className="text-sm text-inactive align-middle whitespace-nowrap">
                              {" "}
                              • {post.created_at}
                            </p>
                          </div>
                          <p className="text-inactive">@{comment.username}</p>
                        </div>
                      </div>
                      {/* <Button variant={"ghost"} className=" bg-transparent px-0"> */}

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
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
                        <DropdownMenuContent className="w-[clamp(240px,80%,424px)] md:w-[324px] lg:w-[420px] absolute -translate-x-[105%] top-0 bg-contentBg border-contentBorder">
                          <DropdownMenuGroup className="">
                            <DropdownMenuItem className="p-4 text-base text-foreground font-semibold data-[highlighted]:text-black">
                              <Image
                                width={24}
                                height={24}
                                className="size-[24px] mr-4 object-cover"
                                alt="icon"
                                src={"/assets/post-icons/save-post.svg"}
                              />
                              <span>Save Post</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="p-4 text-base text-foreground font-semibold data-[highlighted]:text-black">
                              <Image
                                width={24}
                                height={24}
                                className="size-[24px] mr-4 object-cover"
                                alt="icon"
                                src={"/assets/post-icons/not-interested.svg"}
                              />
                              <span>Not interested in this post</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="p-4 text-base text-foreground font-semibold data-[highlighted]:text-black">
                              <Image
                                width={24}
                                height={24}
                                className="size-[24px] mr-4 object-cover"
                                alt="icon"
                                src={"/assets/post-icons/follow.svg"}
                              />
                              <span>Follow @{comment.username}</span>
                            </DropdownMenuItem>
                          </DropdownMenuGroup>
                          <DropdownMenuSeparator className="mx-2 bg-contentBorder" />
                          <DropdownMenuGroup>
                            <DropdownMenuItem className="p-4 text-base text-foreground font-semibold data-[highlighted]:text-black">
                              <Image
                                width={24}
                                height={24}
                                className="size-[24px] mr-4 object-cover"
                                alt="icon"
                                src={"/assets/post-icons/mute.svg"}
                              />
                              <span>Mute @{comment.username}</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="p-4 text-base text-foreground font-semibold data-[highlighted]:text-black">
                              <Image
                                width={24}
                                height={24}
                                className="size-[24px] mr-4 object-cover"
                                alt="icon"
                                src={"/assets/post-icons/block.svg"}
                              />
                              <span>Block @{comment.username}</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => setShowReportModal(true)}
                              className="p-4 text-base text-foreground font-semibold data-[highlighted]:text-black"
                            >
                              <Image
                                width={24}
                                height={24}
                                className="size-[24px] mr-4 object-cover"
                                alt="icon"
                                src={"/assets/post-icons/report.svg"}
                              />
                              <span>Report comment</span>
                            </DropdownMenuItem>
                          </DropdownMenuGroup>
                        </DropdownMenuContent>
                      </DropdownMenu>
                      {/* </Button> */}
                    </div>
                    <p
                      ref={ref}
                      dangerouslySetInnerHTML={{ __html: comment.content }}
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
                            "block bg-background text-inactive text-start",
                            !isShowingMore ? "w-fit" : ""
                          )}
                        >
                          {isShowingMore ? "Show less" : "...Show more"}
                        </button>
                      )}
                    </div>
                    {/* media box */}
                    {comment.media && comment.media.length ? (
                      <div className="mt-2">
                        <PostViewer
                          post={post}
                          setShowFullScreenPost={setShowFullScreenPost}
                          showFullScreenPost={showFullScreenPost}
                        />
                      </div>
                    ) : null}
                    <div>
                      <div className="flex mt-6 items-center">
                        <div className="flex items-center">
                          <Image
                            width={20}
                            height={20}
                            className="size-[20px] object-cover"
                            alt="icon"
                            src={"/assets/post-icons/like.svg"}
                          />
                          <p className="text-red-600 px-2 font-medium">
                            {comment.likes_count}
                          </p>
                        </div>
                        <div className="flex items-center border-x border-contentBorder px-3">
                          <Image
                            width={20}
                            height={20}
                            className="size-[20px] object-cover"
                            alt="icon"
                            src={"/assets/post-icons/comment.svg"}
                          />
                          <p className="text-foreground/60 px-2 font">
                            {comment.comment_count}
                          </p>
                        </div>
                        <div
                          onClick={() => setShowViewModal(true)}
                          className="flex items-center pl-3 cursor-pointer"
                        >
                          <Image
                            width={20}
                            height={20}
                            className="size-[20px] object-cover"
                            alt="icon"
                            src={"/assets/post-icons/views.svg"}
                          />
                          <p className="text-foreground/60 px-2 font">
                            {comment.views_count}
                          </p>
                        </div>
                      </div>
                      <Button
                        variant={"ghost"}
                        className="flex justify-start w-full px-4 font-normal bg-[#224731] text-white rounded-lg hover:bg-colorPrimary hover:text-foreground mt-2 mb-8"
                      >
                        See {comment.comment_count} replies
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 border-t border-border sticky bottom-0 w-full z-50 text-foreground bg-background">
                <Image
                  width={25}
                  height={25}
                  className="size-[25px] rounded-full object-cover absolute top-6 left-6"
                  alt="icon"
                  src={userPlaceholderImage}
                />
                <Input
                  placeholder="Reply to @On3sports"
                  className="rounded-full bg-foreground/10 border-none pr-14 placeholder:text-foreground/80 pl-10"
                />
                <Button
                  variant={"ghost"}
                  className="text-colorPrimary absolute right-4 top-4"
                >
                  Send
                </Button>
              </div>
            </div>
          </div>
          <DialogClose
            asChild={true}
            onClick={() => setShowFullScreenPost(false)}
            className="group absolute right-4 top-3 z-50 hover:bg-white rounded w-fit h-fit p-0 bg-background hover:bg-foreground/10 backdrop-blur-xl border-none hover:text-darkGrey"
          >
            <X className="text-foreground group-hover:text-darkGrey" />
          </DialogClose>
        </DialogContent>
      </Dialog>

      <div>
        <div className="flex items-start justify-between">
          <div className="flex gap-x-3">
            <Image
              width={45}
              height={45}
              className="size-[36px] sm:size-[45px] rounded-full object-cover"
              alt="avatar"
              src={post.avatar}
            />
            <div>
              <div className="flex gap-x-2 items-center">
                <p className="text-foreground font-semibold text-base line-clamp-1 text-ellipsis">
                  {post.displayName}
                </p>
                <div className="flex gap-x-1 items-center">
                  <Image
                    width={14}
                    height={14}
                    className="size-[16px] rounded-full object-cover"
                    alt="avatar"
                    src={"/assets/app-icons/verified-icon.svg"}
                  />
                  <SportIcon category={post.favorite_sport} />
                </div>
                <p className="text-sm text-inactive align-middle whitespace-nowrap">
                  {" "}
                  • {post.created_at}
                </p>
              </div>
              <p className="text-inactive">@{post.username}</p>
            </div>
          </div>
          {/* <Button variant={"ghost"} className=" bg-transparent px-0"> */}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
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
            <DropdownMenuContent className="w-[clamp(240px,80%,424px)] md:w-[324px] lg:w-[420px] absolute -translate-x-[105%] top-0 bg-background border-border">
              <DropdownMenuGroup className="">
                <DropdownMenuItem className="p-4 text-base text-foreground font-semibold data-[highlighted]:text-black">
                  <Image
                    width={24}
                    height={24}
                    className="size-[24px] mr-4 object-cover"
                    alt="icon"
                    src={"/assets/post-icons/save-post.svg"}
                  />
                  <span>Save Post</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="p-4 text-base text-foreground font-semibold data-[highlighted]:text-black">
                  <Image
                    width={24}
                    height={24}
                    className="size-[24px] mr-4 object-cover"
                    alt="icon"
                    src={"/assets/post-icons/not-interested.svg"}
                  />
                  <span>Not interested in this post</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="p-4 text-base text-foreground font-semibold data-[highlighted]:text-black">
                  <Image
                    width={24}
                    height={24}
                    className="size-[24px] mr-4 object-cover"
                    alt="icon"
                    src={"/assets/post-icons/follow.svg"}
                  />
                  <span>Follow @Fightnight</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator className="mx-2 bg-border" />
              <DropdownMenuGroup>
                <DropdownMenuItem className="p-4 text-base text-foreground font-semibold data-[highlighted]:text-black">
                  <Image
                    width={24}
                    height={24}
                    className="size-[24px] mr-4 object-cover"
                    alt="icon"
                    src={"/assets/post-icons/mute.svg"}
                  />
                  <span>Mute @Fightnight</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="p-4 text-base text-foreground font-semibold data-[highlighted]:text-black">
                  <Image
                    width={24}
                    height={24}
                    className="size-[24px] mr-4 object-cover"
                    alt="icon"
                    src={"/assets/post-icons/block.svg"}
                  />
                  <span>Block @Fightnight</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setShowReportModal(true)}
                  className="p-4 text-base text-foreground font-semibold data-[highlighted]:text-black"
                >
                  <Image
                    width={24}
                    height={24}
                    className="size-[24px] mr-4 object-cover"
                    alt="icon"
                    src={"/assets/post-icons/report.svg"}
                  />
                  <span>Report post</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
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
          {/* media box */}
          <div className="mt-3">
            <PostViewer
              post={post}
              setShowFullScreenPost={(value: boolean) =>
                setShowFullScreenPost(value)
              }
              showFullScreenPost={showFullScreenPost}
            />
          </div>
          <div>
            <div className="text-colorWhite mt-2 text-base flex gap-x-2 item-center">
              <Image
                width={25}
                height={25}
                className="size-[25px] rounded-full object-cover"
                alt="icon"
                src={userPlaceholderImage}
              />
              <p className="text-foreground/70">
                Liked by{" "}
                <span className="font-bold text-foreground">Janedoe</span> and{" "}
                <span className="font-bold text-foreground">499</span> others
              </p>
            </div>
            <div className="flex mt-4 items-center">
              <div className="flex items-center">
                <Image
                  width={20}
                  height={20}
                  className="size-[20px] object-cover"
                  alt="icon"
                  src={"/assets/post-icons/like.svg"}
                />
                <p className="text-red-600 px-2 font-medium">
                  {post.likes_count}
                </p>
              </div>
              <div className="flex items-center border-x border-border px-3">
                <Image
                  width={20}
                  height={20}
                  className="size-[20px] object-cover"
                  alt="icon"
                  src={"/assets/post-icons/comment.svg"}
                />
                <p className="text-foreground/60 px-2 font">
                  {post.comment_count}
                </p>
              </div>
              <div
                onClick={() => setShowViewModal(true)}
                className="flex items-center pl-3 cursor-pointer"
              >
                <Image
                  width={20}
                  height={20}
                  className="size-[20px] object-cover"
                  alt="icon"
                  src={"/assets/post-icons/views.svg"}
                />
                <p className="text-foreground/60 px-2 font">
                  {post.views_count}
                </p>
              </div>
            </div>
            <Button
              variant={"ghost"}
              className="text-inactive p-0 hover:bg-transparent hover:text-foreground"
            >
              View all comments
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DummyPost;
