import React, { Dispatch, SetStateAction } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { AlertDialogHeader } from "../ui/alert-dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Image from "next/image";
import { GiTick } from "react-icons/gi";
import { Check } from "lucide-react";
import { useRouter } from "next/navigation";

type Props = {
  showVerificationDialog: boolean;
  setShowVerificationDialog: Dispatch<SetStateAction<boolean>>;
};

const VerificationDialog = ({
  showVerificationDialog,
  setShowVerificationDialog,
}: Props) => {
  const router = useRouter();
  return (
    <Dialog
      open={showVerificationDialog}
      onOpenChange={setShowVerificationDialog}
    >
      <DialogContent className="sm:max-w-[680px] rounded-lg pt-3">
        <AlertDialogHeader>
          <DialogTitle className="text-center font-bold text-xl sm:text-2xl mt-2 mb-10">
            Account verification
          </DialogTitle>
          <div className="border-b border-border w-full absolute top-14 left-0"></div>
          <DialogDescription>
            <div className="pb-4 border-b border-border">
              <p className="text-lg text-foreground font-medium flex gap-x-2 items-center">
                <span>Foniso for Professionals</span>
                <Image
                  width={14}
                  height={14}
                  className="size-[16px] rounded-full object-cover"
                  alt="avatar"
                  src={"/assets/app-icons/verified-icon.svg"}
                />
              </p>
              <p className="text-sm text-foreground/80 flex gap-x-2 items-center">
                <span className="text-left">
                  Get verified as an athlete,manager,agent,coach and others
                  sport professional
                </span>
              </p>
            </div>
            <div className="pb-4 border-b border-border mt-6">
              <p className="text-lg text-foreground font-medium flex gap-x-2 items-center">
                <span>Foniso for Professionals</span>
                <Image
                  width={14}
                  height={14}
                  className="size-[16px] rounded-full object-cover"
                  alt="avatar"
                  src={"/assets/app-icons/org-verified-icon.svg"}
                />
              </p>
              <p className="text-sm text-foreground/80 flex gap-x-2 items-center">
                <span className="text-left">
                  Get verified as a sport organization - Teams, Clubs,
                  Association, Union, Agency and others
                </span>
              </p>
            </div>
            <div className="pb-4 border-b border-border mt-6">
              <p className="text-sm text-foreground/80 flex gap-x-2 items-start">
                <Check className="text-foreground/80 size-5 block" size={20} />
                <span className="text-left flex-1">
                  Get verified as a sport organization - Teams, Clubs,
                  Association, Union, Agency and others
                </span>
              </p>
              <p className="text-sm text-foreground/80 flex gap-x-2 items-start mt-3">
                <Check className="text-foreground/80 size-5 block" size={20} />
                <span className="text-left flex-1">
                  Worry less about impersonation
                </span>
              </p>
            </div>
            <div className="mt-10 flex flex-col gap-y-4">
              <Button
                onClick={() =>
                  router.push("/profile/verification?type=professional")
                }
                className="bg-foreground/10 w-full rounded-full text-foreground hover:text-background"
              >
                <p className=" font-medium flex gap-x-2 items-center">
                  <span>Verify as a professional</span>
                  <Image
                    width={14}
                    height={14}
                    className="size-[16px] rounded-full object-cover"
                    alt="avatar"
                    src={"/assets/app-icons/verified-icon.svg"}
                  />
                </p>
              </Button>
              <Button
                onClick={() =>
                  router.push("/profile/verification?type=organization")
                }
                className="bg-foreground/10 w-full rounded-full text-foreground hover:text-background"
              >
                <p className="font-medium flex gap-x-2 items-center">
                  <span>Verify as a sport organization</span>
                  <Image
                    width={14}
                    height={14}
                    className="size-[16px] rounded-full object-cover"
                    alt="avatar"
                    src={"/assets/app-icons/org-verified-icon.svg"}
                  />
                </p>
              </Button>
            </div>
          </DialogDescription>
        </AlertDialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default VerificationDialog;
