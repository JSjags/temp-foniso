"use client";

import { AddRulesContext } from "@/types/community";
import ReviewRules from "./ReviewRules";
import {
  useRouter,
  useSearchParams,
  usePathname,
  useParams,
} from "next/navigation";
import MobileDesktopOverlay from "../Modal/MobileDesktopOverlay";
import AddRule from "./AddRule";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editRuleQuery, newRuleQuery } from "@/services/api/community";
import toast from "react-hot-toast";
import SuccessToast from "../reusable/toasts/SuccessToast";
import ErrorToast from "../reusable/toasts/ErrorToast";

const ManageCommunityRules = () => {
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const { back, push } = useRouter();
  const pathname = usePathname();

  const { community_id } = useParams();

  console.log(community_id);

  const [currentRuleId, setCurrentRuleId] = useState<number | null>(null);

  console.log(currentRuleId);

  const newRuleMutation = useMutation({
    mutationKey: ["new-rule"],
    mutationFn: (data: {
      communityId: string;
      title: string;
      description: string;
    }) => newRuleQuery(data.communityId, data.title, data.description),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["one-community"] });
      toast.custom((t) => (
        <SuccessToast t={t} message={"Rule added successfully"} />
      ));
    },
    onError: () => {
      toast.custom((t) => <ErrorToast t={t} message={"Error adding rule"} />);
    },
  });

  const editRuleMutation = useMutation({
    mutationKey: ["edit-rule"],
    mutationFn: (data: { id: string; title: string; description: string }) =>
      editRuleQuery(data.id, data.title, data.description),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["one-community"] });
      toast.custom((t) => (
        <SuccessToast t={t} message={"Rule updated successfully"} />
      ));
    },
    onError: () => {
      toast.custom((t) => <ErrorToast t={t} message={"Error updating rule"} />);
    },
  });

  const onSubmit = (arg: AddRulesContext) => {
    if (currentRuleId) {
      editRuleMutation.mutate({
        id: currentRuleId.toString(),
        description: arg.description,
        title: arg.title,
      });
    } else {
      newRuleMutation.mutate({ communityId: community_id as string, ...arg });
    }
    // console.log(arg, "from main component");
    back();
  };

  const handleCloseModal = () => {
    setCurrentRuleId(null);
    back();
  };

  const openModal = (arg?: number) => {
    if (arg) {
      setCurrentRuleId(arg);
    } else setCurrentRuleId(null);
    push(
      `${pathname}?tab=rules${
        typeof arg === "number" ? `&edit=${arg}` : "&add=new"
      }`
    );
  };

  return (
    <>
      <ReviewRules editOnClick={openModal} addOnClick={openModal} />

      <MobileDesktopOverlay
        title={searchParams.get("edit") ? "Edit rule" : "Add new rule"}
        open={
          Boolean(searchParams.get("edit")) || searchParams.get("add") === "new"
        }
        handleClose={handleCloseModal}
      >
        <AddRule onSubmit={onSubmit} />
      </MobileDesktopOverlay>
    </>
  );
};

export default ManageCommunityRules;
