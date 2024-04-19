"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import { Globe, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatNumber } from "@/utils";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";

type Props = {
  name: string;
  desc: string;
  membersCount: number;
  isLocked: boolean;
  hasJoined: boolean;
  hasRequested: boolean;
  btnOnClick: () => void;
};

const CommunityCard = (props: Props) => {
  const { resolvedTheme } = useTheme();
  const { push } = useRouter();

  return (
    <div className="rounded-xl border border-border p-[10px] duo:p-5">
      <div className="flex justify-between gap-[18px]">
        <div
          className="flex-1 flex gap-[9px] cursor-pointer"
          onClick={() => push("/community/5879-66878-78798/")}
        >
          <Image
            src={`https://source.unsplash.com/random/500x500/?soccer+${
              Math.random() * 10
            }`}
            alt="manchester united"
            width={60}
            height={60}
            className="size-[60px] bg-slate-200 dark:bg-[#0c0c0c] duo:size-[80px] md:size-[100px] rounded-lg object-cover"
          />
          <div className="">
            <p className="text-base duo:text-[20px] font-bold">{props.name}</p>
            <div className="mt-[10px] flex items-center">
              {props.isLocked ? (
                <Lock
                  color={resolvedTheme === "dark" ? "#C8C8C8" : "#000000"}
                  strokeWidth={1.5}
                  height={18}
                  width={18}
                />
              ) : (
                <Globe
                  color={resolvedTheme === "dark" ? "#C8C8C8" : "#000000"}
                  strokeWidth={1.5}
                  height={18}
                  width={18}
                />
              )}
              <span className="duo:text-base ml-1 text-sm dark:text-[#C8C8C8] text-black">
                {formatNumber(props.membersCount)} members
              </span>
            </div>
          </div>
        </div>
        <Button
          className={cn(
            props.hasJoined || props.hasRequested
              ? "border-[#4ED17E] text-[#4ED17E] !bg-transparent"
              : "hover:bg-white hover:scale-[1.01] transition-all hover:shadow-xl bg-white border-border text-foreground dark:text-black",
            "border rounded-full flex justify-center items-center h-8 duo:h-[40px] px-3 w-[90px] duo:w-[110px]"
          )}
          onClick={props.btnOnClick}
        >
          <span className="text-sm duo:text-base font-medium block p-0 align-middle">
            {props.hasJoined
              ? "Joined"
              : props.hasRequested
              ? "Requested"
              : props.isLocked
              ? "Request"
              : "Join"}
          </span>
        </Button>
      </div>
      <p className="mt-[12px] text-sm duo:text-base dark:text-[#7C7C7C] duo:dark:text-[#E6E6E6] text-black">
        {props.desc}
      </p>
    </div>
  );
};

export default CommunityCard;
