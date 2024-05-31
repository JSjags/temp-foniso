import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { X } from "lucide-react";
import { PostMeta } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { blockUserQuery, unblockUserQuery } from "@/services/api/post";
import { ImSpinner2 } from "react-icons/im";
import toast from "react-hot-toast";
import SuccessToast from "./toasts/SuccessToast";
import ErrorToast from "./toasts/ErrorToast";
import { getBlockedUsers } from "@/services/api/userService";
import { useMemo } from "react";

type Props = {
  showReportSuccessModal: boolean;
  setShowReportSuccessModal: (value: boolean) => void;
  post: PostMeta;
};

const ReportUserSuccessModal = ({
  showReportSuccessModal,
  setShowReportSuccessModal,
  post,
}: Props) => {
  const queryClient = useQueryClient();

  const blockedUsers = useQuery({
    queryKey: ["blocked-users"],
    queryFn: getBlockedUsers,
  });

  const blockUser = useMutation({
    mutationKey: ["block-user"],
    mutationFn: () => blockUserQuery(post.user.id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [""],
      });
      toast.custom((t) => (
        <SuccessToast t={t} message="User blocked successfully" />
      ));
      setShowReportSuccessModal(false);
    },
    onError: () => {
      toast.custom((t) => <ErrorToast t={t} message="Couldn't block user" />);
    },
  });

  const unblockUser = useMutation({
    mutationKey: ["unblock-user"],
    mutationFn: () => {
      const blockId = blockedUsers.data?.data.data.filter(
        (data: any) => data.followerId === post.user.id
      )[0].id;

      return unblockUserQuery({
        userId: blockId,
      });
    },
    onSuccess: (data) => {
      toast.custom(
        (t) => <SuccessToast t={t} message="User unblocked successfully" />,
        { id: "block/unblock user" }
      );
      queryClient.invalidateQueries({
        queryKey: ["blocked-users"],
      });
      setShowReportSuccessModal(false);
    },
  });

  const checkIfUserIsBlocked = useMemo(() => {
    if (blockedUsers.isError || !blockedUsers.isSuccess) {
      return false;
    }
    const filteredArray = blockedUsers.data?.data.data.filter((item: any) => {
      return item.followerId === post.user.id;
    });

    if (filteredArray.length) return true;
    return false;
  }, [
    blockedUsers.isError,
    blockedUsers.isSuccess,
    blockedUsers.data?.data.data,
    post.user.id,
  ]);

  return (
    <Dialog
      open={showReportSuccessModal}
      onOpenChange={() => setShowReportSuccessModal(false)}
    >
      <DialogContent className="w-[95%] p-0 bg-background border-border rounded-3xl">
        <div className="w-full mx-auto">
          <DialogHeader>
            <DialogTitle className="text-xl sm:text-2xl py-3 font-bold text-foreground mt-0">
              <div className="flex justify-center mt-10 sm:mt-20">
                <IoIosCheckmarkCircleOutline className="text-colorPrimary size-10 sm:size-14" />
              </div>
              <p className="text-center max-w-[400px] mx-auto mt-2 sm:px-10">
                Thank you for letting us know
              </p>
            </DialogTitle>
            <DialogDescription className="mt-2 text-inactive px-2 mb-10 sm:mb-20">
              <div className="flex justify-center max-w-[360px] mx-auto pb-4 border-b border-contentBorder">
                <p className="text-center text-foreground/80 mx-auto mt-2 sm:px-4">
                  We received your report. We’ll hide the reported post from
                  your timeline in the meantime.
                </p>
              </div>
              <div className="flex flex-col items-center gap-y-4 my-6 mb-6 sm:mb-20">
                <Button
                  disabled={blockUser.isPending}
                  variant={"ghost"}
                  className="hover:bg-foreground hover:text-background text-foreground/70 w-[200px] rounded-full"
                >
                  Mute @{post.user.username}
                </Button>
                <Button
                  disabled={blockUser.isPending || unblockUser.isPending}
                  variant={"ghost"}
                  onClick={() => {
                    if (checkIfUserIsBlocked) {
                      unblockUser.mutate();
                    } else {
                      blockUser.mutate();
                    }
                  }}
                  className="hover:bg-foreground hover:text-background text-foreground/70 w-[200px] rounded-full"
                >
                  {blockUser.isPending || unblockUser.isPending ? (
                    <div className="flex justify-center">
                      {/* <PageLoadingSpinner /> */}
                      <ImSpinner2 className="size-6 animate-spin text-[#4ED17E]" />
                    </div>
                  ) : (
                    <span>
                      {checkIfUserIsBlocked ? "Unblock" : "Block"} @
                      {post.user.username}
                    </span>
                  )}
                </Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </div>
        {/* <DialogClose
          asChild={true}
          onClick={() => setShowReportSuccessModal(false)}
          className="group absolute right-4 top-4 z-50 cursor-pointer hover:bg-white bg-background rounded w-fit h-fit p-0 border-none hover:text-darkGrey"
        >
          <X className="text-foreground group-hover:text-darkGrey" />
        </DialogClose> */}
      </DialogContent>
    </Dialog>
  );
};

export default ReportUserSuccessModal;
