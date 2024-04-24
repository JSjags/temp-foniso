"use client";

import { FormEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import MobileDesktopOverlay from "../Modal/MobileDesktopOverlay";
import { Button } from "../ui/button";
import { CiGlobe, CiSquarePlus } from "react-icons/ci";
import { Input } from "../ui/input";
import Image from "next/image";
import MobileDrawer from "../ui/MobileDrawer";
import { RxCaretDown } from "react-icons/rx";
import ChooseDestination from "./ChooseDestination";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../ui/dropdown-menu";

const CreatePost = () => {
  const searchParams = useSearchParams();
  const { back } = useRouter();
  const [mobileModal, setMobileModal] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log("object");
  };

  const handleCloseModal = () => {
    back();
  };

  const Title = () => {
    return (
      <div className="flex">
        <p className="flex-1">New post</p>
        <Button
          type="submit"
          className="md:hidden h-[36px] rounded-full px-5 bg-[#F2FFF769]"
        >
          Post
        </Button>
      </div>
    );
  };

  return (
    // <form onSubmit={handleSubmit}>
    <MobileDesktopOverlay
      title={<Title />}
      open={searchParams.get("post") === "new"}
      handleClose={handleCloseModal}
      contentClass="flex-1 flex flex-col"
      wrapperElement="form"
      wrapperProps={{ onSubmit: handleSubmit }}
    >
      <>
        {/* For smaller screens */}
        <div className="md:hidden flex-1 flex flex-col justify-between">
          <div className="">
            <button
              type="button"
              className="flex gap-[10px] items-center"
              onClick={() => setMobileModal(true)}
            >
              <span className="size-[35px] rounded-lg overflow-hidden">
                <Image
                  src="https://source.unsplash.com/random/120x120/?community"
                  alt="community"
                  width={35}
                  height={35}
                />
              </span>
              <span className="text-sm">Manchester united</span>
              <RxCaretDown />
            </button>

            <div className="flex gap-[10px] items-center mt-5">
              <div className="size-[45px] rounded-full overflow-hidden">
                <Image
                  src="https://source.unsplash.com/random/120x120/?portrait"
                  alt="user"
                  width={45}
                  height={45}
                  className="w-full h-full object-cover rounded-full object-center"
                />
              </div>
              <Input
                name="post content"
                className="!border-none !rounded-none !outline-none !ring-0 !placeholder-[#616161]"
                placeholder="What’s on your mind?"
              />
            </div>
          </div>

          <MobileDrawer open={mobileModal} close={() => setMobileModal(false)}>
            <ChooseDestination />
          </MobileDrawer>

          <div className="py-6 px-4 mt-28 border-t border-[#222623] items-center">
            <button type="button" className="flex gap-[14px] text-[#0B953B]">
              <CiSquarePlus className="text-3xl " />
              <span className="text-lg">Add images</span>
            </button>
          </div>
        </div>

        {/* For larger screens */}
        <div className="hidden min-[766px]:block">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button type="button" className="flex items-center gap-2">
                <div className="size-[35px] center-item bg-[#188C43] rounded-xl">
                  <CiGlobe className="text-2xl text-white" />
                </div>
                <span className="text-sm">Public</span>
                <RxCaretDown />
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-[359px]" align="start">
              <DropdownMenuItem className="p-5 !bg-background">
                <ChooseDestination />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="mt-12 flex items-center gap-10">
            <Input
              name="post content"
              className="!border-none px-0 !rounded-none !outline-none !ring-0 !placeholder-[#616161] flex-1"
              placeholder="What’s on your mind?"
            />

            <Button
              type="submit"
              className="h-[36px] rounded-full px-5 bg-[#F2FFF769]"
            >
              Post
            </Button>
          </div>
        </div>
      </>
    </MobileDesktopOverlay>
  );
};

export default CreatePost;
