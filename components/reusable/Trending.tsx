import { trendingHighlights, trendingTopics } from "@/constants";
import Image from "next/image";
import SportIcon from "./SportIcon";
import { Button } from "../ui/button";
import axiosInstance from "@/services/api/axiosInstance";
import { useEffect, useState } from "react";
import PageLoadingSpinner from "../Spinner/PageLoadingSpinner";

type Props = {};

const Trending = (props: Props) => {
  const [trending, setTrending] = useState<any[]>([]);
  const [isTrendingLoading, setIsTrendingLoading] = useState<boolean>(false);

  const fetchTrending = async () => {
    try {
      setIsTrendingLoading(true);
      const res = await axiosInstance.get("/explore/trending");
      console.log(res.data.data[0]);
      setTrending(res.data.data[0]);
    } catch (error) {
      console.log(error);
    } finally {
      setIsTrendingLoading(false);
    }
  };
  useEffect(() => {
    fetchTrending();
  }, []);

  return (
    <div className="text-white py-5 pb-6 pt-2 relative font-bold border-b border-border max-w-[740px]">
      <p className="px-2 sm:px-6 text-xl text-foreground">Trending now!</p>
      <div className="mt-4 flex gap-x-4 overflow-x-scroll hide-scrollbar px-2 sm:px-6 snap-x snap-mandatory scroll-p-2 sm:scroll-p-6 hide-scrollbar">
        {isTrendingLoading &&
          Array(3)
            .fill(0)
            .map((item, i) => (
              <div
                key={i}
                className="mt-0 flex justify-center items-center w-[200px] min-h-[160px]"
              >
                <PageLoadingSpinner spinnerExtraClass="w-7 h-7" />
              </div>
            ))}
        {Boolean(
          trendingHighlights && trendingHighlights.length && !isTrendingLoading
        ) &&
          trendingHighlights.map((highlight, i) => (
            <div
              key={i}
              className="w-full snap-start min-w-[266px] max-w-[266px] sm:max-w-[346px] sm:min-w-[346px] h-[225px] bg-contentBorder rounded-lg relative overflow-hidden"
            >
              <Image
                width={16}
                height={9}
                alt="trending-highlight"
                src={highlight.image}
                className="w-full h-full object-cover"
              />
              <div className="flex flex-col justify-between w-full h-full bg-gradient-to-b from-[#222623]/20 to-black absolute top-0 left-0 z-[1] px-2 pt-2 pb-4">
                <div className="flex gap-x-1 items-center bg-white px-[10px] py-[2px] rounded-full w-fit">
                  <span className="text-xs text-textDark flex items-center justify-center">
                    {highlight.category}
                  </span>
                  <SportIcon category={highlight.category} />
                </div>
                <div className="text-white">
                  <p className="font-medium text-sm">
                    @{highlight.username} • {highlight.created_at}
                  </p>
                  <p className="mt-1 font-bold text-lg line-clamp-1 text-ellipsis">
                    {highlight.title}
                  </p>
                </div>
              </div>
              <div />
            </div>
          ))}
      </div>
      <div className="px-2 sm:px-6 flex flex-col gap-y-5 mt-2">
        {isTrendingLoading && (
          <div className="mt-10 flex justify-center">
            <PageLoadingSpinner spinnerExtraClass="w-7 h-7" />
          </div>
        )}
        {Boolean(
          trendingTopics && trendingTopics.length && !isTrendingLoading
        ) &&
          trendingTopics.map((trending, i) => (
            <div key={i} className="flex justify-between items-start py-2">
              <p className="font-bold text-xl text-foreground">
                {trending.topic}
              </p>
              <p className=" text-base text-foreground/50">
                {trending.postsCount} posts
              </p>
            </div>
          ))}
      </div>
      <div className="px-2 sm:px-6">
        <Button variant={"link"} className="text-colorPrimary mt-3 p-0 text-lg">
          See all
        </Button>
      </div>
    </div>
  );
};

export default Trending;
