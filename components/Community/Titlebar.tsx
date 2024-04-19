"use client";

import { titleBarItems, userPlaceholderImage } from "@/constants";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";

const icons = [
  "/assets/app-icons/explore-inactive.svg",
  "/assets/outline/add-users.svg",
];

const Titlebar = () => {
  const { theme } = useTheme();

  return (
    <div className="flex items-center justify-between px-4 h-12 duo:h-20 sticky top-0 z-50 bg-background border-b border-border">
      <Link
        href={titleBarItems[0].path}
        className="flex flex-col gap-y-2 items-center max-h-12 justify-between min-[480px]:hidden"
      >
        <Image
          width={36}
          height={36}
          className="size-[36px] rounded-full object-cover"
          alt="user head shot"
          src={userPlaceholderImage}
        />
      </Link>

      <div className="flex-1">
        <p className="text-xl duo:text-2xl font-bold duo:text-left text-center">
          Community
        </p>
      </div>
      <div className="flex items-center justify-end gap-x-4">
        {icons.map((item, i) => (
          <Image
            key={i}
            width={24}
            height={24}
            className={cn("size-[24px]", theme === "light" ? "invert" : "")}
            alt="icon"
            src={item}
          />
        ))}
      </div>
    </div>
  );
};

export default Titlebar;
