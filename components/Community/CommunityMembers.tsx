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

const CommunityMembers = () => {
  const [selectedUser, setSelectedUser] = useState({
    username: "@sportsOn3",
    action: "",
  });

  const [openModal, setOpenModal] = useState(false);

  const options = [
    {
      label: "Make moderator",
      callback: (arg: string) => {
        setOpenModal(true);
        setSelectedUser({ username: arg, action: "appoint" });
      },
      color: "text-[#1A1A1A] dark:text-[#FAFAFA]",
    },
    {
      label: "Remove member",
      callback: (arg: string) => {
        setOpenModal(true);
        setSelectedUser({ username: arg, action: "remove" });
      },
      color: "text-[#D13D51]",
    },
  ];

  return (
    <div>
      <Tabs defaultValue="All">
        <TabsList>
          <TabsTrigger value="All">All (3,267)</TabsTrigger>
          <TabsTrigger value="Moderators">Moderators (3)</TabsTrigger>
        </TabsList>

        <TabsContent value="All">
          <div className="space-y-5 mt-9">
            {"01234".split("").map((item) => (
              <div key={item} className="flex justify-between">
                <MemberCard
                  avatar="https://source.unsplash.com/random/120x120/?portrait"
                  name="StoneSilver12"
                  username="@sportsOn3"
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
                        onClick={() => callback("@sportsOn3")}
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
            {"012".split("").map((item) => (
              <div key={item} className="flex justify-between">
                <MemberCard
                  avatar="https://source.unsplash.com/random/120x120/?portrait"
                  name="StoneSilver12"
                  username="@sportsOn3"
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
                        onClick={() => callback("@sportsOn3")}
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
              : `Make ${selectedUser.username}  a moderator?`}
          </p>

          <p className="text-center text-[#888888] dark:text-[#A0A0A0]">
            {selectedUser.action === "remove"
              ? "This user will no longer able to directly invite, remove and members in the community."
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
              onClick={() => setOpenModal(false)}
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
