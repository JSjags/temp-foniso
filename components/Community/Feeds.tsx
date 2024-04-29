import { placeholderPosts } from "@/constants";
import DummyPost from "../reusable/DummyPost";

const Feeds = () => {
  return (
    <div className=" flex flex-col gap-y-2 bg-background sm:bg-inherit">
      {placeholderPosts.map((post, i) => (
        <DummyPost key={i} post={post} />
      ))}
    </div>
  );
};

export default Feeds;
