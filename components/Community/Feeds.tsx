"use client";

import { useQuery } from "@tanstack/react-query";
import { communityPost } from "@/services/api/community";
import { useParams } from "next/navigation";
import Post from "../reusable/Post";

const Feeds = () => {
  const { community_id } = useParams();

  const { data: community_post, isFetching } = useQuery({
    queryKey: ["community-post"],
    queryFn: () => communityPost(String(community_id)),
  });

  return (
    <div className=" flex flex-col gap-y-2 bg-background sm:bg-inherit">
      {community_post?.items?.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};

export default Feeds;
