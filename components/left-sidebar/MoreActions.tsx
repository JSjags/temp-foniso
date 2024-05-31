"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Computer,
  CreditCard,
  Keyboard,
  Mail,
  MessageSquare,
  Moon,
  PlusCircle,
  Settings,
  Sun,
  User,
} from "lucide-react";
import {
  DropdownMenuPortal,
  DropdownMenuSubContent,
} from "@radix-ui/react-dropdown-menu";
import { useTheme } from "next-themes";
import { ModeToggle } from "../ThemeToggle";
import { useUserContext } from "@/context/UserContext";

type Props = {
  item:
    | {
        title: string;
        path: string;
        activeIcon: string;
        inactiveIcon: string;
      }
    | {
        title: string;
        path: string;
        activeIcon: null;
        inactiveIcon: null;
      };
};

const MoreActions = ({ item }: Props) => {
  const router = useRouter();
  const { logoutUser } = useUserContext();
  const pathname = usePathname();
  const [showMenu, setShowMenu] = useState(false);
  const { setTheme } = useTheme();

  const handleLogout = () => {
    logoutUser();
    // router.push("/login", { scroll: true });
    window.location.assign("/login");
  };

  return (
    <DropdownMenu open={showMenu} onOpenChange={(value) => setShowMenu(value)}>
      <DropdownMenuTrigger asChild>
        <Button
          onClick={() => setShowMenu(!showMenu)}
          variant={"ghost"}
          className="flex gap-x-4 active:ring-0 active:ring-offset-0 ring-0 ring-offset-0 ring-offset-transparent shadow-none border-none items-center bg-transparent px-0 hover:bg-transparent focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0"
        >
          <Image
            width={30}
            height={30}
            className={cn(
              "w-[30px]",
              pathname === item.path ? "brightness-200" : ""
            )}
            alt="icon"
            src={
              item?.activeIcon === null || item?.inactiveIcon === null
                ? ""
                : showMenu
                ? item?.activeIcon
                : item?.inactiveIcon
            }
          />
          <span
            className={cn(
              "text-textNav text-lg font-semibold hidden min-[1000px]:block",
              showMenu ? "text-white" : "text-inactive"
            )}
          >
            {item.title}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="sm:w-[314px] bg-border rounded-xl mx-4 px-3 py-2">
        <DropdownMenuGroup className="flex flex-col">
          <DropdownMenuItem className="data-[highlighted]:bg-[#393D39] text-foreground/80 py-3 px-3 rounded-lg font-medium text-lg cursor-pointer">
            <Image
              width={30}
              height={30}
              className="size-[30px] rounded-full mr-4 object-cover"
              alt="icon"
              src={"/assets/app-icons/more/ads.svg"}
            />
            <span>Ads</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="data-[highlighted]:bg-[#393D39] text-foreground/80 py-3 px-3 rounded-lg font-medium text-lg cursor-pointer">
            <Image
              width={30}
              height={30}
              className="size-[30px] rounded-full mr-4 object-cover"
              alt="icon"
              src={"/assets/app-icons/more/account-verification.svg"}
            />
            <span>Account Verification</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="data-[highlighted]:bg-[#393D39] text-foreground/80 py-3 px-3 rounded-lg font-medium text-lg cursor-pointer">
            <Image
              width={30}
              height={30}
              className="size-[30px] rounded-full mr-4 object-cover"
              alt="icon"
              src={"/assets/app-icons/more/settings.svg"}
            />
            <span>Settings</span>
          </DropdownMenuItem>
          <ModeToggle />
        </DropdownMenuGroup>
        <DropdownMenuSeparator className="mx-3 my-2 bg-background" />
        <DropdownMenuItem
          onClick={handleLogout}
          className="data-[highlighted]:bg-[#393D39] text-foreground/80 py-2 px-3 rounded-lg font-medium text-lg cursor-pointer"
        >
          <Image
            width={30}
            height={30}
            className="size-[30px] rounded-full mr-4 object-cover"
            alt="icon"
            src={"/assets/app-icons/more/logout.svg"}
          />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MoreActions;
