"use client";

import { Label } from "../ui/label";
import { CheckCircle2Icon, Globe, LucideIcon } from "lucide-react";
import { postReplyOptions } from "@/constants";
import { cn } from "@/lib/utils";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  DropdownMenuGroup,
  DropdownMenuSeparator,
} from "@radix-ui/react-dropdown-menu";

export function SelectDestination({
  replyOption,
  setReplyOption,
}: {
  replyOption?: string;
  setReplyOption?: Dispatch<SetStateAction<string>>;
}) {
  const [currentOption, setCurrentOption] = useState<string>("Public");
  const [CurrentIcon, setCurrentIcon] = useState<LucideIcon | string>(Globe);

  return (
    <div className="flex items-center">
      <DropdownMenu>
        <DropdownMenuTrigger className="w-fit border-none bg-red-500 px-0 text-textNav bg-transparent h-[35px] font-semibold flex gap-3 items-center">
          <div className="bg-colorPrimary size-[35px] flex gap-x-4 justify-center items-center rounded-md">
            <Globe color="white" size={20} />
          </div>
          {currentOption}
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-56 sm:w-[320px] bg-background border-border pb-8 flex flex-col"
          side="bottom"
        >
          <DropdownMenuLabel className="text-lg font-bold px-3">
            Choose Destination
          </DropdownMenuLabel>
          <DropdownMenuItem
            className={cn(
              "flex justify-between mt-2 items-center rounded-md hover:bg-colorPrimary/20 cursor-pointer p-2 px-5"
            )}
            //   onClick={() => setCurrentOption(option.title)}
          >
            <div className={cn("flex gap-x-2 items-center text-foreground/60")}>
              <div className="bg-colorPrimary size-[35px] flex gap-x-4 justify-center items-center rounded-md">
                <Globe color="white" size={20} />
              </div>
              {currentOption}
            </div>
          </DropdownMenuItem>
          <DropdownMenuSeparator className="bg-border border-border h-[1px] my-4 text-border" />
          <DropdownMenuGroup>
            {postReplyOptions.map((option) => (
              <DropdownMenuItem
                key={option.title}
                className={cn(
                  "flex justify-between items-center rounded-md hover:bg-colorPrimary/20 cursor-pointer p-2"
                )}
                onClick={() => setCurrentOption(option.title)}
              >
                <div
                  className={cn("flex gap-x-2 items-center text-foreground/60")}
                >
                  <option.icon
                    className={cn(
                      currentOption === option.title
                        ? "text-white font-bold"
                        : "text-foreground/60"
                    )}
                  />
                  <span
                    className={cn(
                      currentOption === option.title
                        ? "text-white font-bold"
                        : "text-foreground/60"
                    )}
                  >
                    {option.title}
                  </span>
                </div>
                {currentOption === option.title && (
                  <IoMdCheckmarkCircle className="text-foreground text-lg" />
                )}
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      {/* <Select defaultValue="public" value="public">
        <SelectTrigger className="w-fit border-none bg-red-500 px-0 text-textNav bg-transparent h-[35px] font-semibold flex gap-3 items-center">
          <div className="bg-colorPrimary size-[35px] flex gap-x-4 justify-center items-center rounded-md">
            <Globe color="white" size={20} />
          </div>
          <SelectValue
            //   placeholder="Who can view tweet"
            className="text-white text-base text-semibold placeholder:text-textNav font-semibold"
            color="white"
          />
        </SelectTrigger>
        <Select
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
      </Select> */}
    </div>
  );
}
