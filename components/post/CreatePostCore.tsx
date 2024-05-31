"use client";

import { useUserContext } from "@/context/UserContext";
import useAutosizeTextArea from "@/hooks/useAutoSizeTextArea";
import React, { ChangeEvent, Dispatch, useRef, useState } from "react";
import reduceImageQuality from "../reusable/FileReader";
import { Input } from "../ui/input";
import { SelectDestination } from "./SelectDestination";
import Image from "next/image";
import { profileImageplaceholder } from "@/constants";
import MessageBox from "../reusable/MessageBox";
import { cn } from "@/lib/utils";
import { IoCloseCircleSharp } from "react-icons/io5";
import { Label } from "../ui/label";
import { Info, Plus, SquarePlus, Trash2 } from "lucide-react";
import { WhoCanReply } from "./WhoCanReply";
import { Button } from "../ui/button";
import { MentionItem } from "react-mentions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPostQuery, updatePostQuery } from "@/services/api/userService";
import toast from "react-hot-toast";
import ErrorToast from "../reusable/toasts/ErrorToast";
import SuccessToast from "../reusable/toasts/SuccessToast";
import { ImSpinner2 } from "react-icons/im";
import { imageUrlToFile } from "@/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Switch } from "../ui/switch";
import { Media } from "@/types";

type Props = {
  wrapperClassName?: string;
  selectedFiles: File[];
  id: string;
  setSelectedFiles: Dispatch<React.SetStateAction<File[]>>;
};

