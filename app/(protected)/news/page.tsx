"use client";

import AdsSidebar from "@/components/AdsSidebar";
import SubTabs from "@/components/reusable/SubTabs";
import RightSideBar from "@/components/RightSideBar";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { favoriteSports, newsTabs } from "@/constants";
import { cn } from "@/lib/utils";
import { getNews, getSports } from "@/services/api/news";
import { customRelativeTime } from "@/utils";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ImSpinner2 } from "react-icons/im";

type Props = {};

const News = (props: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [page, setPage] = useState(1);
  const [numOfTabsToDisplay, setNumOfTabsToDisplay] = useState(1);
  const tabContainerRef = useRef<HTMLDivElement | null>(null);

  const tab = searchParams.get("tab") || "all";

  const news = useQuery({
    queryKey: ["get-posts", page, tab],
    queryFn: () => getNews(page, tab),
  });

  const styleActiveTab = (currentTab: string) => {
    if (tab?.split(" ").join("-") === currentTab?.split(" ").join("-")) {
      return "text-colorPrimary";
    }
    if (tab === null && currentTab.toLowerCase() === "all") {
      return "text-colorPrimary";
    }
  };
  const activeTabStyling = (currentTab: string) => {
    if (tab?.split(" ").join("-") === currentTab?.split(" ").join("-")) {
      return "bg-colorPrimary";
    }
    if (
      tab?.split(" ").join("-") === null &&
      currentTab.toLowerCase() === "all"
    ) {
      return "bg-colorPrimary";
    }
  };

  useEffect(() => {
    if (tabContainerRef.current) {
      // Get the width of the div
      const divWidth = tabContainerRef.current.getBoundingClientRect().width;
      console.log(divWidth);
      setNumOfTabsToDisplay(Math.round(divWidth / 120));
      console.log(Math.round(divWidth / 120));

      // Optionally, you can add a resize event listener to update the width dynamically
      const handleResize = () => {
        if (tabContainerRef.current) {
          const divWidth =
            tabContainerRef.current.getBoundingClientRect().width;
          console.log(tabContainerRef.current.getBoundingClientRect().width);
          setNumOfTabsToDisplay(Math.round(divWidth / 120));
          console.log(Math.round(divWidth / 120));
        }
      };

      window.addEventListener("resize", handleResize);

      // Cleanup the event listener on component unmount
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  // const sports = useQuery({
  //   queryKey: ["get-sports"],
  //   queryFn: getSports,
  // });

  console.log(news.data?.data.data.items);

  const navigateToNews = (id: number) => {
    router.push(`/news/${id}`);
  };

  return (
    <div className="flex-1 max-w-full">
      <div
        // className="pt-3 bg-background border-b border-border w-full overflow-hidden flex justify-between gap-x-4 sm:gap-x-6 pr-4 sm:pr-6"
        className="sm:pt-3 bg-background border-b border-border w-full flex justify-between gap-x-4 sm:gap-x-6"
        ref={tabContainerRef}
      >
        {" "}
        <ScrollArea className="overflow-hidden w-full whitespace-nowrap rounded-md">
          <div className="flex justify-between space-x-4 p-4 py-0">
            {newsTabs.map((tab, i) => (
              <div
                key={i}
                className={cn(
                  "relative flex flex-col items-center w-fit shrink-0"
                )}
              >
                <Button
                  onClick={() => {
                    return router.push(
                      `?tab=${tab.toLowerCase().split(" ").join("-")}`
                    );
                  }}
                  className={cn(
                    "rounded-none uppercase min-w-20 bg-background hover:bg-background text-foreground/70 text-sm sm:text-base font-medium",
                    styleActiveTab(tab.toLowerCase())
                  )}
                >
                  {tab}
                </Button>
                <div
                  className={cn(
                    "h-[3px] w-[80px] rounded-t-full",
                    activeTabStyling(tab.toLowerCase())
                  )}
                />
              </div>
            ))}
          </div>
          <ScrollBar orientation="horizontal" className="h-1" />
        </ScrollArea>
        {/* <SubTabs
          wrapperClassName={"gap-x-4 sm:gap-x-6"}
          tabClassName={
            "font-normal uppercase text-[14px_!important] text-sm sm:text-base lg:text-base w-24"
          }
          tabs={newsTabs.slice(0, numOfTabsToDisplay - 1)}
        />{" "} */}
        {/* <Select
          onValueChange={(val) =>
            router.push(`?tab=${val.toLowerCase().split(" ").join("-")}`)
          }
        >
          <SelectTrigger className="w-24 border-0 uppercase text-foreground/70">
            <SelectValue
              placeholder={"MORE"}
              className="uppercase text-foreground/70"
            />
          </SelectTrigger>
          <SelectContent className="bg-background">
            {newsTabs
              .slice(numOfTabsToDisplay - 1)
              .map((t: string, i: number) => (
                <SelectItem
                  onClick={() => {
                    router.push(`?tab=${t.toLowerCase().split(" ").join("-")}`);
                  }}
                  value={t}
                  key={i}
                  className="data-[highlighted]:text-foreground data-[highlighted]:bg-colorPrimary/30 text-sm sm:text-base lg:text-base uppercase"
                >
                  {t}
                </SelectItem>
              ))}
          </SelectContent>
        </Select> */}
      </div>
      <div className="flex gap-0 min-[480px]:gap-2 bg-transparent">
        <div className="relative min-[480px]:mt-0 flex-1 bg-background min-h-screen pb-40">
          {news.isLoading && (
            <div className="mt-10 sm:mt-20 flex justify-center items-center">
              <ImSpinner2 className="size-4 sm:size-10 animate-spin text-[#4ED17E]" />
            </div>
          )}
          {news.isSuccess && news.data && tab === "all" && (
            <>
              <div className="py-4 px-2 sm:px-4">
                <p className="text-xl font-bold text-foreground">Top News</p>
                {news.data.data.data.items[0] && (
                  <div
                    onClick={() =>
                      navigateToNews(news.data.data.data.items[0].id)
                    }
                    className="w-full min-h-[300px] mt-4 rounded-lg flex flex-col sm:flex-row justify-between gap-3 cursor-pointer"
                  >
                    <div className="flex w-full h-[200px] sm:w-[45%] relative">
                      <Image
                        alt="news-poster"
                        layout="fill"
                        objectFit="cover"
                        className="rounded-lg"
                        src={news.data.data.data.items[0].media[0].media}
                      />
                    </div>
                    <div className="flex-1 pt-4 pb-0 sm:py-8">
                      <p className="font-bold text-foreground text-lg sm:text-2xl hover:underline cursor-pointer">
                        {news.data.data.data.items[0].title}
                      </p>
                      <p
                        className="hidden sm:block text-base mt-5 font-medium text-foreground/60"
                        dangerouslySetInnerHTML={{
                          __html: news.data.data.data.items[0].title,
                        }}
                      ></p>
                    </div>
                  </div>
                )}
                <div className="mt-2 sm:mt-6 h-[1px] w-full bg-border" />
              </div>
              <div className="grid grid-cols-1 min-[860px]:grid-cols-2 min-[1240px]:grid-cols-3 sm:grid-cols-3 md:grid-cols-3 gap-3 py-4 px-2 sm:px-4">
                {(news.data.data.data.items as [])
                  .slice(1)
                  .map((news: any, i: number) => (
                    <div
                      key={i}
                      onClick={() => navigateToNews(news.id)}
                      className="w-full h-[120px] sm:min-h-[300px] mt-4 rounded-lg flex sm:flex-col justify-between gap-3 cursor-pointer"
                    >
                      <div className="flex sm:h-[150px] rounded-lg overflow-hidden w-[30%] sm:w-full relative bg-foreground/5">
                        <Image
                          alt="news-poster"
                          width={0}
                          height={0}
                          layout="fill"
                          objectFit="cover"
                          className="h-[100%] w-[100%] bg-gray-200 object-cover"
                          src={news.media[0].media}
                        />
                      </div>
                      <div className="flex-1 pt-0">
                        <p className="font-bold min-h-12 sm:min-h-14 text-foreground text-base sm:text-lg text-ellipsis overflow-hidden line-clamp-2 hover:underline cursor-pointer">
                          {news.title}
                        </p>
                        <div className="flex items-center gap-x-4 text-sm mt-5 font-medium text-foreground/60  text-ellipsis overflow-hidden line-clamp-3">
                          <p className="">
                            {customRelativeTime(news.created_at)}
                          </p>
                          <div className="bg-colorPrimary px-2 py-1 rounded-full text-sm text-white">
                            {news.sport_type}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </>
          )}
          {/* Other tabs */}
          {news.isSuccess && news.data && tab !== "all" && (
            <>
              <div className="grid grid-cols-1 min-[860px]:grid-cols-2 min-[1240px]:grid-cols-3 sm:grid-cols-3 md:grid-cols-3 gap-3 py-4 px-2 sm:px-4">
                {(news.data.data.data.items as []).map(
                  (news: any, i: number) => (
                    <div
                      key={i}
                      onClick={() => navigateToNews(news.id)}
                      className="w-full h-[120px] sm:min-h-[300px] mt-4 rounded-lg flex sm:flex-col justify-between gap-3 cursor-pointer"
                    >
                      <div className="flex sm:h-[150px] rounded-lg overflow-hidden w-[30%] sm:w-full relative bg-foreground/5">
                        <Image
                          alt="news-poster"
                          width={0}
                          height={0}
                          layout="fill"
                          objectFit="cover"
                          className="h-[100%] w-[100%] bg-gray-200 object-cover"
                          src={news.media[0].media}
                        />
                      </div>
                      <div className="flex-1 pt-0">
                        <p className="font-bold min-h-12 sm:min-h-14 text-foreground text-base sm:text-lg text-ellipsis overflow-hidden line-clamp-2 hover:underline cursor-pointer">
                          {news.title}
                        </p>
                        <div className="flex items-center gap-x-4 text-sm mt-5 font-medium text-foreground/60  text-ellipsis overflow-hidden line-clamp-3">
                          <p className="">
                            {customRelativeTime(news.created_at)}
                          </p>
                          <div className="bg-colorPrimary px-2 py-1 rounded-full text-sm text-white">
                            {news.sport_type}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            </>
          )}
          {/* No news */}
          {news.isSuccess &&
            news.data &&
            news.data.data.data.items.length <= 0 && (
              <div className="mt-20">
                <div className="flex justify-center items-center">
                  <div className="my-10 px-6">
                    <p className="font-bold text-foreground text-center">
                      No news
                    </p>
                    <p className="text-foreground/50 text-sm text-center mt-4">
                      It&apos;s empty in here. Please check back later for
                      exciting <span className="capitalize">{tab}</span> news.
                    </p>
                  </div>
                </div>
              </div>
            )}
          {Boolean(news.data?.data.data.meta.totalPages) && (
            <>
              <div className="mt-6 h-[1px] w-full bg-border" />
              <div className="flex justify-between items-center px-2 sm:px-4 mt-6">
                <div className="flex gap-x-4">
                  <Button
                    variant={"outline"}
                    className="border rounded-lg border-foreground text-sm hover:bg-foreground/10"
                    disabled={
                      news.data?.data.data.meta.currentPage === 1 ||
                      news.isLoading ||
                      news.isFetching
                    }
                    onClick={() => {
                      if (news.data?.data.data.meta.currentPage !== 1) {
                        setPage((prev) => prev - 1);
                      }
                    }}
                  >
                    Previous
                  </Button>
                  <Button
                    variant={"outline"}
                    className="border rounded-lg border-foreground text-sm hover:bg-foreground/10"
                    disabled={
                      news.data?.data.data.meta.currentPage ===
                        news.data?.data.data.meta.totalPages ||
                      news.isLoading ||
                      news.isFetching
                    }
                    onClick={() => {
                      if (
                        news.data?.data.data.meta.currentPage !==
                        news.data?.data.data.meta.totalPages
                      ) {
                        setPage((prev) => prev + 1);
                      }
                    }}
                  >
                    Next
                  </Button>
                </div>
                {}
                <div>
                  <p className="text-sm">
                    Page {news.data?.data.data.meta.currentPage} of{" "}
                    {news.data?.data.data.meta.totalPages}
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
        <AdsSidebar
          className={
            "min-w-[200px] w-[40%] max-w-[360px] gap-0 min-[480px]:gap-2"
          }
        />
      </div>
    </div>
  );
};

export default News;
