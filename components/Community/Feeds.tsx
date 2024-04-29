import { placeholderPosts } from "@/constants";
import Post from "../reusable/Post";

const Feeds = () => {
  return (
    <div className=" flex flex-col gap-y-2 bg-background sm:bg-inherit">
      {placeholderPosts.map((post, i) => (
        <Post key={i} post={post} />
      ))}
    </div>
  );
};

export default Feeds;
