import { highlights, trendingHighlights, trendingTopics } from "@/constants";
import Image from "next/image";
import SportIcon from "./SportIcon";
import { Button } from "../ui/button";

type Props = {};

const Highlights = (props: Props) => {
  return (
    <div className="text-foreground py-5 pb-6 pt-8 relative font-bold border-b border-border max-w-[740px]">
      <p className="px-2 sm:px-6 text-xl">Highlights of the week</p>
      <div className="mt-4 flex gap-x-4 overflow-x-scroll hide-scrollbar px-6 snap-mandatory snap-x scroll-p-2 sm:scroll-p-6">
        {highlights.map((highlight, i) => (
          <div
            key={i}
            className="snap-start w-full max-w-[300px] min-w-[270px] h-[349px] aspect-square bg-background rounded-lg relative overflow-hidden"
          >
            <Image
              width={2}
              height={3}
              alt="trending-highlight"
              src={highlight.image}
              className="w-full h-full object-cover"
            />
            <div className="flex flex-col justify-center w-full bg-gradient-to-l from-[#222623]/20 via-[#161616]/70 to-[#080908] absolute bottom-0 h-[25%] max-h-[85px]  left-0 z-[1] px-2">
              <div className="text-white">
                <p className="mt-1 font-bold text-lg line-clamp-1 text-ellipsis">
                  {highlight.title}
                </p>
                <p className="font-medium text-base mt-1">
                  @{highlight.username} • {highlight.comments_count} comments
                </p>
              </div>
            </div>
            <div />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Highlights;
