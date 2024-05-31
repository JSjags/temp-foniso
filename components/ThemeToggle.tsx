"use client";

import * as React from "react";
import { Computer, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import {
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";

export function ModeToggle() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger className='data-[highlighted]:bg-[#393D39] data-[state="open"]:bg-[#393D39] text-foreground/80 py-3 px-3 rounded-lg font-medium text-lg cursor-pointer'>
        <Image
          width={30}
          height={30}
          className="size-[30px] rounded-full mr-4 object-cover"
          alt="icon"
          src={"/assets/app-icons/more/theme.svg"}
        />
        <span>Theme</span>
      </DropdownMenuSubTrigger>
      <DropdownMenuPortal>
        <DropdownMenuSubContent
          sideOffset={20}
          className="bg-border z-50 px-2 py-2 rounded-lg"
        >
          <DropdownMenuItem
            className="data-[highlighted]:bg-[#393D39]"
            onClick={() => setTheme("light")}
          >
            <Sun className="h-[1rem] mr-4 w-[1rem] rotate-0 scale-100 transition-all dark:-rotate-90" />
            <span>Light</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="data-[highlighted]:bg-[#393D39]"
            onClick={() => setTheme("dark")}
          >
            <Moon className="h-[1rem] mr-4 w-[1rem] rotate-90 transition-all dark:rotate-0 dark:scale-100" />
            <span>Dark</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="data-[highlighted]:bg-[#393D39]"
            onClick={() => setTheme("system")}
          >
            <Computer className="h-[1rem] mr-4 w-[1rem] rotate-90 transition-all dark:rotate-0 dark:scale-100" />
            <span>System</span>
          </DropdownMenuItem>
        </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
  );
}
