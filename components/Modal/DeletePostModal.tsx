"use client";

import React, { Dispatch, SetStateAction } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "../ui/dialog";
import { AlertDialogHeader } from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { IoArrowBack } from "react-icons/io5";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import SuccessToast from "../reusable/toasts/SuccessToast";
import ErrorToast from "../reusable/toasts/ErrorToast";
import { ImSpinner2 } from "react-icons/im";
import { deletePost } from "@/services/api/post";
import { useRouter } from "next/navigation";

type Props = {
  postId: number;
  showDeletePostModal: boolean;
  setShowDeletePostModal: Dispatch<SetStateAction<boolean>>;
};

const DeletePostModal = ({
  postId,
  showDeletePostModal,
  setShowDeletePostModal,
}: Props) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const deletePostMutation = useMutation({
    mutationKey: ["delete-post"],
    mutationFn: (id: number) => deletePost(id),
    onSuccess: () => {
      toast.custom((t) => (
        <SuccessToast t={t} message="Post deleted successfully" />
      ));
      setShowDeletePostModal(false);
      queryClient.invalidateQueries({
        queryKey: ["fetch-users-posts"],
      });
    },
    onError: () => {
      toast.custom((t) => <ErrorToast t={t} message="Couldn't delete post" />);
    },
  });

  const handlePostDelete = () => {
    deletePostMutation.mutate(postId);
  };

  return (
    <Dialog
      open={showDeletePostModal}
      onOpenChange={
        !deletePostMutation.isPending
          ? setShowDeletePostModal
          : () => setShowDeletePostModal(true)
      }
      modal
    >
      {/* <div className="w-full h-full absolute top-0 left-0 z-50"> */}
      <DialogContent className="sm:max-w-[480px] rounded-lg pt-3 px-0 overflow-y-scroll max-h-[90vh] pb-0">
        <AlertDialogHeader>
          <Button
            onClick={(e) => {
              e.stopPropagation();
              setShowDeletePostModal(false);
            }}
            className="size-6 p-1 flex justify-center items-center bg-background/70 hover:bg-foreground/20 rounded-full absolute top-6 left-4"
          >
            <IoArrowBack className="text-foreground size-4" />
          </Button>

          <DialogTitle className="text-center font-bold text-xl mb-3">
            Delete post
          </DialogTitle>
          <div className="border-b border-border w-full absolute top-14 left-0"></div>
        </AlertDialogHeader>
        <DialogDescription className="px-2 py-8 sm:px-6 text-foreground">
          <>
            Are you sure you want to delete this post? Please note that this
            action is irreversible and this post can never be retrieved if you
            proceed.
          </>
        </DialogDescription>
        <DialogFooter className="flex flex-col-reverse gap-y-2 items-center min-[480px]:flex-row min-[480px]:justify-between pl-0 w-full gap-x-4 sticky bottom-0 bg-background p-0 py-4 px-2 border-t border-border sm:justify-around">
          <Button
            disabled={deletePostMutation.isPending}
            onClick={(e) => {
              e.stopPropagation();
              setShowDeletePostModal(false);
            }}
            variant={"ghost"}
            className="rounded-full w-48 flex justify-center items-center"
          >
            <span>Cancel</span>
          </Button>
          <Button
            disabled={deletePostMutation.isPending}
            onClick={(e) => {
              e.stopPropagation();
              handlePostDelete();
            }}
            className="rounded-full w-48 flex justify-center items-center hover:bg-red-500 hover:text-white"
          >
            {deletePostMutation.isPending ? (
              <ImSpinner2 className="size-6 animate-spin text-[#4ED17E]" />
            ) : (
              <span>Delete</span>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
      {/* </div> */}
    </Dialog>
  );
};

export default DeletePostModal;
