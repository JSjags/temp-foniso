import { formatNumber } from "@/utils";
import { Button } from "../ui/button";
import Image from "next/image";
import { cn } from "@/lib/utils";

type Props = {
  details: {
    name: string;
    spectators: Array<string>;
    spectatorsCount: number;
    host: {
      name: string;
      avatar: string;
    };
  };
};

const BuzzCard = ({ details }: Props) => {
  return (
    <div className="rounded-xl space-y-3 bg-gradient-to-r from-[#2A6032] via-[#0F5220] to-[#044D18] p-4">
      <div className="flex justify-between gap-4 duo:gap-6">
        <div className=" font-bold text-lg duo:text-[20px] text-white">
          {details.name}
        </div>
        <Button className="rounded-full dark:bg-black dark:text-white bg-white text-black font-semibold">
          Join buzz
        </Button>
      </div>
      <div className="flex items-center">
        <div className="flex relative">
          {details.spectators.map((item, index) => (
            <div
              key={item}
              className={cn(
                index
                  ? "border-2 border-[#2A6032] absolute left-0"
                  : "relative",
                "size-[36px] bg-gray-700 rounded-full overflow-hidden"
              )}
              style={{
                ...(item ? { transform: `translateX(${index * 20}px)` } : {}),
              }}
            >
              <Image src={item} alt="community DP" fill sizes="36px" />
            </div>
          ))}
        </div>
        <p className="text-sm duo:text-base ml-11 text-white">
          {formatNumber(details.spectatorsCount)} spectators
        </p>
      </div>
      <div className="flex items-center gap-2">
        <div className="size-[30px] relative bg-gray-700 rounded-full overflow-hidden">
          <Image
            src={details.host.avatar}
            alt="community DP"
            fill
            sizes="30px"
          />
        </div>
        <p className="text-sm text-white">{details.host.name} (Host)</p>
      </div>
    </div>
  );
};

export default BuzzCard;
