"use client";

import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

import { WrapperProps } from "@/types";
import HomeSidebar from "./right-sidebar/HomeSidebar";
import Image from "next/image";

const AdsSidebar = ({ children, className }: WrapperProps) => {
  const pathname = usePathname();

  return (
    <div
      className={cn(
        "hidden min-[860px]:block min-w-[280px] w-[40%] max-w-[480px] min-h-screen h-fit border-l border-border bg-background sticky",
        pathname === "/explore" ? "top-0" : "top-0",
        className
      )}
    >
      <div className="flex flex-col gap-y-4 px-2 pl-0 mt-3">
        {Array(2)
          .fill(0)
          .map((item: number, i: number) => (
            <Image
              key={i}
              alt="ad"
              className=""
              src={"/assets/graphics/advert-placeholders.svg"}
              width={451}
              height={197}
            />
          ))}
      </div>
    </div>
  );
};

export default AdsSidebar;
