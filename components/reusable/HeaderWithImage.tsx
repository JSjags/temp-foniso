import { ReactNode } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { MoreOptionsContext } from "@/types/community";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaArrowLeftLong } from "react-icons/fa6";
import { IoMdMore } from "react-icons/io";
import { CiGlobe } from "react-icons/ci";
import { RxLockClosed } from "react-icons/rx";
import { formatNumber } from "@/utils";

type Props = {
  dropDownOptions: Array<MoreOptionsContext>;
  imgSrc: string;
  name: string;
  memberCount: number;
  isPrivate?: boolean;
  sideBtn?: ReactNode;
};

const HeaderWithImage = (props: Props) => {
  const { back } = useRouter();

  return (
    <>
      <div className="h-[140px] duo:h-[231px] relative w-full">
        <Image
          src={props.imgSrc}
          alt="community"
          fill
          className=" object-cover object-center"
        />

        <div className="absolute top-[11px] w-full px-4 flex justify-between items-center">
          <button
            type="button"
            className="size-[45px] center-item rounded-full appearance-none bg-[#22262399] cursor-pointer"
            onClick={() => back()}
          >
            <FaArrowLeftLong className="fill-white text-xl" />
          </button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="size-[45px] center-item rounded-full appearance-none bg-[#22262399]"
              >
                <IoMdMore className="fill-white text-3xl" />
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              className="duo:w-[220px] bg-background"
            >
              {props.dropDownOptions.map(({ label, callback, color }) => (
                <DropdownMenuItem
                  key={label}
                  className={cn(color, "py-3 cursor-pointer")}
                  onClick={callback}
                >
                  <span className="">{label}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="flex items-end justify-between relative mt-5 px-4">
        <div className="">
          <p className="text-2xl duo:text-[26px] font-bold">{props.name}</p>
          <div className="flex gap-1 items-end mt-4">
            {props?.isPrivate ? (
              <RxLockClosed className="text-base stroke-[0.6px]" />
            ) : (
              <CiGlobe className="text-base text-black dark:text-white" />
            )}

            <p className="text-sm leading-none">
              {formatNumber(props.memberCount)}{" "}
              {props.memberCount > 1 ? "members" : "member"}
            </p>
          </div>
        </div>

        <div className="absolute bottom-0 right-4">{props.sideBtn}</div>
      </div>
    </>
  );
};

export default HeaderWithImage;
