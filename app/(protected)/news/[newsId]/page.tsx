"use client";

import AdsSidebar from "@/components/AdsSidebar";
import CommentCard from "@/components/reusable/CommentCard";
import Post from "@/components/reusable/Post";
import PostViewer from "@/components/reusable/PostViewer";
import SportIcon from "@/components/reusable/SportIcon";
import RightSideBar from "@/components/RightSideBar";
import PageLoadingSpinner from "@/components/Spinner/PageLoadingSpinner";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { placeholderComments, profileImageplaceholder } from "@/constants";
import {
  cn,
  formatDateTime,
  formatNumberCount,
  handlePostLikeIncrement,
} from "@/lib/utils";
import { getSingleNews } from "@/services/api/news";
import {
  getSinglePost,
  getSinglePostComments,
  likeOrUnlikePost,
} from "@/services/api/post";
import { CommentMeta } from "@/types";
import { Arrow } from "@radix-ui/react-popover";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ChevronRight, Heart, MoreVertical } from "lucide-react";
import moment from "moment";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ImSpinner2 } from "react-icons/im";
import { IoArrowBack } from "react-icons/io5";

export default function Page({ params }: { params: any }) {
  const router = useRouter();

  const article = useQuery({
    queryKey: ["single-article"],
    queryFn: () => getSingleNews(params.newsId),
  });

  console.log(article.data?.data.data);

  return (
    <div>
      <div className="flex gap-0 min-[480px]:gap-2">
        <div className="relative mt-0 min-[480px]:mt-0 flex-1 bg-background min-h-screen">
          <div className="p-4 flex gap-x-2 items-center bg-background/50 backdrop-blur-lg sticky top-0 z-[100]">
            <Button
              className="p-0 w-6 h-6 bg-transparent rounded-full text-foreground hover:bg-foreground/20"
              onClick={() => router.back()}
            >
              <IoArrowBack size={20} />
            </Button>
            <p className="font-bold text-lg sm:text-2xl">Post</p>
          </div>
          <div className=" flex flex-col gap-y-2 bg-background sm:bg-inherit pb-20">
            {article.isLoading && (
              <div className="mt-20 flex justify-center items-center">
                <ImSpinner2 className="size-10 animate-spin text-[#4ED17E]" />
              </div>
            )}
            {article.isSuccess && article.data?.data.data && (
              <div className="px-4">
                {/* breadcrumbs */}
                <div className="inline align-middle text-sm line-clamp-1 text-ellipsis overflow-hidden">
                  <span
                    className="text-foreground/80 uppercase hover:text-colorPrimary cursor-pointer"
                    role="button"
                    onClick={() => router.push("/news")}
                  >
                    NEWS
                  </span>{" "}
                  <ChevronRight className="inline" />{" "}
                  <span
                    className="text-foreground/80 uppercase hover:text-colorPrimary cursor-pointer"
                    role="button"
                    onClick={() =>
                      router.push(
                        `/news?tab=${article.data?.data.data.sport_type.toLowerCase()}`
                      )
                    }
                  >
                    {article.data?.data.data.sport_type}
                  </span>{" "}
                  <ChevronRight className="inline" />{" "}
                  <span
                    className="text-foreground/80 uppercase hover:text-colorPrimary cursor-pointer"
                    role="button"
                  >
                    {article.data?.data.data.slug}
                  </span>
                </div>

                {/* title */}
                <p className="mt-6 text-xl sm:text-2xl font-bold">
                  {article.data?.data.data.title}
                </p>

                {/* category and date */}
                <div className="flex gap-x-2 items-center mt-6">
                  <div className="bg-colorPrimary px-2 py-1 rounded-full text-sm">
                    {article.data?.data.data.sport_type}
                  </div>
                  <p className="text-sm text-foreground/50">
                    {formatDateTime(article.data?.data.data.created_at)}
                  </p>
                </div>
                {/* poster */}
                <div className="h-[50vh] w-full relative mt-6 rounded-lg">
                  <Image
                    alt="news-poster"
                    src={article.data?.data.data.media[0]["original_media"]}
                    layout="fill"
                    objectFit="cover"
                    className="object-cover rounded-lg"
                  />
                </div>
                {/* content */}
                <p
                  className="mt-6"
                  dangerouslySetInnerHTML={{
                    __html: article.data?.data.data.content,
                  }}
                />
              </div>
            )}
          </div>
        </div>
        <AdsSidebar
          className={
            "min-w-[200px] w-[40%] max-w-[480px] gap-0 min-[480px]:gap-2"
          }
        />
      </div>
    </div>
  );
}