const CreatePostCore = ({
  wrapperClassName,
  selectedFiles,
  setSelectedFiles,
  id,
}: Props) => {
  const queryClient = useQueryClient();
  const { userData, setShowCreatePost, currentPost } = useUserContext();
  const [poll, setPoll] = useState({
    options: [{ value: "" }, { value: "" }],
    duration: "1",
    allowVoteChange: false,
  });
  // const [files, setFiles] = useState<FileList | null>(null);

  const [value, setValue] = useState("");
  const [postType, setPostType] = useState("post");
  const [mentions, setMentions] = useState<MentionItem[]>();
  const [replyOption, setReplyOption] = useState<string>("Everyone");
  const [communityId, setCommunityId] = useState<number | null>(
    currentPost ? currentPost.communityId : null
  );

  // EDIT POST
  // Image urls state if current user has media
  console.log(currentPost?.media);
  console.log(currentPost);
  console.log(communityId);

  const [media, setMedia] = useState([...(currentPost?.media ?? [])]);
  const [mediaToRemove, setMediaToRemove] = useState<Media[]>([]);
  const [postContent, setPostContent] = useState(currentPost?.content);
  const [canReply, setCanReply] = useState<string>(
    currentPost?.canReply! ?? "Everyone"
  );
  const [postCommunityId, setPostCommunityId] = useState(
    currentPost?.communityId
  );

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useAutosizeTextArea(textAreaRef.current, value);

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      if (media.length) {
        const fileArray = Array.from(e.target.files);
        const reducedFiles = await reduceImageQuality(fileArray);
        if (selectedFiles.length && selectedFiles.length < 4) {
          const filesToAdd = reducedFiles.splice(
            0,
            4 - selectedFiles.length
          ) as File[];
          setSelectedFiles([...selectedFiles, ...filesToAdd]);
        } else if (!selectedFiles.length) {
          setSelectedFiles(reducedFiles as File[]);
        } else {
          return;
        }
        return;
      }
      const fileArray = Array.from(e.target.files);
      const reducedFiles = await reduceImageQuality(fileArray);
      if (selectedFiles.length && selectedFiles.length < 4) {
        const filesToAdd = reducedFiles.splice(
          0,
          4 - selectedFiles.length
        ) as File[];
        setSelectedFiles([...selectedFiles, ...filesToAdd]);
      } else if (!selectedFiles.length) {
        setSelectedFiles(reducedFiles.slice(0, 4) as File[]);
      } else {
        return;
      }
    }
  };
  // for new post
  const handleImageRemoval = (index: number) => {
    const newSelectedFiles = [...selectedFiles];
    newSelectedFiles.splice(index, 1);
    setSelectedFiles(newSelectedFiles);
  };
  // for edit post
  const handleCurrentPostImageRemoval = (index: number) => {
    if (Boolean(media) && Boolean(media?.length)) {
      const newMedia = [...media!];
      const medToRem = newMedia?.splice(index, 1);
      setMediaToRemove((prev) => [...prev, ...medToRem]);
      setMedia(newMedia);
    }
  };

  const isPostDisabled = () => {
    if (currentPost) {
      if (currentPost.type == "poll") return true;
      return !postContent && selectedFiles.length <= 0 && media.length <= 0;
    } else {
      if (postType === "poll") {
        console.log(poll.options.some((option) => option.value === ""));
        console.log(!value);
        return !value || poll.options.some((option) => option.value === "");
      } else {
        return !value && selectedFiles.length <= 0;
      }
    }
  };

  const createPost = useMutation({
    mutationKey: ["create-post"],
    mutationFn: (data: FormData) => createPostQuery(data),
    onSuccess: () => {
      setValue("");
      setSelectedFiles([]);
      queryClient.invalidateQueries({
        queryKey: ["get-posts", "fetch-users-posts"],
      });
      toast.custom((t) => (
        <SuccessToast t={t} message={"Post created successfully."} />
      ));
      setShowCreatePost(false);

      queryClient.invalidateQueries({
        type: "all",
      });
    },
    onError: (error) => {
      toast.custom((t) => (
        <ErrorToast
          t={t}
          message={error?.message ?? "Couldn't create your post."}
        />
      ));
    },
  });

  const updatePost = useMutation({
    mutationKey: ["update-post"],
    mutationFn: (data: FormData) => updatePostQuery(data, currentPost?.id!),
    onSuccess: () => {
      setValue("");
      setSelectedFiles([]);
      setMedia([]);
      queryClient.invalidateQueries({
        // queryKey: ["fetch-users-posts", "get-posts"],
        type: "all",
      });
      toast.custom((t) => (
        <SuccessToast t={t} message={"Post updated successfully."} />
      ));
      setShowCreatePost(false);
    },
    onError: (error) => {
      toast.custom((t) => (
        <ErrorToast
          t={t}
          message={error?.message ?? "Couldn't edit your post."}
        />
      ));
    },
  });

  const handleCreatePost = () => {
    const formData = new FormData();

    if (postType === "post") {
      formData.append("type", postType);
      formData.append("content", value);
      formData.append("canReply", replyOption);
      if (communityId) {
        formData.append("communityId", communityId.toString());
      }

      if (mentions && mentions.length > 0) {
        mentions.forEach((mention) => {
          formData.append("tags[]", mention.id);
        });
      }

      if (Boolean(selectedFiles.length)) {
        selectedFiles.forEach((file) => {
          formData.append("post_files[]", file);
        });
      }
    }

    if (postType === "poll") {
      formData.append("type", postType);
      formData.append("content", value);
      formData.append("canReply", replyOption);
      formData.append("poll_duration", poll.duration);
      formData.append("change_option", poll.allowVoteChange.toString());
      if (communityId) {
        formData.append("communityId", communityId.toString());
      }

      if (mentions && mentions.length > 0) {
        mentions.forEach((mention) => {
          formData.append("tags[]", mention.id);
        });
      }
      if (poll && poll.options.length > 0) {
        poll.options.forEach((option) => {
          formData.append("pollOptions[]", option.value);
        });
      }

      if (Boolean(selectedFiles.length)) {
        selectedFiles.forEach((file) => {
          formData.append("post_files[]", file);
        });
      }
    }

    createPost.mutate(formData);
  };

  const handleUpdatePost = async () => {
    const formData = new FormData();

    formData.append("type", "post");
    formData.append("content", postContent ?? "");
    formData.append("canReply", replyOption);

    if (mentions && mentions.length > 0) {
      mentions.forEach((mention) => {
        formData.append("tags[]", mention.id);
      });
    }
    console.log(media);
    if (mediaToRemove && mediaToRemove.length > 0) {
      mediaToRemove.forEach((m) => {
        formData.append("medias[]", m.id.toString());
      });
    }

    if (Boolean(selectedFiles.length)) {
      selectedFiles.forEach((file) => {
        formData.append("post_files[]", file);
      });
    }

    updatePost.mutate(formData);
  };

  return (
    <div className="max-h-dvh h-fit bg-background">
      {/* Hidden file input */}
      <Input
        type="file"
        id={id}
        className="hidden"
        onChange={(e) => handleImageChange(e)}
        multiple
        accept="image/*"
      />
      <div
        className={cn(
          "text-inactive px-4 pt-3 min-h-dvh min-[480px]:min-h-fit min-[480px]:max-h-dvh flex flex-col pb-20",
          wrapperClassName
        )}
      >
        <SelectDestination
          communityId={communityId}
          setCommunityId={setCommunityId}
        />
        <div className="">
          <div className="flex mt-4 gap-x-1 sm:gap-x-2 items-start">
            <Image
              width={45}
              height={45}
              className="size-[30px] sm:size-[45px] rounded-full object-cover"
              alt="icon"
              src={userData?.user?.usermeta?.avatar ?? profileImageplaceholder}
            />
            <MessageBox
              readOnly={currentPost?.type == "poll"}
              value={Boolean(currentPost) ? postContent! : value}
              placeholder={
                postType === "poll" ? "Ask a question" : "What's on your mind?"
              }
              handleChange={(e, newValue, newPlainTextValue, mentions) => {
                console.log(e);
                console.log(newValue);
                console.log(newPlainTextValue);
                console.log(mentions);
                console.log(mentions);
                setValue(newPlainTextValue);
                if (currentPost) {
                  setPostContent(newPlainTextValue);
                }
                setMentions(mentions);
                // setTags
                return {
                  e,
                  newValue,
                  newPlainTextValue,
                  mentions,
                };
              }}
            />
            {/* <Textarea
                      ref={textAreaRef}
                      onChange={handleChange}
                      placeholder="What's on your mind?"
                      className="text-white focus:ring-transparent focus-visible:ring-transparent ring-transparent ring-offset-transparent focus-visible:ring-offset-transparent focus:ring-offset-transparent focus-visible:ring-contentBg ring-offset-0 placeholder:text-inactive border-none flex-1 text-sm sm:text-base font-normal bg-transparent py-4 pt-2 resize-none"
                    /> */}
          </div>
          {/* display images if any */}
          {/* {postType === "post" && ( */}
          <div
            className={cn(
              "my-4 aspect-video w-full h-full size gap-2 max-h-[180px] hidden",
              [...media, ...selectedFiles].length == 1 && "flex",
              [...media, ...selectedFiles].length > 1 &&
                [...media, ...selectedFiles].length % 2 == 1 &&
                "grid grid-cols-2",
              [...media, ...selectedFiles].length > 1 &&
                [...media, ...selectedFiles].length % 2 == 0 &&
                "grid grid-cols-2",
              [...media, ...selectedFiles].length == 1 && "block",
              [...media, ...selectedFiles].length > 1 && "grid"
            )}
          >
            {Boolean(media) && Boolean(media?.length)
              ? media?.length
                ? [
                    ...media?.map((m: Media, index: number) => (
                      <div
                        key={index}
                        className={cn(
                          "rounded-md overflow-hidden relative group",
                          media.length == 2 && "flex-1",
                          media.length == 3 &&
                            index === 0 &&
                            "row-span-2 col-span-1",
                          media.length == 4 && "col-span-1"
                        )}
                      >
                        <IoCloseCircleSharp
                          onClick={() => handleCurrentPostImageRemoval(index)}
                          size={24}
                          className="absolute top-3 right-3 block hover:text-red-500 cursor-pointer"
                        />
                        <Image
                          src={m.original_media}
                          alt={m.original_media}
                          className="w-full h-auto object-cover"
                          layout="responsive"
                          width="0"
                          height="0"
                          sizes="100vw"
                        />
                      </div>
                    )),
                    ...selectedFiles.map((file, index) => (
                      <div
                        key={index}
                        className={cn(
                          "rounded-md overflow-hidden relative group",
                          selectedFiles.length == 2 && "flex-1",
                          selectedFiles.length == 3 &&
                            index === 0 &&
                            "row-span-2 col-span-1",
                          selectedFiles.length == 4 && "col-span-1"
                        )}
                      >
                        <IoCloseCircleSharp
                          onClick={() => handleImageRemoval(index)}
                          size={24}
                          className="absolute top-3 right-3 block hover:text-red-500 cursor-pointer"
                        />
                        <Image
                          src={URL.createObjectURL(file)}
                          alt={file.name}
                          className="w-full h-auto object-cover"
                          layout="responsive"
                          width="0"
                          height="0"
                          sizes="100vw"
                        />
                      </div>
                    )),
                  ]
                : null
              : selectedFiles?.length
              ? selectedFiles.map((file, index) => (
                  <div
                    key={index}
                    className={cn(
                      "rounded-md overflow-hidden relative group",
                      selectedFiles.length == 2 && "flex-1",
                      selectedFiles.length == 3 &&
                        index === 0 &&
                        "row-span-2 col-span-1",
                      selectedFiles.length == 4 && "col-span-1"
                    )}
                  >
                    <IoCloseCircleSharp
                      onClick={() => handleImageRemoval(index)}
                      size={24}
                      className="absolute top-3 right-3 block hover:text-red-500 cursor-pointer"
                    />
                    <Image
                      src={URL.createObjectURL(file)}
                      alt={file.name}
                      className="w-auto h-auto object-cover"
                      layout="responsive"
                      width="0"
                      height="0"
                      sizes="100vw"
                    />
                  </div>
                ))
              : null}
          </div>
          {/* )} */}

          {/* View poll post*/}
          {currentPost && currentPost.type === "poll" && (
            <div className="mt-4 relative">
              <div className="flex flex-col gap-y-4">
                {/* Render options */}
                {currentPost.pollOption.map((option, i) => (
                  <div
                    key={i}
                    className="flex gap-2 items-center justify-between"
                  >
                    <div className="relative w-full">
                      <Input
                        key={i}
                        placeholder={`Option ${i + 1}`}
                        readOnly
                        value={currentPost.pollOption[i].option}
                        className="border text-foreground placeholder:text-foreground/50 border-border rounded-lg w-full h-12 pr-14 pl-2 text-base"
                      />
                      <p className="absolute h-full w-fit top-0 right-0 flex justify-center items-center px-2 text-foreground/20">
                        <span>0/25</span>
                      </p>
                    </div>
                    {/* {currentPost.pollOption.length > 2 && (
                      <Button
                        onClick={() => {
                          let options = [...poll.options];
                          options.splice(i, 1);
                          setPoll((prev) => ({ ...prev, options }));
                        }}
                        variant="ghost"
                        className="flex justify-center items-center px-2 group hover:bg-foreground/5"
                      >
                        <Trash2 className="text-foreground/50 group-hover:text-red-500" />
                      </Button>
                    )} */}
                  </div>
                ))}
                {/* Add new option */}
                <Button
                  disabled
                  variant={"outline"}
                  onClick={() => {
                    let options = [...poll.options];
                    options.push({ value: "" });
                    setPoll((prev) => ({ ...prev, options }));
                  }}
                  className="text-colorPrimary border border-border h-12 hover:bg-colorPrimary hover:border-colorPrimary hover:text-white gap-x-2 flex justify-center items-center text-base"
                >
                  <Plus size={18} />
                  <span>Add new option</span>
                </Button>
              </div>
              <div className="border-b border-border w-full h-0 my-8" />

              {/* Select duration */}
              <Label className="text-foreground">Poll duration</Label>
              <Select
                disabled
                onValueChange={(value) => {
                  setPoll((prev) => ({ ...prev, duration: value }));
                }}
                value={poll.duration}
              >
                <SelectTrigger
                  id="duration"
                  value={poll.duration}
                  className="w-full mt-2 text-foreground bg-transparent border-border h-12 font-semibold"
                >
                  <SelectValue
                    placeholder="Select"
                    className="text-foreground text-base text-normal placeholder:text-foreground/50 font-semibold"
                    color="white"
                  />
                </SelectTrigger>
                <SelectContent className="bg-background border-border mt-4 z-[100]">
                  {["1", "2", "3", "4", "5", "6", "7"].map(
                    (v: string, i: number) => (
                      <SelectItem
                        key={i}
                        className="py-2 text-base text-foreground font-normal data-[highlighted]:text-foreground data-[highlighted]:bg-colorPrimary/10"
                        value={v}
                      >
                        {v} {parseInt(v) > 1 ? "days" : "day"}
                      </SelectItem>
                    )
                  )}
                </SelectContent>
              </Select>
              <div className="border-b border-border w-full h-0 my-8" />
              {/* remove poll */}
              <Button
                disabled
                variant={"outline"}
                onClick={() => {
                  setPostType("post");
                }}
                className="text-red-500 border border-border w-full h-12 hover:bg-red-500 hover:border-red-500 hover:text-white gap-x-2 flex justify-center items-center text-base"
              >
                <span>Remove poll</span>
              </Button>
              <div className="border-b border-border w-full h-0 mt-8" />
              {/* allow users to change choice */}
              <div className="mt-6 mb-8 flex justify-between items-center text-foreground text-lg font-medium">
                <p className="text-base">Allow voters to change vote</p>
                <div className="flex items-center space-x-2">
                  <Switch
                    disabled
                    checked={poll.allowVoteChange}
                    onCheckedChange={(value) =>
                      setPoll((prev) => ({
                        ...prev,
                        allowVoteChange: value,
                      }))
                    }
                    id="display-tag"
                  />
                  {/* <Label htmlFor="display-tag">Airplane Mode</Label> */}
                </div>
              </div>
              <div className="sticky bottom-16 text-sm flex gap-x-2 bg-background items-center">
                <Info size={16} />
                <span>Polls cannot be edited</span>
              </div>
            </div>
          )}
          {postType === "poll" && (
            // Create poll
            <div className="mt-4">
              <div className="flex flex-col gap-y-4">
                {/* Render options */}
                {poll.options.map((option, i) => (
                  <div
                    key={i}
                    className="flex gap-2 items-center justify-between"
                  >
                    <div className="relative w-full">
                      <Input
                        key={i}
                        placeholder={`Option ${i + 1}`}
                        value={poll.options[i].value}
                        onChange={(e) => {
                          let options = [...poll.options];
                          options[i].value = e.target.value;
                          setPoll((prev) => ({ ...prev, options }));
                        }}
                        className="border text-foreground placeholder:text-foreground/50 border-border rounded-lg w-full h-12 pr-14 pl-2 text-base"
                      />
                      <p className="absolute h-full w-fit top-0 right-0 flex justify-center items-center px-2 text-foreground/20">
                        <span>0/25</span>
                      </p>
                    </div>
                    {poll.options.length > 2 && (
                      <Button
                        onClick={() => {
                          let options = [...poll.options];
                          options.splice(i, 1);
                          setPoll((prev) => ({ ...prev, options }));
                        }}
                        variant="ghost"
                        className="flex justify-center items-center px-2 group hover:bg-foreground/5"
                      >
                        <Trash2 className="text-foreground/50 group-hover:text-red-500" />
                      </Button>
                    )}
                  </div>
                ))}
                {/* Add new option */}
                <Button
                  variant={"outline"}
                  onClick={() => {
                    let options = [...poll.options];
                    options.push({ value: "" });
                    setPoll((prev) => ({ ...prev, options }));
                  }}
                  className="text-colorPrimary border border-border h-12 hover:bg-colorPrimary hover:border-colorPrimary hover:text-white gap-x-2 flex justify-center items-center text-base"
                >
                  <Plus size={18} />
                  <span>Add new option</span>
                </Button>
              </div>
              <div className="border-b border-border w-full h-0 my-8" />

              {/* Select duration */}
              <Label className="text-foreground">Poll duration</Label>
              <Select
                onValueChange={(value) => {
                  setPoll((prev) => ({ ...prev, duration: value }));
                }}
                value={poll.duration}
              >
                <SelectTrigger
                  id="duration"
                  value={poll.duration}
                  className="w-full mt-2 text-foreground bg-transparent border-border h-12 font-semibold"
                >
                  <SelectValue
                    placeholder="Select"
                    className="text-foreground text-base text-normal placeholder:text-foreground/50 font-semibold"
                    color="white"
                  />
                </SelectTrigger>
                <SelectContent className="bg-background border-border mt-4 z-[100]">
                  {["1", "2", "3", "4", "5", "6", "7"].map(
                    (v: string, i: number) => (
                      <SelectItem
                        key={i}
                        className="py-2 text-base text-foreground font-normal data-[highlighted]:text-foreground data-[highlighted]:bg-colorPrimary/10"
                        value={v}
                      >
                        {v} {parseInt(v) > 1 ? "days" : "day"}
                      </SelectItem>
                    )
                  )}
                </SelectContent>
              </Select>
              <div className="border-b border-border w-full h-0 my-8" />
              {/* remove poll */}
              <Button
                variant={"outline"}
                onClick={() => {
                  setPostType("post");
                }}
                className="text-red-500 border border-border w-full h-12 hover:bg-red-500 hover:border-red-500 hover:text-white gap-x-2 flex justify-center items-center text-base"
              >
                <span>Remove poll</span>
              </Button>
              <div className="border-b border-border w-full h-0 mt-8" />
              {/* allow users to change choice */}
              <div className="mt-6 mb-8 flex justify-between items-center text-foreground text-lg font-medium">
                <p className="text-base">Allow voters to change vote</p>
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={poll.allowVoteChange}
                    onCheckedChange={(value) =>
                      setPoll((prev) => ({
                        ...prev,
                        allowVoteChange: value,
                      }))
                    }
                    id="display-tag"
                  />
                  {/* <Label htmlFor="display-tag">Airplane Mode</Label> */}
                </div>
              </div>
              <div className="sticky bottom-16 text-sm flex gap-x-2 bg-background items-center">
                <Info size={16} />
                <span>You cannot edit a poll after posting</span>
              </div>
            </div>
          )}
          {/* post actions for devices larger than 480px*/}
          <div className="justify-between items-center gap-x-6 py-4 flex-wrap hidden min-[480px]:flex sticky bottom-0 bg-background">
            <div className="flex flex-1 items-center">
              <Label
                className="group p-0 flex gap-2 hover:bg-transparent py-0 items-center pr-2 border-r border-border cursor-pointer"
                htmlFor={id}
              >
                <SquarePlus
                  size={20}
                  className="text-inactive group-hover:text-colorPrimary"
                />
                <span className="hidden lg:block font-normal text-xs sm:text-base text-inactive whitespace-nowrap group-hover:text-colorPrimary">
                  Add media
                </span>
              </Label>
              <Label
                onClick={() => {
                  if (postType === "poll") {
                    setPostType("post");
                  } else {
                    setPostType("poll");
                  }
                }}
                className="group p-0 flex gap-2 hover:bg-transparent py-0 items-center px-2 border-r border-border cursor-pointer"
              >
                <div className="relative w-5 h-5">
                  <Image
                    alt="poll-icon"
                    src={"/assets/post-icons/poll.svg"}
                    width={24}
                    height={24}
                    className={cn(
                      "size-5 text-inactive convert-to-primary-color absolute top-0 left-0 z-10",
                      postType === "poll" &&
                        "text-colorPrimary convert-to-primary-color"
                    )}
                  />
                  <Image
                    alt="poll-icon"
                    src={"/assets/post-icons/poll.svg"}
                    width={24}
                    height={24}
                    className={cn(
                      "size-5 text-inactive group-hover:opacity-0 absolute top-0 left-0 z-10",
                      postType === "poll" && "text-colorPrimary opacity-0"
                    )}
                  />
                </div>
                <span
                  className={cn(
                    "hidden lg:block font-normal text-xs sm:text-base text-inactive whitespace-nowrap group-hover:text-colorPrimary",
                    postType === "poll" &&
                      "text-colorPrimary convert-to-primary-color"
                  )}
                >
                  Poll
                </span>
              </Label>
              <WhoCanReply
                replyOption={currentPost ? canReply : replyOption}
                setReplyOption={currentPost ? setCanReply : setReplyOption}
              />
            </div>
            <div className="flex justify-end">
              <Button
                disabled={
                  isPostDisabled() ||
                  createPost.isPending ||
                  updatePost.isPending
                }
                onClick={currentPost ? handleUpdatePost : handleCreatePost}
                className="flex-1 hover:bg-white hover:scale-[1.01] transition-all hover:shadow-xl bg-white border border-colorGrey text-textDark rounded-full flex justify-center items-center h-[32px] px-10 w-full max-w-[120px]"
              >
                {createPost.isPending || updatePost.isPending ? (
                  <div className="flex justify-center">
                    <ImSpinner2 className="size-6 animate-spin text-[#4ED17E]" />
                  </div>
                ) : (
                  <span className="w-fit text-base font-bold block p-0 align-middle">
                    {currentPost ? "Update" : "Post"}
                  </span>
                )}
              </Button>
            </div>
          </div>
          {/* post actions for devices larger than 480px i.e mobile devices*/}
          <div className="justify-between flex-1 w-full items-start gap-x-6 py-4 pt-0 flex flex-col min-[480px]:hidden absolute left-0 bottom-0 bg-background">
            <div className="flex flex-col gap-y-2 flex-1 items-start w-full">
              <Label
                className="group w-full p-0 flex gap-2 hover:bg-transparent  py-2 items-center px-2 border-y border-border cursor-pointer"
                htmlFor={id}
              >
                <SquarePlus
                  size={20}
                  className="text-inactive group-hover:text-colorPrimary"
                />
                <span className="font-normal text-sm sm:text-base text-inactive whitespace-nowrap group-hover:text-colorPrimary">
                  Add media
                </span>
              </Label>
              <Label
                onClick={() => {
                  if (postType === "poll") {
                    setPostType("post");
                  } else {
                    setPostType("poll");
                  }
                }}
                className="group p-0 w-full flex gap-2 hover:bg-transparent py-0 pb-2 items-center px-2 border-b border-border cursor-pointer"
              >
                <div className="relative w-5 h-5">
                  <Image
                    alt="poll-icon"
                    src={"/assets/post-icons/poll.svg"}
                    width={24}
                    height={24}
                    className={cn(
                      "size-5 text-inactive convert-to-primary-color absolute top-0 left-0 z-10",
                      postType === "poll" &&
                        "text-colorPrimary convert-to-primary-color"
                    )}
                  />
                  <Image
                    alt="poll-icon"
                    src={"/assets/post-icons/poll.svg"}
                    width={24}
                    height={24}
                    className={cn(
                      "size-5 text-inactive group-hover:opacity-0 absolute top-0 left-0 z-10",
                      postType === "poll" && "text-colorPrimary opacity-0"
                    )}
                  />
                </div>
                <span
                  className={cn(
                    "font-normal text-sm sm:text-base text-inactive whitespace-nowrap group-hover:text-colorPrimary",
                    postType === "poll" &&
                      "text-colorPrimary convert-to-primary-color"
                  )}
                >
                  Poll
                </span>
              </Label>
              <div className="px-2">
                <WhoCanReply
                  replyOption={currentPost ? canReply : replyOption}
                  setReplyOption={currentPost ? setCanReply : setReplyOption}
                />
              </div>
            </div>
          </div>
          {/* Post button for mobile devices */}
          <div className="flex justify-end absolute top-3 right-4 min-[480px]:hidden z-[1000]">
            <Button
              disabled={
                isPostDisabled() || createPost.isPending || updatePost.isPending
              }
              onClick={currentPost ? handleUpdatePost : handleCreatePost}
              className="flex-1 hover:bg-white hover:scale-[1.01] transition-all hover:shadow-xl bg-white border border-colorGrey text-textDark rounded-full flex justify-center items-center h-[28px] w-full max-w-[60px]"
            >
              {createPost.isPending || updatePost.isPending ? (
                <div className="flex justify-center">
                  <ImSpinner2 className="size-6 animate-spin text-[#4ED17E]" />
                </div>
              ) : (
                <span className="w-fit text-sm font-bold block p-0 align-middle">
                  {currentPost ? "Update" : "Post"}
                </span>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePostCore;
