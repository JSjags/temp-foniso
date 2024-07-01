import useIsMobile from "@/hooks/useIsMobile";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ReactNode } from "react";
import { PiCaretRightThin } from "react-icons/pi";

type ItemProps = {
  icon?: keyof JSX.IntrinsicElements;
  count?: number;
  label: string;
  desc?: ReactNode;
  removePadding?: boolean;
  href: string;
  setter?: React.Dispatch<React.SetStateAction<boolean>>;
};

const NavList = (props: ItemProps) => {
  const searchParams = useSearchParams();
  const is_mobile = useIsMobile();

  return (
    <Link
      href={{
        query: {
          ...(props.href !== "delete-account"
            ? { tab: props.href }
            : { tab: "your-account" }),
        },
      }}
      onClick={() => {
        console.log(props?.setter);
        if (props.setter !== undefined) {
          props.setter(true);
        }
      }}
      replace={!is_mobile}
      className={cn(
        "flex items-center gap-4 duo:gap-5 py-5",
        props.removePadding ? "" : " px-4 duo:px-5",
        searchParams.get("tab") === props.href
          ? "bg-[#E1E1E1] dark:bg-[#1D211E]"
          : ""
      )}
    >
      {props.icon && (
        <props.icon className="text-2xl text-[#656464] dark:text-[#7C7C7C]" />
      )}
      <span className="block flex-1">
        <span className="font-medium block"> {props.label} </span>
        <span className="font-sm text-[#888888] dark:text-[#AFAFAF] block">
          {props.desc}
        </span>
      </span>
      {props.count ? (
        <span className="size-[25.6px] rounded-full bg-[#188C43] text-white center-item text-xs duo:text-sm">
          {props.count}
        </span>
      ) : (
        <PiCaretRightThin className="text-2xl text-[#888888] dark:text-[#7C7C7C]" />
      )}
    </Link>
  );
};

export default NavList;
