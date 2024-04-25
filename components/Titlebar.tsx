"use client";

import {
  profileImageplaceholder,
  titleBarItems,
  userPlaceholderImage,
} from "@/constants";
import { useUserContext } from "@/context/UserContext";
import { cn } from "@/lib/utils";
import { Cloudinary } from "@cloudinary/url-gen/index";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type Props = {};

const Titlebar = (props: Props) => {
  const { userData } = useUserContext();
  const { theme } = useTheme();
  const pathname = usePathname();

  const [logoPath, setLogoPath] = useState("/assets/logo-dark.svg");

  useEffect(() => {
    setLogoPath(
      theme === "light" || theme === "undefined"
        ? "/assets/logo-dark.svg"
        : "/assets/logo.svg"
    );
  }, [theme]);

  return (
    <div className="flex items-center justify-between px-2 h-12 sticky top-0 z-50 bg-background border-b border-border min-[480px]:hidden">
      <div className="flex-[0.3] flex justify-start items-center">
        {titleBarItems.slice(0, 1).map((item, i) => (
          <Link
            key={i}
            href={item.path}
            className="flex flex-col gap-y-2 items-center max-h-12 justify-between"
          >
            <div className="size-[36px] rounded-full">
              <Image
                width={36}
                height={36}
                className="size-[36px] rounded-full object-cover"
                alt="icon"
                src={userData?.user.usermeta?.avatar ?? profileImageplaceholder}
              />
            </div>
          </Link>
        ))}
      </div>
      <div className="flex-1">
        {titleBarItems.slice(0, 1).map((item, i) => (
          <Link
            key={i}
            href={"/home"}
            className="flex flex-col gap-y-2 items-center h-fit max-h-10 justify-between"
          >
            <div className=" rounded-full">
              <Image
                alt="logo"
                src={logoPath}
                className="w-full max-w-[111.65px]"
                width={165.65}
                height={11}
              />
            </div>
          </Link>
        ))}
      </div>
      <div className="flex items-center gap-x-4 flex-[0.3]">
        {titleBarItems.slice(1).map((item, i) => (
          <Link
            key={i}
            href={item.path}
            className="flex flex-col gap-y-2 items-center h-fit max-h-10 justify-between"
          >
            <div className="size-[24px] rounded-full">
              <Image
                width={24}
                height={24}
                className={cn(
                  "size-[24px]",
                  pathname === item.path ? "brightness-200" : "",
                  theme === "light" ? "invert" : ""
                )}
                alt="icon"
                src={
                  pathname === item.path
                    ? (item.activeIcon as string)
                    : (item.inactiveIcon as string)
                }
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Titlebar;
