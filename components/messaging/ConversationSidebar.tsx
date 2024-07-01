import { cn } from "@/lib/utils";
import { ReactNode } from "react";

const ConversationSidebar = ({
  children,
  className,
}: {
  children: ReactNode;
  className: string;
}) => {
  return (
    <div
      className={cn(
        "fixed z-[50] md:z-0 w-full md:w-auto md:relative bottom-0 left-0",
        className
      )}
    >
      {children}
    </div>
  );
};

export default ConversationSidebar;
