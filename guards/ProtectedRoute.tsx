"use client";

import ErrorToast from "@/components/reusable/toasts/ErrorToast";
import { useUserContext } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

type Props = {
  children: React.ReactNode;
};

const ProtectedRoute = (props: Props) => {
  const router = useRouter();

  const { userData } = useUserContext();

  if (!userData) {
    toast.custom(
      (t) => (
        <ErrorToast t={t} message={"Unauthorized, Please login to continue."} />
      ),
      { id: "Unauthorized" }
    );
    router.replace("/signup");
  }

  return <div>{props.children}</div>;
};

export default ProtectedRoute;
