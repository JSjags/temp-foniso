import { highlights, trendingHighlights, trendingTopics } from "@/constants";
import Image from "next/image";
import SportIcon from "./SportIcon";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import axiosInstance from "@/services/api/axiosInstance";
import { formatCurrentWeek } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { getHighlights } from "@/services/api/userService";
import { HighlightMeta } from "@/types";
import HighlightCard from "./HighlightCard";
import PageLoadingSpinner from "../Spinner/PageLoadingSpinner";

type Props = {};

const Highlights = (props: Props) => {
  // https://stagingapi.foniso.team/api/v1/explore/sport-highlights?startDate=2023-12-18

  const [trending, setTrending] = useState<any[]>([]);
  const [isTrendingLoading, setIsTrendingLoading] = useState<boolean>(false);

  const highlights = useQuery({
    queryKey: ["get-highlights"],
    queryFn: getHighlights,
  });

  console.log(highlights.data?.data.data);

  return (
    //  max-w-[740px]
    <div className="text-foreground py-5 pb-6 pt-8 relative font-bold border-b border-border w-[100%]">
      <p className="px-2 sm:px-6 text-xl">Highlights of the week</p>
      <div className="mt-4 flex gap-x-4 overflow-x-scroll hide-scrollbar px-6 snap-mandatory snap-x scroll-p-2 sm:scroll-p-6">
        <div className="w-0 overflow-visible flex gap-x-4 hide-scrollbar snap-mandatory snap-x scroll-p-2 sm:scroll-p-6">
          {highlights.isLoading &&
            Array(5)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className="mt-0 flex justify-center items-center w-[200px] min-h-[160px]"
                >
                  <PageLoadingSpinner spinnerExtraClass="w-7 h-7" />
                </div>
              ))}
          {Boolean(
            highlights.data?.data.data.items &&
              highlights.data?.data.data.items.length &&
              !highlights.isLoading
          ) &&
            highlights.data?.data.data.items.map(
              (highlight: HighlightMeta, i: number) => (
                <HighlightCard key={i} highlight={highlight} />
              )
            )}
        </div>

        {/* {highlights.map((highlight, i) => (
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
        ))} */}
      </div>
    </div>
  );
};

export default Highlights;
