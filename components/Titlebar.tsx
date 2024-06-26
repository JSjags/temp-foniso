"use client";

import {
  profileImageplaceholder,
  titleBarItems,
  userPlaceholderImage,
} from "@/constants";
import { useUserContext } from "@/context/UserContext";
import { cn } from "@/lib/utils";
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen/index";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MobileSidebar } from "./MobileSidebar";

type Props = {};

const Titlebar = (props: Props) => {
  const { theme } = useTheme();
  const cld = new Cloudinary({ cloud: { cloudName: "delflsgq4" } });
  const pathname = usePathname();

  return (
    <div className="flex items-center justify-between px-2 h-12 sticky top-0 z-50 bg-background border-b border-border min-[480px]:hidden">
      <div className="flex-[0.3] flex justify-start items-center">
        {titleBarItems.slice(0, 1).map((_, i) => (
          <MobileSidebar key={i} />
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
              <AdvancedImage
                className="w-full max-w-[111.65px]"
                cldImg={cld.image("foniso/logo")}
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
