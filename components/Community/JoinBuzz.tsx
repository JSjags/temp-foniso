import { useEffect, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import useIsMobile from "@/hooks/useIsMobile";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import MobileDrawer from "../ui/MobileDrawer";
import { HiOutlineUser } from "react-icons/hi2";
import Image from "next/image";
import { CiMicrophoneOff } from "react-icons/ci";
import { GoPlus } from "react-icons/go";
import { IoHandLeftOutline } from "react-icons/io5";
import { Button } from "../ui/button";
import IconWrapper from "../reusable/IconWrapper";
import { cn } from "@/lib/utils";

export const Buzz = () => {
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setConnected(true);
    }, 4000);
  }, []);

  return (
    <div className="mt-10 md:mt-12">
      <div className="flex items-center">
        <div className="flex items-center gap-2 font-bold">
          <span>355</span> <HiOutlineUser className="text-xl" />
        </div>
        <div className="flex-1 text-center text-[1.25rem] leading-none font-medium">
          {connected ? "Connected" : "Connecting..."}
        </div>
      </div>

      <p className="text-xl md:text-2xl font-bold md:text-center mt-6">
        Who is the Goat. Messi or Ronaldo? 🐐🐐🐐
      </p>

      <div className="w-full max-w-[450px] mx-auto grid grid-cols-4 gap-x-[0.875rem] gap-y-5 mt-5 min-h-[300px]">
        {connected &&
          "0123456789qwerty".split("").map((item) => (
            <div key={item} className="aspect-square flex flex-col">
              <div className="flex-1 w-[70%] mx-auto relative rounded-[20%]">
                <Image
                  src="https://source.unsplash.com/random/?guest"
                  alt={"buzzer" + item}
                  fill
                  sizes=""
                  className="object-cover rounded-[20%]"
                />

                {item === "1" && (
                  <IconWrapper className="size-6 text-sm absolute -bottom-1 -left-1 bg-[#1A1A1A] dark:bg-white z-[1]">
                    ✋🏼
                  </IconWrapper>
                )}

                <IconWrapper className="size-6 text-xl text-[#F3F7F2] dark:text-[#888888] absolute -bottom-1 -right-1 bg-[#676666] dark:bg-[#222623] z-[1]">
                  <CiMicrophoneOff />
                </IconWrapper>
              </div>
              <div className="text-center mt-1">
                <p className="text-sm text-[#1A1A1A] dark:text-[#FAFAFA] font-medium truncate">
                  John doe
                </p>
                <p className="text-[#7C7C7C] text-xs">Admin</p>
              </div>
            </div>
          ))}
      </div>

      <div
        className={cn(
          "pt-4 mt-3 md:mt-8 flex justify-between md:justify-center items-center gap-4 md:gap-10 md:border-t",
          connected ? "" : "opacity-20"
        )}
      >
        <div className="flex text-3xl text-[#FAFAFA] max-md:flex-1 justify-between md:justify-center md:gap-10">
          <IconWrapper>
            <CiMicrophoneOff />
          </IconWrapper>
          <IconWrapper>
            <GoPlus />
          </IconWrapper>
          <IconWrapper>
            <IoHandLeftOutline />
          </IconWrapper>
        </div>

        <Button className="rounded-full !bg-[#160C0C] text-[#C60D25] md:border md:border-transparent md:hover:border-[#C60D25]">
          Leave
        </Button>
      </div>
    </div>
  );
};

const JoinBuzz = () => {
  const is_mobile = useIsMobile();
  const searchParam = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const handleClose = () => {
    replace(`${pathname}?live-buzz=63673-323637737-82388`);
  };

  return (
    <div>
      <Dialog
        open={searchParam.get("tab") === "buzz" && !is_mobile}
        onOpenChange={handleClose}
      >
        <DialogContent
          className="md:!max-w-[750px] px-5"
          closeBtnClass="size-[35px] rounded-full bg-[#7C7C7C] center-item"
        >
          <Buzz />
        </DialogContent>
      </Dialog>

      <MobileDrawer
        open={searchParam.get("tab") === "buzz" && is_mobile}
        close={handleClose}
      >
        <Buzz />
      </MobileDrawer>
    </div>
  );
};

export default JoinBuzz;
