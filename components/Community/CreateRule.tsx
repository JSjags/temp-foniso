"use client";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import MobileDesktopOverlay from "../Modal/MobileDesktopOverlay";
import { AddRulesContext } from "@/types/community";
import AddRule from "./AddRule";
import useCustomMutation from "@/hooks/useCustomMutation";
import { useQueryClient } from "@tanstack/react-query";

type BodyContext = AddRulesContext & { communityId: number };

const CreateRule = () => {
  const searchParams = useSearchParams();
  const { back } = useRouter();
  const { community_id } = useParams();
  const client = useQueryClient();

  const { mutateAsync: createRule, isPending } = useCustomMutation<BodyContext>(
    "/community-rule",
    "POST"
  );
  const { mutateAsync: editRule } = useCustomMutation<AddRulesContext>(
    `/community-rule/${community_id}`,
    "PATCH"
  );

  const onSubmit = (arg: AddRulesContext) => {
    if (searchParams.get("edit")) {
      editRule(arg).then(() => {
        client.invalidateQueries({ queryKey: ["one-community"] });
        back();
      });
    } else {
      createRule({ ...arg, communityId: Number(community_id) }).then(() => {
        client.invalidateQueries({ queryKey: ["one-community"] });
        back();
      });
    }
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
      <AddRule onSubmit={onSubmit} isPending={isPending} />
    </MobileDesktopOverlay>
  );
};

export default CreateRule;
