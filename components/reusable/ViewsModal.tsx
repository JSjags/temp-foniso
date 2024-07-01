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
import {
  Credenza,
  CredenzaContent,
  CredenzaDescription,
  CredenzaFooter,
  CredenzaHeader,
  CredenzaTitle,
} from "../ui/credenza";

type Props = {
  showViewModal: boolean;
  setShowViewModal: (value: boolean) => void;
};

const ViewsModal = ({ showViewModal, setShowViewModal }: Props) => {
  return (
    <Credenza open={showViewModal}>
      <CredenzaContent className="w-full min-[768px]:w-[95%] bg-background border-border rounded-3xl">
        {/* <AlertDialogCancel
          onClick={() => setShowViewModal(false)}
          className="absolute top-4 right-4 w-fit h-fit p-0 bg-transparent border-none hover:text-darkGrey"
        >
          <X className="text-foreground hover:text-darkGrey" />
        </AlertDialogCancel> */}
        <div className="w-full sm:max-w-[369px] mx-auto flex flex-col">
          <CredenzaHeader>
            <CredenzaTitle className="text-2xl font-bold text-foreground mt-6 absolute ">
              Views
            </CredenzaTitle>
          </CredenzaHeader>
          <CredenzaDescription className="mt-12 mx-4 min-[768px]:mt-16 text-foreground/60 min-[768px]:mx-0 max-w-[369px]">
            The times this post was seen.
          </CredenzaDescription>
          <CredenzaFooter className="my-2 sm:mt-10 max-w-full">
            <div
              onClick={() => setShowViewModal(false)}
              className="rounded-full h-10 w-full bg-transparent border border-white hover:bg-white text-center text-foreground hover:text-textDark flex justify-center items-center"
            >
              Close
            </div>
          </CredenzaFooter>
        </div>
      </CredenzaContent>
    </Credenza>
  );
};

export default ViewsModal;
