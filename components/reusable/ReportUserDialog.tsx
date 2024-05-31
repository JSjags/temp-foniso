import { reportReasons } from "@/constants";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { PostMeta } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getReasons, reportPostQuery } from "@/services/api/post";
import { ImSpinner2 } from "react-icons/im";
import { ScrollArea } from "../ui/scroll-area";
import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "../ui/button";
import ErrorToast from "./toasts/ErrorToast";
import toast from "react-hot-toast";

type Props = {
  showReportModal: boolean;
  setShowReportSuccessModal: (value: boolean) => void;
  setShowReportModal: (value: boolean) => void;
  post: PostMeta;
};

const ReportUserDialog = ({
  showReportModal,
  setShowReportSuccessModal,
  setShowReportModal,
  post,
}: Props) => {
  const reasons = useQuery({
    queryKey: ["get-report-reasons"],
    queryFn: getReasons,
  });

  const [reason, setReason] = useState("");

  const reportPost = useMutation({
    mutationKey: ["report-user"],
    mutationFn: () => reportPostQuery(post.id, reason),
    onSuccess: () => {
      setShowReportSuccessModal(true);
      setShowReportModal(false);
    },
    onError: () => {
      toast.custom((t) => <ErrorToast t={t} message="Couldn't report post." />);
    },
  });

  return (
    <AlertDialog open={showReportModal}>
      <AlertDialogContent className="w-[95%] max-h-[90vh] overflow-scroll p-0 bg-background border-border rounded-3xl">
        <div className="w-full mx-auto relative">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-lg sm:text-2xl py-3 font-bold text-foreground mt-0 border-b border-border sticky top-0 bg-background z-10">
              <AlertDialogCancel
                // disabled={!reason}
                onClick={() => {
                  setShowReportModal(false);
                }}
                className="rounded-full size-6 p-0 z-10 absolute top-3 right-3 min-[480px]:top-4 min-[480px]:right-4 bg-transparent border-border hover:bg-white justify-center items-center text-center text-foreground hover:text-textDark"
              >
                <X />
              </AlertDialogCancel>
              <p className="text-center">Report post</p>
              <p className="font-normal text-sm min-[480px]:text-base text-inactive text-center">
                Why are you reporting this post
              </p>
            </AlertDialogTitle>
            <ScrollArea>
              <AlertDialogDescription className="mt-0 text-inactive px-2 sm:px-6">
                {/* options loading */}
                {reasons.isLoading && (
                  <div className="mt-10 flex justify-center">
                    {/* <PageLoadingSpinner /> */}
                    <ImSpinner2 className="size-10 animate-spin text-[#4ED17E]" />
                  </div>
                )}
                {/* options successfully fetched */}
                {reasons.isSuccess && (
                  <div className="w-full">
                    <RadioGroup
                      value={reason}
                      onValueChange={(value) => setReason(value)}
                    >
                      {reasons.data?.data.data.map(
                        (reason: string, id: number) => (
                          <div
                            key={id}
                            className="flex items-center space-x-2 py-2 pb-4 justify-between border-b border-border"
                          >
                            <Label
                              htmlFor={String(id)}
                              className="text-foreground text-sm min-[480px]:text-base"
                            >
                              {reason}
                            </Label>
                            <RadioGroupItem
                              value={reason}
                              id={reason}
                              className="text-brand-primary border-border"
                            />
                          </div>
                        )
                      )}
                    </RadioGroup>
                  </div>
                )}
              </AlertDialogDescription>
            </ScrollArea>
          </AlertDialogHeader>
          <AlertDialogFooter className="my-8 mt-10 px-2 sm:px-6 flex justify-end sticky bottom-0 py-2 bg-background z-10">
            <Button
              variant={"outline"}
              disabled={!reason || reportPost.isPending}
              onClick={() => {
                reportPost.mutate();
              }}
              className="rounded-full w-full min-[480px]:w-[180px] bg-transparent border-border hover:bg-white py-4 px-6 text-center text-foreground hover:text-textDark"
            >
              {reportPost.isPending ? (
                <div className="flex justify-center">
                  {/* <PageLoadingSpinner /> */}
                  <ImSpinner2 className="size-6 animate-spin text-[#4ED17E]" />
                </div>
              ) : (
                <span>Submit</span>
              )}
            </Button>
          </AlertDialogFooter>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ReportUserDialog;
