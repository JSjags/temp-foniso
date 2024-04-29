import { HTMLProps, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { WrapperProps } from "@/types";

const IconWrapper = ({ children, className, ...rest }: WrapperProps) => {
  return (
    <div
      className={cn(
        "size-[50px] center-item rounded-full bg-[#1a1a1a80] dark:bg-[#0d0f0e7f] cursor-pointer",
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
};

export default IconWrapper;
