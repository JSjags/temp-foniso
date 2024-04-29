import Image from "next/image";
import RightSideBar from "../RightSideBar";
import Titlebar from "@/components/Community/Titlebar";
import Link from "next/link";
import { RxCaretRight } from "react-icons/rx";
import PendingRequests from "./PendingRequests";
import { BsSoundwave } from "react-icons/bs";
import Post from "@/components/reusable/Post";
import { placeholderPosts } from "@/constants";
import UsersAvatar from "../reusable/UsersAvatar";

const list = [
  "Cr7 Suii",
  "Manchester united",
  "World of sports",
  "Red devils",
  "Pride of london",
  "Enyimba international",
  "Never walk alone",
  "Arsenal",
  "Newcastle",
];

const CommunityLiveActivities = () => {
  return (
    <div className="flex duo:gap-3">
      <div className="w-full overflow-hidden">
        <Titlebar title="Community" />
        <div className="px-4">
          <div className="flex flex-nowrap overflow-x-auto gap-[10px] duo:gap-5 mt-[10px] snap-x snap-mandatory scroll-p-2 sm:scroll-p-6 hide-scrollbar">
            {list.map((item, idx) => (
              <div
                key={item}
                className="min-w-[120px] snap-start  overflow-hidden flex flex-col duo:min-w-[150px] h-[100px] duo:h-[130px] rounded-lg border-[0.5px]"
              >
                <div className="relative flex-1">
                  <Image
                    src={`https://source.unsplash.com/random/350x230/?community+${idx}`}
                    alt="community"
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="flex items-center h-8 text-sm px-1 truncate bg-[#000000cd]">
                  {item}
                </p>
              </div>
            ))}
          </div>

          <div className="flex gap-[10px] mt-6 items-center">
            <div className="flex-1 h-14 flex gap-[10px] flex-nowrap overflow-x-auto snap-x snap-mandatory scroll-p-2 sm:scroll-p-6 hide-scrollbar">
              {[0, 1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="h-full flex px-[10px] gap-[10px] items-center snap-start min-w-[305px] rounded-full bg-[linear-gradient(103deg,#2A6032_-1.72%,rgba(4,77,24,0.69)101.27%)] cursor-pointer"
                >
                  <div className="size-10 rounded-full overflow-hidden relative">
                    <Image
                      src={`https://source.unsplash.com/random/350x230/?listen`}
                      alt="host"
                      fill
                      className="bg-green-100"
                    />
                  </div>
                  <div className="flex-1 truncate">
                    <div className="flex gap-1 text-white font-medium">
                      <p className="truncate text-sm">
                        Who is the Goat? Come lets discuss
                      </p>
                    </div>
                    <UsersAvatar
                      items={["0", "1", "2"]}
                      wrapperClass="mt-[5px]"
                      totalCount="+350"
                    />
                  </div>
                  <BsSoundwave className="text-3xl text-white" />
                </div>
              ))}
            </div>

            <Link
              href="/community/5879-66878-78798/live-buzz"
              className="flex gap-[2px] text-sm text-[#22C55E] items-center"
            >
              See all
              <RxCaretRight className="" />
            </Link>
          </div>

          <PendingRequests count={12} />

          <div className=" flex flex-col gap-y-2 bg-background sm:bg-inherit mt-[46px]">
            {placeholderPosts.map((post, i) => (
              <Post key={i} post={post} />
            ))}
          </div>
        </div>
      </div>

      <RightSideBar className="min-w-[300px] lg:min-w-[380px]" />
    </div>
  );
};

export default CommunityLiveActivities;
