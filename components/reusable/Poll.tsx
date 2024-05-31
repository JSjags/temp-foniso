import { cn } from "@/lib/utils";
import { fetchPostQuery, getPollResponse } from "@/services/api/post";
import { PollMeta, PostMeta } from "@/types";
import { calculateRelativeTimeLeft, isTimeLeft } from "@/utils";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { Dispatch, SetStateAction, useEffect } from "react";
import toast from "react-hot-toast";
import SuccessToast from "./toasts/SuccessToast";
import ErrorToast from "./toasts/ErrorToast";
import { ImSpinner2 } from "react-icons/im";
import NoticeToast from "./toasts/NoticeToast";

type Props = {
  post: PostMeta;
  setPost: Dispatch<SetStateAction<PostMeta>>;
};

const Poll = ({ post, setPost }: Props) => {
  const updatedPost = useQuery({
    queryKey: [`fetch-post-${post.id}`],
    queryFn: () => fetchPostQuery(post.id),
    refetchInterval: 60 * 1000,
  });

  //   if (updatedPost.isSuccess && updatedPost.data.data.data) {
  //     setPost(updatedPost.data.data.data);
  //   }
  //   useEffect(() => {
  //   }, [updatedPost.isSuccess]);

  const pollResponse = useMutation({
    mutationKey: [`poll-response-${post.id}`],
    mutationFn: (pollOptionId: number) =>
      getPollResponse(post.id, pollOptionId),
    onSuccess: (data) => {
      const newPost = { ...post, pollOption: data.data.data };
      setPost(newPost);

      toast.custom((t) => (
        <SuccessToast t={t} message="Your vote was successful." />
      ));
    },
    onError: (error: any) => {
      toast.custom((t) => (
        <ErrorToast
          t={t}
          message={
            error?.response?.data?.message ??
            error?.data?.message ??
            error?.message ??
            "Your vote was successful."
          }
        />
      ));
    },
  });

  const handleOptionSelection = (pollOptionId: number) => {
    pollResponse.mutate(pollOptionId);
  };

  const handlePollAction = (option: PollMeta) => {
    pollResponse.isPending
      ? (() => {})()
      : isTimeLeft(post.pollOption[0].created_at, post.poll_duration.toString())
      ? handleOptionSelection(option.id)
      : toast.custom(
          (t) => (
            <NoticeToast
              t={t}
              title="Poll ended"
              id="poll ended"
              message="Voting for this poll has closed"
            />
          ),
          { id: "poll ended" }
        );
  };

  useEffect(() => {
    if (updatedPost.isSuccess && updatedPost.data.data.data) {
      setPost(updatedPost.data.data.data);
    }
  }, [updatedPost.isSuccess, updatedPost.data, setPost]);

  //   useEffect(() => {
  //     if (pollResponse.isSuccess && pollResponse.data.data.data) {
  //       console.log(pollResponse.data.data.data);

  //       const newPost = { ...post, pollOption: pollResponse.data.data.data };
  //       setPost(newPost);
  //     }
  //   }, [pollResponse.isSuccess, pollResponse.data, setPost]);

  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex flex-col gap-y-4">
        {post.pollOption.map((option: PollMeta, i: number) => (
          <div
            key={i}
            className="h-10 min-[480px]:h-12 w-full rounded-md overflow-hidden bg-foreground/5 relative cursor-pointer"
            role="button"
            onClick={(e) => {
              e.stopPropagation();
              handlePollAction(option);
            }}
          >
            <div
              style={{
                width: `${option.totalResponse}%`,
                height: "100%",
              }}
              className={cn(`bg-foreground/30 transition-all duration-1000`)}
            />
            <div className="absolute top-0 left-0 h-full w-full bg-transparent flex items-center text-sm min-[480px]:text-base">
              <p className="flex-1 overflow-hidden text-ellipsis pl-2">
                {option.option}
              </p>
              <p className="pr-2 flex gap-x-1 items-center">
                {pollResponse.isPending &&
                  pollResponse.variables === option.id && (
                    <ImSpinner2 className="size-4 animate-spin text-[#4ED17E]" />
                  )}
                <span>{option.totalResponse}%</span>
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between gap-2">
        <p className="text-foreground/70 text-sm"></p>
        <p className="text-foreground/70 text-sm">
          {isTimeLeft(
            post.pollOption[0].created_at,
            post.poll_duration.toString()
          )
            ? calculateRelativeTimeLeft(
                post.pollOption[0].created_at,
                post.poll_duration.toString()
              )
            : "Poll ended"}
        </p>
      </div>
    </div>
  );
};

export default Poll;
