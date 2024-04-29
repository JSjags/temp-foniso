import React from "react";
import { Dialog, DialogContent } from "../ui/dialog";
import { PostMeta } from "@/types";
import PostViewer from "./PostViewer";
import EmbeddedPost from "./EmbeddedSinglePost";

type Props = {
  showFullScreenPost: boolean;
  setShowFullScreenPost: (value: boolean) => void;
  post: PostMeta;
};

const FullScreenPost = ({
  showFullScreenPost,
  setShowFullScreenPost,
  post,
}: Props) => {
  return (
    <Dialog
      open={showFullScreenPost}
      onOpenChange={() => setShowFullScreenPost(false)}
    >
      <DialogContent className="w-full h-full sm:min-w-[85%] sm:h-[85dvh] sm:max-h-[85dvh] p-0 bg-background border-border sm:rounded-3xl overflow-hidden">
        <div className="w-full mx-auto flex">
          <div className="w-full sm:w-3/5 h-full sm:h-[85dvh] sm:max-h-[85dvh] bg-background border-r border-border flex justify-center items-center">
            <PostViewer
              post={post}
              setShowFullScreenPost={(value: boolean) =>
                setShowFullScreenPost(value)
              }
              showFullScreenPost={showFullScreenPost}
            />
          </div>
          <div className="hidden sm:block w-2/5 h-full sm:h-[85dvh] sm:max-h-[85dvh] relative overflow-y-scroll">
            <EmbeddedPost postId={post.id} hideHeader={true} hideMedia={true} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FullScreenPost;
