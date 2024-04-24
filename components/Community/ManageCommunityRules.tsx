import { AddRulesContext } from "@/types/community";
import ReviewRules from "./ReviewRules";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import MobileDesktopOverlay from "../Modal/MobileDesktopOverlay";
import AddRule from "./AddRule";

const ManageCommunityRules = () => {
  const searchParams = useSearchParams();
  const { back, push } = useRouter();
  const pathname = usePathname();

  const onSubmit = (arg: AddRulesContext) => {
    console.log(arg, "from main component");
    back();
  };

  const handleCloseModal = () => {
    back();
  };

  const openModal = (arg?: number) => {
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
