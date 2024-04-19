import CreatePost from "@/components/Home/CreatePost";
import Post from "@/components/reusable/Post";
import HomeSidebar from "@/components/right-sidebar/HomeSidebar";
import RightSideBar from "@/components/RightSideBar";
import { placeholderPosts } from "@/constants";
import React from "react";

type Props = {};

const Home = (props: Props) => {
  return (
    <div className="flex gap-0 min-[480px]:gap-2">
      <div className="relative mt-2 min-[480px]:mt-0 flex-1 bg-background">
        <div className="sticky -top-[194px] z-20">
          <CreatePost />
        </div>
        <div className=" flex flex-col gap-y-2 bg-background sm:bg-inherit">
          {placeholderPosts.map((post, i) => (
            <Post key={i} post={post} />
          ))}
        </div>
      </div>
      <RightSideBar
        containerClassName={
          "min-w-[200px] w-[40%] max-w-[480px] gap-0 min-[480px]:gap-2"
        }
        component={<HomeSidebar />}
      />
    </div>
  );
};

export default Home;
