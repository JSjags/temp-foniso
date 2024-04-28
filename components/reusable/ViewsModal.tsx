import { X } from "lucide-react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";

type Props = {
  showViewModal: boolean;
  setShowViewModal: (value: boolean) => void;
};

const ViewsModal = ({ showViewModal, setShowViewModal }: Props) => {
  return (
    <AlertDialog open={showViewModal}>
      <AlertDialogContent className="w-[95%] bg-background border-border rounded-3xl">
        <AlertDialogCancel
          onClick={() => setShowViewModal(false)}
          className="absolute top-4 right-4 w-fit h-fit p-0 bg-transparent border-none hover:text-darkGrey"
        >
          <X className="text-foreground hover:text-darkGrey" />
        </AlertDialogCancel>
        <div className="w-full sm:max-w-[369px] mx-auto">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-2xl font-bold text-foreground mt-6 max-w-[369px]">
              Views
            </AlertDialogTitle>
            <AlertDialogDescription className="mt-8 text-foreground/60 max-w-[369px]">
              The times this post was seen.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="my-8 mt-10 max-w-[369px]">
            <AlertDialogCancel
              onClick={() => setShowViewModal(false)}
              className="rounded-full w-full bg-transparent border-border hover:bg-white py-6 text-center text-foreground hover:text-textDark"
            >
              Close
            </AlertDialogCancel>
          </AlertDialogFooter>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ViewsModal;
