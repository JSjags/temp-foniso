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

const DeleteOrDeactivateModal = ({
  showDeleteOrDeactivateModal,
  setShowDeleteOrDeactivateModal,
  setShowDeactivateModal,
  setShowDeleteModal,
}: Props) => {
  const router = useRouter();
  const user = useUserContext().userData?.user;
  const [value, setValue] = useState("");

  return (
    <Dialog
      open={showDeleteOrDeactivateModal}
      onOpenChange={setShowDeleteOrDeactivateModal}
    >
      <DialogContent className="sm:max-w-[680px] rounded-lg pt-3">
        <AlertDialogHeader>
          <DialogTitle className="text-center font-bold text-xl sm:text-2xl mt-2 mb-10">
            Deactivate/Delete account
          </DialogTitle>
          <div className="border-b border-border w-full absolute top-14 left-0"></div>
          <DialogDescription>
            <div className="flex gap-x-3">
              <Image
                width={45}
                height={45}
                className="size-[36px] sm:size-[45px] rounded-full object-cover cursor-pointer"
                alt="avatar"
                src={user?.usermeta.avatar ?? profileImageplaceholder}
              />
              <div>
                <div className="flex gap-x-2 items-center">
                  <p className="text-foreground hover:underline cursor-pointer font-semibold text-base line-clamp-1 text-ellipsis whitespace-nowrap text-wrap break-words">
                    {user?.usermeta.firstname} {user?.usermeta.lastname}
                  </p>
                  <div className="flex gap-x-1 items-center">
                    {user?.verified && (
                      <Image
                        width={14}
                        height={14}
                        className="size-[16px] rounded-full object-cover"
                        alt="avatar"
                        src={"/assets/app-icons/verified-icon.svg"}
                      />
                    )}
                    <SportIcon
                      category={user?.usermeta?.favorite_sport ?? ""}
                    />
                  </div>
                </div>
                <p className="text-inactive text-sm min-[480px]:text-base hover:cursor-pointer">
                  @{user?.username}
                </p>
              </div>
            </div>
            <RadioGroup value={value} onValueChange={(val) => setValue(val)}>
              <Label
                htmlFor="deactivate"
                className=" flex items-center gap-x-4"
              >
                <div className="pb-4 border-b border-border mt-10">
                  <p className="text-lg text-foreground font-medium flex gap-x-2 items-center">
                    <span>Deactivate account</span>
                  </p>
                  <p className="text-sm text-foreground/80 flex gap-x-2 items-center">
                    <span className="text-left">
                      Deactivating your account is temporary. Your profile will
                      be hidden on Foniso until you reactivate by simply logging
                      into your account again
                    </span>
                  </p>
                </div>
                <RadioGroupItem
                  id="deactivate"
                  value="deactivate"
                  className="shrink-0"
                ></RadioGroupItem>
              </Label>
              <Label htmlFor="delete" className="flex items-center gap-4">
                <div className="pb-4 border-b border-border mt-6">
                  <p className="text-lg text-foreground font-medium flex gap-x-2 items-center">
                    <span>Delete account</span>
                  </p>
                  <p className="text-sm text-foreground/80 flex gap-x-2 items-center">
                    <span className="text-left">
                      Deleting your account is permanent. Your account, profile,
                      photos, videos, comments, likes and followers will be
                      permanently removed
                    </span>
                  </p>
                </div>
                <RadioGroupItem
                  id="delete"
                  value="delete"
                  className="shrink-0"
                ></RadioGroupItem>
              </Label>
            </RadioGroup>
            <div className="mt-10 flex flex-col gap-y-4">
              <Button
                onClick={() => {
                  //   router.push(
                  //     `/settings?tab=your-account&action=${
                  //       value === "deactivate" ? "deactivate" : "delete"
                  //     }`
                  //   );
                  if (value === "deactivate") {
                    setShowDeactivateModal(true);
                  } else {
                    setShowDeleteModal(true);
                  }
                  setShowDeleteOrDeactivateModal(false);
                }}
                className="bg-foreground w-full rounded-full text-background"
              >
                <p className=" font-medium flex gap-x-2 items-center">
                  <span>Continue</span>
                </p>
              </Button>
              <Button
                onClick={() => setShowDeleteOrDeactivateModal(false)}
                className="bg-transparent w-full rounded-full text-foreground hover:text-background"
              >
                <p className="font-medium flex gap-x-2 items-center">
                  <span>Cancel</span>
                </p>
              </Button>
            </div>
          </DialogDescription>
        </AlertDialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteOrDeactivateModal;
