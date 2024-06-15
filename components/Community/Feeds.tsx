"use client";

import { useQuery } from "@tanstack/react-query";
import { communityPost } from "@/services/api/community";
import { useParams } from "next/navigation";
import Post from "../reusable/Post";
import { PostMeta } from "@/types";

const Feeds = () => {
  const { community_id } = useParams();

  console.log(community_id);

  const {
    data: community_post,
    isFetching,
    isSuccess,
  } = useQuery({
    queryKey: ["community-post"],
    queryFn: () => communityPost(String(community_id)),
  });

  console.log(community_post?.data?.data.items);

  return (
    <div className="flex flex-col gap-y-2 bg-background sm:bg-inherit">
      {isSuccess &&
        community_post?.data?.data.items.length &&
        community_post?.data?.data.items?.map((post: PostMeta) => {
          return <Post key={post.id} postData={post} />;
        })}
    </div>
  );
};

export default Feeds;
