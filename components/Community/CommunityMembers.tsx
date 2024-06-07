import { useState } from "react";
import { IoMdMore } from "react-icons/io";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tab";
import MemberCard from "./MemberCard";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent } from "../ui/dialog";
import { Button } from "../ui/button";
import { CommunityMember, User } from "@/types";
import { profileImageplaceholder } from "@/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import {
  makeModeratorQuery,
  removeModeratorQuery,
} from "@/services/api/community";
import toast from "react-hot-toast";
import SuccessToast from "../reusable/toasts/SuccessToast";
import ErrorToast from "../reusable/toasts/ErrorToast";

const CommunityMembers = ({
  members,
  moderators,
}: {
  members: CommunityMember[];
  moderators: CommunityMember[];
}) => {
  const queryClient = useQueryClient();
  const { community_id } = useParams();

  const [selectedUser, setSelectedUser] = useState({
    username: "@sportsOn3",
    memberId: "",
    action: "",
  });

  const [openModal, setOpenModal] = useState(false);

  const moderatorOptions = [
    {
      label: "Remove moderator",
      callback: (arg: string, memberId: number) => {
        setOpenModal(true);
        setSelectedUser({
          username: arg,
          memberId: memberId.toString(),
          action: "unappoint",
        });
      },
      color: "text-[#1A1A1A] dark:text-[#FAFAFA]",
    },
    {
      label: "Remove member",
      callback: (arg: string, memberId: number) => {
        setOpenModal(true);
        setSelectedUser({
          username: arg,
          memberId: memberId.toString(),
          action: "remove",
        });
      },
      color: "text-[#D13D51]",
    },
  ];
  const options = [
    {
      label: "Make moderator",
      callback: (arg: string, memberId: number) => {
        setOpenModal(true);
        setSelectedUser({
          username: arg,
          memberId: memberId.toString(),
          action: "appoint",
        });
      },
      color: "text-[#1A1A1A] dark:text-[#FAFAFA]",
    },
    {
      label: "Remove member",
      callback: (arg: string, memberId: number) => {
        setOpenModal(true);
        setSelectedUser({
          username: arg,
          memberId: memberId.toString(),
          action: "remove",
        });
      },
      color: "text-[#D13D51]",
    },
  ];

  const makeModerator = useMutation({
    mutationKey: ["make-moderator"],
    mutationFn: (memberId: string) =>
      makeModeratorQuery(memberId, community_id as string),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["community-members"],
      });
      queryClient.invalidateQueries({
        queryKey: ["community-moderators"],
      });
      toast.custom((t) => (
        <SuccessToast
          t={t}
          message={`You successfully made ${selectedUser.username} a moderator`}
        />
      ));
      setSelectedUser({ action: "", memberId: "", username: "" });
      setOpenModal(false);
    },
    onError: () => {
      toast.custom((t) => (
        <ErrorToast
          t={t}
          message={`Error appointing ${selectedUser.username} a moderator`}
        />
      ));
    },
  });

  const removeModerator = useMutation({
    mutationKey: ["remove-moderator"],
    mutationFn: (memberId: string) =>
      removeModeratorQuery(memberId, community_id as string),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["community-members"],
      });
      queryClient.invalidateQueries({
        queryKey: ["community-moderators"],
      });
      toast.custom((t) => (
        <SuccessToast
          t={t}
          message={`You successfully removed ${selectedUser.username} as a moderator`}
        />
      ));
      setSelectedUser({ action: "", memberId: "", username: "" });
      setOpenModal(false);
    },
    onError: () => {
      toast.custom((t) => (
        <ErrorToast
          t={t}
          message={`Error removing ${selectedUser.username} as a moderator`}
        />
      ));
    },
  });

  return (
    <div>
      <Tabs defaultValue="All">
        <TabsList>
          <TabsTrigger value="All">All ({members.length})</TabsTrigger>
          <TabsTrigger value="Moderators">
            Moderators ({moderators.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="All">
          <div className="space-y-5 mt-9">
            {members.map((item) => (
              <div key={item?.id} className="flex justify-between">
                <MemberCard
                  avatar={item?.user?.usermeta?.avatar}
                  name={
                    item?.user?.usermeta?.firstname +
                    " " +
                    item?.user?.usermeta?.lastname
                  }
                  username={item?.user?.username ?? ""}
                />

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button
                      type="button"
                      className="center-item rounded-full appearance-none"
                    >
                      <IoMdMore className="fill-[#656464] dark:fill-[#7C7C7C] text-3xl" />
                    </button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent
                    align="end"
                    className="w-[220px] -mt-5 z-[53]"
                  >
                    {options.map(({ label, callback, color }) => (
                      <DropdownMenuItem
                        key={label}
                        className={cn("py-3 cursor-pointer", color)}
                        onClick={() =>
                          callback(item.user?.username ?? "", item.id)
                        }
                      >
                        <span className="">{label}</span>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="Moderators">
          <div className="space-y-5 mt-9">
            {moderators.map((item) => (
              <div key={item?.id} className="flex justify-between">
                <MemberCard
                  avatar={item?.user?.usermeta?.avatar}
                  name={
                    item?.user?.usermeta?.firstname +
                    " " +
                    item?.user?.usermeta?.lastname
                  }
                  username={item?.user?.username ?? ""}
                />

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button
                      type="button"
                      className="center-item rounded-full appearance-none"
                    >
                      <IoMdMore className="fill-[#656464] dark:fill-[#7C7C7C] text-3xl" />
                    </button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent
                    align="end"
                    className="w-[220px] -mt-5 z-[53]"
                  >
                    {moderatorOptions.map(({ label, callback, color }) => (
                      <DropdownMenuItem
                        key={label}
                        className={cn("py-3 cursor-pointer", color)}
                        onClick={() =>
                          callback(item.user?.username ?? "", item.id)
                        }
                      >
                        <span className="">{label}</span>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <Dialog open={openModal} onOpenChange={() => setOpenModal(false)}>
        <DialogContent
          className="md:!max-w-[404px] px-5"
          closeBtnClass="size-[35px] rounded-full bg-[#656464] dark:bg-[#7C7C7C] center-item"
        >
          <p className="font-bold text-center mt-8 text-lg w-[80%] mx-auto">
            {selectedUser.action === "remove"
              ? `Remove ${selectedUser.username} from community?`
              : selectedUser.action === "unappoint"
              ? `Remove ${selectedUser.username} from the position of a moderator?`
              : `Make ${selectedUser.username}  a moderator?`}
          </p>

          <p className="text-center text-[#888888] dark:text-[#A0A0A0]">
            {selectedUser.action === "remove"
              ? "This user will no longer able to directly invite, remove and members in the community."
              : selectedUser.action === "unappoint"
              ? `This user will no longer able to directly invite, remove and members in the community.`
              : "This user will be able to directly invite, remove and members in the community"}
          </p>

          <div className="space-y-[10px] mt-3">
            <Button
              className={cn(
                selectedUser.action === "remove"
                  ? "bg-[#D13D51] text-white"
                  : "bg-black dark:bg-white text-white dark:text-black",
                " w-full rounded-full h-14"
              )}
              onClick={() => {
                if (selectedUser.action === "appoint") {
                  return makeModerator.mutate(selectedUser.memberId);
                }
                if (selectedUser.action === "unappoint") {
                  return removeModerator.mutate(selectedUser.memberId);
                }
              }}
            >
              {selectedUser.action === "remove" ? "Remove" : "Yes"}
            </Button>
            <Button
              className="bg-white dark:bg-black text-black dark:text-white border border-border w-full rounded-full h-14"
              onClick={() => setOpenModal(false)}
            >
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CommunityMembers;
