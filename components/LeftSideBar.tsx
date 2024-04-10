"use client";

import {
  bottomNavItems,
  leftSideBarItems,
  userPlaceholderImage,
} from "@/constants";
import { cn } from "@/lib/utils";
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ModeToggle } from "./ThemeToggle";
import { useTheme } from "next-themes";

type Props = {};

const LeftSideBar = (props: Props) => {
  const { theme } = useTheme();
  const cld = new Cloudinary({ cloud: { cloudName: "delflsgq4" } });

  const pathname = usePathname();

  return (
    <div className="h-full fixed z-50 left-0 min-[480px]:sticky bottom-0 sm:top-0 min-[480px]:border-r border-border bg-background">
      {/* Desktop sidebar */}
      <div className="px-[38px] pt-[30px] hidden min-[1000px]:block min-w-[200px] h-full">
        <AdvancedImage
          className="w-full max-w-[115.65px]"
          cldImg={cld.image("foniso/logo")}
        />
        <div className="text-white mt-10 flex flex-col gap-y-8">
          {leftSideBarItems
            .slice(0, leftSideBarItems.length - 1)
            .map((item, i) => (
              <Link
                key={i}
                href={item.path}
                className="flex gap-x-4 py-[11] items-center"
              >
                {item?.inactiveIcon === null || item?.activeIcon === null ? (
                  <div className="size-[30px] rounded-full">
                    <Image
                      width={30}
                      height={30}
                      className="size-[30px] rounded-full object-cover border border-border"
                      alt="icon"
                      src={userPlaceholderImage}
                    />
                  </div>
                ) : (
                  <Image
                    width={30}
                    height={30}
                    className={cn(
                      "w-[30px]",
                      pathname === item.path ? "brightness-200" : "",
                      theme === "light" ? "invert" : ""
                    )}
                    alt="icon"
                    src={
                      pathname === item.path
                        ? item?.activeIcon
                        : item?.inactiveIcon
                    }
                  />
                )}
                <span
                  className={cn(
                    " text-lg font-semibold",
                    pathname === item.path
                      ? "text-foreground"
                      : "text-foreground/50"
                  )}
                >
                  {item.title}
                </span>
              </Link>
            ))}
        </div>
        <div className="my-8 w-full h-[1px] bg-border" />
        {leftSideBarItems.slice(-1).map((item, i) => (
          <Link
            key={i}
            href={item.path}
            className="flex gap-x-4 py-[11] items-center"
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
                  : pathname === item.path
                  ? item?.activeIcon
                  : item?.inactiveIcon
              }
            />
            <span
              className={cn(
                "text-textNav text-lg font-semibold",
                pathname === item.path ? "text-white" : "text-inactive"
              )}
            >
              {item.title}
            </span>
          </Link>
        ))}
        <div className="absolute bottom-4 left-0 px-[38px]">
          <ModeToggle />
        </div>
      </div>
      {/* Tablet sidebar */}
      <div className="px-[18px] pt-[30px] hidden min-[480px]:block min-[1000px]:hidden relative h-full">
        <Image
          width={30}
          height={30}
          className="size-[30px] rounded-full object-cover"
          alt="icon"
          src={"/assets/favicon.svg"}
        />
        <div className="text-white mt-10 flex flex-col gap-y-8">
          {leftSideBarItems
            .slice(0, leftSideBarItems.length - 1)
            .map((item, i) => (
              <Link
                key={i}
                href={item.path}
                className="flex gap-x-4 py-[11] items-center"
              >
                {item?.inactiveIcon === null || item?.activeIcon === null ? (
                  <div className={cn("size-[30px] rounded-full")}>
                    <Image
                      width={30}
                      height={30}
                      className="size-[30px] rounded-full object-cover border border-border"
                      alt="icon"
                      src={userPlaceholderImage}
                    />
                  </div>
                ) : (
                  <Image
                    width={30}
                    height={30}
                    className={cn(
                      "w-[30px]",
                      pathname === item.path ? "brightness-200" : "",
                      theme === "light" ? "invert" : ""
                    )}
                    alt="icon"
                    src={
                      pathname === item.path
                        ? item?.activeIcon
                        : item?.inactiveIcon
                    }
                  />
                )}
              </Link>
            ))}
        </div>
        <div className="my-8 w-full h-[1px] bg-contentBorder" />
        {leftSideBarItems.slice(-1).map((item, i) => (
          <Link
            key={i}
            href={item.path}
            className="flex gap-x-4 py-[11] items-center"
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
                  : pathname === item.path
                  ? item?.activeIcon
                  : item?.inactiveIcon
              }
            />
          </Link>
        ))}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
          <ModeToggle />
        </div>
      </div>
      {/* Mobile bottom nav */}
      <div className="pt-[30px] flex fixed z-50 bottom-0 left-0 min-[480px]:hidden">
        <div className="text-white flex justify-between px-4 bg-background w-screen gap-y-8 py-2 border-t border-border">
          {bottomNavItems.map((item, i) => (
            <Link
              key={i}
              href={item.path}
              className="flex flex-col gap-y-0 items-center h-10 max-h-10 justify-between"
            >
              {item?.inactiveIcon === null || item?.activeIcon === null ? (
                <div className="size-[30px] rounded-full">
                  <Image
                    width={18}
                    height={18}
                    className="h-[18px_!important] rounded-full object-cover border border-border"
                    alt="icon"
                    src={userPlaceholderImage}
                  />
                </div>
              ) : (
                <Image
                  width={18}
                  height={18}
                  className={cn(
                    "h-[18px_!important]",
                    pathname === item.path ? "brightness-200" : "",
                    theme === "light" ? "invert" : ""
                  )}
                  alt="icon"
                  src={
                    pathname === item.path
                      ? item?.activeIcon
                      : item?.inactiveIcon
                  }
                />
              )}

              <span
                className={cn(
                  "text-[10px] min[320px]:text-sm font-medium",
                  pathname === item.path
                    ? "text-foreground"
                    : "text-foreground/60"
                )}
              >
                {item.title}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LeftSideBar;
