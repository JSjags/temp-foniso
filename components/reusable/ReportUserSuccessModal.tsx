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

type Props = {
  showReportSuccessModal: boolean;
  setShowReportSuccessModal: (value: boolean) => void;
};

const ReportUserSuccessModal = ({
  showReportSuccessModal,
  setShowReportSuccessModal,
}: Props) => {
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
                  variant={"ghost"}
                  className="hover:bg-white text-foreground/70 hover:text-foreground w-[200px] rounded-full"
                >
                  Mute @Fightnight
                </Button>
                <Button
                  variant={"ghost"}
                  className="hover:bg-white text-foreground/70 hover:text-foreground w-[200px] rounded-full"
                >
                  Block @Fightnight
                </Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </div>
        <DialogClose
          asChild={true}
          onClick={() => setShowReportSuccessModal(false)}
          className="group absolute right-4 top-4 z-50 cursor-pointer hover:bg-white bg-background rounded w-fit h-fit p-0 border-none hover:text-darkGrey"
        >
          <X className="text-foreground group-hover:text-darkGrey" />
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default ReportUserSuccessModal;
