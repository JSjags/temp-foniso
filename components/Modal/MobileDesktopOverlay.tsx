"use client";

import { ReactNode } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import useIsMobile from "@/hooks/useIsMobile";
import HeaderWithBackBtn from "../reusable/HeaderWithBackBtn";
import { cn } from "@/lib/utils";

type Props = {
  open: boolean;
  handleClose: () => void;
  children: ReactNode;
  title: ReactNode;
  contentClass?: string;
};

const MobileDesktopOverlay = (props: Props) => {
  const is_mobile = useIsMobile();

  return (
    <div>
      <Dialog open={props.open && !is_mobile} onOpenChange={props.handleClose}>
        <DialogContent
          className="md:!max-w-[680px] !px-[30px]"
          closeBtnClass="!left-4 size-[35px] rounded-full bg-[#7C7C7C] center-item"
        >
          <div className="text-2xl font-bold text-center border-b pb-5">
            {props.title}
          </div>

          <div className={cn(props.contentClass)}>{props.children}</div>
        </DialogContent>
      </Dialog>

      {props.open && is_mobile && (
        <div className="md:hidden fixed flex flex-col z-[70] h-screen w-full inset-0 bg-background">
          <HeaderWithBackBtn title={props.title} />
          <div className={cn(props.contentClass, "px-4 mt-6")}>
            {props.children}
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileDesktopOverlay;
