"use client";

import { HTMLAttributes, ReactNode } from "react";
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
  wrapperElement?: keyof JSX.IntrinsicElements;
  wrapperProps?: HTMLAttributes<HTMLElement>;
};

const Wrapper = (props: {
  name: keyof JSX.IntrinsicElements;
  children: ReactNode;
  attrs?: HTMLAttributes<HTMLElement>;
}) => {
  const { name, children, ...rest } = props;
  return <props.name {...rest}> {props.children} </props.name>;
};

const MobileDesktopOverlay = (props: Props) => {
  const is_mobile = useIsMobile();

  return (
    <>
      <Dialog open={props.open && !is_mobile} onOpenChange={props.handleClose}>
        <DialogContent
          className="md:!max-w-[680px] px-5"
          closeBtnClass="!left-4 size-[35px] rounded-full bg-[#7C7C7C] center-item"
        >
          <div className="text-2xl font-bold text-center border-b pb-5">
            {props.title}
          </div>

          <Wrapper name={props.wrapperElement ?? "div"} {...props.wrapperProps}>
            <div className={cn(props.contentClass)}>{props.children}</div>
          </Wrapper>
        </DialogContent>
      </Dialog>

      {props.open && is_mobile && (
        <Wrapper name={props.wrapperElement ?? "div"} {...props.wrapperProps}>
          <div className="md:hidden fixed flex flex-col z-[70] h-screen w-full inset-0 bg-background">
            <HeaderWithBackBtn title={props.title} />
            <div className={cn(props.contentClass, "px-4 mt-6")}>
              {props.children}
            </div>
          </div>
        </Wrapper>
      )}
    </>
  );
};

export default MobileDesktopOverlay;
