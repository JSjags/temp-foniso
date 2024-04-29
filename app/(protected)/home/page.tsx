import CreatePost from "@/components/Home/CreatePost";
import DummyPost from "@/components/reusable/DummyPost";
import { placeholderPosts } from "@/constants";
import React from "react";

type Props = {};

const Home = (props: Props) => {
  return (
    <div className="relative mt-2 min-[480px]:mt-0">
      <div className="sticky top-0 z-20">
        <CreatePost />
      </div>
      <div className=" flex flex-col gap-y-2 bg-background sm:bg-inherit">
        {placeholderPosts.map((post, i) => (
          <DummyPost key={i} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Home;
