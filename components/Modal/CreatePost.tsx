"use client";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTitle,
} from "@radix-ui/react-alert-dialog";
import { X } from "lucide-react";
import { AlertDialogHeader } from "../ui/alert-dialog";
import { useUserContext } from "@/context/UserContext";
import CreatePostCore from "../post/CreatePostCore";
import { useState } from "react";
import { ScrollArea } from "../ui/scroll-area";

type Props = {};

const CreatePostModal = (props: Props) => {
  const { showCreatePost, setShowCreatePost, setCurrentPost, currentPost } =
    useUserContext();
  const [mySelectedFiles, setMySelectedFiles] = useState<File[]>([]);

  return (
    showCreatePost && (
      <div className="bg-black/50 fixed z-[100] left-0 top-0 w-full h-full flex justify-center">
        <div className="w-full flex justify-center h-full min-[480px]:py-[5dvh] overflow-y-scroll">
          <AlertDialog
            open={showCreatePost}
            onOpenChange={(value) => {
              setCurrentPost(null);
              setShowCreatePost(value);
            }}
          >
            <AlertDialogContent className="min-w-[240px] max-w-[620px] h-screen min-[480px]:h-fit w-screen min-[480px]:w-[95%] bg-background border-border relative rounded-xl p-0 z-[500000000000]">
              <AlertDialogCancel
                onClick={() => {
                  setCurrentPost(null);
                  setShowCreatePost(false);
                }}
                className="absolute top-4 left-4 w-fit h-fit bg-border hover:bg-colorPrimary border-none bg-[#7C7C7C] rounded-full p-1 hover:text-darkGrey cursor-pointer z-[10000] outline-none"
              >
                <X size={16} className="text-foreground" />
              </AlertDialogCancel>
              <div className="w-full overflow-scroll max-h-[90vh] mx-auto">
                <div>
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-lg sm:text-2xl font-bold text-foreground/90 py-3 text-center border-b border-border sticky top-0 bg-background z-[1000]">
                      {currentPost ? "Edit post" : "New post"}
                    </AlertDialogTitle>
                    <div className="">
                      <CreatePostCore
                        id="modal"
                        selectedFiles={mySelectedFiles}
                        setSelectedFiles={setMySelectedFiles}
                      />
                    </div>
                    {/* {mySelectedFiles.length} */}
                  </AlertDialogHeader>
                </div>
              </div>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    )
  );
};

export default CreatePostModal;
