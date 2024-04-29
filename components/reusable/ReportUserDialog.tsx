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

type Props = {
  showReportModal: boolean;
  setShowReportSuccessModal: (value: boolean) => void;
  setShowReportModal: (value: boolean) => void;
};

const ReportUserDialog = ({
  showReportModal,
  setShowReportSuccessModal,
  setShowReportModal,
}: Props) => {
  return (
    <AlertDialog open={showReportModal}>
      <AlertDialogContent className="w-[95%] p-0 bg-background border-border rounded-3xl">
        <div className="w-full mx-auto">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl sm:text-2xl py-3 font-bold text-foreground mt-0 border-b border-border">
              <p className="text-center">Report post</p>
              <p className="font-normal text-base text-inactive text-center">
                Why are you reporting this post
              </p>
            </AlertDialogTitle>
            <AlertDialogDescription className="mt-8 text-inactive px-2 sm:px-6">
              <div className="w-full">
                <RadioGroup defaultValue="comfortable">
                  {reportReasons.map((reason, id) => (
                    <div
                      key={id}
                      className="flex items-center space-x-2 py-2 pb-4 justify-between border-b border-border"
                    >
                      <Label
                        htmlFor={String(id)}
                        className="text-foreground text-base"
                      >
                        {reason.reason}
                      </Label>
                      <RadioGroupItem
                        value={reason.reason}
                        id={reason.reason}
                        className="text-brand-primary border-border"
                      />
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="my-8 mt-10 px-2 sm:px-6 flex justify-end">
            <AlertDialogCancel
              onClick={() => {
                setShowReportSuccessModal(true);
                setShowReportModal(false);
              }}
              className="rounded-full w-[180px] bg-transparent border-border hover:bg-white py-4 px-6 text-center text-foreground hover:text-textDark"
            >
              Submit
            </AlertDialogCancel>
          </AlertDialogFooter>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ReportUserDialog;
