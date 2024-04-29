import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";

type Props = {
  open: boolean;
  handleClose: () => void;
  name: string | undefined;
};

const CancelRequestModal = (props: Props) => {
  return (
    <Dialog open={props.open} onOpenChange={props.handleClose}>
      <DialogContent className="duo:!max-w-[412px] h-[321px]">
        <div>
          <p className="text-center text-xl font-bold">Cancel request</p>
          <p className="mt-[10px] text-center">
            Are you sure you want to cancel your request to join{" "}
            <span className="font-semibold">{props.name}?</span>
          </p>

          <div className="mt-9 flex flex-col gap-4">
            <Button
              className="w-full rounded-full !bg-[#C60D25] !text-white h-14 font-bold"
              onClick={props.handleClose}
            >
              Yes
            </Button>
            <Button
              className="w-full rounded-full !bg-transparent border border-[#DADADA] h-14 !text-white font-bold"
              onClick={props.handleClose}
            >
              Back
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CancelRequestModal;
