import Image from "next/image";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { CiSearch } from "react-icons/ci";
import { VscVerifiedFilled } from "react-icons/vsc";
import { cn } from "@/lib/utils";

const MembersList = () => {
  return (
    <div className="mt-5 px-4">
      <div className="relative flex items-center">
        <CiSearch className="absolute left-2 text-2xl" />
        <Input className="pl-9 bg-[#656464] dark:bg-[#020302] dark:border-[#222623]" />
      </div>

      <div className="mt-5">
        {[0, 1, 2, 3].map((itm) => (
          <div
            className="flex justify-between gap-6 py-4 border-b border-border"
            key={itm}
          >
            <div className="flex gap-3">
              <Image
                src="https://source.unsplash.com/random/100x100/?man"
                alt="User"
                width={40}
                height={40}
                className="size-10 rounded-full object-cover"
              />
              <div className="">
                <p className="text-lg font-medium">
                  $tone$ilver{" "}
                  <VscVerifiedFilled className="inline-block fill-[#22C55E]" />
                </p>
                <p className="text-sm text-[#7C7C7C]">@sportson3</p>
              </div>
            </div>
            <Button
              className={cn(
                itm === 3
                  ? "bg-[#1a1a1a67] dark:bg-[#FAFAFA67] text-white dark:text-black"
                  : "bg-[#1A1A1A] dark:bg-white text-white dark:text-black",
                "rounded-full font-bold w-[101px]"
              )}
            >
              Invite
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MembersList;
