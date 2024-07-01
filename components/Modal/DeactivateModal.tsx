import React, { Dispatch, SetStateAction, useState } from "react";
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
import { useUserContext } from "@/context/UserContext";
import { profileImageplaceholder } from "@/constants";
import SportIcon from "../reusable/SportIcon";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { RadioItem } from "@radix-ui/react-dropdown-menu";

type Props = {
  showDeleteOrDeactivateModal: boolean;
  setShowDeleteOrDeactivateModal: Dispatch<SetStateAction<boolean>>;
  setShowDeleteModal: Dispatch<SetStateAction<boolean>>;
  setShowDeactivateModal: Dispatch<SetStateAction<boolean>>;
};

const DeactivateModal = ({
  showDeleteOrDeactivateModal,
  setShowDeleteOrDeactivateModal,
  setShowDeactivateModal,
  setShowDeleteModal,
}: Props) => {
  const router = useRouter();
  const user = useUserContext().userData?.user;
  const [value, setValue] = useState("");
  const [showAction, setShowAction] = useState(false);

  return (
    <Dialog
      open={showDeleteOrDeactivateModal}
      onOpenChange={setShowDeleteOrDeactivateModal}
    >
      <DialogContent className="sm:max-w-[480px] rounded-lg pt-3">
        <AlertDialogHeader>
          <DialogTitle className="text-center font-bold text-xl sm:text-2xl mt-2 mb-10">
            <Image
              alt="foniso logo mt-4"
              src={"/assets/favicon.svg"}
              width={40}
              height={40}
              className="block mx-auto size-[40px] mt-2"
            />
          </DialogTitle>
          {/* <div className="border-b border-border w-full absolute top-14 left-0"></div> */}
          {!showAction ? (
            <DialogDescription>
              <p className="text-xl font-bold text-foreground">
                Please confirm your password
              </p>
              <p className="text-foreground/60">
                Complete your request to deactivate by entering the password
                associated with your account
              </p>

              <div className="mt-10">
                <Label
                  htmlFor="password"
                  className="text-foreground/60 font-normal"
                >
                  Your password
                </Label>
                <Input
                  type="password"
                  className="w-full dark:bg-black bg-foreground/20 border-border mt-2"
                ></Input>
              </div>
              <div className="mt-10 flex flex-col gap-y-4">
                <Button
                  onClick={() => {
                    setShowAction(true);
                  }}
                  className="!bg-red-500 hover:!bg-red-500 w-full rounded-full !text-white"
                >
                  <p className=" font-medium !text-white flex gap-x-2 items-center">
                    <span>Deactivate</span>
                  </p>
                </Button>
                {/* <Button
                onClick={() => setShowDeleteOrDeactivateModal(false)}
                className="bg-transparent w-full rounded-full text-foreground hover:text-background"
              >
                <p className="font-medium flex gap-x-2 items-center">
                  <span>Cancel</span>
                </p>
              </Button> */}
              </div>
            </DialogDescription>
          ) : (
            <DialogDescription>
              <p className="text-xl font-bold text-foreground text-center">
                Deactivate your account
              </p>
              <p className="text-foreground/60 mt-2 text-center">
                Your account will be deactivated temporarily
              </p>

              <div className="mt-10 flex flex-col gap-y-4">
                <Button
                  disabled
                  // onClick={() => {
                  //   setShowAction(true)
                  // }}
                  className="bg-red-500 hover:bg-red-500 w-full rounded-full !text-white"
                >
                  <p className=" font-medium !text-white flex gap-x-2 items-center">
                    <span>Yes, Deactivate</span>
                  </p>
                </Button>
                <Button
                  onClick={() => {
                    setShowAction(false);
                    setShowDeactivateModal(false);
                  }}
                  className="bg-transparent border border-foreground w-full rounded-full text-foreground hover:text-background"
                >
                  <p className="font-medium flex gap-x-2 items-center">
                    <span>Cancel</span>
                  </p>
                </Button>
              </div>
            </DialogDescription>
          )}
        </AlertDialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default DeactivateModal;
