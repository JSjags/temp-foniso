"use client";

import { useRouter, useSearchParams } from "next/navigation";
import MobileDesktopOverlay from "../Modal/MobileDesktopOverlay";
import { AddRulesContext } from "@/types/community";
import AddRule from "./AddRule";

const CreatePost = () => {
  const searchParams = useSearchParams();
  const { back } = useRouter();

  const onSubmit = (arg: AddRulesContext) => {
    console.log(arg, "from main component");
    back();
  };

  const handleCloseModal = () => {
    back();
  };

  return (
    <MobileDesktopOverlay
      title="New post"
      open={searchParams.get("post") === "new"}
      handleClose={handleCloseModal}
    >
      <AddRule onSubmit={onSubmit} />
    </MobileDesktopOverlay>
  );
};

export default CreatePost;
