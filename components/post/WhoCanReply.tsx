"use client";

import {
  DropdownMenuCheckboxItemProps,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "../ui/label";
import { CheckCircle2Icon, Globe, LucideIcon } from "lucide-react";
import { postReplyOptions } from "@/constants";
import { cn } from "@/lib/utils";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

type Checked = DropdownMenuCheckboxItemProps["checked"];

export function WhoCanReply({
  replyOption,
  setReplyOption,
  showLabel,
}: {
  replyOption?: string;
  setReplyOption?: Dispatch<SetStateAction<string>>;
  showLabel?: boolean;
}) {
  const [currentOption, setCurrentOption] = useState<string>(
    replyOption ?? "Everyone"
  );

  console.log(currentOption);

  const [CurrentIcon, setCurrentIcon] = useState<LucideIcon>(
    postReplyOptions.filter(
      (option) => option.title.toLowerCase() === currentOption.toLowerCase()
    )[0].icon
  );

  useEffect(() => {
    setCurrentIcon(
      postReplyOptions.filter(
        (option) => option.title.toLowerCase() === currentOption.toLowerCase()
      )[0].icon
    );
  }, [currentOption]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Label
          role="button"
          className="group p-0 flex gap-2 hover:bg-transparent py-0 items-center pl-0 min-[480px]:pl-2"
        >
          <CurrentIcon
            size={20}
            className="text-inactive group-hover:text-colorPrimary"
          />
          <p className="block min-[480px]:hidden min-[1190px]:block font-normal text-sm sm:text-base text-inactive whitespace-nowrap group-hover:text-colorPrimary">
            {currentOption} can reply
          </p>
        </Label>
        {/* This label is the same as above but only shows for mobile devices */}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-56 z-[1000] sm:w-[320px] bg-background border-border pb-8 flex flex-col gap-y-6 px-3"
        side="top"
      >
        <DropdownMenuLabel className="text-lg font-bold">
          Who can reply?
        </DropdownMenuLabel>
        {postReplyOptions.map((option) => (
          <DropdownMenuItem
            key={option.title}
            className={cn(
              "flex justify-between items-center rounded-md hover:bg-colorPrimary/20 cursor-pointer p-2"
            )}
            onClick={() => setCurrentOption(option.title)}
          >
            <div className={cn("flex gap-x-2 items-center text-foreground/60")}>
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
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
