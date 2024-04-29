import Highlights from "@/components/reusable/Highlights";
import DummyPost from "@/components/reusable/DummyPost";
import Trending from "@/components/reusable/Trending";
import { Input } from "@/components/ui/input";
import { placeholderPosts } from "@/constants";
import { SearchIcon } from "lucide-react";
import Image from "next/image";

type Props = {};

const Explore = (props: Props) => {
  return (
    <div className="relative w-full max-w-[740px]">
      <div className="py-5 px-2 sm:px-6 relative">
        <div className="relative">
          <SearchIcon
            size={18}
            color="#888888"
            className="absolute left-4 top-[15px] sm:top-[18px]"
          />
          <Input
            id="search"
            placeholder="Search"
            className="bg-foreground/10 mt-2 pl-10 text-white border-border h-[48px] sm:h-[54px] text-base placeholder:text-foreground/50 rounded-xl"
          />
        </div>
      </div>
      <Trending />
      <Highlights />
      <p className="text-foreground font-bold px-2 sm:px-6 text-2xl py-6 flex gap-x-2 items-center">
        <Image
          width={30}
          height={30}
          className="size-[30px] rounded-full object-cover"
          alt="icon"
          src={"/assets/app-icons/explore-category-icon.svg"}
        />
        <span>Formula 1</span>
      </p>
      <div className="flex flex-col gap-y-2 ">
        {placeholderPosts.map((post, i) => (
          <DummyPost key={i} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Explore;
