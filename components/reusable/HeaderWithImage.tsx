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
import { Lock } from "lucide-react";
import { useTheme } from "next-themes";
import { formatNumber } from "@/utils";

type Props = {
  dropDownOptions: Array<MoreOptionsContext>;
  imgSrc: string;
  name: string;
  memberCount: number;
  sideBtn?: ReactNode;
};

const HeaderWithImage = (props: Props) => {
  const { back } = useRouter();
  const { resolvedTheme } = useTheme();

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

            <DropdownMenuContent align="end" className="duo:w-[220px]">
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
            <Lock
              color={resolvedTheme === "dark" ? "#ffffff" : "#000000"}
              strokeWidth={1.5}
              height={18}
              width={18}
            />

            <p className="text-sm leading-none">
              {formatNumber(props.memberCount)} members
            </p>
          </div>
        </div>

        <div className="absolute bottom-0 right-0">{props.sideBtn}</div>
      </div>
    </>
  );
};

export default HeaderWithImage;
