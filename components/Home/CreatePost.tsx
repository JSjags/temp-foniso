"use client";

import { EditIcon, Globe, SquarePlus, X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { userPlaceholderImage } from "@/constants";
import Image from "next/image";
import { Button } from "../ui/button";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { ChangeEvent, useState } from "react";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import reduceImageQuality from "../reusable/FileReader";
import { cn } from "@/lib/utils";
import { IoCloseCircleSharp } from "react-icons/io5";

type Props = {};

const CreatePost = (props: Props) => {
  const [showCreatePost, setShowCreatePost] = useState(false);
  // const [files, setFiles] = useState<FileList | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
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
    }
  };

  const handleImageRemoval = (index: number) => {
    const newSelectedFiles = [...selectedFiles];
    newSelectedFiles.splice(index, 1);
    setSelectedFiles(newSelectedFiles);
  };

  return (
    <div className="py-0 sm:py-5 px-4 border-b-0 sm:border-b border-border bg-background">
      <Input
        type="file"
        id="media"
        className="hidden"
        onChange={(e) => handleImageChange(e)}
        multiple
        accept="image/*"
      />
      {/* Create post modal */}
      <AlertDialog open={showCreatePost}>
        <AlertDialogContent className="min-w-[240px] w-[95%] bg-background border-border rounded-3xl p-0">
          <AlertDialogCancel
            onClick={() => setShowCreatePost(false)}
            className="absolute top-2 sm:top-4 left-4 w-fit h-fit bg-transparent border-none bg-[#7C7C7C] rounded-full p-1 hover:text-darkGrey"
          >
            <X size={16} className="text-white hover:text-darkGrey" />
          </AlertDialogCancel>
          <div className="w-full mx-auto">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-xl sm:text-2xl font-bold text-foreground/90 py-3 text-center border-b border-border">
                New post
              </AlertDialogTitle>
              <AlertDialogDescription className="mt-8 text-inactive px-4 pb-6 pt-3">
                <div className="flex items-center">
                  <div className="bg-colorPrimary size-[35px] flex gap-x-4 justify-center items-center rounded-md">
                    <Globe color="white" size={20} />
                  </div>
                  <Select defaultValue="public" value="public">
                    <SelectTrigger className="w-fit border-none text-textNav bg-transparent h-[35px] font-semibold">
                      <SelectValue
                        //   placeholder="Who can view tweet"
                        className="text-white text-base text-semibold placeholder:text-textNav font-semibold"
                        color="white"
                      />
                    </SelectTrigger>
                    <SelectContent className="bg-darkGrey border-border">
                      <SelectItem
                        className="text-sm text-textNav font-semibold data-[highlighted]:text-black data-[highlighted]:bg-white"
                        value="public"
                      >
                        Public
                      </SelectItem>
                      <SelectItem
                        className="text-sm text-textNav font-semibold data-[highlighted]:text-black data-[highlighted]:bg-white"
                        value="only_followers"
                      >
                        Only followers
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <div className="flex mt-4 gap-x-1 sm:gap-x-2 items-start">
                    <Image
                      width={45}
                      height={45}
                      className="size-[30px] sm:size-[45px] rounded-full object-cover"
                      alt="icon"
                      src={userPlaceholderImage}
                    />
                    <Textarea
                      placeholder="What’s on your mind?"
                      className="text-white ring-offset-contentBg focus-visible:ring-contentBg ring-offset-0 placeholder:text-inactive border-none flex-1 text-sm sm:text-base font-normal bg-transparent py-4 pt-2 resize-none"
                    />
                  </div>
                  {/* display images if any */}
                  {selectedFiles?.length ? (
                    <div
                      className={cn(
                        "aspect-video w-full h-full size gap-2 max-h-[180px]",
                        selectedFiles.length == 2 && "flex",
                        selectedFiles.length == 3 && "grid grid-cols-2",
                        selectedFiles.length == 4 && "grid grid-cols-2"
                      )}
                    >
                      {selectedFiles.map((file, index) => (
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
                            className="absolute top-3 right-3 hidden group-hover:block hover:text-red-500 cursor-pointer"
                          />
                          <img
                            src={URL.createObjectURL(file)}
                            alt={file.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  ) : null}

                  <div className="flex justify-between gap-4 items-center mt-2 flex-wrap">
                    <div className="flex flex-1 gap-x-6 items-center">
                      <Label
                        className="group p-0 flex gap-2 hover:bg-transparent py-0 items-center"
                        htmlFor="media"
                      >
                        <SquarePlus
                          size={20}
                          className="text-inactive group-hover:text-colorPrimary"
                        />
                        <p className="font-normal text-xs sm:text-base text-inactive whitespace-nowrap group-hover:text-colorPrimary">
                          Add media
                        </p>
                      </Label>
                      <Label
                        className="group p-0 flex gap-2 hover:bg-transparent py-0 items-center"
                        htmlFor="media"
                      >
                        <Globe
                          size={20}
                          className="text-inactive group-hover:text-colorPrimary"
                        />
                        <p className="font-normal  text-xs sm:text-base text-inactive whitespace-nowrap group-hover:text-colorPrimary">
                          Everyone can reply
                        </p>
                      </Label>
                    </div>
                    <div className="flex justify-end flex-1">
                      <Button
                        disabled
                        className="flex-1 hover:bg-white hover:scale-[1.01] transition-all hover:shadow-xl bg-white border border-colorGrey text-textDark rounded-full flex justify-center items-center h-[36px] px-10 w-full max-w-[88px]"
                      >
                        <span className="w-fit text-base font-bold block p-0 align-middle">
                          Post
                        </span>
                      </Button>
                    </div>
                  </div>
                </div>
              </AlertDialogDescription>
            </AlertDialogHeader>
          </div>
        </AlertDialogContent>
      </AlertDialog>

      <div className="hidden sm:block">
        <div className="flex items-center">
          <div className="bg-colorPrimary size-[35px] flex gap-x-4 justify-center items-center rounded-md">
            <Globe color="white" size={20} />
          </div>
          <Select defaultValue="public" value="public">
            <SelectTrigger className="w-fit border-none text-textNav bg-transparent h-[35px] font-semibold">
              <SelectValue
                //   placeholder="Who can view tweet"
                className="text-white text-base text-semibold placeholder:text-textNav font-semibold"
                color="white"
              />
            </SelectTrigger>
            <SelectContent className="bg-darkGrey border-border">
              <SelectItem
                className="text-sm text-textNav font-semibold data-[highlighted]:text-black data-[highlighted]:bg-white"
                value="public"
              >
                Public
              </SelectItem>
              <SelectItem
                className="text-sm text-textNav font-semibold data-[highlighted]:text-black data-[highlighted]:bg-white"
                value="only_followers"
              >
                Only followers
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex mt-4 gap-x-2 items-center">
          <Image
            width={45}
            height={45}
            className="size-[45px] rounded-full object-cover"
            alt="icon"
            src={userPlaceholderImage}
          />
          <Button
            onClick={() => setShowCreatePost(true)}
            variant={"ghost"}
            className="text-foreground/50 text-lg p-0 flex-1 text-start font-normal justify-start hover:bg-transparent hover:text-foreground cursor-pointer"
          >
            What’s on your mind?
          </Button>
        </div>
        <div className="flex justify-between gap-x-4 mt-4 items-center">
          <div className="flex flex-1 gap-x-6">
            <Button
              variant={"ghost"}
              className="p-0 flex gap-2 hover:bg-transparent py-0"
            >
              <SquarePlus color="#188C43" size={24} />
              <p className="font-normal text-lg text-colorPrimary">Add media</p>
            </Button>
            <Button
              variant={"ghost"}
              className="p-0 flex gap-2 hover:bg-transparent py-0"
            >
              <Globe color="#188C43" size={24} />
              <p className="font-normal text-lg text-colorPrimary">
                Everyone can reply
              </p>
            </Button>
          </div>
          <Button
            disabled
            className="hover:bg-white hover:scale-[1.01] transition-all hover:shadow-xl bg-white border border-colorGrey text-textDark rounded-full flex justify-center items-center h-[36px] px-10 w-full max-w-[88px]"
          >
            <span className="w-fit text-base font-bold block p-0 align-middle">
              Post
            </span>
          </Button>
        </div>
      </div>

      {/* floating action button for mobile devices */}
      <div className="fixed bottom-20 right-4">
        <Button
          onClick={() => setShowCreatePost(true)}
          className="rounded-full size-[60px] bg-colorPrimary flex justify-center sm:hidden"
        >
          <EditIcon color="white" size={25} className="size-[25px]" />
        </Button>
      </div>
    </div>
  );
};

export default CreatePost;
