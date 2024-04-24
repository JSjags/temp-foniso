import Image from "next/image";
import { Button } from "../ui/button";

const HiddenPosts = () => {
  return (
    <div className="space-y-5 mt-6 pb-12">
      {"012345".split("").map((item) => (
        <div className="pb-4 border-b border-border" key={item}>
          <div className="">
            <div className="flex gap-2">
              <div className="size-[50px] rounded-full overflow-hidden relative">
                <Image
                  src="https://source.unsplash.com/random/520x520/?coach"
                  alt="user"
                  fill
                />
              </div>
              <div className="">
                <div className="gap-1">
                  <p className="font-medium">Johndoe</p>
                </div>
                <p className="text-[13px] text-[#656464] dark:text-[#C8C8C8]">
                  @Johndoe01
                </p>
              </div>
            </div>
            <div className="grid grid-cols-[1fr_0.4fr] gap-9 mt-[15px]">
              <p className="text-[#1A1A1A] text-sm md:text-base dark:text-[#C8C8C8]">
                Arsenal producing stars on the biggest stage right now st stage
                right now 🔥🔥
              </p>
              <div className="h-[90px] md:h-[110px] relative">
                <Image
                  src="https://source.unsplash.com/random/720x1020/?player"
                  alt="post"
                  fill
                />
              </div>
            </div>
          </div>
          <Button className="w-[101px] rounded-full h-10 bg-[#C8C8C8] dark:bg-[#222623] text-[#1A1A1A] dark:text-white">
            Unhide
          </Button>
        </div>
      ))}
    </div>
  );
};

export default HiddenPosts;
