"use client";

import Image from "next/image";
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "./ui/sheet";
import { useUserContext } from "@/context/UserContext";
import { useEffect, useState } from "react";
import { formatNumberCount } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { getPublicUserProfile } from "@/services/api/userService";
import SportIcon from "./reusable/SportIcon";
import { useRouter } from "next/navigation";
import { Separator } from "./ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useTheme } from "next-themes";
import { Computer, Moon, Sun } from "lucide-react";
import Link from "next/link";

export function MobileSidebar() {
  const router = useRouter();

  const { userData, logoutUser } = useUserContext();

  const [viewPortWidth, setViewPortWidth] = useState(window.innerWidth);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { setTheme } = useTheme();

  const publicProfile = useQuery({
    queryKey: ["users-public-profile"],
    queryFn: () => getPublicUserProfile(userData?.user.username!),
    select(data) {
      return data.data.data;
    },
  });

  useEffect(() => {
    window.addEventListener("resize", () => {
      setViewPortWidth(window.innerWidth);
    });

    return () => {
      window.addEventListener("resize", () => {
        setViewPortWidth(window.innerWidth);
      });
    };
  }, []);

  const handleSideBarOpen = () => {
    if (viewPortWidth >= 480) {
      return false;
    }

    return isMenuOpen;
  };

  const handleLogout = () => {
    logoutUser();
    // router.push("/login", { scroll: true });
    window.location.assign("/login");
  };

  return (
    <div className="grid grid-cols-2 gap-2">
      <Sheet
        key={"left"}
        open={handleSideBarOpen()}
        onOpenChange={(val) => setIsMenuOpen(val)}
      >
        <SheetTrigger asChild onClick={() => setIsMenuOpen(true)}>
          <div className="size-[36px] rounded-full cursor-pointer">
            <Image
              width={36}
              height={36}
              className="size-9 rounded-full object-cover"
              alt="icon"
              src={
                userData?.user?.usermeta?.avatar ??
                "/assets/placeholder-person.png"
              }
            />
          </div>
        </SheetTrigger>
        <SheetContent side={"left"} className="px-4">
          <SheetHeader className="bg-foreground/10 p-4 rounded-lg">
            <Link href={"/profile"}>
              <Image
                width={70}
                height={70}
                className="size-[70px] rounded-full object-cover"
                alt="icon"
                src={
                  userData?.user?.usermeta?.avatar ??
                  "/assets/placeholder-person.png"
                }
              />
            </Link>
            {/* account details */}
            <div className="min-[480px]:mt-2">
              <div>
                <div className="flex gap-x-2 items-center">
                  <Link href={"/profile"}>
                    <p className="text-foreground hover:underline cursor-pointer font-bold line-clamp-1 text-ellipsis text-sm text-left">
                      {userData?.user?.usermeta?.firstname}{" "}
                      {userData?.user?.usermeta?.lastname}
                    </p>
                  </Link>
                  <div className="flex gap-x-1 items-center">
                    {userData?.user?.verified && (
                      <Image
                        width={14}
                        height={14}
                        className="size-[14px] rounded-full object-cover"
                        alt="avatar"
                        src={"/assets/app-icons/verified-icon.svg"}
                      />
                    )}
                    <SportIcon
                      category={userData?.user?.usermeta?.favorite_sport!}
                      size={14}
                    />
                  </div>
                </div>
                <Link href={"/profile"}>
                  <p className="text-inactive text-sm min-[480px]:text-base text-left w-fit">
                    @{userData?.user?.username}
                  </p>
                </Link>
              </div>
              <div className="mt-2 min-[480px]:mt-4 flex gap-x-3">
                <p className="font-bold text-sm min-[480px]:text-base">
                  <span
                    className="cursor-pointer"
                    onClick={() => router.push("/profile/stats?tab=following")}
                  >
                    {formatNumberCount(
                      publicProfile.data?.followingCount ?? "0" ?? 0
                    )}{" "}
                  </span>
                  <span className="font-normal text-foreground/70">
                    Following
                  </span>
                </p>
                <p className="font-bold text-sm min-[480px]:text-base">
                  <span
                    className="cursor-pointer"
                    onClick={() => router.push("/profile/stats?tab=followers")}
                  >
                    {formatNumberCount(
                      publicProfile.data?.followerCount ?? "0" ?? "0"
                    )}{" "}
                  </span>
                  <span className="font-normal text-foreground/70">
                    Followers
                  </span>
                </p>
              </div>
            </div>
          </SheetHeader>
          <Separator className="mt-4" />

          <div className="sm:w-[314px] rounded-xl mt-4">
            <div className="flex flex-col">
              <Link
                href={"/profile"}
                onClick={() => {
                  setIsMenuOpen(false);
                }}
              >
                <div className="data-[highlighted]:bg-[#393D39] text-foreground py-3 rounded-lg font-medium text-base cursor-pointer flex justify-start items-center">
                  <Image
                    width={24}
                    height={24}
                    className="size-[24px] rounded-full mr-4 object-cover brightness-0 dark:brightness-200"
                    alt="icon"
                    src={"/assets/app-icons/more/profile.svg"}
                  />
                  <span>Profile</span>
                </div>
              </Link>
              <div className="data-[highlighted]:bg-[#393D39] text-foreground py-3 rounded-lg font-medium text-base cursor-pointer flex justify-start items-center">
                <Image
                  width={24}
                  height={24}
                  className="size-[24px] mr-4 object-cover brightness-0 dark:brightness-200"
                  alt="icon"
                  src={"/assets/app-icons/more/ads.svg"}
                />
                <span>Ads (Coming soon)</span>
              </div>
              <Link
                href={"/profile?select-type=true"}
                onClick={() => {
                  setIsMenuOpen(false);
                }}
              >
                <div className="data-[highlighted]:bg-[#393D39] text-foreground py-3 rounded-lg font-medium text-base cursor-pointer flex justify-start items-center">
                  <Image
                    width={24}
                    height={24}
                    className="size-[24px] rounded-full mr-4 object-cover brightness-0 dark:brightness-200"
                    alt="icon"
                    src={"/assets/app-icons/more/account-verification.svg"}
                  />
                  <span>Account Verification</span>
                </div>
              </Link>
              <Link
                href={"/settings"}
                onClick={() => {
                  setIsMenuOpen(false);
                }}
              >
                <div className="data-[highlighted]:bg-[#393D39] text-foreground py-3 rounded-lg font-medium text-base cursor-pointer flex justify-start items-center">
                  <Image
                    width={24}
                    height={24}
                    className="size-[24px] rounded-full mr-4 object-cover brightness-0 dark:brightness-200"
                    alt="icon"
                    src={"/assets/app-icons/more/settings.svg"}
                  />
                  <span>Settings</span>
                </div>
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger className="text-foreground py-3 rounded-lg font-medium text-base cursor-pointer flex justify-start items-center ring-offset-transparent">
                  <Image
                    width={24}
                    height={24}
                    className="size-[24px] rounded-full mr-4 object-cover brightness-0 dark:brightness-200"
                    alt="icon"
                    src={"/assets/app-icons/more/theme.svg"}
                  />
                  <span>Theme</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="sm:w-[314px] bg-border rounded-xl mx-4 px-3 py-2">
                  <DropdownMenuItem
                    className="data-[highlighted]:bg-colorPrimary/20 cursor-pointer"
                    onClick={() => setTheme("light")}
                  >
                    <Sun className="h-[1rem] mr-4 w-[1rem] rotate-0 scale-100 transition-all dark:-rotate-90" />
                    <span>Light</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="data-[highlighted]:bg-colorPrimary/20 cursor-pointer"
                    onClick={() => setTheme("dark")}
                  >
                    <Moon className="h-[1rem] mr-4 w-[1rem] rotate-90 transition-all dark:rotate-0 dark:scale-100" />
                    <span>Dark</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="data-[highlighted]:bg-colorPrimary/20 cursor-pointer"
                    onClick={() => setTheme("system")}
                  >
                    <Computer className="h-[1rem] mr-4 w-[1rem] rotate-90 transition-all dark:rotate-0 dark:scale-100" />
                    <span>System</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div
              onClick={handleLogout}
              className="data-[highlighted]:bg-[#393D39] text-foreground py-3 rounded-lg font-medium text-base cursor-pointer flex justify-start items-center"
            >
              <Image
                width={24}
                height={24}
                className="size-[24px] rounded-full mr-4 object-cover brightness-0 dark:brightness-200"
                alt="icon"
                src={"/assets/app-icons/more/logout.svg"}
              />
              <span>Log out</span>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

{
  /* <DropdownMenuContent className="sm:w-[314px] bg-border rounded-xl mx-4 px-3 py-2">
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
                </DropdownMenuContent> */
}
