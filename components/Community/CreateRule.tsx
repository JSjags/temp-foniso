"use client";

import { useRouter, useSearchParams } from "next/navigation";
import MobileDesktopOverlay from "../Modal/MobileDesktopOverlay";
import { AddRulesContext } from "@/types/community";
import AddRule from "./AddRule";

const CreateRule = () => {
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
      title={searchParams.get("edit") ? "Edit rule" : "Add new rule"}
      open={["new", "edit"].includes(searchParams.get("rule") ?? "")}
      handleClose={handleCloseModal}
    >
      <AddRule onSubmit={onSubmit} />
    </MobileDesktopOverlay>
  );
};

export default CreateRule;
